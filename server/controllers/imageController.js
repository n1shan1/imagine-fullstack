import axios from "axios";
import User from "../models/User.js";
import FormData from "form-data";
//generate the image

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Input validation
    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Invalid request. User ID and prompt are required.",
      });
    }

    // Find user with a single query
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check credit balance - removed incorrect User.creditBalance check
    if (user.creditBalance < 1) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Credits. Please recharge your account.",
        credits: user.creditBalance,
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    try {
      // Make the API call to generate image
      const response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            "x-api-key": process.env.CLIPDROP_API_KEY,
          },
          responseType: "arraybuffer",
        }
      );

      const base64image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      const resultImage = `data:image/png;base64,${base64image}`;

      // Only deduct credits if image generation was successful
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $inc: { creditBalance: -1 } }, // Use $inc operator for atomic update
        { new: true } // Return the updated document
      );

      // Return success response with the updated credit balance
      res.json({
        success: true,
        message: "Image generated successfully.",
        image: resultImage,
        credits: updatedUser.creditBalance,
      });
    } catch (apiError) {
      console.log("API Error:", apiError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to generate image. Please try again.",
        error: apiError.message,
      });
    }
  } catch (error) {
    console.log("Server Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

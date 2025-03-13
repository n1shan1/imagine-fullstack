import { React, useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const Result = () => {
  const { generateImage, user } = useContext(AppContext);
  const [image, setImage] = useState(assets.sample_img_1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (input) {
      const image = await generateImage(input);
      setImage(image);
      setImageLoaded(true);
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmitHandler}
      className="flex items-center justify-center flex-col space-y-6 min-h-[90vh] bg-gray-50 p-10"
    >
      <div>
        <div className="relative">
          <img src={image} alt="image" className="max-w-sm  shadow-lg" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-400 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          ></span>
        </div>

        <p className={!loading ? "hidden" : ""}>Loading...</p>
      </div>
      {!imageLoaded && (
        <div className="flex w-full max-w-xl text-sm p-0.5 mt-10">
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            name=""
            value={input}
            id=""
            placeholder="Describe what you want to generate..."
            className="flex-1 outline-none px-6 py-2 max-w-full border border-black"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 border border-transparent  hover:opacity-90 transition-colors"
          >
            Generate
          </button>
        </div>
      )}
      {imageLoaded && (
        <div className="flex gap-5 items-center justify-center">
          <p
            onClick={() => setImageLoaded(false)}
            className="flex gap-2 flex-wrap justify-center text-black text-sm p-0.5 mt-10 border border-gray-700 px-6 py-2  cursor-pointer hover:bg-gray-200 transition-colors"
          >
            Generate Another
          </p>
          <a
            download={`${user.name}_generated_image.jpg`}
            href={image}
            className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 px-6 py-2  cursor-pointer bg-gradient-to-r from-blue-500 to-green-500 border border-transparent hover:opacity-90 transition-colors"
          >
            Download
          </a>
        </div>
      )}
    </form>
  );
};

export default Result;

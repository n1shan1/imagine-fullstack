# Imagine - Fullstack Application

Imagine is a full-stack application that allows users to generate images from text prompts using AI. The application is built with a React frontend and an Express backend, and it integrates various modern web technologies to deliver a seamless user experience.

## Features

- **Text-to-Image Generation**: Convert text prompts into stunning images using AI.
- **User Authentication**: Secure user registration and login.
- **Credit System**: Users can purchase credits to generate images.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Smooth Animations**: Enhanced user experience with framer-motion animations.
- **Social Media Integration**: Connect with the developer on GitHub, Twitter, LinkedIn, and Instagram.

## Technologies Used

- **Frontend**: React, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Express, MongoDB, Mongoose, Razorpay
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Razorpay account

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/n1shan1/imagine-fullstack.git
   cd imagine-fullstack/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory and add the following environment variables:

   ```properties
   PORT=8080
   MONGODB_URI="your_mongodb_uri"
   JWT_SECRET="your_jwt_secret"
   CLIPDROP_API_KEY="your_clipdrop_api_key"
   RAZORPAY_KEY_ID="your_razorpay_key_id"
   RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
   RAZORPAY_CURRENCY="INR"
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `client` directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory and add the following environment variables:

   ```properties
   VITE_BACKEND_URL=http://localhost:8080
   VITE_RAZORPAY_KEY_ID="your_razorpay_key_id"
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Deployment

The application is configured to be deployed on Vercel. Ensure you have the Vercel CLI installed and configured.

1. Deploy the backend:

   ```bash
   cd server
   vercel --prod
   ```

2. Deploy the frontend:
   ```bash
   cd ../client
   vercel --prod
   ```

## Usage

1. Register or log in to your account.
2. Purchase credits to generate images.
3. Enter a text prompt and generate an image.
4. Download or share the generated image.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact Nishant at [nishantde03@gmail.com](mailto:nishantdev03@gmail.com).

import rating_star from "./rating_star.svg";
import sample_img_1 from "./sample_img_1.png";
import sample_img_2 from "./sample_img_2.png";
import profile_img_1 from "./profile-1.jpeg";
import profile_img_2 from "./profile-2.jpeg";
import profile_img_3 from "./profile-3.jpeg";
import profile_img_4 from "./profile-4.jpeg";
import profile_img_5 from "./profile-5.jpeg";
import profile_img_6 from "./profile-6.jpeg";
import nishant from "./nishant.jpeg";
import step_icon_1 from "./step_icon_1.svg";
import step_icon_2 from "./step_icon_2.svg";
import step_icon_3 from "./step_icon_3.svg";

export const assets = {
  rating_star,
  sample_img_1,
  nishant,
  sample_img_2,
};

export const stepsData = [
  {
    title: "Describe Your Vision",
    description:
      "Type a phrase, sentence, or paragraph that describes the image you want to create.",
    icon: step_icon_1,
  },
  {
    title: "Watch the Magic",
    description:
      "Our AI-powered engine will transform your text into a high-quality, unique image in seconds.",
    icon: step_icon_2,
  },
  {
    title: "Download & Share",
    description:
      "Instantly download your creation or share it with the world directly from our platform.",
    icon: step_icon_3,
  },
];

export const testimonialsData = [
  {
    image: profile_img_1,
    name: "Emily Rodriguez",
    role: "Digital Artist",
    stars: 5,
    text: "IMAGINE has completely transformed my creative workflow. The ability to generate detailed concept art from simple descriptions has saved me countless hours of preliminary sketching.",
  },
  {
    image: profile_img_2,
    name: "Diana Chen",
    role: "Marketing Director",
    stars: 4,
    text: "Our social media engagement increased by 45% after we started using IMAGINE for our campaign visuals. The quality and uniqueness of the generated images really stands out.",
  },
  {
    image: profile_img_3,
    name: "Sarah Johnson",
    role: "UX Designer",
    stars: 5,
    text: "As someone who needed quick prototyping visuals, IMAGINE has been a game-changer. I can iterate through design concepts in minutes instead of hours.",
  },
  {
    image: profile_img_4,
    name: "Joe Wilson",
    role: "Content Creator",
    stars: 4,
    text: "The versatility of IMAGINE is what impresses me most. Whether I need product mockups or abstract concepts, the AI understands my prompts with surprising accuracy.",
  },
  {
    image: profile_img_5,
    name: "Michelle Taylor",
    role: "Book Publisher",
    stars: 5,
    text: "We've used IMAGINE to create cover art for our indie publishing house. The speed and quality allow us to show authors multiple options quickly, streamlining our approval process.",
  },
  {
    image: profile_img_6,
    name: "Donna Okonjo",
    role: "E-commerce Entrepreneur",
    stars: 4,
    text: "Creating product visualizations before manufacturing has saved us thousands in production costs. IMAGINE helps us validate designs with customers before committing to production.",
  },
];

export const plans = [
  {
    id: "Basic",
    price: 10,
    credits: 5,
    desc: "Best for personal use.",
  },
  {
    id: "Advanced",
    price: 20,
    credits: 10,
    desc: "Best for business use.",
  },
  {
    id: "Business",
    price: 50,
    credits: 25,
    desc: "Best for enterprise use.",
  },
];

import Image from "next/image";
import SocialLinks from "../socials";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function About() {
  return (
    <div id="about" className="flex flex-col items-center mt-10 h-screen w-screen bg-black rounded-b-3xl">
      <ProfilePicture />
      <Name />
      <SocialLinks />
      <ScrollIndicator />
    </div>
  );
}

function ProfilePicture() {
  return (
      <div className="relative w-[200px] h-[200px] mt-15 md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] border-2 border-black hover:border-[#4505f4] transition-all duration-300 rounded-full shadow-lg">
        <Image 
          src="/image.png" 
          alt="Profile" 
          fill
          className="rounded-full object-cover"
        />
      </div>
  );
}

function Name() {
  return (
    <div className="flex flex-col items-center mt-4 px-4">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold">
        Hey, I'm <span className="text-[#4505f4]">Justen Dorrance</span> 👋
      </h1>
      <p className="mt-5 text-lg md:text-xl lg:text-2xl font-light text-center opacity-75">
        A software engineer based out of Fort Collins, Colorado.
      </p>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 1.5,
        duration: 0.8,
        ease: "easeOut"
      }}
      className="absolute bottom-10 flex flex-col items-center gap-2"
    >
      <p className="text-gray-400 text-lg">Scroll to see my projects</p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </motion.div>
  );
}
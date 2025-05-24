import Nav from "@/components/nav";
import About from "@/components/about";
import Projects from "@/components/projects";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen overflow-x-hidden">
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.3 }}
      >
        <About />
      </motion.div>
      <Projects />
    </div>
  );
} 
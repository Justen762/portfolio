import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <div id="projects" className="flex flex-col items-center h-[60vh] w-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-gray-600">
          🚧 This section is currently under maintenance. Check back soon to see what I've been working on! 🚧
        </p>
      </motion.div>
    </div>
  );
}
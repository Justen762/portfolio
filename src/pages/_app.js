import "@/styles/globals.css";
import { motion } from "framer-motion";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} className="overflow-hidden" />;
}

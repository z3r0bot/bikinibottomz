'use client';

import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <motion.div
        className="w-24 h-24 relative"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="absolute inset-0 border-4 border-[#ff7400]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-[#ff7400] rounded-full" />
      </motion.div>
      <p className="mt-4 text-gray-600 font-raleway">Loading products...</p>
    </div>
  );
} 
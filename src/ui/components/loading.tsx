import { motion } from "framer-motion";

const dotVariants = {
  start: { opacity: 0.2 },
  end: { opacity: 1 },
};

export const Loading = () => {
  return (
    <div>
      <div className="flex space-x-2">
        <motion.div
          className="w-3 h-3 bg-gray-600 rounded-full"
          variants={dotVariants}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 0,
          }}
        />
        <motion.div
          className="w-3 h-3 bg-gray-600 rounded-full"
          variants={dotVariants}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5,
          }}
        />
        <motion.div
          className="w-3 h-3 bg-gray-600 rounded-full"
          variants={dotVariants}
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

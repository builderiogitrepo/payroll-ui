import { motion } from "framer-motion";

const AnimatedScene = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: 0,
            ease: "easeInOut",
          }}
          className="absolute top-10 left-10 w-2 h-2 bg-blue-300 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute top-20 right-20 w-1 h-1 bg-green-300 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-300 rounded-full"
        />
      </div>

      {/* Main Scene */}
      <div className="relative z-10">
        {/* Character */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          {/* Head */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 bg-orange-200 rounded-full border-4 border-orange-300 mx-auto relative"
            >
              {/* Hat */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-8 bg-brown-600 rounded-full"></div>
              </div>

              {/* Eyes */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-black rounded-full"></div>

              {/* Smile */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-pink-300 rounded-full"
              ></motion.div>
            </motion.div>

            {/* Body */}
            <div className="w-12 h-16 bg-white rounded-t-2xl mx-auto mt-2 relative">
              <div className="w-8 h-8 bg-blue-400 rounded-lg mx-auto mt-2"></div>
            </div>

            {/* Arms */}
            <div className="absolute top-8 -left-2 w-3 h-8 bg-orange-200 rounded-full transform -rotate-12"></div>
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-8 -right-2 w-3 h-8 bg-orange-200 rounded-full transform rotate-12"
            ></motion.div>
          </div>
        </motion.div>

        {/* Desk */}
        <div className="mt-4">
          <div className="w-48 h-4 bg-gray-300 rounded-lg mx-auto"></div>
        </div>

        {/* Monitor */}
        <motion.div
          animate={{
            opacity: [0.8, 1, 0.8],
            rotateY: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-20 h-16 bg-gray-800 rounded-lg relative">
            <div className="w-16 h-12 bg-blue-100 rounded mx-auto mt-2 relative overflow-hidden">
              {/* Animated screen content */}
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-2 left-2 w-8 h-1 bg-blue-600 rounded"
              ></motion.div>
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-4 left-2 w-6 h-1 bg-green-600 rounded"
              ></motion.div>
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-6 left-2 w-4 h-1 bg-orange-600 rounded"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Laptop */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-4 right-1/4 w-16 h-10 bg-red-500 rounded-lg relative"
        >
          <div className="w-12 h-8 bg-red-400 rounded mx-auto mt-1">
            <div className="w-8 h-1 bg-white rounded mx-auto mt-2"></div>
            <div className="w-6 h-1 bg-white rounded mx-auto mt-1"></div>
          </div>
        </motion.div>

        {/* Papers */}
        <motion.div
          animate={{ rotate: [0, 2, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-6 left-1/4 w-6 h-8 bg-yellow-100 rounded transform -rotate-12"
        ></motion.div>

        {/* Plant */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/4 w-4 h-6 bg-green-500 rounded-t-full"
        ></motion.div>
      </div>

      {/* Payroll-themed floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 text-blue-200 text-xs font-medium"
        >
          💰
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/3 right-1/4 text-green-200 text-xs font-medium"
        >
          📊
        </motion.div>
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/3 left-1/3 text-purple-200 text-xs font-medium"
        >
          📋
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedScene;

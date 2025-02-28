import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

export function  TypingAnimation() {
    return (
      <div className="flex space-x-1.5 w-full lg:max-w-4xl  max-w-md mx-auto items-center py-6  mb-1">
        <style>
          {`
            @keyframes pulse-fade {
              0%, 100% { opacity: 0.4; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1); }
            }
          `}
        </style>
        <div className="w-2 h-2 rounded-full bg-colorGradient1 dark:bg-colorGradient3 animate-[pulse-fade_1.4s_ease-in-out_infinite]"></div>
        <div className="w-2 h-2 rounded-full bg-colorGradient1 dark:bg-colorGradient3 animate-[pulse-fade_1.4s_ease-in-out_0.4s_infinite]"></div>
        <div className="w-2 h-2 rounded-full bg-colorGradient1 dark:bg-colorGradient3 animate-[pulse-fade_1.4s_ease-in-out_0.8s_infinite]"></div>
      </div>
    );
  }
  
  export function SkeletonWave() {
    return (
    //   <div className="w-full lg:max-w-4xl  max-w-md mx-auto">
    //   <div className="space-y-4">
    //     <div className="h-4 bg-gray-300 rounded-full w-full animate-pulse"></div>
    //     <div className="h-4 bg-gray-200 rounded-full w-4/5 lg:w-10/12 animate-pulse"></div>
    //     <div className="h-4 bg-gray-200 rounded-full w-3/5 lg:w-8/12 animate-pulse"></div>
    //   </div>
    // </div>
    <div className="w-full lg:max-w-4xl  max-w-md mx-auto space-y-4 h-screen">
    <div className="flex-1 space-y-3">
    <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded overflow-hidden relative">
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer"></div>
        </div>
        <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-5/6 overflow-hidden relative">
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer"></div>
        </div>
        <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-4/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer"></div>
        </div>
      </div>
      <div className="flex-1 space-y-3 opacity-60">
        <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-3/4 overflow-hidden relative">
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer"></div>
        </div>
        <div className="h-4 bg-gray-600 dark:bg-gray-700 rounded w-2/3 overflow-hidden relative">
          <div className="absolute inset-0 bg-shimmer-gradient animate-shimmer"></div>
        </div>
    </div>
  </div>
  );
  }

  export function LoadingSkeleton() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={` relative md:w-4/6  w-11/12  mt-4 sm:mt-6 md:mt-8 lg:mt-12 h-92  max-w-md lg:max-w-4xl mx-auto bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-96`}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: 'linear',
            }}
          />
          
          {/* Structural elements */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-300 mb-4 dark:text-gray-600" />
            {/* <div className="w-3/4 h-2 bg-gray-300 rounded mb-2" />
            <div className="w-1/2 h-2 bg-gray-300 rounded" /> */}
          </div>
        </div>
      </motion.div>
    )
  }
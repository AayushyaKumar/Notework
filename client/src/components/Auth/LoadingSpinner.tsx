import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-colorGradient2/50 backdrop-blur-sm flex items-center justify-center  ">
    <div className="bg-gray-300 dark:bg-colorGradient4 px-12 py-8 rounded-lg shadow-xl flex flex-col items-center  space-y-4 2xl:w-1/4 2xl:h-1/6">
      <Loader2 className="w-12 h-12 2xl:w-20 2xl:h-20 animate-spin text-blue-600 2xl:mt-7" />
      <span className="text-gray-700 dark:text-gray-400 text-lg font-bold 2xl:text-4xl">Loading...</span>
    </div>
  </div>
  );
};

export default LoadingSpinner;
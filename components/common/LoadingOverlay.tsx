import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="w-16 h-16 border-t-4 border-[#343C6A] border-solid rounded-full animate-spin" />
    </div>
  );
};

export default LoadingOverlay;

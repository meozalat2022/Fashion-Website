import React from "react";

const Spinner = () => {
  return (
    <div className="fixed flex items-center opacity-70 justify-center z-[9999] inset-0 bg-black">
      <div className="w-10 h-10 border-4 border-gray-300 border-solid border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;

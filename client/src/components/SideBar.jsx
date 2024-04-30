import React, { useState } from 'react';
import SideContent from './SideContent';

const SideBar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block bg-white text-black w-64">
        <div className="p-4">
          <SideContent/>
        </div>
      </div>
      <button
        className="md:hidden fixed top-0 left-0 m-4"
        onClick={toggleSideBar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 4.5A1.5 1.5 0 014.5 3h11A1.5 1.5 0 0117 4.5v1a.5.5 0 01-1 0v-1a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-1a.5.5 0 011 0v1A1.5 1.5 0 0115.5 17h-11A1.5 1.5 0 013 15.5v-11z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M4.5 6a.5.5 0 01.5-.5h11a.5.5 0 01.5.5v11a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 h-full z-50 bg-white text-black w-64 transition-transform duration-300 transform ${
          isSideBarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <SideContent/>
        </div>
      </div>

      {isSideBarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          onClick={toggleSideBar}
        ></div>
      )}
    </div>
  );
};

export default SideBar;

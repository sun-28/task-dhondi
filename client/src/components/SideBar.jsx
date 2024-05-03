import React, { useContext, useState } from 'react';
import SideContent from './SideContent';
import { AppContext } from '../context/AppContext';

const SideBar = () => {
  const {isSideBarOpen,setIsSideBarOpen} = useContext(AppContext);
  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };


  return (
    <div className="flex h-screen sticky top-0">
      <div className="hidden md:block bg-white text-black w-64">
        <div className="p-4">
          <SideContent/>
        </div>
      </div>
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

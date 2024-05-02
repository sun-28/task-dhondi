import React, { useContext, useEffect, useState } from 'react'
import VCard from '../components/VCard'
import Modal from '../components/PostModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const Posts = ({isYourPosts}) => {

  const {setShowModal,fetchYourPosts,fetchallPosts,yourPosts,allPosts,setIsSideBarOpen} = useContext(AppContext);  
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!localStorage.getItem('auth-token')){
      navigate('/auth')
    } 
    fetchYourPosts();
    fetchallPosts();    
  }, [])

  return (
    <>
    <div className='flex flex-col w-full'>
        <div className='flex justify-between my-4 mx-10 items-center'>
            <div className='flex gap-2'>
              <svg onClick={()=> setIsSideBarOpen(true)} className='ml-[-20px] md:hidden ' width="31" height="30" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.33966 7.5461C3.33966 6.87028 3.88769 6.32349 4.56227 6.32349H14.4046C14.7289 6.32349 15.0399 6.4523 15.2691 6.68158C15.4984 6.91087 15.6272 7.22184 15.6272 7.5461C15.6272 7.87036 15.4984 8.18133 15.2691 8.41062C15.0399 8.6399 14.7289 8.76871 14.4046 8.76871H4.56227C4.23802 8.76871 3.92704 8.6399 3.69776 8.41062C3.46847 8.18133 3.33966 7.87036 3.33966 7.5461ZM3.33966 14.9248C3.33966 14.249 3.88769 13.7022 4.56227 13.7022H26.6922C27.0165 13.7022 27.3274 13.831 27.5567 14.0603C27.786 14.2896 27.9148 14.6005 27.9148 14.9248C27.9148 15.2491 27.786 15.56 27.5567 15.7893C27.3274 16.0186 27.0165 16.1474 26.6922 16.1474H4.56227C4.23802 16.1474 3.92704 16.0186 3.69776 15.7893C3.46847 15.56 3.33966 15.2491 3.33966 14.9248ZM4.56227 21.0809C4.23802 21.0809 3.92704 21.2097 3.69776 21.439C3.46847 21.6683 3.33966 21.9792 3.33966 22.3035C3.33966 22.6277 3.46847 22.9387 3.69776 23.168C3.92704 23.3973 4.23802 23.5261 4.56227 23.5261H19.3197C19.6439 23.5261 19.9549 23.3973 20.1842 23.168C20.4135 22.9387 20.5423 22.6277 20.5423 22.3035C20.5423 21.9792 20.4135 21.6683 20.1842 21.439C19.9549 21.2097 19.6439 21.0809 19.3197 21.0809H4.56227Z" fill="#181717"/>
              </svg>
              <h2 className='text-xl font-semibold' >{isYourPosts?"Your Posts":"Feed"}</h2>
            </div>
            <button onClick={()=>setShowModal(true)} className='bg-black text-white border-none rounded w-28 h-8 flex justify-center items-center gap-2'>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.24885 10.9986H10.914M9.49771 3.20898L10.2059 3.91713M10.5599 1.43863C10.6994 1.57811 10.8101 1.7437 10.8856 1.92596C10.9611 2.10822 11 2.30356 11 2.50084C11 2.69812 10.9611 2.89347 10.8856 3.07573C10.8101 3.25798 10.6994 3.42358 10.5599 3.56306L3.83257 10.2904L1 10.9986L1.70814 8.20564L8.43833 1.44146C8.7036 1.1749 9.05941 1.01782 9.43511 1.00143C9.81082 0.985028 10.179 1.1105 10.4664 1.35294L10.5599 1.43863Z" stroke="white" stroke-width="0.708142" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>  
              write
            </button>
        </div>
        <div className='flex flex-col gap-4'>
            {isYourPosts && yourPosts.map((post) => <VCard  isYourPosts={isYourPosts} key={post.id} {...post} />)}
            {!isYourPosts && allPosts.map((post) => <VCard  isYourPosts={isYourPosts} key={post.id} {...post} />)}
        </div>
    </div>
        </>
  )
}

export default Posts

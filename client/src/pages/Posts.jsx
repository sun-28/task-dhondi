import React, { useState } from 'react'
import VCard from '../components/VCard'
import Modal from '../components/Modal';

const posts = [{title:'title',name:'name',date:'date',content:'content',tags:['tag1','tag2']}]

const Posts = ({isYourPosts}) => {
  const [showModal, setShowModal] = useState(false);
  const [postDetails, setpostDetails] = useState({title:"",content:"",tags:[]});
  return (
    <>
    <div className='flex flex-col w-full'>
        <div className='flex justify-between my-4 mx-10 items-center'>
            <h2 className='text-xl font-semibold' >{isYourPosts?"Your Posts":"Feed"}</h2>
            <button onClick={()=>setShowModal(true)}  className='bg-black text-white border-none rounded w-28 h-8 flex justify-center items-center gap-2'>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.24885 10.9986H10.914M9.49771 3.20898L10.2059 3.91713M10.5599 1.43863C10.6994 1.57811 10.8101 1.7437 10.8856 1.92596C10.9611 2.10822 11 2.30356 11 2.50084C11 2.69812 10.9611 2.89347 10.8856 3.07573C10.8101 3.25798 10.6994 3.42358 10.5599 3.56306L3.83257 10.2904L1 10.9986L1.70814 8.20564L8.43833 1.44146C8.7036 1.1749 9.05941 1.01782 9.43511 1.00143C9.81082 0.985028 10.179 1.1105 10.4664 1.35294L10.5599 1.43863Z" stroke="white" stroke-width="0.708142" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>  
              write
            </button>
        </div>
        <div className='flex flex-col gap-4'>
            {posts.map((post,idx) => <VCard key={idx} {...post}/>)}
        </div>
    </div>
        <Modal postDetails={postDetails} setpostDetails={setpostDetails}  showModal={showModal} setShowModal={setShowModal} />
        </>
  )
}

export default Posts

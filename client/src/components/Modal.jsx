import React, { useState } from "react";

const Modal = ({showModal, setShowModal,postDetails,setpostDetails}) => {
    const handleOnChange = (e) => {
        setpostDetails({ ...postDetails, [e.target.name]: e.target.value });
    }
    const handlePublish = async() => {
        const data = await axios.post('http://localhost:5000/post/create',postDetails,{
            headers:{
            'auth-token':localStorage.getItem('auth-token')
            }
        })
        if(data.success){
            toast.success("Post Published Successfully!")
        }
        else{
            toast.error(data.message)
        }
    }
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen h-screen"
          >
            <div className="relative my-6 w-3/5 bg-white p-2 rounded-xl">
                <div className="flex flex-col w-full h-full gap-4 ">
                    <input placeholder='Write Title' type="text" name='title' value={postDetails.title} onChange={handleOnChange}/>
                    <div></div>
                    <textarea placeholder='Start Typing ....' name='content' value={postDetails.content} onChange={handleOnChange} cols="30" rows="10"></textarea>
                    <div className="flex justify-end gap-2">
                    <button onClick={()=>{setpostDetails({title:"",content:"",tags:[]});
                    setShowModal(false)}}  className='bg-gray-300 text-black border-none rounded w-28 h-8 flex justify-center items-center gap-2'>cancel</button>
            <button onClick={()=>{handlePublish();setShowModal(false);}}  className='bg-black text-white border-none rounded w-28 h-8 flex justify-center items-center gap-2'>Publish</button>
                    </div>
                </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default Modal;
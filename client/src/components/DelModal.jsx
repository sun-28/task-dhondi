import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DelModal = ({nav}) => {
    const {postDel,setpostDel} = useContext(AppContext);
    const id = postDel;
    let navigate = useNavigate()
    const {showDel , setshowDel ,fetchYourPosts ,fetchallPosts} = useContext(AppContext);
    const handleDel = async () => {
      const {data} = await axios.delete(`http://localhost:5000/post/del/${id}`,{
          headers:{
              authToken:localStorage.getItem('auth-token')
          }
      });
      if(data.success){
          toast.success('Post Deleted Successfully');
          setshowDel(false);
          fetchYourPosts();
          fetchallPosts();
          if(nav) navigate('/');
      }
      else{
          toast.error('Error Deleting Post');
      }
      setpostDel(-1);
    }
  return (
    <>
      {showDel ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 w-1/5 min-w-[280px] bg-white p-4 rounded-xl">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h2 className="text-gray-700 font-medium">Sure you want to delete?</h2>
                    <p className="text-gray-500 text-sm mb-4 font-medium">Are you sure you want to delete this ?</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => {setshowDel(false)}} className='bg-white font-medium text-black border border-black rounded w-28 h-8 flex justify-center items-center gap-2'>No ,cancel</button>
                        <button onClick={()=>{handleDel(); setshowDel(false);}} className='bg-black font-medium text-white border-none rounded w-28 h-8 flex justify-center items-center gap-2'>Yes ,Delete</button>
                    </div>
                </div>
            </div>
          </div>
          <div className="opacity-55 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default DelModal;
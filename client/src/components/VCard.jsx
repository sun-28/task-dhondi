import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const calcRead = (text) => {
  const wpm = 225;
  const wc = text.split(/\s+/).length;
  const read = Math.ceil(wc/wpm);
  return read;
}
const short = (text) => {
  if (text.length <= 300) {
    return text;
  } else {
    console.log(1)
    return text.substring(0,300) + '...';
  }
}

const VCard = ({title,name,created_at,content,tags,id,user_id,image}) => {
  const {setShowModal, setpostDetails,setshowDel,userDetails,setpostDel} = useContext(AppContext); 
  const navigate = useNavigate();
  const handleOpenPost = () => {
    navigate(`/post/${id}`)
  }
  return (
    <div className='flex flex-col bg-white mx-8 rounded-md min-h-48 p-4 gap-2 '>
        <div className='flex justify-between '>
          <h3  className='flex-2 text-lg font-medium w-full'>{title}</h3>
          {userDetails.id===user_id && <div className='flex gap-4 items-center justify-center z-100'>
            <svg onClick={()=>{
              setpostDetails({title,content,tags,id,update:true})
              setShowModal(true)
            }} className=' hover:translate-y-[-3px]' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.93857 12.6063L3.1507 15.7578L6.30221 14.97L15.4306 5.8416C15.726 5.5461 15.8919 5.14537 15.8919 4.72754C15.8919 4.3097 15.726 3.90898 15.4306 3.61348L15.2951 3.47796C14.9996 3.18255 14.5988 3.0166 14.181 3.0166C13.7632 3.0166 13.3624 3.18255 13.0669 3.47796L3.93857 12.6063Z" stroke="black" strokeWidth="1.57576" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.93857 12.6066L3.1507 15.7581L6.30221 14.9702L14.181 7.09142L11.8174 4.72778L3.93857 12.6066Z" fill="black"/>
              <path d="M11.8173 4.72778L14.181 7.09142M10.2416 15.7581H16.5446" stroke="black" strokeWidth="1.57576" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg onClick={()=>{
              setpostDel(id)
              setshowDel(true)
            }} className=' hover:translate-y-[-3px]' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_1_213)">
              <path d="M15.8496 3.93944C16.0585 3.93944 16.2589 4.02245 16.4067 4.17021C16.5544 4.31796 16.6374 4.51836 16.6374 4.72732C16.6374 4.93628 16.5544 5.13668 16.4067 5.28444C16.2589 5.43219 16.0585 5.5152 15.8496 5.5152H15.0617L15.0593 5.57114L14.3242 15.8695C14.2959 16.2671 14.118 16.6391 13.8264 16.9107C13.5347 17.1824 13.151 17.3334 12.7524 17.3334H6.33987C5.94131 17.3334 5.55756 17.1824 5.2659 16.9107C4.97424 16.6391 4.79635 16.2671 4.76805 15.8695L4.03296 5.57193C4.03177 5.55304 4.03124 5.53412 4.03138 5.5152H3.24351C3.03455 5.5152 2.83415 5.43219 2.68639 5.28444C2.53864 5.13668 2.45563 4.93628 2.45563 4.72732C2.45563 4.51836 2.53864 4.31796 2.68639 4.17021C2.83415 4.02245 3.03455 3.93944 3.24351 3.93944H15.8496ZM11.1223 1.57581C11.3313 1.57581 11.5317 1.65881 11.6794 1.80657C11.8272 1.95433 11.9102 2.15473 11.9102 2.36368C11.9102 2.57264 11.8272 2.77304 11.6794 2.9208C11.5317 3.06855 11.3313 3.15156 11.1223 3.15156H7.97078C7.76182 3.15156 7.56142 3.06855 7.41366 2.9208C7.26591 2.77304 7.1829 2.57264 7.1829 2.36368C7.1829 2.15473 7.26591 1.95433 7.41366 1.80657C7.56142 1.65881 7.76182 1.57581 7.97078 1.57581H11.1223Z" fill="black"/>
              </g>
              <defs>
              <clipPath id="clip0_1_213">
              <rect width="18.9091" height="18.9091" fill="white" transform="translate(0.0898438)"/>
              </clipPath>
              </defs>
            </svg>
          </div>}
        </div>
        <div className='flex flex-row gap-2 flex-2 w-full items-center'>
            <img className='w-6 h-6 rounded-xl' src={image} alt="img" />
            <p>{name}</p>
            <p className='text-gray-500 text-sm ml-5'>{created_at}</p>
        </div>
        <hr/>
        <p className='flex-1 w-full'>{short(content)}. <span className='text-md text-sky-700 ml-2 mt-[2px] text-center hover:cursor-pointer' onClick={handleOpenPost}>read more</span></p>
        <div className='flex items-center flex-2 gap-4 w-full'>
            {tags.map((tag,idx) => <span key={idx} className='bg-purple-50 text-purple-600 text-sm px-1 rounded'>{tag}</span>)}
            <span className='ml-4 text-sm text-gray-500'>{calcRead(content)} min. read</span>
        </div>
        
    </div>
  )
}

export default VCard

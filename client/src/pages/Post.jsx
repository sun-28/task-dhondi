import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import DelModal from '../components/DelModal';

const Post = () => {
  const {setShowModal,setshowDel,setpostDetails,userDetails,showModal,setshowSidebar,setpostDel} = useContext(AppContext); 
  const [yourPosts, setyourPosts] = useState(false)
    const { id } = useParams();
    const [post, setPost] = useState({});
    const navigate = useNavigate();
    const fetchPost = async () => {
        const {data} = await axios.get(`http://localhost:5000/post/getById/${id}`);
        const post = data.data;
        if(data.success){
          let createdAtDate = post.created_at.split('T')[0];
          createdAtDate = new Date(createdAtDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
          post.created_at = createdAtDate;
          let tags = JSON.parse(post.tags);
          post.tags = tags;
          setPost(post);
        }
        else{
            toast.error(data.message)
        }
    }
    useEffect(() => {
        if(!localStorage.getItem('auth-token')){
            navigate('/auth')
        }
        else{
            fetchPost();
            setshowSidebar(true);  
        } 
    },[showModal])
    useEffect(() => {
      if(userDetails.id === post.user_id){
        setyourPosts(true);
    }
    }, [post])

  return (
    <div className='flex w-full'>
      <div className='mt-[31px] pl-3 w-8'>
      <svg onClick={() => window.history.back()} width="30" height="30" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6707 14.8447L8.32584 10.4999L12.6707 6.15503" stroke="black" strokeOpacity="0.63" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      </div>
    <div className='flex flex-col p-4 gap-2 w-full'>
        <div className='flex justify-between m-2'>
          <h2 className='flex-2 text-3xl font-semibold'>{post.title}</h2>
          { yourPosts && <div className='flex gap-4 items-center justify-center'>
            <svg  width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">             
            <path d="M22.3125 12.75H24.9688C25.6732 12.75 26.3489 13.0299 26.847 13.528C27.3451 14.0261 27.625 14.7018 27.625 15.4062V28.1562C27.625 28.8607 27.3451 29.5364 26.847 30.0345C26.3489 30.5326 25.6732 30.8125 24.9688 30.8125H9.03125C8.32677 30.8125 7.65114 30.5326 7.153 30.0345C6.65485 29.5364 6.375 28.8607 6.375 28.1562V15.4062C6.375 14.7018 6.65485 14.0261 7.153 13.528C7.65114 13.0299 8.32677 12.75 9.03125 12.75H11.6875M22.3125 8.5L17 3.1875M17 3.1875L11.6875 8.5M17 3.1875V21.3164" stroke="black" strokeWidth="2.125" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg onClick={()=>{
              setpostDetails({title:post.title,content:post.content,tags:post.tags,id:post.id,update:true})
              setShowModal(true)
            }} className='hover:cursor-pointer hover:translate-y-[-3px]' width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.12221 22.7853L5.69794 28.4824L11.395 27.0581L27.8966 10.5565C28.4307 10.0224 28.7306 9.29795 28.7306 8.54262C28.7306 7.78729 28.4307 7.06288 27.8966 6.5287L27.6517 6.28372C27.1175 5.7497 26.3931 5.44971 25.6377 5.44971C24.8824 5.44971 24.158 5.7497 23.6238 6.28372L7.12221 22.7853Z" stroke="black" strokeWidth="2.84854" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21.363 8.54272L25.6358 12.8155M18.5145 28.4825H29.9086" stroke="black" strokeWidth="2.84854" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg onClick={()=>{
              setpostDel(post.id);
              setshowDel(true);
            }} className='hover:cursor-pointer hover:translate-y-[-3px]' width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_268)">
            <path d="M28.3333 7.08325C28.7091 7.08325 29.0694 7.23251 29.3351 7.49818C29.6007 7.76386 29.75 8.1242 29.75 8.49992C29.75 8.87564 29.6007 9.23598 29.3351 9.50165C29.0694 9.76733 28.7091 9.91659 28.3333 9.91659H26.9167L26.9124 10.0172L25.5907 28.5344C25.5398 29.2492 25.2199 29.9182 24.6955 30.4066C24.1711 30.8951 23.4811 31.1666 22.7644 31.1666H11.2342C10.5175 31.1666 9.82751 30.8951 9.30309 30.4066C8.77866 29.9182 8.4588 29.2492 8.40792 28.5344L7.08617 10.0186C7.08402 9.98463 7.08307 9.95061 7.08333 9.91659H5.66667C5.29094 9.91659 4.93061 9.76733 4.66493 9.50165C4.39926 9.23598 4.25 8.87564 4.25 8.49992C4.25 8.1242 4.39926 7.76386 4.66493 7.49818C4.93061 7.23251 5.29094 7.08325 5.66667 7.08325H28.3333ZM24.0791 9.91659H9.92092L11.2356 28.3333H22.7644L24.0791 9.91659ZM19.8333 2.83325C20.2091 2.83325 20.5694 2.98251 20.8351 3.24818C21.1007 3.51386 21.25 3.8742 21.25 4.24992C21.25 4.62564 21.1007 4.98598 20.8351 5.25165C20.5694 5.51733 20.2091 5.66659 19.8333 5.66659H14.1667C13.7909 5.66659 13.4306 5.51733 13.1649 5.25165C12.8993 4.98598 12.75 4.62564 12.75 4.24992C12.75 3.8742 12.8993 3.51386 13.1649 3.24818C13.4306 2.98251 13.7909 2.83325 14.1667 2.83325H19.8333Z" fill="black"/>
            </g>
            <defs>
            <clipPath id="clip0_1_268">
            <rect width="34" height="34" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>}
        </div>
        <div className='flex flex-row gap-2 flex-2'>
            <img className='w-6 h-6 rounded-xl' src={post.image} alt="img" />
            <p className=' font-medium mr-5'>{post.name}</p>
            <p className='text-sm text-gray-500'>{post.created_at}</p>
        </div>
        <hr/>
        <p className='flex flex-1'>{post.content}</p>
        <div className='flex items-center flex-2 gap-4'>
            {post.tags && post.tags.map(tag => <span className='bg-gray-200 text-sm px-1 rounded'>{tag}</span>)}
            <span className='ml-8'>read</span>
        </div>
      </div>
      <DelModal nav={true}/>
    </div>
  )
}

export default Post

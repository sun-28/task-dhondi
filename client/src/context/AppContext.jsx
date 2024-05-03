import axios from 'axios';
import {useState , createContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AppContext = createContext({});

const AppProvider = ({children}) => {
  const [userDetails, setuserDetails] = useState({})
  const [showSidebar, setshowSidebar] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [postDetails, setpostDetails] = useState({title:"",content:"",tags:[],id:-1,update:false});
  const [showDel, setshowDel] = useState(false)
  const [yourPosts, setyourPosts] = useState([])
  const [allPosts, setallPosts] = useState([])
  const [credentials, setcredentials] = useState({username:'',password:'',name:''})

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      try {
        const { data } = await axios.get('http://localhost:5000/user/details', {
          headers: {
            authToken: token
          }
        })
        setuserDetails(data.user)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const fetchallPosts = async () => {
    const {data} = await axios.get('http://localhost:5000/post/getAll');
    const posts = data.data.map(post => {
      let createdAtDate = post.created_at.split('T')[0];
      createdAtDate = new Date(createdAtDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      return {
        ...post,
        tags: JSON.parse(post.tags),
        created_at:createdAtDate
      };
    });
    setallPosts(posts);
  }

  const handlePublish = async () => {
      if(postDetails.update===true){
          const {data} = await axios.put(`http://localhost:5000/post/update/${postDetails.id}`,postDetails,{
              headers:{
                  authToken:localStorage.getItem('auth-token')
              }
          });
          if(data.success){
              toast.success('Post Updated Successfully');
              setpostDetails({ title: "", content: "", tags: [],update:false});
              setShowModal(false);
          }
          else{
              toast.error('Error Updating Post');
          }
      }
      else{
          const {data} = await axios.post('http://localhost:5000/post/create',postDetails,{
              headers:{
                  authToken:localStorage.getItem('auth-token')
              }
          });
          if(data.success){
              toast.success('Post Created Successfully');
              setpostDetails({ title: "", content: "", tags: [],update:false});
              setShowModal(false)
          }
          else{
              toast.error('Error Creating Post');
          }
      }
      fetchYourPosts();
      fetchallPosts();
  };

  

  const fetchYourPosts = async () => {
    const {data} = await axios.get('http://localhost:5000/post/getAllByUser',{
      headers:
      {
        authToken:localStorage.getItem('auth-token')
      }
    });
    const posts = data.data.map(post => {
      let createdAtDate = post.created_at.split('T')[0];
      createdAtDate = new Date(createdAtDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
      return {
        ...post,
        tags: JSON.parse(post.tags),
        created_at:createdAtDate
      };
    });
    setyourPosts(posts);
  }

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    fetchUserDetails()
  }, [])

  return (
    <AppContext.Provider value={{
      credentials,
      setcredentials,
      userDetails,
      setuserDetails,
      showSidebar,
      setshowSidebar,
      fetchallPosts,
      fetchYourPosts,
      showModal,
      setShowModal,
      postDetails,
      setpostDetails,
      showDel,
      setshowDel,
      handlePublish,
      allPosts,
      yourPosts,
      isSideBarOpen,
      setIsSideBarOpen
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

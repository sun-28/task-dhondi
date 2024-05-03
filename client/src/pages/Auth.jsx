import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import 'firebase/storage';
import { imageDb } from '../firebase/imageStore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Auth = () => {
    const navigate = useNavigate();
    const {credentials,setcredentials,setshowSidebar,fetchUserDetails} = useContext(AppContext);
    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            navigate('/')
        }
        else{
            setshowSidebar(false)
        }
    }, [])
    const [auth, setauth] = useState('login')
    const handleChange = (event) => {
        const { name, value } = event.target;
        setcredentials((prev) => ({ ...prev, [name]: value }));
    };
    const [img,setImg] =useState('')

    const handleRegister = async (url) => {
        const {data} = await axios.post('http://localhost:5000/user/register',{...credentials,image:url});
            if(data.success){
                setauth('login');
                toast.success("Registered Successfully! Please Login to continue")
            }
            else{
                toast.error(data.message)
            }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(auth=='login'){
            if(credentials.username=='' || credentials.password==''){
                return toast.error('Please fill all the fields')
            }
            const {data} = await axios.post('http://localhost:5000/user/login',credentials);
            if(data.success){
                localStorage.setItem('auth-token', data.token)
                toast.success("Logged In Successfully!")
                fetchUserDetails();
                navigate('/');
            }
            else{
            toast.error(data.message)
            }
        }
        else{
            if(credentials.username=='' || credentials.password=='' || credentials.name==''){
                return toast.error('Please fill all the fields')
            }
            if(img!==''){
                const imgRef =  ref(imageDb,`files/${v4()}`)
                uploadBytes(imgRef,img).then(value=>{
                    getDownloadURL(value.ref).then(url=>{
                        handleRegister(url);
                    })
                })
             }
             else{
                return toast.error('Please select an image')
             }
        }
    }
    return (
        <div className='absolute bg-body-bg left-0 top-0 w-screen h-screen'>
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className="w-80 rounded-2xl bg-gray-300">
                    <div className="flex flex-col gap-2 p-8">
                    <label className="flex cursor-pointer items-center justify-center gap-4 p-1 text-slate-400">
                        <div className="relative inline-block">
                        <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-white bg-white checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox" onClick={()=>{auth=='login'?setauth('signup'):setauth('login')}}/>
                        <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                        </div>
                    </label>
                    {auth === 'login'?
                    <>
                    <p className="text-center text-3xl mb-4 text-green">Login</p>
                    <input required name='username' value={credentials.username} onChange={handleChange} type='text' className=" placeholder:text-white bg-gray-400 w-full text-white rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Username"/>
                    <input required name='password' value={credentials.password} onChange={handleChange} type='password' className="bg-gray-400 placeholder:text-white text-white w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password"/>
                    <button onClick={handleSubmit} className="mt-4 inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Login</button>
                    </>
                    :
                    <>
                    <p className="text-center text-3xl text-green mb-4">Sign Up</p>
                    <input required name='name' value={credentials.name} onChange={handleChange} type='text' className="placeholder:text-white text-white bg-gray-400 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Name"/>
                    <input required name='username' value={credentials.username} onChange={handleChange} type='text' className="placeholder:text-white text-white bg-gray-400 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Username"/>
                    <input required name='password' value={credentials.password} onChange={handleChange}  type='password' className="placeholder:text-white bg-gray-400 text-white w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password"/>
                    <label className='text-center'> Choose Profile Picture</label>
                    <input className='ml-4' type="file"  accept="image/*" onChange={(e)=>setImg(e.target.files[0])} required />
                    <button  onClick={handleSubmit}  className="mt-4 inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Register</button>
                    </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
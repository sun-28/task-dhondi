import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Auth = () => {
    const navigate = useNavigate();
    const { userDetails,setuserDetails,setisLogged} = useContext(AppContext);
    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            setisLogged(true);
            navigate('/')
        }
    }, [])
    const [auth, setauth] = useState('login')
    const handleChange = (event) => {
        const { name, value } = event.target;
        setuserDetails((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(auth=='login'){
            const {data} = await axios.post('http://localhost:5000/user/login',userDetails);
            if(data.success){
            localStorage.setItem('auth-token', data.token)
            toast.success("Logged In Successfully!")
            setisLogged(true);
            navigate('/');
            }
            else{
            toast.error(data.message)
            }
        }
        else{
            console.log(userDetails)
            const {data} = await axios.post('http://localhost:5000/user/register',userDetails);
            if(data.success){
                setauth('login');
                toast.success("Registered Successfully! Please Login to continue")
            }
            else{
                toast.error(data.message)
            }
        }
    }
    return (
        <div className='absolute bg-body-bg left-0 top-0 w-screen h-screen'>
            <div className='w-screen h-screen flex justify-center items-center'>
                <div className="w-80 rounded-2xl bg-slate-900">
                    <div className="flex flex-col gap-2 p-8">
                    <label className="flex cursor-pointer items-center justify-center gap-4 p-1 text-slate-400">
                        <div className="relative inline-block">
                        <input className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gary-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2" type="checkbox" onClick={()=>{auth=='login'?setauth('signup'):setauth('login')}}/>
                        <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
                        </div>
                    </label>
                    {auth === 'login'?
                    <>
                    <p className="text-center text-3xl mb-4 text-green">Login</p>
                    <input name='username' value={userDetails.username} onChange={handleChange} type='text' className="bg-slate-900 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Username"/>
                    <input name='password' value={userDetails.password} onChange={handleChange} type='password' className="bg-slate-900 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password"/>
                    <button onClick={handleSubmit} className="mt-4 inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Login</button>
                    </>
                    :
                    <>
                    <p className="text-center text-3xl text-green mb-4">Sign Up</p>
                    <input name='name' value={userDetails.name} onChange={handleChange} type='text' className="bg-slate-900 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Name"/>
                    <input name='username' value={userDetails.username} onChange={handleChange} type='text' className="bg-slate-900 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Username"/>
                    <input name='password' value={userDetails.password} onChange={handleChange} className="bg-slate-900 w-full rounded-lg border border-green px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800" placeholder="Password"/>
                    <button onClick={handleSubmit} className="mt-4 inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95">Register</button>
                    </>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
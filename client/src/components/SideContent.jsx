import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link, useLocation } from 'react-router-dom';


const SideContent = () => {
    const location = useLocation();
    const {userDetails,setShowModal} = useContext(AppContext)
    return (
        <div className='w-full flex justify-center flex-col items-center'>
            <div className='flex justify-center flex-col items-center gap-2 mb-16' >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-black">
                    <img className="w-full h-full object-cover" src={userDetails.image} alt="img" />
                </div>
            <h2>{userDetails.name}</h2>
            <p>@{userDetails.username}</p>
            <div className='flex text-center gap-4'>
                <div>
                    <p>1K</p>
                    <p>Followers</p>
                </div>
                <div>
                    <p>200</p>
                    <p>Following</p>
                </div>
            </div>
            </div>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-5'>
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.8875 13.5C22.764 15.9435 21.7389 18.2619 20.0005 20.0003C18.1438 21.8569 15.6257 22.9 13.0001 22.9C10.3745 22.9 7.85635 21.8569 5.99974 20.0003C4.14313 18.1437 3.1001 15.6256 3.1001 13C3.1001 10.3743 4.14313 7.85623 5.99974 5.99962C7.73816 4.2612 10.0565 3.23607 12.5001 3.1126V13V13.5H13.0001H22.8875Z" stroke="black"/>
                        <path d="M16.1001 9.90001V3.59579C17.5671 4.08072 18.9037 4.90281 20.0005 5.99962C21.0973 7.09643 21.9194 8.43296 22.4043 9.90001H16.1001Z" stroke="black"/>
                    </svg>
                    <h3>Dashboard</h3>
                </div>
                <div onClick={()=> setShowModal(true)} className='flex gap-5 hover:cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.9232 3C18.9597 3 21 5.13153 21 8.30372V15.6963C21 18.8685 18.9597 21 15.9232 21H8.07684C5.04028 21 3 18.8685 3 15.6963V8.30372C3 5.13153 5.04028 3 8.07684 3H15.9232ZM15.9232 4.25581H8.07684C5.75609 4.25581 4.25581 5.844 4.25581 8.30372V15.6963C4.25581 18.156 5.75609 19.7442 8.07684 19.7442H15.9232C18.2447 19.7442 19.7442 18.156 19.7442 15.6963V8.30372C19.7442 5.844 18.2447 4.25581 15.9232 4.25581ZM12 8.29727C12.3466 8.29727 12.6279 8.57858 12.6279 8.92518V11.3637L15.0696 11.3639C15.4162 11.3639 15.6975 11.6452 15.6975 11.9918C15.6975 12.3384 15.4162 12.6197 15.0696 12.6197L12.6279 12.6195V15.0594C12.6279 15.406 12.3466 15.6873 12 15.6873C11.6534 15.6873 11.3721 15.406 11.3721 15.0594V12.6195L8.93037 12.6197C8.58293 12.6197 8.30246 12.3384 8.30246 11.9918C8.30246 11.6452 8.58293 11.3639 8.93037 11.3639L11.3721 11.3637V8.92518C11.3721 8.57858 11.6534 8.29727 12 8.29727Z" fill="black"/>
                    </svg>
                    <h3>Add A New Post</h3>
                </div>
                <Link to='/yourposts' className='flex gap-5'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.9088 2C19.0528 2 21.1648 4.153 21.1648 7.357V16.553C21.1648 19.785 19.1178 21.887 15.9498 21.907L8.25676 21.91C5.11276 21.91 2.99976 19.757 2.99976 16.553V7.357C2.99976 4.124 5.04676 2.023 8.21476 2.004L15.9078 2H15.9088ZM15.9088 3.5L8.21976 3.504C5.89176 3.518 4.49976 4.958 4.49976 7.357V16.553C4.49976 18.968 5.90476 20.41 8.25576 20.41L15.9448 20.407C18.2728 20.393 19.6648 18.951 19.6648 16.553V7.357C19.6648 4.942 18.2608 3.5 15.9088 3.5ZM15.7159 15.4737C16.1299 15.4737 16.4659 15.8097 16.4659 16.2237C16.4659 16.6377 16.1299 16.9737 15.7159 16.9737H8.49586C8.08186 16.9737 7.74586 16.6377 7.74586 16.2237C7.74586 15.8097 8.08186 15.4737 8.49586 15.4737H15.7159ZM15.7159 11.2872C16.1299 11.2872 16.4659 11.6232 16.4659 12.0372C16.4659 12.4512 16.1299 12.7872 15.7159 12.7872H8.49586C8.08186 12.7872 7.74586 12.4512 7.74586 12.0372C7.74586 11.6232 8.08186 11.2872 8.49586 11.2872H15.7159ZM11.2506 7.1104C11.6646 7.1104 12.0006 7.4464 12.0006 7.8604C12.0006 8.2744 11.6646 8.6104 11.2506 8.6104H8.49556C8.08156 8.6104 7.74556 8.2744 7.74556 7.8604C7.74556 7.4464 8.08156 7.1104 8.49556 7.1104H11.2506Z" fill={location.pathname=='/yourposts'?"#3399F0":'black'}/>
                    </svg>
                    <h3 className={location.pathname=='/yourposts'?" text-sky-500 font-medium":""} >Your Posts</h3>
                </Link>
                <Link to='/' className='flex gap-5'>
                    <svg  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.451 3.99976C20.683 3.99976 22.499 5.79776 22.499 8.00676L22.5 10.6008C22.5 10.7988 22.421 10.9908 22.28 11.1308C22.14 11.2718 21.949 11.3508 21.75 11.3508C20.963 11.3508 20.323 11.9788 20.323 12.7508C20.323 13.5228 20.963 14.1508 21.75 14.1508C22.164 14.1508 22.5 14.4868 22.5 14.9008V17.4928C22.5 19.7018 20.684 21.4998 18.452 21.4998H5.048C2.816 21.4998 1 19.7018 1 17.4928V14.9008C1 14.4868 1.336 14.1508 1.75 14.1508C2.537 14.1508 3.177 13.5228 3.177 12.7508C3.177 12.0008 2.563 11.4348 1.75 11.4348C1.551 11.4348 1.36 11.3558 1.22 11.2148C1.079 11.0748 1 10.8828 1 10.6848L1.001 8.00676C1.001 5.79776 2.817 3.99976 5.049 3.99976H18.451ZM18.451 5.49976H14.349L14.3496 7.42096C14.3496 7.83496 14.0136 8.17096 13.5996 8.17096C13.1856 8.17096 12.8496 7.83496 12.8496 7.42096L12.849 5.49976H5.049C3.644 5.49976 2.501 6.62476 2.501 8.00676L2.5 10.0248C3.767 10.3358 4.677 11.4218 4.677 12.7508C4.677 14.0928 3.751 15.2248 2.5 15.5538V17.4928C2.5 18.8748 3.643 19.9998 5.048 19.9998H12.849L12.8496 18.5113C12.8496 18.0963 13.1856 17.7613 13.5996 17.7613C14.0136 17.7613 14.3496 18.0963 14.3496 18.5113L14.349 19.9998H18.452C19.857 19.9998 21 18.8748 21 17.4928V15.5538C19.749 15.2248 18.823 14.0928 18.823 12.7508C18.823 11.4078 19.748 10.2768 21 9.94776L20.999 8.00676C20.999 6.62476 19.856 5.49976 18.451 5.49976ZM13.5996 9.50426C14.0136 9.50426 14.3496 9.84026 14.3496 10.2543V15.0753C14.3496 15.4893 14.0136 15.8253 13.5996 15.8253C13.1856 15.8253 12.8496 15.4893 12.8496 15.0753V10.2543C12.8496 9.84026 13.1856 9.50426 13.5996 9.50426Z" fill={location.pathname=='/'?"#3399F0":'black'} />
                    </svg>
                    <h3 className={location.pathname=='/'?"text-sky-500 font-medium":""}>Feed</h3>
                </Link>
                <div className='flex gap-5'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 8.06087 15.5786 9.07828 14.8284 9.82843C14.0783 10.5786 13.0609 11 12 11C10.9391 11 9.92172 10.5786 9.17157 9.82843C8.42143 9.07828 8 8.06087 8 7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V7ZM12 14C10.1435 14 8.36301 14.7375 7.05025 16.0503C5.7375 17.363 5 19.1435 5 21H19C19 19.1435 18.2625 17.363 16.9497 16.0503C15.637 14.7375 13.8565 14 12 14V14Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3>Profile</h3>
                </div>
                <div className='flex gap-5 mb-20'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.325 2.317C8.751 0.561 11.249 0.561 11.675 2.317C11.7389 2.5808 11.8642 2.82578 12.0407 3.032C12.2172 3.23822 12.4399 3.39985 12.6907 3.50375C12.9414 3.60764 13.2132 3.65085 13.4838 3.62987C13.7544 3.60889 14.0162 3.5243 14.248 3.383C15.791 2.443 17.558 4.209 16.618 5.753C16.4769 5.98466 16.3924 6.24634 16.3715 6.51677C16.3506 6.78721 16.3938 7.05877 16.4975 7.30938C16.6013 7.55999 16.7627 7.78258 16.9687 7.95905C17.1747 8.13553 17.4194 8.26091 17.683 8.325C19.439 8.751 19.439 11.249 17.683 11.675C17.4192 11.7389 17.1742 11.8642 16.968 12.0407C16.7618 12.2172 16.6001 12.4399 16.4963 12.6907C16.3924 12.9414 16.3491 13.2132 16.3701 13.4838C16.3911 13.7544 16.4757 14.0162 16.617 14.248C17.557 15.791 15.791 17.558 14.247 16.618C14.0153 16.4769 13.7537 16.3924 13.4832 16.3715C13.2128 16.3506 12.9412 16.3938 12.6906 16.4975C12.44 16.6013 12.2174 16.7627 12.0409 16.9687C11.8645 17.1747 11.7391 17.4194 11.675 17.683C11.249 19.439 8.751 19.439 8.325 17.683C8.26108 17.4192 8.13578 17.1742 7.95929 16.968C7.7828 16.7618 7.56011 16.6001 7.30935 16.4963C7.05859 16.3924 6.78683 16.3491 6.51621 16.3701C6.24559 16.3911 5.98375 16.4757 5.752 16.617C4.209 17.557 2.442 15.791 3.382 14.247C3.5231 14.0153 3.60755 13.7537 3.62848 13.4832C3.64942 13.2128 3.60624 12.9412 3.50247 12.6906C3.3987 12.44 3.23726 12.2174 3.03127 12.0409C2.82529 11.8645 2.58056 11.7391 2.317 11.675C0.561 11.249 0.561 8.751 2.317 8.325C2.5808 8.26108 2.82578 8.13578 3.032 7.95929C3.23822 7.7828 3.39985 7.56011 3.50375 7.30935C3.60764 7.05859 3.65085 6.78683 3.62987 6.51621C3.60889 6.24559 3.5243 5.98375 3.383 5.752C2.443 4.209 4.209 2.442 5.753 3.382C6.749 3.99 8.049 3.452 8.325 2.317Z" stroke="#444658" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10V10Z" stroke="#444658" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Settings</h3>
                </div>
                <Link onClick={()=>localStorage.clear()} to='/auth' className='flex gap-5'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 16V17C13 17.7956 12.6839 18.5587 12.1213 19.1213C11.5587 19.6839 10.7956 20 10 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17V7C3 6.20435 3.31607 5.44129 3.87868 4.87868C4.44129 4.31607 5.20435 4 6 4H10C10.7956 4 11.5587 4.31607 12.1213 4.87868C12.6839 5.44129 13 6.20435 13 7V8M17 16L21 12L17 16ZM21 12L17 8L21 12ZM21 12H7H21Z" stroke="#444658" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3>Logout</h3>
                </Link>
            </div>
        </div>
  )
}

export default SideContent

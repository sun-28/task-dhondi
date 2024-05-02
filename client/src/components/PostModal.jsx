import React, { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
const Modal = () => {
    
    const {showModal, setShowModal, postDetails, setpostDetails,handlePublish} = useContext(AppContext); 

    const [showTagInput, setShowTagInput] = useState(false);
    const [newTag, setNewTag] = useState('');


    const handleOnChange = (e) => {
        setpostDetails({ ...postDetails, [e.target.name]: e.target.value });
    };

    const handleAddTag = () => {
        if (newTag.trim() !== '') {
            setpostDetails({ ...postDetails, tags: [...postDetails.tags, newTag.trim()] });
            setNewTag('');
        }
        setShowTagInput(false);
    };

    

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen h-screen">
                        <div className="relative my-6 w-2/5 min-w-[300px] bg-white p-4 rounded-xl">
                            <div className="flex flex-col w-full h-full gap-4 ">
                                <input className="bg-gray-200 p-2 rounded" placeholder='Write Title' type="text" name='title' value={postDetails.title} onChange={handleOnChange} />
                                <div className="flex items-center flex-wrap">
                                        {postDetails && postDetails.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-purple-50 text-purple-600 font-normal rounded px-1 h-4 text-xs m-1">
                                                {tag}
                                            </span>
                                        ))}
                                        {showTagInput && (
                                            <input
                                                className="bg-purple-50 text-purple-600 rounded w-12 h-4 text-xs"
                                                placeholder="Add Tag"
                                                type="text"
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                onBlur={handleAddTag}
                                                autoFocus
                                            />
                                        )}
                                    {!showTagInput && (
                                        <svg onClick={() => setShowTagInput(true)} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.89669 0.677999C4.95927 0.449375 7.04079 0.449375 9.10336 0.677999C10.2454 0.805999 11.1667 1.70533 11.3007 2.85133C11.5454 4.94332 11.5454 7.05668 11.3007 9.14867C11.1667 10.2947 10.2454 11.194 9.10336 11.322C7.04079 11.5507 4.95926 11.5507 2.89669 11.322C1.75469 11.194 0.83336 10.2947 0.69936 9.14867C0.454706 7.05691 0.454706 4.94376 0.69936 2.852C0.767138 2.29525 1.02095 1.7777 1.41965 1.38323C1.81835 0.988762 2.33858 0.740495 2.89603 0.678666M6.00003 2.67133C6.13264 2.67133 6.25981 2.72401 6.35358 2.81778C6.44735 2.91155 6.50003 3.03872 6.50003 3.17133V5.5H8.82869C8.9613 5.5 9.08848 5.55268 9.18225 5.64645C9.27602 5.74021 9.32869 5.86739 9.32869 6C9.32869 6.13261 9.27602 6.25978 9.18225 6.35355C9.08848 6.44732 8.9613 6.5 8.82869 6.5H6.50003V8.82867C6.50003 8.96127 6.44735 9.08845 6.35358 9.18222C6.25981 9.27599 6.13264 9.32867 6.00003 9.32867C5.86742 9.32867 5.74024 9.27599 5.64647 9.18222C5.55271 9.08845 5.50003 8.96127 5.50003 8.82867V6.5H3.17136C3.03875 6.5 2.91157 6.44732 2.81781 6.35355C2.72404 6.25978 2.67136 6.13261 2.67136 6C2.67136 5.86739 2.72404 5.74021 2.81781 5.64645C2.91157 5.55268 3.03875 5.5 3.17136 5.5H5.50003V3.17133C5.50003 3.03872 5.55271 2.91155 5.64647 2.81778C5.74024 2.72401 5.86742 2.67133 6.00003 2.67133Z" fill="#ADB5CD"/>
                                        </svg>
                                    )}
                                </div>
                                <textarea className='bg-gray-200 p-2 rounded resize-none' placeholder='Start Typing ....' name='content' value={postDetails.content} onChange={handleOnChange} cols="30" rows="15"></textarea>
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => { setpostDetails({ title: "", content: "", tags: [] }); setShowModal(false) }} className='bg-white text-black border border-black rounded w-28 h-8 flex justify-center items-center gap-2'>cancel</button>
                                    <button onClick={() => { handlePublish();}} className='bg-black text-white border-none rounded w-28 h-8 flex justify-center items-center gap-2'>Publish</button>
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

export default Modal;

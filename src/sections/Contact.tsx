import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHurricane, faBrain } from '@fortawesome/free-solid-svg-icons';

function Contact() {
    const [emailCopied, setEmailCopied] = useState(false)
    const [timeoutId, setTimeoutId] = useState(0)
    const email = "ridhaaraar@gmail.com" 

    function CopyEmail() {
        setEmailCopied(true)
        clearTimeout(timeoutId)
        setTimeoutId(setTimeout(() => setEmailCopied(false), 1000))

        const textarea = document.createElement('textarea')
        textarea.value = email
        
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        return () => {
            clearTimeout(timeoutId)
        }
    }

    return (
        <div className="h-full w-screen border-b border-stone-200 p-16 pt-24 pb-64">
            <div className="h-full flex justify-center items-center">
                <img className="h-16 w-16 rounded-xl" src="star.svg"/>
            </div>
            <div className="w-full flex justify-center items-center flex-col">
                <h1 className="font-mono font-semibold text-3xl p-4">
                    Get in Touch
                </h1>
                <p className="font-mono w-7/12 text-center">
                    Here, you'll find various ways to reach out and connect with me. Whether you have questions, feedback, or simply want to chat, I'm just a click away!
                    Feel free to explore the options below and connect with me via email or social media. I'm always eager to hear from you and engage in meaningful conversations.
                    Thank you for visiting, and I look forward to connecting with you soon!
                </p>
                <div className="flex justify-around w-96 mt-12">
                    <a href="https://github.com/Pastoray" target="_blank">
                        <button className="h-12 w-28 text-white bg-gray-800 shadow-lg shadow-gray-800 rounded-md font-mono flex justify-center items-center hover:scale-105 active:scale-95 transition-all duration-300">
                            <FontAwesomeIcon icon={faGithub}/>
                            <p className='pl-2'>Github</p>
                        </button>
                    </a>
                    <a href="https://www.linkedin.com/in/ridhaaraar/" target="_blank">
                        <button className="h-12 w-28 text-white bg-blue-600 shadow-lg shadow-blue-600 rounded-md font-mono flex justify-center items-center hover:scale-105 active:scale-95 transition-all duration-300">
                            <FontAwesomeIcon icon={faHurricane} />
                            <p className='pl-2'>Linkedin</p>
                        </button>
                    </a>
                </div>
                <button className="h-12 w-28 text-white mt-8 bg-rose-600 shadow-lg shadow-rose-600 rounded-md font-mono flex justify-center items-center hover:scale-105 active:scale-95 transition-all duration-300"
                    onClick={CopyEmail}>
                    <FontAwesomeIcon icon={faBrain} />
                    <p className='pl-2'>Gmail</p>
                </button>
                <div className={`w-22 mt-6 ${emailCopied ? '' : 'opacity-0 scale-0'} transition-all duration-300`}>
                    <div className="bg-emerald-600 p-4 rounded-lg relative">
                        <p className='text-white font-mono'>Copied</p>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[-6px]">
                            <div className="w-6 h-6 bg-emerald-600 border-t-2 border-r-2 border-emerald-600 transform rotate-45"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
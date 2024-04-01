import { useState } from 'react';

function ProjectCard(props: { src: string, description: string, position: "left" | "right" }) {
    const [isImageClicked, setIsImageClicked] = useState(false);

    const handleClick = () => {
        setIsImageClicked(true);
    };

    const handleClose = () => {
        setIsImageClicked(false);
    };

    return (
        <div className="p-16">
            <div className='flex'>
                { props.position === "left" ? 
                    <>
                        <img
                            className="rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
                            src={props.src}
                            width={600} 
                            height={300}
                            onClick={handleClick}
                        />
                        <div className='w-6/12'>
                            <p className='pt-4 pb-4 pr-8 pl-8 text-center font-mono'>
                                {props.description}
                            </p>
                        </div>
                    </>
                :
                    <>
                        <div className='w-6/12'>
                            <p className='pt-4 pb-4 pr-8 pl-8 text-center font-mono'>
                                {props.description}
                            </p>
                        </div>
                        <img
                            className="rounded-xl cursor-pointer hover:scale-105 transition-all duration-300"
                            src={props.src}
                            width={600} 
                            height={300}
                            onClick={handleClick}
                        />
                    </>

                }
            </div>
            <div className={`fixed top-0 left-0 flex items-center justify-center ${isImageClicked ? 'scale-100 w-full h-full bg-stone-500' : 'scale-0 w-0 h-0'} bg-opacity-75 z-50`} onClick={handleClose}>
                    <img
                        className={`rounded-xl transition-all duration-300 ${isImageClicked ? 'scale-100 w-10/12 h-10/12' : 'scale-0 w-0 h-0'}`}
                        src={props.src} 
                        width={1200} 
                        height={600}
                        onClick={handleClick}
                    />
            </div>
        </div>
    )
}

export default ProjectCard;

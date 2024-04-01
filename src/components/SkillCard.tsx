import { useEffect, useState } from "react";

const bgClassMap: { [key: string]: string } = {
  "blue-600": "bg-blue-600",
  "blue-700": "bg-blue-700",
  "blue-800": "bg-blue-800",
  "cyan-500": "bg-cyan-500",
  "green-700": "bg-green-700",
  "amber-400": "bg-amber-400",
  "stone-400": "bg-stone-400",
  "orange-500": "bg-orange-500",
  "sky-600": "bg-sky-600"
};

const shadowClassMap: { [key: string]: string } = {
  "blue-600": "shadow-blue-600",
  "blue-700": "shadow-blue-700",
  "blue-800": "shadow-blue-800",
  "cyan-500": "shadow-cyan-500",
  "green-700": "shadow-green-700",
  "amber-400": "shadow-amber-400",
  "stone-400": "shadow-stone-400",
  "orange-500": "shadow-orange-500",
  "sky-600": "shadow-sky-600"
};

function SkillCard(props: { skill: string, description: string, color: string }) {
    const [isHovered, setIsHovered] = useState(false)
    const [description, setDescription] = useState("")
    const [index, setIndex] = useState(0)

    let intervalId: number
    
    useEffect(() => {
        function write() {
            intervalId = setInterval(function() {
                setDescription(prev_desc => prev_desc + props.description[index])
                setIndex(prev_idx => prev_idx + 1)
                if (!isHovered || index === props.description.length - 1) {
                    clearInterval(intervalId)
                }
            }, 50)
        }
        if (isHovered) {
            write()
        } else {
            setDescription("")
            setIndex(0)
        }
        return () => {
            clearInterval(intervalId)
        }
    }, [isHovered, index])

    useEffect(() => {
        if (index === props.description.length) {
            clearInterval(intervalId);
        }
    }, [index]);

    return (
        <div className={`h-16 w-64 p-4 text-white flex items-center flex-col rounded-md m-8 shadow-xl ${shadowClassMap[props.color]} ${bgClassMap[props.color]}
                        hover:scale-105 hover:h-64 transition-all duration-300 ease-in-out select-none`}
                        onMouseOver={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
            <h1 className="h-8 font-mono font-semibold text-2xl p-4 flex justify-center items-center">
                {props.skill}
            </h1>
            { isHovered ? 
                <p className="text-center p-4 font-mono text-sm">
                    {description}
                </p>
            : 
                null
            }
        </div>
    )
}

export default SkillCard;
import ProjectCard from "../components/ProjectCard";

function Projects() {
    return (
        <div className="h-full w-screen border-b border-stone-200 p-16 pt-24">
            <div className="h-full flex justify-center items-center">
                <img className="h-16 w-16 rounded-xl" src="diploma.svg"/>
            </div>
            <div className="w-full flex justify-center items-center flex-col">
                <h1 className="font-mono font-semibold text-3xl p-4">
                    Exploring My Work
                </h1>
                <p className="font-mono w-7/12 text-center">
                    Now i'll be showcasing a selection of my coding projects. These projects are a reflection of my skills, creativity, and dedication to problem-solving. From web development to algorithmic challenges, each project represents a unique journey in my coding endeavors. Let's dive in and explore the exciting world of my programming accomplishments together
                </p>
            </div>
            <div>
                <div className="h-32 flex justify-center items-center">
                    <hr className="border border-indigo-800 w-full"/>
                    <h1 className=" h-auto w-96 text-center font-mono font-semibold text-4xl text-indigo-800 [text-shadow:_0px_0px_5px_rgb(76_81_191_/_100%)] select-none">PORDLY</h1>
                    <hr className="border border-indigo-800 w-full"/>
                </div>
                <ProjectCard src="pordly1.PNG" description="Introducing Pordly, a visionary project showcasing an immersive gaming experience! The homepage serves as the epicenter of adventure, featuring a sleek layout designed for seamless navigation. On the right, a dynamic calendar keeps you organized, while quests and achievements adorn the left, highlighting your progress and accomplishments. Engage in daily quests, delve into captivating storylines, and challenge yourself with duel achievements. Explore the shop for exclusive items to enhance your journey. Your personalized top bar displays essential information, ensuring a user-friendly experience. Dive into the world of Pordly and witness innovation in gaming unfold before your eyes." position="left"/>
                <ProjectCard src="pordly2.PNG" description="Prepare to immerse yourself in the heart of the action with Pordly's gameplay page. As you enter the virtual arena, a paragraph awaits, with words highlighted in vibrant green representing correct inputs. However, beware the red-marked words, as errors may halt your progress. Keep an eye out for the golden word, granting you a precious +5 seconds of time. As the clock ticks away, monitor your speed with the WPM counter and strive for accuracy. Greet the familiar navbar, a window into your progress and resources, showcasing your level, username, title, streak, gems, and lives, guiding you through your gaming journey. At the bottom lies the gateway to victory — the input field where your mastery of words will be put to the test. Are you ready to claim victory and ascend to greatness?" position="right"/>
                <ProjectCard src="pordly3.PNG" description="Embark on a journey to greatness with our leaderboard feature, where your essential stats are showcased atop the familiar navbar. Engage in thrilling competition across three categories: streak, gems, and experience. Aim high as you strive to secure a coveted spot among the top ten players. Whether you're chasing the longest streak, the most gems accumulated, or the highest level of experience, the leaderboard is your stage to shine. Join the ranks of the elite and prove your prowess in the ultimate test of skill and strategy." position="left"/>
                <ProjectCard src="pordly4.PNG" description="Enter the adrenaline-fueled world of duels, where the familiar navbar accompanies you, displaying your key stats. As you await opponents in the duel details page, a dynamic loading animation builds anticipation. In the heat of battle, stakes are high - winners claim 50 gems while losers forfeit the same amount. But beware the influence of boosters, as they can amplify gains or losses, turning the tide of fortune. Will you emerge victorious, or will your opponent prove too formidable? The duel arena awaits your challenge." position="right"/>
                <div className="h-32 flex justify-center items-center">
                    <hr className="border border-emerald-500 w-full"/>
                    <h1 className=" h-auto w-96 text-center font-mono font-semibold text-4xl text-emerald-500 [text-shadow:_0px_0px_5px_rgb(34_197_94_/_100%)] select-none">VISIFY</h1>
                    <hr className="border border-emerald-500 w-full"/>
                </div>
                <ProjectCard src="visify1.PNG" description="Visify is a visualization tool adept at rendering trees, linked lists, and graphs. Its interface allows inputting array representations for seamless visualization, offering clarity and insight. With user-friendly design, Visify simplifies understanding complex data structures, empowering users to explore and analyze data effortlessly. Extending beyond trees and linked lists, Visify accommodates graphs, enhancing utility for diverse applications. Whether visualizing hierarchical data or intricate graph networks, Visify facilitates exploration and comprehension. Ideal for developers, educators, and researchers, Visify is indispensable for visualizing diverse data structures effectively." position="left"/>
                <ProjectCard src="visify2.PNG" description="Visify's site design embodies clarity and precision, especially in tree visualization. Its intuitive controls and clear feedback ensure seamless navigation through dynamic content. Each node and connection is rendered meticulously, maintaining precise hierarchical representation. Despite its dynamic nature, the site remains user-friendly and responsive, adapting seamlessly to user interactions. Whether expanding branches or collapsing nodes, Visify's design prioritizes clarity and readability. This precision enhances the user experience, making complex data structures easily comprehensible. Visify's commitment to dynamic yet precise design sets a high standard for usability in data visualization tools." position="right"/>
                <ProjectCard src="visify3.PNG" description="Visify's dynamic design ensures clarity and precision in visualizing complex graphs. Despite potential intricacies, the interface remains intuitive, facilitating effortless navigation. Nodes and edges are meticulously rendered, maintaining precise representation throughout. As graph complexity increases, Visify adeptly maintains readability and coherence. This commitment to clarity makes Visify invaluable for exploring intricate networks. Its user-friendly and responsive interface enhances the overall visualization experience. Visify sets a high standard for dynamic site design, ensuring clear visualization despite the graph's complexity." position="left"/>
            </div>
        </div>
    )
}

export default Projects;
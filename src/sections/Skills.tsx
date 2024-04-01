import SkillCard from "../components/SkillCard";

function Skills() {
    return (
        <div className="h-full w-screen border-b border-stone-200 p-16 pt-24">
            <div>
                <div className="h-full flex justify-center items-center">
                    <img className="h-16 w-16 rounded-xl" src="rocket.svg"/>
                </div>
                <div className="w-full flex justify-center items-center flex-col">
                    <h1 className="font-mono font-semibold text-3xl p-4">
                        My Expertise
                    </h1>
                    <div className="h-full w-full flex justify-center items-center flex-col">
                        <p className="font-mono w-7/12 text-center">
                            I excel in various software engineering technologies, These proficiencies allow me to create and maintain code for diverse applications, contributing to the dynamic field of software development, these technologies include
                        </p>
                        <div className="h-full w-full flex justify-around flex-wrap">
                            <SkillCard skill="Javascript" description="Proficient in JavaScript, adept at crafting interactive and dynamic web experiences. Experienced in both frontend and backend development" color={"amber-400"}/>
                            <SkillCard skill="Typescript" description="Skilled in TypeScript, proficient in building robust and type-safe applications. Experienced in leveraging TypeScript's static typing to catch errors early and improve code quality" color={"blue-700"}/>
                            <SkillCard skill="Tailwind" description="New to Tailwind CSS, exploring its utility-first approach for frontend development. Excited to leverage its extensive utility classes for rapid prototyping and streamlined styling" color={"cyan-500"}/>
                            <SkillCard skill="ReactJs" description="Experienced in React, proficient in building dynamic and interactive user interfaces. Skilled in utilizing React's component-based architecture, state management, and lifecycle methods" color={"blue-600"}/>
                            <SkillCard skill="Python" description="With a year of Python under my belt, I've honed my skills to a high level, leveraging its versatility to solve complex problems efficiently" color={"blue-600"}/>
                            <SkillCard skill="Flask" description="Experienced in Flask, proficient in developing lightweight and scalable web applications. Skilled in routing, view functions, and integrating with databases and more.." color={"sky-600"}/>
                            <SkillCard skill="ExpressJs" description="Experienced in Express.js, proficient in building robust web applications. Skilled in routing, middleware, and handling HTTP requests" color={"amber-400"}/>
                            <SkillCard skill="NodeJs" description="Seasoned in Node.js, adept in building scalable backend systems. Experienced in creating RESTful APIs and real-time applications" color={"green-700"}/>
                            <SkillCard skill="C++" description="Experienced in C++, proficient in developing high-performance and efficient applications. Skilled in object-oriented programming, memory management, and algorithm optimization" color={"blue-800"}/>
                            <SkillCard skill="SQL" description="Experienced in SQL (MySQL and SQLite), proficient in database design and management. Skilled in writing complex queries, optimizing database performance, and ensuring data integrity" color={"stone-400"}/>
                            <SkillCard skill="Git" description="Proficient in Git, adept at version control and collaboration workflows. Experienced in using Git for code management, branching, merging, and resolving conflicts" color={"orange-500"}/>
                            <SkillCard skill="Docker" description="Experienced in Docker, proficient in containerization and orchestration of applications. Skilled in creating Docker images, defining Dockerfiles, and managing containers" color={"blue-700"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Skills;
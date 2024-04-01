

function About() {
    return (
        <div className="h-full w-screen border-b border-stone-200 p-16 pt-24">
            <div className="h-full flex justify-center items-center">
                <img className="h-16 w-16 rounded-xl" src="moon.svg"/>
            </div>
            <div className="w-full flex justify-center items-center flex-col">
                <h1 className="font-mono font-semibold text-3xl p-4">
                    Hey, This is Ridha Araar !
                </h1>
                <p className="font-mono w-7/12 text-center">
                    I am an ambitious 18-year-old self-taught Algerian software engineer with an insatiable curiosity for coding. Driven by a passion for innovation and a relentless pursuit of knowledge, I immerse myself in the world of software development, constantly seeking to expand my skills and explore new technologies. With a strong dedication to learning, I thrive on challenges and approach each project with enthusiasm and determination. Collaborating with others to create impactful solutions is where I find true fulfillment. As I embark on my journey, I am eager to apply my expertise and contribute to meaningful projects that make a difference.
                </p>
            </div>
        </div>
    )
}

export default About;
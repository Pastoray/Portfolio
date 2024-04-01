import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    function scrollToSection(section: string) {
        const sec = document.getElementById(section);
        if (sec) {
            sec.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <div className="fixed top-0 z-40 flex h-16 w-screen justify-between items-center border-b border-stone-200 shadow-lg shadow-stone-200 bg-white">
            <div className="p-4">
                <div className='h-12 w-16 flex justify-around items-center text-3xl font-mono text-stone-700 font-semibold'>
                    <FontAwesomeIcon icon={faMoon}/>
                </div>
            </div>
            <div className="w-6/12 flex justify-around items-center font-mono font-semibold text-stone-700">
                <button className="h-8 w-16 hover:text-green-600 transition-all duration-300" onClick={() => scrollToSection('about')}>
                    About
                </button>
                <button className="h-8 w-16 hover:text-rose-500 transition-all duration-300" onClick={() => scrollToSection('skills')}>
                    Skills
                </button>
                <button className="h-8 w-16 hover:text-purple-500 transition-all duration-300" onClick={() => scrollToSection('projects')}>
                    Projects
                </button>
                <button className="h-8 w-16 hover:text-sky-500 transition-all duration-300" onClick={() => scrollToSection('contact')}>
                    Contact
                </button>
            </div>
        </div>
        
    )
}

export default Navbar;
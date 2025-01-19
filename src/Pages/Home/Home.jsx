// ================== All Importrs
"use client";
import React, { useState } from 'react'
import { SparklesCore }  from '../../Components/ui/sparkles'

const Home = () => {

    // Trinary Operator
    const [darkMode, setDarkMode] = useState(false)

    // for dark mode
    const handleDarkmode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <>
            <section className={darkMode ? "dark" : ""}>

                <div className='w-full h-screen relative bg-[#000] dark:bg-white pt-32 transition-all duration-700'>
                    <div className="absolute w-full h-full top-0 mix-blend-difference">
                        <SparklesCore
                            id="tsparticlesfullpage"
                            background="transparent"
                            minSize={0.6}
                            maxSize={2}
                            particleDensity={100}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                            speed={1}
                        />
                    </div>

                    {/* ============= for dark/light mode ============= */}
                    <button onClick={() => { handleDarkmode() }} className='px-4 py-2 text-black bg-white dark:bg-black dark:text-white ml-[90%] rounded-xl hover:scale-125 duration-200 will-change-transform'>
                        {
                            darkMode ? "Dark Mode" : "Light Mode"
                        }
                    </button>
                    <h1 className='text-center mt-10 text-7xl text-white dark:text-black'>Welcome to Mubin's World</h1>
                </div>
            </section>
        </>
    )
}

export default Home
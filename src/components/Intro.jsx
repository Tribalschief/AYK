"use client"
// import React from 'react'
// import Image from "next/image";
// import Button from "./Button";
import pp from "@/assets/pp.png";


// const Intro = () => {
//   return (
// <section>
//     <div className="min-h-screen bg-gradient-to-t from-gray-800 via-black to-slate-800 text-white flex flex-col items-center justify-center p-8 relative">
//       <div className='shrink'>
//       <div className="flex flex-col items-center w-full">
//         <div className="max-w-4xl w-full text-center space-y-16 animate-fade-in-up my-6">
//           {/* Image Section */}
//           <div className="flex justify-center">
//             <div className="relative w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:border-white/30">
//               <Image src={pp} alt="Ahmed Yar Khan" layout="fill" objectFit="cover" className="rounded-full filter grayscale hover:grayscale-0 transition-all duration-300" />
//             </div>
//           </div>

//           {/* Introduction Section */}
//           <div className="flex flex-col">
//             <div className="space-y-8 ">
//               <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
//                 Hi, I`m {" "}
//                 <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent ml-2">
//                   Ahmed Yar Khan
//                 </span>
//               </h1>
//               <p className="text-xl text-gray-400 font-light tracking-wide">
//                 Passionate Web Developer | AI Enthusiast | Cloud Technologies Explorer
//               </p>
//             </div>

//             {/* Short Note Section */}
//             <div className="space-y-10 text-gray-500">
//               <p className="text-xl leading-10">
//                 I have a strong passion for web development, artificial intelligence, cloud technologies, and UI/UX design,
//                 always striving to merge creativity and functionality.
//               </p>
//               <p className="text-xl sm:hidden ">
//                 With a background in <strong className="font-semibold text-white">Applied Physics</strong>, I bring a unique
//                 analytical perspective to problem-solving.
//               </p>
//               <p className="text-xl">
//                 My journey in tech is fueled by curiosity, innovation, and the drive to create meaningful digital
//                 experiences.
//               </p>
//             </div>

//             {/* CTA Button */}
//             {/* CTA Button - Centered with adjusted positioning */}
//             <div className="w-full flex justify-center pb-10">
//     <Button props="Contact Me" mailto="mailto:mahmedyk789@gmail.com" />
//   </div>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
    
//     </section>
//   )
// }

// export default Intro

import Image from 'next/image';
import Button from './Button'; // Assuming you have a Button component
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";


const Home = () => {
  const [container, setContainer] = useState(null);
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [buttons, setButtons] = useState(null);

  useEffect(() => {
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse",
    })
    if (!container || !image || !text || !buttons) return;

    // Set initial state
    gsap.set([image, text, buttons], { autoAlpha: 0 });

    // Create GSAP timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      container,
      { backgroundColor: "rgba(17, 24, 39, 0)" },
      { backgroundColor: "rgba(17, 24, 39, 1)", duration: 1 }
    )
      .fromTo(
        image,
        { y: 50 },
        { y: 0, autoAlpha: 1, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        text.children,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.2, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        buttons.children,
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.6 },
        "-=0.6"
      );
  
  }, [container , image , text, buttons ]);
  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex items-center justify-center  sm:p-8 overflow-hidden"
    >
      <div className="max-w-4xl w-full">
        <div className="flex flex-col items-center space-y-16">
          {/* Image Section */}
          <div
           
            className="relative w-48 h-48 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:border-white/40"
          >
            <Image
              src={pp || "/placeholder.svg"}
              alt="Ahmed Yar Khan"
              layout="fill"
              objectFit="cover"
              className="rounded-full hover:grayscale-0 transition-all duration-300 image"
            />
          </div>

          {/* Text Content */}
          <div  className="text-center flex flex-col items-center space-y-8">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              Hi, I`m{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Ahmed Yar Khan
              </span>
            </h1>
            <p className="text-2xl text-gray-300 font-light tracking-wide">
              Passionate Web Developer | AI Enthusiast | Cloud Technologies Explorer
            </p>
            <div className="space-y-6 text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto px-4 sm:px-0">
              <p className="leading-relaxed">
                I have a strong passion for web development, artificial intelligence, cloud technologies, and UI/UX
                design, always striving to merge creativity and functionality.
              </p>
              <p className="leading-relaxed">
                With a background in <strong className="font-semibold text-white">Applied Physics</strong>, I bring a
                unique analytical perspective to problem-solving.
              </p>
              <p className="leading-relaxed">
                My journey in tech is fueled by curiosity, innovation, and the drive to create meaningful digital
                experiences.
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div
            
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 w-full px-4"
          >
            <Button label="Services" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" />
            <Button label="Portfolio" className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto" />
            <Button
              label="Contact Me"
              mailto="mailto:mahmedyk789@gmail.com"
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
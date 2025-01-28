'use client'
import Link from "next/link";
import { useState } from "react";
import logo from "../assets/ayk.png"
import Image from "next/image";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mailto = "mailto:your-email@example.com";

    return (
        <header className="navbar">
            <Image src={logo} alt="ayk" widht={40} height={40}/>
            <nav>
                <ul className={`menu ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/Services">Services</Link></li>
                    <li><Link href="/Portfolio">Portfolio</Link></li>
                    <li>
                        <button
                            className="btn"
                            onClick={(e) => {
                                if (mailto) {
                                    window.location.href = mailto;
                                }
                                e.preventDefault();
                            }}
                        >
                            CONTACT
                        </button>
                    </li>
                </ul>
            </nav>
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>
            </div>
            <span></span>
        </header>
    );
};

export default Header;
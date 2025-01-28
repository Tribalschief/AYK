import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black via-blue-500 to-blue-950 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Ahmed</h2>
            <p className="text-lg">Web Developer & Designer</p>
          </div>
          <div className="flex space-x-6">
            {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-300"
              >
                <span className="sr-only">{social}</span>
                <i className={`fab fa-${social.toLowerCase()} fa-2x`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
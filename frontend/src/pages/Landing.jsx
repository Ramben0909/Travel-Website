import React from "react";
import img3 from "../assets/img3.png";
// Import your background image here
// import bgImage from "../assets/background.jpg";

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // Replace 'your-background-image.jpg' with your actual image path
          backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
          // Or use your imported image like this:
          // backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Dark overlay to make text readable */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
        
        {/* Optional: Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {/* Geometric shapes */}
        <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 transform rotate-45 opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 transform rotate-12 opacity-25 animate-pulse delay-700"></div>
        
        {/* Floating particles */}
        <div className="absolute top-16 left-1/2 w-2 h-2 bg-white rounded-full opacity-60 animate-ping delay-300"></div>
        <div className="absolute top-32 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-70 animate-ping delay-1000"></div>
        <div className="absolute bottom-24 left-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-50 animate-ping delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center py-10 px-4">
        <div className="flex flex-col md:flex-row items-center bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden max-w-6xl w-full transform hover:scale-105 transition-all duration-500">
          
          {/* Left side: Text */}
          <div className="flex-1 px-8 py-12 md:px-12 md:py-16 text-center md:text-left">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-black mb-4 leading-none">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 animate-pulse drop-shadow-2xl">
                  Travel Nest
                </span>
              </h1>
              <div className="relative">
                <span className="block text-white text-xl md:text-3xl font-bold mb-6 drop-shadow-2xl">
                  Your Launchpad to 
                  <span className="inline-block ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 animate-bounce">
                    Limitless Horizons
                  </span>
                </span>
                {/* Glowing underline effect */}
                <div className="absolute bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-100 max-w-xl mb-8 leading-relaxed drop-shadow-lg">
              Embark on extraordinary adventures where every destination becomes a 
              <span className="text-cyan-300 font-bold animate-pulse"> dream reality</span>, 
              and every journey transforms into an unforgettable story waiting to be told.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/25 transform hover:scale-110 transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Join</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
              
              
            </div>
            
         
          </div>
          
          {/* Right side: Image */}
          <div className="flex-1 relative flex items-center justify-center p-8 md:p-12">
            {/* Glowing background for image */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl animate-pulse"></div>
            
            {/* Image container */}
            <div className="relative group">
              <img
                src={img3}
                alt="Traveler"
                className="w-80 md:w-96 h-auto rounded-2xl shadow-2xl object-cover transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-4 border-white/30"
              />
              
              {/* Image overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce delay-200"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        
       
      </div>
      
      {/* Custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Landing;
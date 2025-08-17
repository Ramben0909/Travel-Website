import { Mail, Linkedin, Github } from 'lucide-react';
import Navbar from '../component/Navbar';

// 👉 Import local images
import samanyuImg from '../assets/samanyu.jpg';
import biplabImg from '../assets/biplab.jpeg';
import ritamImg from '../assets/ritam.jpeg';

const About = () => {
  const teamMembers = [
    {
      name: "Samanyu Deghuria",
      role: "Full Stack Developer",
      description: "Passionate about creating scalable web applications and solving complex problems. Specialized in React, Node.js, and cloud architecture.",
      image: samanyuImg,
      linkedin: "https://www.linkedin.com/in/samanyu-deghuria-864607206/",
      github: "https://github.com/Samanyu-coder",
      email: "rikdeghuria@gmail.com"
    },
    {
      name: "Marcus Rodriguez",
      role: "UI/UX Designer",
      description: "Creative designer with 5+ years of experience in crafting beautiful and intuitive user interfaces. Focused on accessibility and user-centered design.",
      image: biplabImg,
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      github: "https://github.com/marcusrodriguez",
      email: "marcus.rodriguez@example.com"
    },
    {
      name: "Alex Patel",
      role: "Backend Engineer",
      description: "System architecture specialist with expertise in building high-performance APIs and microservices. Strong background in Python and Go.",
      image: ritamImg,
      linkedin: "https://linkedin.com/in/alexpatel",
      github: "https://github.com/alexpatel",
      email: "alex.patel@example.com"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-block p-2 bg-blue-100 rounded-full mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Get to know the talented individuals behind the magic. We're passionate about creating exceptional travel experiences.
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="p-8 text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-36 h-36 rounded-full mx-auto object-cover border-4 border-white shadow-xl ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h2>
                  <p className="text-blue-600 font-semibold mb-4 text-sm uppercase tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                    {member.description}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon p-3 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon p-3 rounded-full bg-gray-50 text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="group/icon p-3 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <div className="inline-block p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                  </div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    About Us
                  </h2>
                </div>

                <div className="space-y-10">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Welcome to our travel website, your ultimate companion for discovering and organizing amazing travel experiences. 
                      We believe that every journey should be memorable, and we're here to make that happen with innovative tools and inspiring content.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full mr-3"></div>
                      Our Mission
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Our mission is to make travel planning effortless and enjoyable by providing cutting-edge tools that help you discover, 
                      plan, and share your adventures with the world. We strive to connect travelers with amazing destinations and experiences.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full mr-3"></div>
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { title: "Place Search", desc: "Powered by Geoapify for accurate location discovery" },
                        { title: "Wishlist", desc: "Save your favorite destinations for future adventures" },
                        { title: "Image Upload", desc: "Share your travel experiences with stunning photos" },
                        { title: "Interactive UI", desc: "An intuitive and user-friendly interface for seamless navigation" }
                      ].map((feature, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                          <p className="text-gray-600 text-sm">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full mr-3"></div>
                      Why Choose Us?
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      We are passionate about helping travelers explore the world with confidence and excitement. Our platform combines 
                      cutting-edge technology with genuine care for the travel community, ensuring every journey is extraordinary.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-2 h-8 bg-gradient-to-b from-orange-600 to-red-600 rounded-full mr-3"></div>
                      Future Plans
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      As we grow, we aim to add more features such as itinerary creation, travel budgeting tools, community reviews, 
                      and AI-powered travel recommendations to make your travel planning even more seamless and personalized.
                    </p>
                  </div>

                  <div className="text-center bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
                    <p className="text-gray-700 text-lg mb-4">
                      We would love to hear your feedback and suggestions!
                    </p>
                    <a 
                      href="mailto:contact@travelsite.com" 
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      contact@travelsite.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
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
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-white mb-4">Meet Our Team</h1>
            <p className="text-xl text-gray-400">Get to know the people behind the magic</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="p-8 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-700 shadow-lg"
                  />
                  <h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
                  <p className="text-lg text-gray-400 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300 mb-6 text-sm leading-relaxed">{member.description}</p>

                  <div className="flex justify-center space-x-6">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-600 text-white hover:bg-gray-700 transition-colors shadow-lg"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-6 h-6" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="max-w-4xl mx-auto p-6 space-y-6 mt-16">
            <h2 className="text-3xl font-bold text-white"> About Us</h2>
            <p className="text-white text-lg">
              Welcome to our travel website, your ultimate companion for discovering and organizing amazing travel experiences...
            </p>

            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-white text-lg">
              Our mission is to make travel planning effortless and enjoyable...
            </p>

            <h2 className="text-3xl font-bold text-white">Key Features</h2>
            <ul className="text-white text-lg list-disc pl-6 space-y-2">
              <li><strong>Place Search:</strong> Powered by Geoapify...</li>
              <li><strong>Wishlist:</strong> Save your favorite destinations...</li>
              <li><strong>Image Upload:</strong> Share your travel experiences...</li>
              <li><strong>Interactive UI:</strong> An intuitive and user-friendly interface...</li>
            </ul>

            <h2 className="text-3xl font-bold text-white">Why Choose Us?</h2>
            <p className="text-white text-lg">
              We are passionate about helping travelers explore the world...
            </p>

            <h2 className="text-3xl font-bold text-white">Future Plans</h2>
            <p className="text-white text-lg">
              As we grow, we aim to add more features such as itinerary creation...
            </p>

            <h2 className="text-3xl font-bold text-white">Contact Us</h2>
            <p className="text-white text-lg">
              We'd love to hear your feedback! Email us at <a href="mailto:contact@travelsite.com" className="text-blue-400 underline">contact@travelsite.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

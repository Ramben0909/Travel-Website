import Navbar from '../component/Navbar';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center">About Us</h1>
        <p className="text-lg leading-7 text-gray-700">
          Welcome to our travel website, your ultimate companion for discovering and organizing amazing travel experiences. Our platform is designed to simplify trip planning, provide inspiration, and help you create unforgettable memories.
        </p>

        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-gray-700">
          Our mission is to make travel planning effortless and enjoyable. We aim to connect people with beautiful destinations, curated recommendations, and tools that help them turn their dream vacations into reality. Whether you're searching for serene beaches, adventurous trails, or vibrant cities, we've got you covered.
        </p>

        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Place Search:</strong> Powered by Geoapify, you can search for destinations across the globe with detailed location data like latitude and longitude.
          </li>
          <li>
            <strong>Wishlist:</strong> Save your favorite destinations to a personalized wishlist for easy access while planning your trips.
          </li>
          <li>
            <strong>Image Upload:</strong> Share your travel experiences by uploading photos to showcase the beauty of places you've explored.
          </li>
          <li>
            <strong>Interactive UI:</strong> An intuitive and user-friendly interface with responsive design, making it easy to navigate on any device.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold">Why Choose Us?</h2>
        <p className="text-gray-700">
          We are passionate about helping travelers explore the world. Our platform integrates advanced features and APIs to deliver a seamless experience. We focus on personalization, convenience, and inspiring our users to explore the unknown.
        </p>

        <h2 className="text-2xl font-semibold">Future Plans</h2>
        <p className="text-gray-700">
          As we grow, we aim to add more features such as itinerary creation, travel blog integrations, and real-time weather data for destinations. We're committed to continuously improving our platform to serve the diverse needs of travelers.
        </p>

        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-gray-700">
          We'd love to hear your feedback and suggestions! Feel free to reach out to us at <a href="mailto:contact@travelsite.com" className="text-blue-600 hover:underline">contact@travelsite.com</a>.
        </p>
      </div>
    </>
  );
};

export default AboutUs;

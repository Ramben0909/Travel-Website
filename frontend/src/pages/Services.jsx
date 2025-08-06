import Navbar from '../component/Navbar';

function Services() {
    return (
        <>
            <Navbar />
            <section className="py-6 text-blue-900 sm:py-16 lg:py-20 bg-gray-50">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-screen-lg lg:px-8">
                    <div className="flex flex-col lg:flex-row">
                        {/* Highlight Block */}
                        <div className="relative mx-auto mb-10 flex h-96 overflow-hidden rounded-xl bg-blue-700 shadow-md sm:mt-20 lg:h-auto lg:max-w-md lg:pt-20">
                            <img
                                className="absolute top-0 h-full w-full object-cover opacity-10"
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                alt="Travel"
                            />
                            <div className="relative mt-auto w-full p-6 lg:px-7 lg:py-8">
                                <blockquote>
                                    <p className="text-3xl font-bold text-white sm:text-4xl">
                                        Real-time travel suggestions tailored for your location and interests.
                                    </p>
                                </blockquote>
                                <div className="mt-8 flex items-center">
                                    <img
                                        className="h-11 w-11 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                                        alt="Traveler"
                                    />
                                    <div className="ml-4 text-white">
                                        <p className="text-base font-bold">Alex Carter</p>
                                        <p className="mt-0.5 text-sm text-blue-100">Travel Blogger</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services Overview */}
                        <div className="relative mx-auto grid max-w-lg grid-cols-1 gap-y-10 lg:pl-20">
                            {/* Feature: Live Location + Destinations */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-blue-700">Nearby Destinations</h3>
                                <p className="text-gray-700">
                                    Get destination recommendations based on your current location. Whether you're in a city or off the grid, we’ll show you the best places within your range.
                                </p>
                            </div>

                            {/* Feature: Shortest Route + Hotels */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-blue-700">Shortest Route & Nearby Hotels</h3>
                                <p className="text-gray-700">
                                    Click on a destination to view the most efficient route. We also provide curated hotel suggestions near your chosen destination.
                                </p>
                            </div>

                            {/* Feature: Travel Essentials */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-blue-700">Destination-specific Travel Essentials</h3>
                                <p className="text-gray-700">
                                    Know what to pack! Get a smart checklist of travel items tailored to your selected destination's climate and terrain.
                                </p>
                            </div>

                            {/* Feature: Wishlist */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-2 text-blue-700">Personal Wishlist</h3>
                                <p className="text-gray-700">
                                    Bookmark your dream destinations. Create and manage a wishlist for future trips, complete with notes and reminders.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {/* You can reuse or expand your review components here */}
                        {[
                            {
                                name: "Peter Johnson",
                                role: "Business Traveler",
                                text: "Within moments, I found great hotel deals just 2 km from my location. The map-based interface is super intuitive!",
                            },
                            {
                                name: "Sophia Lee",
                                role: "Travel Enthusiast",
                                text: "Sightseeing options came with distances and best visiting times. Saved us hours of planning.",
                            },
                            {
                                name: "Daniel Roberts",
                                role: "Outdoor Explorer",
                                text: "The travel essentials checklist was a lifesaver—especially when planning on short notice!",
                            },
                        ].map((review, index) => (
                            <div key={index} className="bg-white p-6 shadow-md rounded-lg">
                                <blockquote>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        {review.text}
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                                        alt={review.name}
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">{review.name}</p>
                                        <p className="mt-0.5 text-sm text-gray-500">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Services;

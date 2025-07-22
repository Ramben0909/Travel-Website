import Navbar from '../component/Navbar';

function Services() {
    return (
        <>
            <Navbar />
            <section className="py-6 text-blue-900 sm:py-16 lg:py-20 bg-gray-50">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-screen-lg lg:px-8">
                    <div className="flex flex-col lg:flex-row">
                        {/* Promo / Highlight Block */}
                        <div className="relative mx-auto mb-10 flex h-96 overflow-hidden rounded-xl bg-blue-700 shadow-md sm:mt-20 lg:h-auto lg:max-w-md lg:pt-20">
                            <img
                                className="absolute top-0 h-full w-full object-cover opacity-10"
                                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                alt="Travel"
                            />
                            <div className="relative mt-auto w-full p-6 lg:px-7 lg:py-8">
                                <blockquote>
                                    <p className="text-3xl font-bold text-white sm:text-4xl">
                                        Discover nearby hotels, hidden gems, and travel hacks—effortlessly.
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

                        {/* Reviews Section */}
                        <div className="relative mx-auto grid max-w-lg grid-cols-1 gap-y-14 lg:pl-20">
                            {/* Review 1 */}
                            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg">
                                <blockquote>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Within moments, I found great hotel deals just 2 km from my location. The map-based interface is super intuitive!
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                                        alt="Peter"
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">Peter Johnson</p>
                                        <p className="mt-0.5 text-sm text-gray-500">Business Traveler</p>
                                    </div>
                                </div>
                            </div>

                            {/* Review 2 */}
                            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg">
                                <blockquote>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        I loved how the sightseeing options came with distances and best visiting times. Saved us hours of planning.
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                                        alt="Sophia"
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">Sophia Lee</p>
                                        <p className="mt-0.5 text-sm text-gray-500">Travel Enthusiast</p>
                                    </div>
                                </div>
                            </div>

                            {/* Review 3 */}
                            <div className="flex flex-col bg-white p-6 shadow-md rounded-lg">
                                <blockquote>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        The travel essentials checklist was a lifesaver—especially when planning on short notice!
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 rounded-full object-cover"
                                        src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                                        alt="Daniel"
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">Daniel Roberts</p>
                                        <p className="mt-0.5 text-sm text-gray-500">Outdoor Explorer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Services;

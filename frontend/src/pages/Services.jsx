import Navbar from '../component/Navbar';

function Services() {
    return (
        <>   
            <Navbar />
            <section className="py-6 text-blue-900 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-screen-lg lg:px-8">
                    <div className="flex flex-col lg:flex-row">
                        {/* Testimonial Block */}
                        <div className="relative mx-auto mb-10 flex h-96 overflow-hidden rounded-xl bg-blue-600 shadow sm:mt-20 lg:h-auto lg:max-w-md lg:pt-20">
                            <img
                                className="absolute top-0 h-full w-full object-cover opacity-10"
                                src="https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                                alt="Background"
                            />
                            <div className="relative mt-auto w-full">
                                <div className="flex flex-col p-6 lg:px-7 lg:py-8">
                                    <blockquote>
                                        <p className="text-3xl font-bold text-white sm:text-5xl">
                                            I cannot overstate how much this has helped our startup
                                        </p>
                                    </blockquote>
                                    <div className="mt-10 flex items-center">
                                        <img
                                            className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                                            src="/images/ddHJYlQqOzyOKm4CSCY8o.png"
                                            alt="Jacob Jones"
                                        />
                                        <div className="ml-4 text-white">
                                            <p className="text-base font-bold">Jacob Jones</p>
                                            <p className="text-blue-90 mt-0.5 text-sm">YouTube Personality</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Reviews Section */}
                        <div className="relative mx-auto grid max-w-lg grid-cols-1 gap-y-14 lg:pl-20">
                            {/* Review 1 */}
                            <div className="flex flex-col bg-white">
                                <blockquote>
                                    <p className="text-lg leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium dolores facere repellendus, velit quis fugiat.
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                                        src="/images/y9s3xOJV6rnQPKIrdPYJy.png"
                                        alt="James Khawalski"
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">James Khawalski</p>
                                        <p className="mt-0.5 text-sm">CEO, Mavoline</p>
                                    </div>
                                </div>
                            </div>

                            {/* Review 2 */}
                            <div className="flex flex-col bg-white">
                                <blockquote>
                                    <p className="text-lg leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium dolores facere repellendus, velit quis fugiat.
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                                        src="/images/Ju6-1negUEjTnBKw_ZP4r.png"
                                        alt="Jacob Jones"
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">Jacob Jones</p>
                                        <p className="text-blue-90 mt-0.5 text-sm">YouTube Personality</p>
                                    </div>
                                </div>
                            </div>

                            {/* Review 3 */}
                            <div className="flex flex-col bg-white">
                                <blockquote>
                                    <p className="text-lg leading-relaxed">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium dolores facere repellendus, velit quis fugiat.
                                    </p>
                                </blockquote>
                                <div className="mt-4 flex items-center">
                                    <img
                                        className="h-11 w-11 flex-shrink-0 rounded-full object-cover"
                                        src="/images/fR71TFZIDTv2jhvKsOMhC.png"
                                        alt="Jenny Wilson"
                                    />
                                    <div className="ml-4">
                                        <p className="text-base font-bold">Jenny Wilson</p>
                                        <p className="text-blue-90 mt-0.5 text-sm">Esports Commentator</p>
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

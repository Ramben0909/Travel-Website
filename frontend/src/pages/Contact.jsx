import { useRef, useState } from 'react';
import { Mail, Twitter, Linkedin, Send, ArrowRight } from 'lucide-react';
// import emailjs from '@emailjs/browser';
import Navbar from '../component/Navbar'

function Contact() {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ message: '', isError: false });

    const sendEmail = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ message: '', isError: false });

        const formData = new FormData(form.current);
        const payload = {
            name: formData.get('user_name'),
            email: formData.get('user_email'),
            question: formData.get('message'),
            recipientEmail: 'rikdeghuria@gmail.com'
        };

        try {
            const response = await fetch('http://localhost:5001/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus({ message: data.message, isError: false });
                form.current.reset();
            } else {
                setSubmitStatus({ message: data.message || 'Failed to send message', isError: true });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus({ message: 'Network error. Try again later.', isError: true });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
                            Let's <span className="font-medium">Connect</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Have a question, idea, or just want to say hello? I'd love to hear from you.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/20 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-5">
                            {/* Contact Information Panel */}
                            <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12 border-r border-gray-100">
                                <div className="h-full flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-tight">
                                            Get in Touch
                                        </h2>
                                        
                                        <div className="space-y-8">
                                            <div className="group">
                                                <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-md">
                                                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-100">
                                                        <Mail className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                                                        <a 
                                                            href="mailto:abraham@microsoft.com" 
                                                            className="text-gray-900 font-medium hover:text-blue-600 transition-colors duration-200 break-all"
                                                        >
                                                            abraham@microsoft.com
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="group">
                                                <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-md">
                                                    <div className="flex-shrink-0 w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-sky-100">
                                                        <Twitter className="w-5 h-5 text-sky-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-600 mb-1">Twitter</p>
                                                        <a 
                                                            href="#" 
                                                            className="text-gray-900 font-medium hover:text-sky-600 transition-colors duration-200"
                                                        >
                                                            @abrahama.real
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="group">
                                                <div className="flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-md">
                                                    <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-indigo-100">
                                                        <Linkedin className="w-5 h-5 text-indigo-600" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-600 mb-1">LinkedIn</p>
                                                        <span className="text-gray-900 font-medium">abraham</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-200">
                                        <p className="text-sm text-gray-500 leading-relaxed">
                                            I typically respond within 24 hours. Looking forward to our conversation!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-3 p-8 lg:p-12">
                                <div className="max-w-2xl">
                                    <h2 className="text-2xl font-light text-gray-900 mb-2 tracking-tight">
                                        Send a Message
                                    </h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        Fill out the form below and I'll get back to you as soon as possible.
                                    </p>

                                    <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="user_name" className="text-sm font-medium text-gray-700">
                                                    Full Name
                                                </label>
                                                <input
                                                    id="user_name"
                                                    name="user_name"
                                                    type="text"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="Your name"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="user_email" className="text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="user_email"
                                                    name="user_email"
                                                    type="email"
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows="6"
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 resize-none bg-gray-50 focus:bg-white"
                                                placeholder="Tell me about your project, question, or just say hello..."
                                            ></textarea>
                                        </div>

                                        {submitStatus.message && (
                                            <div className={`p-4 rounded-xl ${
                                                submitStatus.isError 
                                                    ? 'bg-red-50 text-red-700 border border-red-200' 
                                                    : 'bg-green-50 text-green-700 border border-green-200'
                                            } transition-all duration-300`}>
                                                <p className="text-sm font-medium">{submitStatus.message}</p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between pt-4">
                                            <p className="text-sm text-gray-500">
                                                Your information is secure and won't be shared.
                                            </p>
                                            
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group flex items-center space-x-3 bg-gray-900 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                            >
                                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="text-center mt-16">
                        <p className="text-gray-500 text-sm">
                            Prefer a different way to connect? Feel free to reach out through any of the channels above.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;
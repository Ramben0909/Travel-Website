/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const location = useLocation(); // Get the current location

    return (
        <nav className="bg-white border-b border-gray-200 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-4">
                        <Link
                            to="/"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/About"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/About' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            About
                        </Link>
                        <Link
                            to="/Services"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/Services' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            Services
                        </Link>
                        <Link
                            to="/Travel"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/Travel' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            Travel
                        </Link>
                        <Link
                            to="/Wishlist"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/Wishlist' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            Wishlist
                        </Link>
                        <Link
                            to="/contact"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/Contact' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            Contact
                        </Link>
                        <Link
                            to="/TravelPlanner"
                            className={`text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                                location.pathname === '/TravelPlanner' ? 'bg-gray-200' : 'hover:bg-gray-100'
                            }`}
                        >
                            Travel Planner
                        </Link>
                    </div>

                    {/* Authentication Buttons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <p className="hidden md:block text-sm font-medium text-gray-700">
                                    {user?.name}
                                </p>
                                <Link
                                    to="/profile"
                                    className="hidden md:inline-block bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() =>
                                        logout({ logoutParams: { returnTo: window.location.origin } })
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => loginWithRedirect()}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Log In
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                            aria-label="Toggle menu"
                        >
                            {/* Hamburger Icon */}
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="md:hidden">
                <div className="space-y-2 px-4 pb-4">
                    <Link
                        to="/"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/About"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/About' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        About
                    </Link>
                    <Link
                        to="/Services"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/Services' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        Services
                    </Link>
                    <Link
                        to="/Travel"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/Travel' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        Travel
                    </Link>
                    <Link
                        to="/Wishlist"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/Wishlist' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        Wishlist
                    </Link>
                    <Link
                        to="/Imgupload"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/Imgupload' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        Imgupload
                    </Link>
                    <Link
                        to="/Contact"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/Contact' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        Contact
                    </Link>
                    <Link
                        to="/AI"
                        className={`block text-gray-800 px-3 py-2 rounded-md text-sm font-medium ${
                            location.pathname === '/Contact' ? 'bg-gray-200' : 'hover:bg-gray-100'
                        }`}
                    >
                        AI
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

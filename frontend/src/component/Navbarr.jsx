/* eslint-disable no-unused-vars */
import React from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom'; // Import useLocation

function Navbarr() {
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const location = useLocation(); // Get the current location

    return (
        <>
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        flowbite React
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">Bonnie Green</span>
                            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                        </Dropdown.Header>
                        <Dropdown.Item>Dashboard</Dropdown.Item>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item>Earnings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link href="/" active={location.pathname === '/'}>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="/About" active={location.pathname === '/About'}>
                        About
                    </Navbar.Link>
                    <Navbar.Link href="/Services" active={location.pathname === '/Services'}>
                        Services
                    </Navbar.Link>
                    <Navbar.Link href="/Travel" active={location.pathname === '/Travel'}>
                        Travel
                    </Navbar.Link>
                    <Navbar.Link href="/Wishlist" active={location.pathname === '/Wishlist'}>
                        Wishlist
                    </Navbar.Link>
                    <Navbar.Link href="/Imgupload" active={location.pathname === '/Imgupload'}>
                        Imgupload
                    </Navbar.Link>
                    <li>{isAuthenticated && <p>{user.name}</p>}</li>

                    {
                        isAuthenticated ? (
                            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                Log Out
                            </button>
                        ) : (
                            <button onClick={() => loginWithRedirect()}>Log In</button>
                        )
                    }
                    <Navbar.Link href="/Contact" active={location.pathname === '/Contact'}>
                        Contact
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default Navbarr;

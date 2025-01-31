/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./Navbar";

function Profile() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [profile, setProfile] = useState(null);
    const [editableName, setEditableName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getAccessTokenSilently();

                const response = await fetch(
                    "https://dev-lqqb867tohygzl1e.us.auth0.com/userinfo", // Replace with your Auth0 domain
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                    setEditableName(data.name || ""); // Set editable name from profile
                } else {
                    console.error("Failed to fetch profile.");
                }
            } catch (error) {
                console.error("An error occurred while fetching the profile:", error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        if (isAuthenticated) {
            fetchProfile();
        } else {
            setLoading(false); // Avoid loading state when user is not authenticated
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    const handleSave = async () => {
        try {
            const token = await getAccessTokenSilently();

            const response = await fetch(
                "https://example.com/api/user/update", // Replace with your API endpoint
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name: editableName }),
                }
            );

            if (response.ok) {
                setMessage("Profile updated successfully!");
            } else {
                setMessage("Failed to update profile.");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred while updating the profile.");
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    }

    if (!isAuthenticated) {
        return <p className="text-center text-red-500">You need to log in to view this page.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>
                {profile ? (
                    <div className="profile-details">
                        <p className="mb-4">
                            <strong>Email:</strong> {profile.email}
                        </p>
                        <div className="mb-4">
                            <label htmlFor="name" className="block font-medium mb-1">
                                Name:
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-4 py-2 border rounded-md"
                                value={editableName}
                                onChange={(e) => setEditableName(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                        {message && <p className="mt-4 text-green-500">{message}</p>}
                    </div>
                ) : (
                    <p className="text-red-500">Failed to load profile details.</p>
                )}
            </div>
        </>
    );
}

export default Profile;

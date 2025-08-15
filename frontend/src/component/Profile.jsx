/* eslint-disable no-unused-vars */
import React from "react";
import { useAuthContext } from "../context/useAuthContext";

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuthContext();

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load profile details</p>;
  }

  if (!isAuthenticated) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        {user?.nickname && <p><strong>Nickname:</strong> {user.nickname}</p>}
      </div>
    </div>
  );
};

export default Profile;

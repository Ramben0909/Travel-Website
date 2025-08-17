/* eslint-disable no-unused-vars */
import React from "react";
import { useAuthContext } from "../context/useAuthContext";
import { User, Mail, AtSign, Loader2, AlertCircle, Lock } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuthContext();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Loading profile...</p>
              <p className="text-sm text-gray-500 mt-1">Please wait while we fetch your details</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-100 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-red-600">Failed to load profile details</p>
              <p className="text-sm text-gray-600 mt-2">
                We encountered an issue while loading your profile. Please try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-md w-full mx-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-blue-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-800">Authentication Required</p>
              <p className="text-sm text-gray-600 mt-2">
                Please log in to view your profile and access your account details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">Manage and view your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header with gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8 -mt-16 relative">
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                <User className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              {/* Name */}
              <div className="group">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Name</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {user?.name || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {user?.email || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nickname (conditional) */}
              {user?.nickname && (
                <div className="group">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:shadow-md">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <AtSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Nickname</p>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        {user.nickname}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-500">
                Profile information is kept secure and private
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
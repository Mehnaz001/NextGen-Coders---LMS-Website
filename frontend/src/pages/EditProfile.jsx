import React, { useState } from "react";
import home from "../assets/home.png";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(userData.name || "")
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl || null);

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUrl(URL.createObjectURL(file));
  };

  const handleSave = () => {
    dispatch({
      type: "user/updateProfile",
      payload: {
        bio,
        photoUrl: photoPreview,
      },
    });

    navigate("/profile");
  };

  return (
    <div className="relative min-h-screen bg-gray-100">

      {/* Subtle background like Profile */}
      <img
        src={home}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      <div className="relative max-w-3xl mx-auto px-4 py-10">

        {/* Back */}
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-md p-6">

          <h1 className="text-xl font-semibold mb-6">Edit Profile</h1>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-semibold">
                {getInitials(userData.name)}
              </div>
            )}

            <label className="text-sm text-blue-600 cursor-pointer">
              Change Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          {/* Username (readonly) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          {/* Email (readonly) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={userData.email}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              About You
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Write something about yourself..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;

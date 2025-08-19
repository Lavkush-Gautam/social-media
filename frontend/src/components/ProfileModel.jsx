import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets'
import { Pencil } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ProfileModel = ({ setShowEdit }) => {
  const user = dummyUserData
  const [editForm, setEditForm] = useState({
    username: user.username,
    bio: user.bio,
    location: user.location,
    profile_picture: null,
    cover_photo: null,
    full_name: user.full_name,
  })

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    // TODO: handle save logic
    setShowEdit(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-y-scroll bg-black/50 flex items-start justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="max-w-2xl w-full sm:py-6 mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Edit Profile</h1>

            <form className="space-y-4" onSubmit={handleSaveProfile}>
              {/* Profile Picture */}
              <div className="flex flex-col items-start gap-3">
                <label
                  htmlFor="profile_picture"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Picture
                  <input
                    hidden
                    type="file"
                    id="profile_picture"
                    accept="image/*"
                    onChange={(e) =>
                      setEditForm({ ...editForm, profile_picture: e.target.files[0] })
                    }
                  />

                  <div className="group/profile relative">
                    <img
                      src={
                        editForm.profile_picture
                          ? URL.createObjectURL(editForm.profile_picture)
                          : user.profile_picture
                      }
                      className="w-24 h-24 rounded-full object-cover mt-2"
                      alt=""
                    />

                    <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/30 rounded-full items-center justify-center">
                      <Pencil className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </label>
              </div>

              {/* Cover Photo */}
              <div className="flex flex-col items-start gap-3">
                <label
                  htmlFor="cover_photo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Cover Photo
                  <input
                    hidden
                    type="file"
                    id="cover_photo"
                    accept="image/*"
                    onChange={(e) =>
                      setEditForm({ ...editForm, cover_photo: e.target.files[0] })
                    }
                  />

                  <div className="group/profile relative">
                    <img
                      src={
                        editForm.cover_photo
                          ? URL.createObjectURL(editForm.cover_photo)
                          : user.cover_photo
                      }
                      className="w-80 h-40 rounded-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 object-cover mt-2"
                      alt=""
                    />

                    <div className="absolute hidden group-hover/profile:flex top-0 left-0 right-0 bottom-0 bg-black/20 items-center justify-center rounded-lg">
                      <Pencil className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Please Enter your full name"
                    onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    value={editForm.full_name}
                  />
                </label>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Please Enter your username"
                    onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                    value={editForm.username}
                  />
                </label>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                  <textarea
                    rows={3}
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Please Enter short bio"
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    value={editForm.bio}
                  />
                </label>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-200 rounded-lg"
                    placeholder="Please Enter your location"
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    value={editForm.location}
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowEdit(false)}
                  type="button"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProfileModel

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../../assets/assets'
import Loading from '../Loading'
import UserProfileInfo from '../UserProfileInfo'
import PostCard from '../PostCard'
import moment from 'moment'
import ProfileModel from '../ProfileModel'
import { motion, AnimatePresence } from 'framer-motion'

const Profile = () => {
  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fectUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }
  useEffect(() => {
    fectUser()
  }, [])

  return user ? (
    <motion.div
      className='relative h-full overflow-y-scroll bg-gray-50 p-6'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className='max-w-3xl mx-auto'>
        <motion.div
          className='bg-white rounded-2xl shadow overflow-hidden'
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className='h-40 md:h-56 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400'>
            {user.cover_photo && (
              <motion.img
                src={user.cover_photo}
                className='w-full h-full object-cover'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              />
            )}
          </div>

          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </motion.div>

        <div className='mt-6'>
          {/* Tabs */}
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {['posts', 'media', 'likes'].map((tab) => (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.9 }}
                className='flex-1 text-center py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer'
                onClick={() => setActiveTab(tab)}
                style={{ backgroundColor: activeTab === tab ? 'rgb(0 234 154)' : 'transparent' }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Animate Tab Content */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {activeTab === 'posts' && (
                <motion.div
                  key="posts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {posts.map((post) => (
                    <div key={post.id} className='mt-6 flex flex-col gap-6 items-center'>
                      <PostCard post={post} />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'media' && (
                <motion.div
                  key="media"
                  className='flex flex-wrap mt-6 max-w-6xl'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {posts
                    .filter((post) => post.image_urls.length > 0)
                    .map((post) => (
                      <React.Fragment key={post.id}>
                        {post.image_urls.map((image, idx) => (
                          <Link
                            target='_blank'
                            to={image}
                            key={idx}
                            className='relative group m-1'
                          >
                            <motion.img
                              src={image}
                              className='w-64 aspect-video object-cover rounded-lg'
                              alt=""
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            />

                            <p className='absolute bottom-0 right-0 text-xs p-1 px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>
                              Posted {moment(post.createdAt).fromNow()}
                            </p>
                          </Link>
                        ))}
                      </React.Fragment>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showEdit && <ProfileModel setShowEdit={setShowEdit} />}
    </motion.div>
  ) : (
    <Loading />
  )
}

export default Profile

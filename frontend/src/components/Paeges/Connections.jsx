import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, UserRoundPen, UserPlus, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { dummyFollowersData as Followers, dummyFollowingData as Following, dummyConnectionsData as connections, dummyPendingConnectionsData as PendingConnections } from '../../assets/assets';

const Connections = () => {
  const [currentTab, setCurrentTab] = useState('Followers');
  const navigate = useNavigate();

  const dataAray = [
    { label: 'Followers', value: Followers, icon: Users },
    { label: 'Following', value: Following, icon: UserCheck },
    { label: 'Connections', value: connections, icon: UserRoundPen },
    { label: 'Pending Connections', value: PendingConnections, icon: UserPlus }
  ];

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05, backgroundColor: "#3b82f6", color: "#fff" }
  };

  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>

        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='mb-8'
        >
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Connections</h1>
          <p className='text-slate-600'>Manage your connections and followers</p>
        </motion.div>

        {/* Stats Boxes */}
        <div className='mb-8 flex flex-wrap gap-6'>
          {dataAray.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/connections/' + item.label.toLowerCase().replace(' ', '-'))}
              className='flex flex-col items-center justify-center gap-1 border h-20 w-40 border-gray-200 bg-white rounded-md shadow cursor-pointer hover:shadow-lg transition-all duration-200'
            >
              <b>{item.value.length}</b>
              <p className='text-slate-600'>{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className='inline-flex items-center flex-wrap border border-gray-200 rounded-md p-1 bg-white shadow-sm'
        >
          {dataAray.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentTab(item.label)}
              variants={tabVariants}
              animate={currentTab === item.label ? "active" : "inactive"}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center px-3 py-1 text-sm rounded-md cursor-pointer`}
            >
              <item.icon className='w-4 h-4' />
              <span className='ml-1'>{item.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Connections List */}
        <div className='flex flex-wrap gap-6 mt-6'>
          <AnimatePresence>
            {dataAray.find(item => item.label === currentTab).value.map((user, index) => (
              <motion.div
                key={user._id || index}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 10 }}
                variants={cardVariants}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className='flex items-center gap-4 bg-white p-4 rounded-lg shadow w-full max-w-md'
              >
                <img src={user.profile_picture} alt={user.full_name} className='w-12 h-12 rounded-full shadow' />
                <div className='flex flex-col flex-grow'>
                  <span className='font-medium text-slate-900'>{user.full_name}</span>
                  <span className='text-sm text-slate-600'>@{user.username}</span>
                  <span className='text-sm text-slate-500'>{user.bio}</span>

                  <div className='flex max-sm:flex-col gap-2 mt-4'>
                    <button 
                      onClick={() => navigate('/profile/' + user._id)}
                      className='w-full p-2 text-sm rounded bg-gradient-to-r from-indigo-500 to-purple-700 active:scale-95 transition text-white cursor-pointer'
                    >
                      View Profile
                    </button>

                    {currentTab === 'Following' && (
                      <button className='w-full p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition text-gray-800 cursor-pointer'>
                        Unfollow
                      </button>
                    )}
                    {currentTab === 'Connections' && (
                      <button onClick={() => navigate(`/messages/${user._id}`)} className='w-full p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition text-gray-800 cursor-pointer'>
                        <MessageSquare className='w-4 h-4 inline-block mr-1' />
                        Message
                      </button>
                    )}
                    {currentTab === 'Followers' && (
                      <button className='w-full p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition text-gray-800 cursor-pointer'>
                        Follow
                      </button>
                    )}
                    {currentTab === 'Pending Connections' && (
                      <button className='w-full p-2 text-sm rounded bg-gray-200 hover:bg-gray-300 transition text-gray-800 cursor-pointer'>
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Connections;

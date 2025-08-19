import React, { useState } from 'react'
import { dummyConnectionsData } from '../../assets/assets'
import { Search } from 'lucide-react'
import UserCard from '../UserCard'
import Loading from '../Loading'
import { motion, AnimatePresence } from 'framer-motion'

const Discover = () => {
  const [input, setInput] = useState('')
  const [users, setUsers] = useState(dummyConnectionsData)
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true)
      setUsers([])
      setTimeout(() => {
        setLoading(false)
        setUsers(dummyConnectionsData)
      }, 1000)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // small delay between children
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-8'
        >
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Discover Users
          </h1>
          <p className='text-slate-600'>Find and connect with new users</p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-8 shadow-md rounded-md bg-white/80 border border-slate-200/60'
        >
          <div className='p-6'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search by people name, username, bio or location'
                className='pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm'
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </motion.div>

        {/* User Cards */}
        <motion.div
          className='flex flex-wrap gap-6'
          variants={containerVariants}
          initial='hidden'
          animate='show'
        >
          <AnimatePresence>
            {users.map((user) => (
              <motion.div
                key={user._id}
                variants={cardVariants}
                initial='hidden'
                animate='show'
                exit='exit'
              >
                <UserCard user={user} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Loading Spinner */}
        {loading && <Loading height='60vh' />}
      </div>
    </div>
  )
}

export default Discover

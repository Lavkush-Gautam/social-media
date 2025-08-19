import React, { useEffect, useRef } from 'react'
import { dummyConnectionsData } from '../../assets/assets'
import { Eye, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Messages = () => {
  const navigate = useNavigate()
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Heading animation on scroll
    gsap.from(headingRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 80%', // triggers when heading is 80% into viewport
        toggleActions: 'play none none reverse'
      }
    })

    // Cards animation individually on scroll
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        delay: index * 0.1, // slight delay between cards
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })
    })
  }, [])

  return (
    <div className='min-h-screen relative bg-slate-50'>
      <div className='max-w-6xl mx-auto p-6'>
        {/* Heading */}
        <div className='mb-8' ref={headingRef}>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>Messages</h1>
          <p className='text-slate-600'>This is where you can view and manage your messages.</p>
        </div>

        {/* Message cards */}
        <div className='flex flex-col gap-3'>
          {dummyConnectionsData.map((user, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className='max-w-xl flex flex-wrap gap-5 p-6 bg-white shadow rounded-md'
            >
              <img src={user.profile_picture} alt="" className='rounded-full size-12 mx-auto' />
              <div className='flex-1'>
                <p className='font-medium text-slate-700'>{user.full_name}</p>
                <p className='text-sm text-gray-500'>@{user.username}</p>
                <p>{user.bio}</p>
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <button
                  onClick={() => navigate(`/messages/${user._id}`)}
                  className='bg-slate-100 hover:bg-slate-200 text-slate-800 size-10 flex items-center justify-center text-sm rounded active:scale-95 transition cursor-pointer gap-1'
                >
                  <MessageSquare className='w-4 h-4' />
                </button>

                <button
                  onClick={() => navigate(`/profile/${user._id}`)}
                  className='bg-slate-100 hover:bg-slate-200 text-slate-800 size-10 flex items-center justify-center text-sm rounded active:scale-95 transition cursor-pointer'
                >
                  <Eye className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Messages

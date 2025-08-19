import React, { useEffect, useState, useRef } from 'react'
import { assets, dummyPostsData } from '../../assets/assets'
import Loading from '../Loading'
import StoriesBar from '../StoriesBar'
import PostCard from '../PostCard'
import RecentMessages from '../RecentMessages'
import gsap from 'gsap'

const Feed = () => {
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  const storiesRef = useRef(null)
  const postsRef = useRef([])
  const sidebarRef = useRef(null)

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.6 } })

      // Stories animation
      tl.from(storiesRef.current, {
        autoAlpha: 0,
        y: -20
      }, "+=0.2")

      // Posts animation
      tl.from(postsRef.current, {
        autoAlpha: 0,
        y: 30,
        stagger: 0.25
      }, "-=0.1")

      // Sidebar animation
      tl.from(sidebarRef.current, {
        autoAlpha: 0,
        x: 50
      }, "-=0.2")
    }
  }, [loading])

  return !loading ? (
    <div className="h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8">

      {/* Main feed column */}
      <div className="flex flex-col gap-6 max-w-xl w-full">

        {/* StoriesBar */}
        <div ref={storiesRef}>
          <StoriesBar />
          {/* Posts */}
          {feeds.map((post, index) => (
            <div key={index} ref={el => postsRef.current[index] = el}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className='max-xl:hidden sticky top-0' ref={sidebarRef}>
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>
          <h3 className='text-slate-800 font-semibold'>Sponsered</h3>
          <img src={assets.sponsored_img} className='w-75 h-50 rounded-md' alt="" />
          <p className='text-slate-600'>Email Marketing</p>
          <p className='text-slate-400'>
            SuperCharge Your marketing with a powerful, easy-to-use platform built for results
          </p>
        </div>
        <RecentMessages />
      </div>

    </div>
  ) : (
    <Loading />
  )
}

export default Feed

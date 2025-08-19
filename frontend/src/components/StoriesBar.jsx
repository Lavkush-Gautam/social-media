import React, { useEffect, useState } from 'react'
import { dummyStoriesData } from '../assets/assets'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import StoryViewModel from './StoryViewModel'

const StoriesBar = () => {
    const [stories, setStories] = useState([])
    const [showModel, setShowModel] = useState(false)
    const [viewStory, setViewStory] = useState(null)


    const fetchStories = async () => {
        setStories(dummyStoriesData)
    }

    useEffect(() => {
        fetchStories()
    }, [])
    return (
        <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>
            <div className='flex gap-4 pb-5'>
                {/* create story card */}
                <div onClick={() => setShowModel(true)} className='rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white '>
                    <div className='h-full flex flex-col items-center justify-center p-4'>

                        <div className='size-10 rounded-full bg-indigo-500 flex items-center justify-center mb-3'>
                            <Plus />
                        </div>
                        <p className='text-sm font-medium text-slate-700 text-center'>Create Story</p>

                    </div>

                </div>
                {/* stories-card */}

                {stories.map((story, index) => (
                    <div onClick={() => setViewStory(story)} key={index} className={`relative rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg bg-gradient-to-b from-indigo-500 to-purple-600  transition-all duration-200 hover:from-indigo-700 hover:to-purple-800 active:scale-95 text-white overflow-hidden`}>
                        <img src={story.user.profile_picture} className='absolute size-8 top-3 left-3 z-10 rounded-full ring ring-gray-100 shadow' alt="" />
                        <p className='absolute top-18 left-3 text-white/60 text-sm truncate max-w-24'>{story.content}</p>
                        <p className='text-white absolute bottom-1 right-2 z-10 text-xs'>{moment(story.createdAt).fromNow()}</p>


                        {
                            story.media_type !== 'text' && (
                                <div className='absolute inset-0 z-1 rounded-lg overflow-hidden bg-black'>

                                    {
                                        story.media_type === 'image' ? (
                                            <img src={story.media_url} className='w-full h-full hover:scale-110 transition duration-500 opacity-70 hover:opacity-80 object-cover' alt="" />
                                        ) : (
                                            <video className='w-full h-full hover:scale-110 transition duration-500 opacity-70 hover:opacity-80 object-cover' autoPlay loop muted>
                                                <source src={story.media_url} type="video/mp4" />
                                            </video>
                                        )
                                    }
                                </div>
                            )
                        }

                    </div>
                ))}

            </div>
            {showModel && <StoryModel setShowModel={setShowModel} fetchStories={fetchStories} />}

            {viewStory && <StoryViewModel viewStory={viewStory} setViewStory={setViewStory} />
            }
        </div>
    )
}

export default StoriesBar
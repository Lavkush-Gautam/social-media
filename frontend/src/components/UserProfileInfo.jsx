import { Calendar, MapPin, PenBox, Verified } from 'lucide-react'
import React from 'react'
import moment from 'moment'

const UserProfileInfo = ({ user, posts, profileId, setShowEdit }) => {
    return (
        <div className='relative py-4 px-6 bg-white md:px-8'>
            <div className='flex items-start flex-col md:flex-row gap-6 '>
                <div className='w-32 h-32 border-4 border-white shadow-lg absolute -top-16 rounded-full '>
                    <img src={user.profile_picture} className='absolue rounded-full z-2' alt="" />
                </div>

                <div className='w-full pt-16 md:pt-0 md:pl-36'>

                    <div className='flex items-start justify-between flex-col md:flex-row'>
                        <div >
                            <div className='flex items-center gap-3'>
                                <h1 className='text-2xl font-bold text-gray-900'>{user.full_name}</h1>
                                <Verified className='w-6 h-6 text-blue-500' />
                            </div>
                            <p className='text-gray-600'>{user.username ? `${user.username}` : 'Add a username'}</p>
                        </div>
                        {
                            !profileId && (
                                <button onClick={() => setShowEdit(true)} className='flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer mt-4 md:mt-0'>
                                    <PenBox className='w-4 h-4' />
                                    Edit
                                </button>
                            )
                        }

                    </div>


                    <p className='text-gray-600 mt-4'>{user.bio ? user.bio : 'Add a bio'}</p>

                    <div className='flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4'>
                        <span className='flex items-center gap-1'>
                            <MapPin className='w-4 h-4 text-gray-500 inline-block mr-1' />
                            {user.location ? user.location : 'Add a location'}
                        </span>
                        <span>
                            <Calendar className='w-4 h-4 text-gray-500 inline-block mr-1' />
                            Joined <span>{moment(user.createdAt).fromNow()}</span>
                        </span>
                    </div>

                    <div className='flex items-center gap-6 mt-6 border-t border-gray-200 pt-4'>
                        <div>
                            <span className='sm:text-xl font-bold text-gray-900'>{posts.length}</span>
                            <span className='text-gray-500 text-xs sm:text-sm ml-1'> Posts</span>
                        </div>

                        <div>
                            <span className='sm:text-xl font-bold text-gray-900'>{user.followers.length}</span>
                            <span className='text-gray-500 text-xs sm:text-sm ml-1'> Follwers</span>
                        </div>

                         <div>
                            <span className='sm:text-xl font-bold text-gray-900'>{user.following.length}</span>
                            <span className='text-gray-500 text-xs sm:text-sm ml-1'> Follwing</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileInfo
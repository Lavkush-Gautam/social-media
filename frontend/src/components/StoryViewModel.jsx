
import { BadgeCheck, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const StoryViewModel = ({ viewStory, setViewStory }) => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (viewStory && viewStory.media_type !== 'video') {
            setProgress(0);
            const duration = 10000;
            const intervalTime = 100;

            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    const next = prev + (intervalTime / duration) * 100;
                    return next > 100 ? 100 : next;
                });
            }, intervalTime);

            const timer = setTimeout(() => {
                setViewStory(null);
            }, duration);

            return () => {
                clearTimeout(timer);
                clearInterval(progressInterval);
            };
        }
    }, [viewStory, setViewStory]);


    const handleClose = () => {
        setViewStory(null)
    }

    const renderContent = () => {
        switch (viewStory.media_type) {
            case 'image':
                return (
                    <img src={viewStory.media_url} className='max-w-full max-h-screen object-contain' alt="" />
                )
            case 'video':
                return (
                    <video src={viewStory.media_url} onEnded={() => setViewStory(null)} className='max-h-screen' autoPlay controls />
                )

            case 'text':
                return (
                    <div className='max-w-full max-h-screen flex items-center justify-center text-white text-2xl text-center' style={{ backgroundColor: viewStory.background_color }}>
                        {viewStory.content}
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div
            className="fixed inset-0 z-110 bg-black bg-opacity-90 h-screen backdrop-blur text-white flex items-center justify-center p-4"
            style={{
                backgroundColor:
                    viewStory?.media_type === 'text'
                        ? viewStory.background_color
                        : 'black'
            }}
        >
            <div className="absolute top-0 left-0 h-1 bg-gray-700 w-full">
                <div
                    className="h-full bg-white transition duration-100 linear"
                    style={{
                        width: `${progress}%`,
                    }}
                >
                </div>
            </div>

            <div className='absolute top-4 left-4 flex items-center p-2 sm:p-4 px-4 sm:px-8 rounded space-x-3 backdrop-blur-2xl bg-black/50'>
                <img src={viewStory.user?.profile_picture} alt="" className='size-7 sm:size-8 rounded-full object-cover border-white' />
                <div className='text-white font-medium flex items-center gap-1.5'>
                    <span>{viewStory.user?.full_name}</span>
                    <BadgeCheck size={18} />
                </div>
            </div>
            {/* close-button */}
            <button onClick={handleClose} className='absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none'>
                <X className='w-8 h-8 hover:scale-110 transition cursor-pointer' />
            </button>

            <div className='max-w-[90vw] max-h-[90vh] flex items-center justify-center'>

                {renderContent()}
            </div>
        </div>
    )
}

export default StoryViewModel
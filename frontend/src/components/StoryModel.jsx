import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const StoryModel = ({ setShowModel, fetchStories }) => {
    const bgColors = ['#4f46e5', '#f24e1e', '#f2c94c', '#27ae60', '#2d9cdb', '#bb6bd9', '#7caed', '#db2777', '#e11d48', '#ca8a04', '#0d9488', '#0ea5e9', '#8b5cf6', '#ec4899', '#f97316', '#f59e0b', '#16a34a', '#2563eb', '#7c3aed', '#dc2626'];

    const [mode, setMode] = useState('text')
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState('')
    const [media, setMedia] = useState(null)
    const [mediaType, setMediaType] = useState(null)

    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setMedia(file);
            const url = URL.createObjectURL(file);
            setMediaType(url);
        }
    };

    const handleCreateStory = async () => {

    }
    return (
        <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
            <div className='w-full max-w-md'>

                <div className='text-center mb-4 flex items-center justify-between'>
                    <button onClick={() => setShowModel(false)} className='text-white p-2 cursor-pointer'>
                        <ArrowLeft />
                    </button>
                    <h2 className='text-lg font-semibold'>Create Story</h2>
                    <span className='w-10'></span>
                </div>

                <div
                    className="rounded-lg h-96 flex text-white items-center justify-center relative"
                    style={{ backgroundColor: background }}
                >
                    {mode === 'text' ? (
                        <textarea
                            className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none"
                            placeholder="what is on your mind?"
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    ) : mode === 'media' && !!mediaType ? (
                        <div className="w-full h-full flex items-center justify-center">
                            {media?.type.startsWith('image') ? (
                                <img
                                    src={mediaType}
                                    alt="Story Media"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <video
                                    src={mediaType}
                                    className="object-contain max-w-full"
                                />
                            )}
                        </div>
                    ) : null}
                </div>


                <div className='flex mt-4 gap-2'>
                    {
                        bgColors.map((color, index) => (
                            <button key={color} className='w-6 h-6 rounded-full ring cursor-pointer' style={{ backgroundColor: color }} onClick={() => setBackground(color)} ></button>
                        ))
                    }
                </div>

                <div className='flex mt-4 gap-2'>
                    <button onClick={() => { setMode('text'); setMedia(null); setMediaType(null) }} className={`flex-1 flex items-center cursor-pointer justify-center gap-2 p-2 rounded ${mode === 'text' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
                        <TextIcon size={18} />Text
                    </button>
                    <label className={`flex-1 flex items-center cursor-pointer justify-center gap-2 p-2 rounded ${mode === 'media' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
                        <input type="file" onChange={(e) => { handleMediaUpload(e); setMedia('media') }} accept='image/* ,video/*' className='hidden' />
                        <Upload size={18} />Photo/Video
                    </label>
                </div>

                <button onClick={()=>toast.promise(handleCreateStory(),{
                    loading: 'Creating Story...',
                    success:<p>Story Created Successfully</p>,
                    error: <p>Failed to Create Story</p>
                })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition-all cursor-pointer w-full'>
                    <Sparkle size={18} />Create Story
                </button>
            </div>
        </div>
    )
}

export default StoryModel
import React, { useState, useEffect } from 'react'
import { dummyUserData } from '../../assets/assets'
import { Image, X } from 'lucide-react'

const CreatePost = () => {
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  const user = dummyUserData

  // Cleanup URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img))
    }
  }, [images])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const newImages = files.map(file => URL.createObjectURL(file))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handlePublish = () => {
    setLoading(true)
    setTimeout(() => {
      console.log("Post published:", { content, images })
      setContent('')
      setImages([])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-black text-slate-900 mb-2'>Create Post</h1>
          <p className='text-slate-600'>Share your opinion with your friends</p>
        </div>

        <div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4'>
          <div className='flex items-center gap-3'>
            <img src={user.profile_picture} className='w-12 h-12 rounded-full shadow' alt="" />
            <div>
              <h2 className='font-semibold'>{user.full_name}</h2>
              <p className='text-sm text-gray-500'>@{user.username}</p>
            </div>
          </div>

          <textarea
            className='w-full resize-none max-h-20 mt-4 text-sm outline-none placeholder-gray-400'
            placeholder='What is happening?'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {images.length > 0 && (
            <div className='grid grid-cols-3 gap-3'>
              {images.map((image, i) => (
                <div className='relative group' key={i}>
                  <img src={image} className='h-20 w-full object-cover rounded-md' alt="" />
                  <div
                    onClick={() => removeImage(i)}
                    className='absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer'
                  >
                    <X className='w-6 h-6 text-white' />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='flex items-center justify-between pt-3 border-t border-gray-300'>
            <label
              htmlFor='images'
              className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer'
            >
              <Image className='size-6' />
              Add Images
            </label>

            <input
              type="file"
              id='images'
              accept='image/*'
              hidden
              multiple
              onChange={handleImageUpload}
              
            />

            <button
              onClick={handlePublish}
              disabled={loading || (!content.trim() && images.length === 0)}
              className='text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePost

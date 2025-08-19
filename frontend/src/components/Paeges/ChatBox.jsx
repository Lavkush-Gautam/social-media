import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../../assets/assets'
import { ImageIcon, SendHorizonal } from 'lucide-react'

const ChatBox = () => {
  const [messages, setMessages] = useState(dummyMessagesData)
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [user] = useState(dummyUserData)

  const messageEndRef = useRef(null)

  const sendMessage = async () => {
    if (!text.trim() && !image) return

    const newMessage = {
      id: Date.now(),
      text,
      media_url: image,
      message_type: image ? 'image' : 'text',
      createdAt: new Date().toISOString(),
      user_id: user.id,
      to_user_id: 'other_user', // replace with actual logic
    }

    setMessages((prev) => [...prev, newMessage])
    setText('')
    setImage(null)
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return user && (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 p-2 md:px-10 xl:pl-42 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300">
        <img src={user.profile_picture} className="size-8 rounded-full" alt="" />
        <div>
          <p className="font-medium">{user.full_name}</p>
          <p className="text-sm text-gray-500 -mt-1.5">@{user.username}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 md:px-10 h-full overflow-y-scroll">
        <div className="space-y-4 max-w-4xl mx-auto">
          {[...messages]
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.to_user_id !== user._id ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${msg.to_user_id !== msg.user_id ? 'rounded-bl-none' : 'rounded-br-none'}`}
                >
                  {msg.message_type === 'image' && (
                    <img
                      src={msg.media_url}
                      className="w-full max-w-sm rounded-lg mb-1"
                      alt=""
                    />
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

          <div ref={messageEndRef} />
        </div>
      </div>

      {/* Input box */}
      <div className="flex items-center gap-2 p-3 border-t border-gray-300">
        <div className='flex items-center gap-3 pl-5 p-1.5 bg-white w-full max-w-xl mx-auto border border-gray-200 shadow rounded-full mb-5'>
          <input
            type="text"
            value={text}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 outline-none text-slate-700"
          />
          <label htmlFor="image">
            {
              image ? <img src={URL.createObjectURL(image)} className='h-8 rounded' /> : <ImageIcon className='size-7 text-gray-700' />
            }
            <input type="file" id='image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])} />
          </label>
          <button onCanPlay={sendMessage} className='bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-pink-800 active:scale-95 cursor-pointer text-white p-2 rounded-full'>
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatBox

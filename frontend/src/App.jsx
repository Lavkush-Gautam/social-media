import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Paeges/Login'
import Feed from './components/Paeges/Feed'
import Messages from './components/Paeges/Messages'
import Connections from './components/Paeges/Connections'
import ChatBox from './components/Paeges/ChatBox'
import Profile from './components/Paeges/Profile'
import Discover from './components/Paeges/Discover'
import CreatePost from './components/Paeges/CreatePost'
import { useUser} from '@clerk/clerk-react'
import Layout from './components/Paeges/Layout'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { user } = useUser()
  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={!user ?<Login />:<Layout/>}>
          <Route path="feed" element={<Feed />} />
          <Route path="messages" element={<Messages />} />
          <Route path="messages/:userId" element={<ChatBox />} />
          <Route path="connections" element={<Connections />} />
          <Route path="discover" element={<Discover />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
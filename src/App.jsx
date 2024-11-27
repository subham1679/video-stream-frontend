import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './components/VideoUpload'

function App() {
  const [count, setCount] = useState(0)

  const [videoID, setVideoId] = useState("da829812-f68e-4251-8eaf-52f1314f043b")

  return (
    <>
      <div className='flex flex-col items-center space-y-9  justify-center py-9'>
        < h1 className="text-5xl font-bold text-gray-700 dark:text-gray-100">
          Welcome to Videofy</h1>

        <div>
          <h1 className="text-2xl text-white">Playing Video</h1>
          <video
           height={400}
           width={800}
          src={`http://localhost:8080/api/video/stream/range/${videoID}`} controls></video>
        </div>

        <VideoUpload />
      </div>
    </>
  )
}

export default App

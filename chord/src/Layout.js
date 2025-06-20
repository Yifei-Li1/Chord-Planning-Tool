import React from 'react'
import Navbar from './components/Navbar'
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Tracks from './components/Tracks'
function Layout() {
  return (
    <div className='layout'>

      <Navbar />
      <BrowserRouter >
      <Routes>
        <Route path='/' element={<Tracks />} />
        <Route path='/Tracks' element={<Tracks />} />
        {/* Add more routes as needed */}
      </Routes>

      </BrowserRouter >
      
    </div>
    
  )
}

export default Layout
import React from 'react'

export default function Navbar() {
  return (
    <>
    <div className='Navbar-container'>
        <div className='Navbar-logo'>
            {/* <img src='https://raw.githubusercontent.com/Chords-Org/chord/main/src/assets/logo.png' alt='logo' /> */}
        </div>
        <div className='Navbar-title'>
            <h1>Chord Planning Tool</h1>
        </div>
        <div className='Navbar-links'>
            <ul>
                <li><a href='./Tracks.js'>Tracks</a></li>
            </ul>
        </div>
    </div>
    </>
    
  )
}

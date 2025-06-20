import React from 'react'
import EditableTrack from './EditableTrack';

function Tracks() {
    const [tracks, setTracks] = React.useState([]);
    const AddTrack = () => {
        // Logic to add a new track
        setTracks([...tracks, { name: `Track ${tracks.length + 1}`, description: 'New track description' }]);
        console.log("Add Track button clicked");
    }
  return (
    <div className='Tracks-container'>
        <h1>Tracks</h1>
        <button onClick={AddTrack}>Add Track</button>
        <div className='Tracks-list'>
            {tracks.length > 0 ? (
                tracks.map((track, index) => (
                    <EditableTrack
                        key={index}
                        trackName={track.name}
                    />
                ))
            ) : (
                <p>No tracks available. Please add a track.</p>
            )}
            </div>
    </div>
    

  )
}

export default Tracks
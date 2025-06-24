import { useChordStore } from '../store/useChordStore';
import { playChord } from '../lib/audio';

import DraggableChord from './DraggableChord';
export default function SelectedChords() {
  const { selected } = useChordStore();
    
  if (!selected.length) return <p>（空）请在左侧挑选和弦 👉</p>;

  return (
    <ul className="list-none space-y-2 ">
      {selected.map(chord => (
        <DraggableChord key={chord.id} chord={chord} />
      ))}
    </ul>
  );
  
}
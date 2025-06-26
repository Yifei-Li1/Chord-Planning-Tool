import { CHORD_LIBRARY } from '../data/chords';
import { playChord } from '../lib/audio';
import { useChordStore } from '../store/useChordStore';

export default function ChordPalette() {
  const addChord = useChordStore(s => s.addChord);

  return (
    <div className="grid grid-cols-7 gap-4">
      {CHORD_LIBRARY.map(chord => (
        <button
          key={chord.id}
          className="p-3 rounded-lg shadow text-white"
          style={{ backgroundColor: chord.color }}
          onMouseEnter={() => playChord(chord.pitches)}
          onClick={() => addChord(chord)}
        > 
          {chord.name}
        </button>
      ))}
    </div>
  );
}
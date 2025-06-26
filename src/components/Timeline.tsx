import { useDroppable } from '@dnd-kit/core';
import { useChordStore } from '../store/useChordStore';
import { playChord } from '../lib/audio';
import { v4 as uuid } from 'uuid';
import type { ChordInfo } from '../data/chords';
import { playTimeline } from '../lib/playTimeline';
import { useState } from 'react';
import * as Tone from 'tone';


function Slot({
  barId,
  idx,
  chord,
}: {
  barId: string;
  idx: number;
  chord: ChordInfo | null;
}) {
  const { setSlot } = useChordStore();
  const { bars } = useChordStore.getState();

  const { setNodeRef, isOver } = useDroppable({
    id: `${barId}-${idx}`,
    data: { barId, idx },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-center h-14 w-14 border
                  ${isOver ? 'bg-blue-200' : 'bg-slate-100'}`}
      onClick={() => chord && playChord(chord.pitches)}
    >
      {chord ? chord.name : '+'}
    </div>
  );
}

export default function Timeline() {
  const { bars, addBar, bpm, setBpm } = useChordStore();
  const [playing, setPlaying] = useState(false);

  const onPulsePressed = () => {
    if(Tone.Part !== null){
      Tone.Transport.stop(); // 停止音频
      Tone.Transport.cancel(); // 停止当前播放
      
    }
    setPlaying(false);
  }
  const onPlayPressed = () => {
    setPlaying(true);
    playTimeline(bars,bpm);
  }
  return (
    <div className="space-y-4">
      <span>bpm: {bpm}</span>

      <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Default range</label>
      <input id="default-range" type="range" min="40" max="240" value={bpm} onChange = {(e)=> setBpm(e.target.valueAsNumber)}className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />

      <div className="flex flex-row gap-4 overflow-x-auto pb-2">
        {bars.map(bar => (
          <div key={bar.id} className="border border-slate-400 rounded p-1 grid grid-cols-4 gap-1 min-w-max">
            {bar.slots.map((c, i) => (
              <Slot key={i} barId={bar.id} idx={i} chord={c} />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={addBar}
        className="px-4 py-1 rounded border mt-2 hover:bg-slate-50"
      >
        + 新增小节
      </button>
      {playing ? <button onClick={onPulsePressed}>▶ Stop</button> : <button onClick={onPlayPressed}>▶ Play</button>}

    </div>
  );
}
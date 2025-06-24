import { useDroppable } from '@dnd-kit/core';
import { useChordStore } from '../store/useChordStore';
import { playChord } from '../lib/audio';
import { v4 as uuid } from 'uuid';
import type { ChordInfo } from '../data/chords';
import { playTimeline } from '../lib/playTimeline';


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
  const { bars, addBar } = useChordStore();

  return (
    <div className="space-y-4">
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
      <button onClick={() => playTimeline(bars)}>▶ Play</button>
    </div>
  );
}
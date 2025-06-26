import { useState } from 'react';
import { playChord } from './lib/audio';
import ChordPalette from './components/ChordPalette';
import SelectedChords from './components/SelectedChords';
import type { ChordInfo } from './data/chords';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useChordStore } from './store/useChordStore';
import Timeline from './components/Timeline';
import TestComponent from './components/testComponent';

function App() {
  const [chord, setChord] = useState<'C' | 'Am'>('C');
  const setSlot = useChordStore(s => s.setSlot);

  const handleDragEnd = (ev: DragEndEvent) => {
    const chord: ChordInfo | undefined = ev.active.data.current?.chord;
    console.log('handleDragEnd', ev, chord);
    const { barId, idx } = ev.over?.data?.current || {};
    if (chord && barId && typeof idx === 'number')
      setSlot(barId, idx, chord);
  };

  const handlePlay = () => {
    const map = {
      C: ['C4', 'E4', 'G4'],
      Am: ['A3', 'C4', 'E4'],
    };
    playChord(map[chord]);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Chord Color Composer (MVP)</h1>


      <div className="flex flex-col min-h-screen p-8 gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {/* 左侧：和弦库 */}
          <section className="w-1/2">
            <h2 className="text-xl font-bold mb-4">① 试听并挑选和弦</h2>
            <ChordPalette />
          </section>

          {/* 右侧：备选列表 */}
          <section className="w-1/2">
            <h2 className="text-xl font-bold mb-4">② 我的备选和弦</h2>
            <SelectedChords />
          </section>
          <section className="w-full mt-8">
            <h2 className="text-xl font-bold mb-2">③ 排列小节</h2>
            <Timeline />
          </section>
          
        </DndContext>
        <TestComponent />
      </div>
      
    </div>
  );
}

export default App;
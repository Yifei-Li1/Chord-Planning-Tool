import { create } from 'zustand';
import type { ChordInfo } from '../data/chords';

interface ChordState {
    selected: ChordInfo[];            // 备选和弦
    addChord: (c: ChordInfo) => void;
    removeChord: (id: string) => void;
}
export interface Bar { id: string; slots: (ChordInfo | null)[] } // 4 个格子
interface TimelineState extends ChordState {
    bars: Bar[];
    addBar: () => void;
    setSlot: (barId: string, idx: number, chord: ChordInfo | null) => void;
}

export const useChordStore = create<TimelineState>(set => ({
    /* ① 备选列表逻辑 */
    selected: [],
    addChord: c => set(s => ({
        selected: s.selected.find(x => x.id === c.id) ? s.selected : [...s.selected, c],
    })),
    removeChord: id => 
        set(s => {
        console.log('Removing chord with id:', id);
        const newSelected = s.selected.filter(c => c.id !== id);
        console.log('New selected array:', newSelected);
        return {
            selected: newSelected,
        };
    }),
    /* ② 时间轴逻辑 */
    bars: [{ id: 'bar-0', slots: [null, null, null, null] }],
    addBar: () =>
        set(s => ({
            bars: [...s.bars, { id: `bar-${s.bars.length}`, slots: [null, null, null, null] }],
        })),
    setSlot: (barId, idx, chord) =>
        set(s => ({
            bars: s.bars.map(b =>
                b.id === barId ? { ...b, slots: b.slots.map((c, i) => (i === idx ? chord : c)) } : b
            ),
        })),

}));
export type ChordQuality = 'maj' | 'min' | 'dim' | 'aug' | '7' | 'maj7' | 'm7';

export interface ChordInfo {
  id: string;          // 唯一键，如 "Cmaj"
  name: string;        // 展示用，如 "C"
  pitches: string[];   // ["C4","E4","G4"]
  color: string;       // 用于 UI 标色
  emotion: string;     // "happy" | "sad" | ...
}

export const CHORD_LIBRARY: ChordInfo[] = [
   { id: 'Cmaj', name: 'C',  pitches: ['C4','E4','G4'], color: '#f87171', emotion: 'happy' },
  { id: 'Gmaj', name: 'G',  pitches: ['G3','B3','D4'], color: '#fbbf24', emotion: 'bright' },
  { id: 'Fmaj', name: 'F',  pitches: ['F3','A3','C4'], color: '#34d399', emotion: 'warm'  },
  { id: 'Am',   name: 'Am', pitches: ['A3','C4','E4'], color: '#60a5fa', emotion: 'sad'   },
  { id: 'Em',   name: 'Em', pitches: ['E3','G3','B3'], color: '#c084fc', emotion: 'melancholy' },
  { id: 'Dm',   name: 'Dm', pitches: ['D3','F3','A3'], color: '#f472b6', emotion: 'soft' },
  // …后续慢慢补
];

import { useDraggable } from '@dnd-kit/core';
import type { ChordInfo } from '../data/chords';
import { playChord } from '../lib/audio';
import { useChordStore } from '../store/useChordStore';
import { GripVertical } from 'lucide-react';    
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
interface Props {
  chord: ChordInfo;
  
}

/**
 * 单行可拖拽的和弦条目
 * - 悬停 / 点击和弦名可试听
 * - ✕ 按钮可从备选列表移除
 * - 整行可拖拽到时间轴格子
 */
export default function DraggableChord({ chord }: Props) {
  const removeChord = useChordStore(s => s.removeChord);
  //const [isDragging, setIsDragging] = useState(false);
  // 注册拖拽源
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `drag-${chord.id}`,   // 保证唯一
    data: { chord },          // 拖拽时携带和弦对象
  });
  const handleChordRemove = ()=>{
    removeChord(chord.id);
  }
  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform), // translate3d(x,y,0)
    //transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
     listStyleType: 'none'
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-2 cursor-grab select-none rounded px-2 py-1
                 hover:bg-slate-50 active:cursor-grabbing"
    >
       {/* 1. 拖拽把手 —— 只有它绑定 listeners */}
      <span
        {...listeners}           
        className="cursor-grab active:cursor-grabbing select-none"
       
  
      >
        <GripVertical size={16} />
      </span>
      {/* 色块 */}
      
      {/* 和弦名：点击试听 */}
      <button
        onClick={() => playChord(chord.pitches)}
        className="underline font-semibold"
        style={{ backgroundColor: chord.color }}
      >
        {chord.name}
      </button>

      {/* 删除按钮 */}
      <button
        onClick={handleChordRemove}
        className="ml-auto text-sm text-red-500"
      >
        ✕
      </button>
    </li>
  );
}
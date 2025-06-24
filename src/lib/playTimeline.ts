import * as Tone from 'tone';
import type { Bar } from '../store/useChordStore'; // 若 Bar 导出，否则复制类型
   // 若 Bar 导出，否则复制类型

export async function playTimeline(bars: Bar[], bpm = 100) {
  await Tone.start();

  Tone.Transport.cancel();            // 清空旧调度
  Tone.Transport.bpm.value = bpm;

  const part = new Tone.Part(((time: number, note: { pitches?: string[] }) => {
    if (note.pitches) {
      const synth = new Tone.PolySynth().toDestination();
      synth.triggerAttackRelease(note.pitches, '1n', time);
    }
  }), []);

  bars.forEach((bar, barIdx) =>
    bar.slots.forEach((chord, beatIdx) => {
      const sixteenth = (barIdx * 4 + beatIdx) * 1; // 每格 1 拍
      part.add({ time: `${sixteenth}n`, ...chord });
    })
  );

  part.start(0);
  Tone.Transport.loopEnd = `${bars.length * 4}n`;
  Tone.Transport.loop = true;
  Tone.Transport.start();
}

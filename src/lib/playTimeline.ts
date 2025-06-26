import * as Tone from 'tone';
import type { Bar } from '../store/useChordStore'; // 若 Bar 导出，否则复制类型
// 若 Bar 导出，否则复制类型

export async function playTimeline(bars: Bar[], bpm = 100) {
  //console.log('Playing timeline with bars:', bars,bpm);
  await Tone.start();

  Tone.Transport.cancel();            // 清空旧调度
  Tone.Transport.bpm.value = bpm;

  const part = new Tone.Part(((time: number, note: { pitches?: string[] ,duration: string}) => {
    if (note.pitches) {
      const synth = new Tone.PolySynth().toDestination();
      synth.triggerAttackRelease(note.pitches, note.duration);
    }
  }), []);


  bars.forEach((bar, barIdx) => {
    bar.slots.forEach((chord, beatIdx) => {
      if (!chord) return;                               // 空格跳过
      const time = `${barIdx}:${beatIdx}:0`;            // 0-based：bar:beat:sixteenth
      part.add(time,  {pitches: chord.pitches,duration: '4n'}  );
      console.log(`Adding chord at ${time}:`, chord);
    });
  });
  //part.loop = false;

  part.start(0);
  Tone.Transport.bpm.value = bpm;
  //Tone.Transport.loopEnd = `${bars.length * 4}n`;
  Tone.Transport.loop = false;
  Tone.Transport.start();
}

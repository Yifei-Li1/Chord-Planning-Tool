import * as Tone from 'tone';
/**
 * 播放一个和弦
 * @param notes  音高数组，如 ['C4','E4','G4']
 * @param duration 时值（秒），默认 1 秒
 */

export async function playChord(notes: string[], duration = 1) {
  await Tone.start(); // 首次交互必须解锁 AudioContext
  const synth = new Tone.PolySynth(Tone.Synth).toDestination();
  synth.triggerAttackRelease(notes, duration);
}
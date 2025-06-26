import { Frequency } from "tone";
import { Tone } from "tone/build/esm/core/Tone";

export  function generateTraid(root: string, property: string,octive:string): string[] {
  // 根音的 MIDI 音高
  const rootPitch = Frequency(root+octive).toMidi();// C4 = 60 'C'.charCodeAt(0) = 67
  
  let thirdPitch: number;
  if(property === 'maj'){
    thirdPitch = rootPitch + 4; // 大三度
  }
  else {
    thirdPitch = rootPitch + 3; // 小三度
  }

  let fifthPitch: number;
  if(property === 'dim'){
    fifthPitch = rootPitch + 6; // 减五度
  }
  else{
    fifthPitch = rootPitch + 7; // 完全五度
  }
  
  console.log(` MIDI 音高: ${rootPitch}, 三度: ${thirdPitch}, 五度: ${fifthPitch}`);
  // 大调三和弦：根音、三度、五度
 
    return [
      Frequency(rootPitch, "midi").toNote(), // 根音
      Frequency(thirdPitch, "midi").toNote(), // 大三度
      Frequency(fifthPitch, "midi").toNote()  // 完全五度
    ];
  
}
export function inversion(chord: string[], inversion: number): string[] {
  // 处理和弦的转位
  if (inversion < 0 || inversion >= chord.length) {
    throw new Error("Invalid inversion index");
  }
  
  // 将和弦的前几个音移到后面
  return [...chord.slice(inversion), ...chord.slice(0, inversion)];
}

export function generateSeventh(root: string, property: string, octive:string): string[] {
  const rootPitch = Frequency(root+octive).toMidi();
  let thirdPitch: number;
  let fifthPitch: number;
  let seventhPitch: number;
 

  return [
    // Frequency(rootPitch, "midi").toNote(),
    // Frequency(thirdPitch, "midi").toNote(),
    // Frequency(fifthPitch, "midi").toNote(),
    // Frequency(seventhPitch, "midi").toNote()
  ];
}
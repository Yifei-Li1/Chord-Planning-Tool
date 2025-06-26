import React from 'react'
import { generateTraid } from '../lib/chordGenerator';
function testComponent() {
    const [root,setRoot] = React.useState('C');
    const [property,setProperty] = React.useState("maj");
    const [chord, setChord] = React.useState<string[]>([]);
    const [octive, setOctive] = React.useState('4');
  return (
    <div>
        <h1>Test Component</h1>
        <label>根音：</label>
        <input type='text' value={root} onChange={(e) => setRoot(e.target.value)} />
        <label>选择调性：</label>
        <select value={property} onChange={(e) => setProperty(e.target.value)}>
            <option value="maj">大调</option>
            <option value="min">小调</option>
            <option value="dim">减五度</option>
        </select>
        <label>八度：</label>
        <select value={octive} onChange={(e) => setOctive(e.target.value)}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="3">3</option>
        </select>
        <br />
        <button onClick={()=>setChord(generateTraid(root,property,octive))}>generate</button>
        <span>{chord}</span>
    </div>
  )
}

export default testComponent
import { useState } from 'react';

export default function Home() {
  const [hsVal, setHsVal] = useState(null);
  const [tpVal, setTpVal] = useState(null);

  async function calculate(type) {
    const isHS = type === 'hs';
    const position = document.getElementById(`${type}Position`).value;
    const rating = parseFloat(document.getElementById(`${type}${isHS ? 'Rating' : 'Overall'}`).value);
    const followers = parseInt(document.getElementById(`${type}Followers`).value) || 0;
    const capToggle = document.getElementById(`${type}CapToggle`).checked;

    const res = await fetch('/api/valuation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, position, rating, followers, capToggle })
    });
    const data = await res.json();
    if (type === 'hs') setHsVal(data.valuation);
    else setTpVal(data.valuation);
  }

  return (
    <div className="min-h-screen bg-[#2a2a2a] text-white p-6">
      <img src="/logo.png" alt="Logo" className="max-w-xs mb-6" />

      {/* Transfer Portal */}
      <div className="bg-white text-black p-6 rounded mb-10">
        <h2 className="text-xl font-bold mb-4">Transfer Portal Valuation Tool</h2>
        <input id="tpPosition" placeholder="e.g., WR" className="p-2 border mb-2 block w-64" />
        <input id="tpOverall" placeholder="e.g., 95" type="number" className="p-2 border mb-2 block w-64" />
        <input id="tpFollowers" placeholder="e.g., 25000" type="number" className="p-2 border mb-4 block w-64" />
        <label className="flex items-center mb-4">
          <input type="checkbox" id="tpCapToggle" className="mr-2" />
          <span id="tpCapLabel">Small Cap</span>
        </label>
        <button onClick={() => calculate('tp')} className="bg-black text-white px-6 py-2">Calculate</button>
        {tpVal !== null && <div className="mt-4 text-2xl font-bold">${tpVal.toLocaleString()}</div>}
      </div>

      {/* High School */}
      <div className="bg-white text-black p-6 rounded">
        <h2 className="text-xl font-bold mb-4">High School Valuation Tool</h2>
        <input id="hsPosition" placeholder="e.g., QB" className="p-2 border mb-2 block w-64" />
        <input id="hsRating" placeholder="e.g., 0.992" type="number" step="0.0001" className="p-2 border mb-2 block w-64" />
        <input id="hsFollowers" placeholder="e.g., 25000" type="number" className="p-2 border mb-4 block w-64" />
        <label className="flex items-center mb-4">
          <input type="checkbox" id="hsCapToggle" className="mr-2" />
          <span id="hsCapLabel">Small Cap</span>
        </label>
        <button onClick={() => calculate('hs')} className="bg-black text-white px-6 py-2">Calculate</button>
        {hsVal !== null && <div className="mt-4 text-2xl font-bold">${hsVal.toLocaleString()}</div>}
      </div>
    </div>
  );
}

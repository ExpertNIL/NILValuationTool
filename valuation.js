export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { type, position, rating, followers, capToggle } = req.body;

  const positionMultipliers = {
    QB: 1.4, RB: 1.0, WR: 1.2, TE: 1.0, OT: 1.25, OL: 1.0,
    IOL: 1.0, EDGE: 1.2, DT: 1.0, LB: 1.0, DB: 1.1, CB: 1.1,
    ATH: 1.15, S: 1.0, K: 1.0, P: 1.0
  };

  function getValue() { return 500000; } // placeholder
  const bonus = 10000;
  const base = getValue();
  const mult = positionMultipliers[position.toUpperCase()] || 1;
  let market = base * mult;
  if (!capToggle) market /= 1.75;

  return res.status(200).json({ valuation: Math.round(market + bonus) });
}

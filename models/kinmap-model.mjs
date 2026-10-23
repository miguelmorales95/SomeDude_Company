// Kinmap paying-family growth model. Month 0 = paid launch.
const NET = 7.0;          // blended net revenue/family/mo after store+payment fees (mix of $8.99/mo and $79.99/yr)
const VAR = 1.25;         // AI + storage + support per paying family/mo
const FIXED = 150;        // infra + tools/mo (Supabase Pro, Vercel Pro, domains, Apple dev, misc)
const GOAL_INCOME = 5200; // pre-tax profit needed for ~$4,000/mo take-home (self-employment + income tax)
const scenarios = {
  conservative: { start: 8,  growth: 0.08, cap: 90,  churn: 0.07, adsPerMonth: 0,   adsCAC: 0 },
  base:         { start: 15, growth: 0.10, cap: 150, churn: 0.05, adsPerMonth: 0,   adsCAC: 0 },
  baseAds:      { start: 15, growth: 0.10, cap: 150, churn: 0.05, adsPerMonth: 500, adsCAC: 60 },
  strong:       { start: 30, growth: 0.12, cap: 300, churn: 0.04, adsPerMonth: 1000, adsCAC: 45 },
};
for (const [name, s] of Object.entries(scenarios)) {
  let fam = 0, organic = s.start, cash = 0, minCash = 0, hitCost = null, hit1k = null, hitGoal = null;
  const rows = [];
  for (let m = 1; m <= 48; m++) {
    const adds = organic + (s.adsCAC ? s.adsPerMonth / s.adsCAC : 0);
    fam = fam * (1 - s.churn) + adds;
    organic = Math.min(s.cap, organic * (1 + s.growth));
    const profit = fam * (NET - VAR) - FIXED - s.adsPerMonth;
    cash += profit; minCash = Math.min(minCash, cash);
    if (hitCost === null && profit >= 0) hitCost = m;
    if (hit1k === null && profit >= 1000) hit1k = m;
    if (hitGoal === null && profit >= GOAL_INCOME) hitGoal = m;
    if ([3,6,12,18,24,36].includes(m)) rows.push(`m${m}: ${Math.round(fam)} fam, profit $${Math.round(profit)}`);
  }
  const ceiling = Math.round((s.cap + (s.adsCAC ? s.adsPerMonth / s.adsCAC : 0)) / s.churn);
  console.log(`${name}: covers costs m${hitCost}, $1k/mo m${hit1k}, $4k take-home m${hitGoal ?? ">48"}, worst cumulative cash $${Math.round(minCash)}, plateau ~${ceiling} fam (profit $${Math.round(ceiling*(NET-VAR)-FIXED-s.adsPerMonth)})\n   ${rows.join(" | ")}`);
}
// Ads break-even: LTV vs CAC
const ltv = (NET - VAR) / 0.05;
console.log(`LTV at 5% churn: $${ltv.toFixed(0)}; at 3%: $${((NET-VAR)/0.03).toFixed(0)}`);
for (const cpi of [2, 3, 5]) for (const conv of [0.02, 0.05, 0.10]) console.log(`CPI $${cpi}, install->paid ${conv*100}%: CAC $${(cpi/conv).toFixed(0)}`);

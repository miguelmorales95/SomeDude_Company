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

// One-time and physical revenue (Kinmap-Monetization.md §8). All guesses to replace with real orders.
// Each is profit after product cost, shipping, card fees and the reserve, not the sticker price.
const EXTRAS = {
  printShare: 0.10,       // share of paying families who order a print in a normal month
  printMargin: 15,        // profit per print order (poster, binder, calendar)
  holidayBoost: 3,        // November and December print orders × this (month 0 = March, so m8–m9, m20–m21, …)
  bundleShare: 0.30,      // share of new families who buy the Family History Project instead of a plain plan
  bundleExtra: 25,        // extra profit of a bundle over a plain year (it includes a book and a poster)
  legacyShare: 0.30,      // share of families who stop subscribing that buy "Keep forever"
  legacyNet: 40,          // $59 minus fees and a $15 storage reserve
};

const run = (s, extras) => {
  let fam = 0, organic = s.start, cash = 0, minCash = 0, hitCost = null, hit500 = null, hit1k = null, hitGoal = null;
  const rows = [];
  for (let m = 1; m <= 48; m++) {
    const adds = organic + (s.adsCAC ? s.adsPerMonth / s.adsCAC : 0);
    const leaving = fam * s.churn;
    fam = fam - leaving + adds;
    organic = Math.min(s.cap, organic * (1 + s.growth));
    let profit = fam * (NET - VAR) - FIXED - s.adsPerMonth;
    if (extras) {
      const holiday = [8, 9].includes(m % 12) ? EXTRAS.holidayBoost : 1;
      profit += fam * EXTRAS.printShare * holiday * EXTRAS.printMargin
        + adds * EXTRAS.bundleShare * EXTRAS.bundleExtra
        + leaving * EXTRAS.legacyShare * EXTRAS.legacyNet;
    }
    cash += profit; minCash = Math.min(minCash, cash);
    if (hitCost === null && profit >= 0) hitCost = m;
    if (hit500 === null && profit >= 500) hit500 = m;
    if (hit1k === null && profit >= 1000) hit1k = m;
    if (hitGoal === null && profit >= GOAL_INCOME) hitGoal = m;
    if ([3, 6, 12, 18, 24, 36].includes(m)) rows.push(`m${m}: ${Math.round(fam)} fam, $${Math.round(profit)}/mo, $${Math.round(cash)} so far`);
  }
  return { hitCost, hit500, hit1k, hitGoal, minCash, rows };
};

for (const [name, s] of Object.entries(scenarios)) for (const extras of [false, true]) {
  const r = run(s, extras);
  const ceiling = Math.round((s.cap + (s.adsCAC ? s.adsPerMonth / s.adsCAC : 0)) / s.churn);
  console.log(`${name}${extras ? " + prints, bundle, keep-forever" : ""}: covers costs m${r.hitCost}, $500/mo m${r.hit500}, $1k/mo m${r.hit1k}, $4k take-home m${r.hitGoal ?? ">48"}, worst cumulative cash $${Math.round(r.minCash)}${extras ? "" : `, plateau ~${ceiling} fam`}\n   ${r.rows.join(" | ")}`);
}
// Ads break-even: LTV vs CAC
const ltv = (NET - VAR) / 0.05;
console.log(`LTV at 5% churn: $${ltv.toFixed(0)}; at 3%: $${((NET-VAR)/0.03).toFixed(0)}`);
for (const cpi of [2, 3, 5]) for (const conv of [0.02, 0.05, 0.10]) console.log(`CPI $${cpi}, install->paid ${conv*100}%: CAC $${(cpi/conv).toFixed(0)}`);

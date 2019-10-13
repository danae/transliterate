import cylenian from './modes/cylenian.js';
import syrrin from './modes/syrrin.js';
import hongo from './modes/hongo.js';
import ludivi from './modes/ludivi.js';
import velaric from './modes/velaric.js';
import daedian from './modes/daedian.js';
import kuanga from './modes/kuanga.js';
import syhhttipp from './modes/syhhttipp.js';
import tatsuric from './modes/tatsuric.js';
import ulughese from './modes/ulughese.js';

let modes = [
  cylenian,
  syrrin,
  ludivi,
  velaric,
  daedian,
  kuanga,
  syhhttipp,
  tatsuric,
  ulughese
];

let normalizedModes = {};
for (let m in modes)
{
  let mode = modes[m];
  if (typeof mode.transliterations !== "undefined")
  {
    for (let t in mode.transliterations)
    {
      let transliteration = mode.transliterations[t];
      normalizedModes[m + '_' + t] = {
        name: mode.name + ' (' + transliteration.name + ')',
        category: mode.category,
        font: mode.font,
        charmap: transliteration.charmap,
        transliteration: transliteration.transliteration
      };
    }
  }
  else
    normalizedModes[m] = mode;
}

export default normalizedModes;

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

let normalizedModes = [];
for (let mode of modes)
{
  if (typeof mode.transliterations !== "undefined")
  {
    for (let transliteration of mode.transliterations)
    {
      normalizedModes.push({
        id: transliteration.id,
        name: mode.name + ' (' + transliteration.name + ')',
        category: mode.category,
        font: mode.font,
        charmap: transliteration.charmap,
        transliteration: transliteration.transliteration
      });
    }
  }
  else
    normalizedModes.push(mode);
}

export default normalizedModes;

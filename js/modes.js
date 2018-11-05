import cylenian from './modes/cylene/cylenian.js';
import syrrin from './modes/cylene/syrrin.js';
import ludivi from './modes/garah/ludivi.js';
import daedian from './modes/taratai/daedian.js';
import kuanga from './modes/taratai/kuanga.js';
import syhh_ttipp from './modes/taratai/syhh_ttipp.js';
import tatsuric from './modes/taratai/tatsuric.js';
import ulughese from './modes/taratai/ulughese.js';

let modes = {
  cylenian: cylenian,
  syrrin: syrrin,
  ludivi: ludivi,
  daedian: daedian,
  kuanga: kuanga,
  syhh_ttipp: syhh_ttipp,
  tatsuric: tatsuric,
  ulughese: ulughese
};

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

console.log(normalizedModes);

export default normalizedModes;

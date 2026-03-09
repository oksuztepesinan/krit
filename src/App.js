import { useState, useRef } from "react";

const ENGINEERS = [
  { id: "illangelo", name: "Illangelo", style: "Dark, atmospheric, cinematic. Vocal geri planda ama hissettiriyor. Mid-range boşluk sever. Reverb uzun, kuru hissettirir.", artists: "The Weeknd", genres: ["trap","rnb"] },
  { id: "mixedbyali", name: "MixedByAli", style: "Vocal clarity ustası. Punch'ı olan ama yorucu olmayan mix. Low-end kontrollü ve güçlü.", artists: "Kendrick, Drake", genres: ["hiphop","trap"] },
  { id: "younguru", name: "Young Guru", style: "Jay-Z okulu. Analog sıcaklık, punch, warmth. Dinamikleri öldürmez.", artists: "Jay-Z", genres: ["hiphop"] },
  { id: "mikedean", name: "Mike Dean", style: "Distortion ve layering ustası. Kaotik ama kontrollü. Karanlık enerji buradan geliyor.", artists: "Kanye, Travis Scott", genres: ["trap","hiphop"] },
  { id: "noah40", name: "Noah '40' Shebib", style: "Lo-fi emotional. Reverb heavy, intimate, space kullanımı mükemmel.", artists: "Drake", genres: ["rnb","hiphop"] },
  { id: "benbillions", name: "Ben Billions", style: "Modern trap clarity. 808 punch'ı mükemmel. Parlak, clean trap sesi.", artists: "Lil Baby, Gunna", genres: ["trap"] },
  { id: "derek", name: "Derek Ali", style: "Kendrick'in sesi. Macro dinamikler, space ve punch dengesi.", artists: "Kendrick Lamar", genres: ["hiphop"] },
  { id: "manny", name: "Manny Marroquin", style: "Pop-rap köprüsü. Temiz, geniş, radio-ready.", artists: "Post Malone, Rihanna", genres: ["trap","rnb"] },
  { id: "serban", name: "Serban Ghenea", style: "Mainstream mastering seviyesi mix. Her detay yerli yerinde.", artists: "Taylor Swift, The Weeknd", genres: ["rnb","hiphop"] },
  { id: "calvinjunior", name: "CJ Johnson", style: "New school drill/trap mix. Low-end kral, hi-hat crunch.", artists: "Lil Durk, Rod Wave", genres: ["trap","drill"] },
  { id: "colebbennett", name: "Vinylz", style: "Melodic trap ve R&B arası. Emotional derinlik, cinematic layer.", artists: "Drake, Beyoncé", genres: ["rnb","trap"] },
];

const PRODUCERS = {
  trap: [
    { id: "metro", name: "Metro Boomin", style: "Dark, cinematic, orchestral trap. Boşluk ustası." },
    { id: "southside", name: "Southside", style: "Hard, minimal. Kick ve 808 ilişkisi kusursuz." },
    { id: "wheezy", name: "Wheezy", style: "Melodic trap. Layer yönetimi güçlü." },
    { id: "pierre", name: "Pi'erre Bourne", style: "Psychedelic trap. Quirky, beklenmedik aranje." },
    { id: "tayk", name: "Tay Keith", style: "Agresif hi-hat pattern, punchy 808, bop tarzı." },
    { id: "oogie", name: "Oogie Mane", style: "Bubbly melodic trap, hook odaklı." },
    { id: "pyrex", name: "Pyrex Whippa", style: "Plug mix trap. Spaced out, eerie." },
    { id: "nick", name: "Nick Mira", style: "Juice WRLD tarzı melodic emo-trap." },
    { id: "ronny", name: "Ronny J", style: "Distorted 808, experimental structure." },
    { id: "buddah", name: "Buddah Bless", style: "NYC trap. Gritty, raw, punchy." },
  ],
  rnb: [
    { id: "nineteen85", name: "Nineteen85", style: "Sensual, spacious. Nefes alan R&B sesi." },
    { id: "noid", name: "No I.D.", style: "Soulful, sample-based. Hikaye anlatan aranje." },
    { id: "timbaland", name: "Timbaland", style: "Ritmik aranje ustası. Syncopation ve groove." },
    { id: "jahaan", name: "Jahaan Sweet", style: "Neo-soul R&B. Organik, derin, warm." },
    { id: "dmile", name: "D'Mile", style: "Grammy seviyesi R&B. Silk Sonic akıl hocası." },
    { id: "fisker", name: "Fisker", style: "UK R&B. Lo-fi hissiyle yüksek prodüksiyon." },
  ],
  hiphop: [
    { id: "dre", name: "Dr. Dre", style: "Boom bap meets modern. İkinci plan detayları mükemmel." },
    { id: "kanye", name: "Kanye West", style: "Soul chop, sıra dışı yapı, emotionality." },
    { id: "dilla", name: "J Dilla", style: "Groove ve intentional looseness. Feel her şeyin önünde." },
    { id: "hitboy", name: "Hit-Boy", style: "Modern yapı, hook odaklı, clean mix." },
    { id: "alchemist", name: "The Alchemist", style: "Sample flip ustası. Lo-fi cinematic, underground." },
    { id: "conductor", name: "Conductor Williams", style: "NY drill meets boom bap. Cinematic, sert." },
  ],
  drill: [
    { id: "808melo", name: "808 Melo", style: "UK drill. Dark melodies, sliding 808." },
    { id: "ghosty", name: "Ghosty", style: "NY drill. Eerie, atmospheric." },
    { id: "bandplay", name: "Bandplay", style: "Chicago drill. Hard, trunk rattling bass." },
    { id: "chopsquad", name: "Chopsquad DJ", style: "West Coast drill/hip-hop füzyonu." },
    { id: "axl", name: "AXL Beats", style: "Brooklyn drill. Dark piano, hollow 808." },
  ],
};

const TR_PRODUCERS = [
  { id: "djartz", name: "DJ Artz & Bugy", style: "Türk trap'in kurucuları. Raw enerji, güçlü 808." },
  { id: "farazi", name: "Farazi", style: "Melodic Türkçe trap. Atmosferik ve duygusal." },
  { id: "pango", name: "Pango", style: "Modern Türkçe trap & drill. Dark ve minimalist." },
  { id: "stres", name: "Stres", style: "Sert Türkçe rap altyapıları, boom bap ruhu." },
];

const FLOW_ARTISTS = [
  { id: "kendrick", name: "Kendrick Lamar", style: "Narrative yapı, syllable yoğunluğu, tempo değişimi." },
  { id: "drake", name: "Drake", style: "Hook yazımı, emotional arc, verse-chorus dengesi." },
  { id: "nf", name: "NF", style: "Emotional yoğunluk, internal rhyme, build-up & release." },
  { id: "jcole", name: "J. Cole", style: "Hikaye anlatımı, internal rhyme, bölüm geçişleri." },
  { id: "future", name: "Future", style: "Melodic flow, repetition as texture, adlib ustası." },
  { id: "travis", name: "Travis Scott", style: "Atmosfer yaratma, ad-lib kültürü, bölüm sürprizleri." },
  { id: "ezhel", name: "Ezhel", style: "Türkçe hip-hop akışı, kafiye yoğunluğu, sokak anlatımı." },
  { id: "motive", name: "Motive", style: "Türkçe trap flow, melodic yaklaşım, duygusal derinlik." },
  { id: "youngthug", name: "Young Thug", style: "Alışılmadık melodi, phonetic yaratıcılık, adlib layer." },
  { id: "lildurk", name: "Lil Durk", style: "Melodic drill, emotional storytelling, hook gücü." },
  { id: "rodwave", name: "Rod Wave", style: "Soul trap, vulnerability, melodik yoğunluk." },
  { id: "polo", name: "Polo G", style: "Storytelling, introspective, melodic rap füzyonu." },
  { id: "baby", name: "Lil Baby", style: "Flow sürekliliği, minimalist kelime, ritim tutturma." },
  { id: "carti", name: "Playboi Carti", style: "Punk trap, texture olarak vokal, anti-yapı." },
];

const GENRE_STANDARDS = {
  trap: {
    lufs_note: "Trap'te -7 ile -10 LUFS normal. -8 LUFS streaming için standart. True Peak -0.3/-0.6 dBTP yaygın ve kabul edilebilir.",
    lufs_ok: (v) => v >= -12 && v <= -6,
    true_peak_ok: (v) => v <= -0.3,
    dr_note: "6-9 dB DR trap'te standarttır. Fazla DR 808 punch'ını zayıflatır.",
    eq_tips: "Sub bass (20-60Hz) boost 2-3dB. Kick punch için 60-80Hz. 200-300Hz muddy bölge -3dB. Presence 3-5kHz +2dB. Air 12-16kHz +1.5dB.",
    stereo_tips: "Low-end mono altında 120Hz. Mid genişliği orta düzey. High-end wide (+60%). Stereo width 110-130%.",
    groove_tips: "Hi-hat swing %60-70. Kick grid'e tam otur. 808 slide attack 10-20ms. Snare slight push.",
    compression: "808: ratio 4:1, attack 30ms, release 100ms. Vocal: ratio 3:1, attack 5ms, fast release. Glue: SSL G-Bus ratio 2:1.",
    tension_factors: "Tension: drop öncesi build-up, hi-hat roll, pitch rise, sub drop, silence, reversed elements.",
  },
  rnb: {
    lufs_note: "R&B'de -10 ile -14 LUFS hedef. Fazla sıkıştırma duygusallığı ve dinamiği öldürür.",
    lufs_ok: (v) => v >= -15 && v <= -9,
    true_peak_ok: (v) => v <= -1,
    dr_note: "8-12 dB DR ideal. Breath ve dinamik R&B'nin kalbi.",
    eq_tips: "Warmth 100-200Hz +1.5dB. Boxiness 300-400Hz -2dB. Clarity 2-4kHz +1dB. Vocal air 10-12kHz +2dB. Low-cut 80Hz.",
    stereo_tips: "Geniş stereo field. Vocal center. Pad ve atmosphere wide. Width 120-140%.",
    groove_tips: "Swing %55-65. Loose feel. Kick ve bass pocket'ta. Hiç sıkıştırma yok feel'e.",
    compression: "Vocal: optical kompresör, ratio 2:1, slow attack. Bus: Neve emülasyon, gentle ratio. Minimal brick-wall.",
    tension_factors: "Tension: vocal breath, dynamic contrast, space ve silence, harmonic anticipation, rythmik displacement.",
  },
  hiphop: {
    lufs_note: "Hip-hop'ta -9 ile -12 LUFS standart. Boom bap daha geniş DR ister. -10 LUFS hedef.",
    lufs_ok: (v) => v >= -13 && v <= -8,
    true_peak_ok: (v) => v <= -0.5,
    dr_note: "7-10 dB DR iyi aralık. Punch ve clarity dengesi kritik.",
    eq_tips: "Kick punch 60Hz +3dB. Snare crack 200Hz ve 5kHz. Vocal presence 3kHz +2dB. Sub control 40Hz high-pass. Sample warmth 150-300Hz.",
    stereo_tips: "Sample stereo korur. Drums mono. Vocal center. Adlibs wide. Width 100-120%.",
    groove_tips: "Dilla-style loose quantize. Kick slightly behind beat. Snare slight lag. Shuffle 50-60%.",
    compression: "Sample: minimal, preserve punch. Vocal: ratio 4:1, medium attack. Drums: NY parallel compression. Bus: gentle 2:1.",
    tension_factors: "Tension: sample chop timing, bar breaks, adlib call-response, dynamic drops, acapella moments.",
  },
  drill: {
    lufs_note: "Drill'de -8 ile -11 LUFS kabul edilebilir. Ağır 808 bass için headroom kritik.",
    lufs_ok: (v) => v >= -12 && v <= -7,
    true_peak_ok: (v) => v <= -0.5,
    dr_note: "6-8 dB DR drill'de norm. 808 slide için low-end headroom bırak.",
    eq_tips: "808 sub 40-60Hz boost. Kick click 3-5kHz. Hi-hat brightness 8-12kHz. Melody darkness: high-cut 8kHz. Mid scoop 400-600Hz -2dB.",
    stereo_tips: "808 mono. Melody mid-wide. Hi-hats wide. Pads atmospheric, very wide. Width 90-120%.",
    groove_tips: "Hi-hat triplet feel. Kick hard grid. 808 slide portamento. Dark, ominous groove. Delay throws.",
    compression: "808: sidechain to kick, ratio 6:1. Melody: light, preserve atmosphere. Drums: hard limiting. Master: aggressive limiting.",
    tension_factors: "Tension: sliding 808 builds, eerie melody, silence cuts, ominous pad swells, bass drops.",
  },
};

const REFERENCE_TRACKS = {
  trap: [
    "Metro Boomin & Future — Like That",
    "Travis Scott — SICKO MODE",
    "Young Thug — Digits",
    "Gunna — Drip Season",
    "Lil Baby — The Bigger Picture",
    "Future — March Madness",
    "21 Savage — a lot",
    "Playboi Carti — Magnolia",
    "NAV — Turks",
    "Drake — Nonstop",
    "Offset — clout",
    "Lil Uzi Vert — XO Tour Llif3",
    "Roddy Ricch — The Box",
    "Lil Baby — Freestyle",
    "Gunna — DOLLAZ ON MY HEAD",
    "Future — Low Life",
    "Travis Scott — Goosebumps",
    "Young Thug — Best Friend",
    "Lil Baby — Sum 2 Prove",
    "Polo G — Pop Out",
    "NBA YoungBoy — Outside Today",
    "Moneybagg Yo — Said Sum",
    "42 Dugg — 4 Da Gang",
    "Lil Durk — India",
    "Jack Harlow — What's Poppin",
    "Cardi B — Bodak Yellow",
    "Migos — Bad and Boujee",
    "Quavo — Workin Me",
    "21 Savage — Rockstar",
    "Post Malone — Psycho",
    "Trippie Redd — Love Scars",
    "Juice WRLD — Lucid Dreams",
    "Rod Wave — Heart on Ice",
    "NLE Choppa — Shotta Flow",
    "DaBaby — Rockstar",
  ],
  rnb: [
    "The Weeknd — Blinding Lights",
    "Frank Ocean — Nights",
    "SZA — Kill Bill",
    "Daniel Caesar — Best Part",
    "Giveon — Heartbreak Anniversary",
    "H.E.R. — Focus",
    "Summer Walker — Come Thru",
    "Bryson Tiller — Exchange",
    "6LACK — PRBLMS",
    "Khalid — Location",
    "Brent Faiyaz — Gravity",
    "Snoh Aalegra — I Want You Around",
    "Lucky Daye — Roll Some Mo",
    "Jhené Aiko — Triggered",
    "Miguel — Sure Thing",
    "Partynextdoor — Rendezvous",
    "Jeremih — Don't Tell Em",
    "Tory Lanez — Say It",
    "Chris Brown — No Guidance",
    "Usher — Climax",
    "Kehlani — Honey",
    "Ari Lennox — Shea Butter Baby",
    "Doja Cat — Need to Know",
    "Victoria Monét — On My Mama",
    "Chloe x Halle — Do It",
    "Tinashe — 2 On",
    "Ella Mai — Boo'd Up",
    "Mahalia — Sober",
    "Jordan Ward — Forward",
    "Masego — Queen Tings",
  ],
  hiphop: [
    "Kendrick Lamar — HUMBLE.",
    "J. Cole — Love Yourz",
    "Jay-Z — The Story of O.J.",
    "Drake — God's Plan",
    "Kanye West — Runaway",
    "Pusha T — Infrared",
    "Tyler the Creator — EARFQUAKE",
    "Mac Miller — Circles",
    "Nas — Ultra Black",
    "Joey Bada$$ — Land of the Free",
    "Kendrick Lamar — DNA.",
    "J. Cole — Middle Child",
    "Drake — Rich Flex",
    "Kanye West — Black Skinhead",
    "Big Sean — Blessings",
    "Logic — 1-800-273-8255",
    "Wale — The Need to Know",
    "Meek Mill — Championships",
    "A$AP Rocky — Praise the Lord",
    "Travis Scott — Upper Echelon",
    "21 Savage — Offended",
    "Schoolboy Q — Numb Numb Juice",
    "Isaiah Rashad — Rope",
    "Denzel Curry — CLOUT COBAIN",
    "JID — Never",
    "Freddie Gibbs — Scottie Beam",
    "Boldy James — Surf and Turf",
    "Larry June — Spill the Juice",
    "Conway the Machine — Lemon",
    "Benny the Butcher — Trade It All",
  ],
  drill: [
    "Pop Smoke — Welcome to the Party",
    "Fivio Foreign — Big Drip",
    "Sheff G — No Suburban",
    "Lil Durk — India",
    "Polo G — Pop Out",
    "Chief Keef — Faneto",
    "Central Cee — Loading",
    "Dave — Psycho",
    "Unknown T — Homerton B",
    "Pop Smoke — Dior",
    "Fivio Foreign — 800 BC",
    "Kay Flock — Being Honest",
    "Sleepy Hallow — Deep End Freestyle",
    "Sheff G — Spin",
    "Bizzy Banks — No Lacking",
    "Lil TJay — Brothers",
    "Digga D — Woi",
    "M Huncho — Overseas",
    "Headie One — Pound Signs",
    "SkiMask — Catch Me Outside",
    "Trippie Redd — Taking a Walk",
    "Chief Keef — Love Sosa",
    "G Herbo — PTSD",
    "King Von — Took Her to the O",
    "Polo G — Through Da Storm",
    "Lil Durk — The Voice",
    "Moneybagg Yo — Paranoia",
    "42 Dugg — Free Me",
    "Rylo Rodriguez — Letter to Lucifer",
    "NoCap — Ghetto Angels",
  ],
};

const DEFAULT_PLUGINS = ["FabFilter", "Waves", "iZotope", "UAD", "Native Instruments", "Studio One 6"];
const GENRES = [{ id: "trap", label: "Trap" }, { id: "rnb", label: "R&B" }, { id: "hiphop", label: "Hip-Hop" }, { id: "drill", label: "Drill" }];
const MODES = [
  { id: "demo", label: "Demo", desc: "Kulak analizi" },
  { id: "mix", label: "Final Mix", desc: "Teknik + kulak" },
  { id: "master", label: "Mastering", desc: "Streaming standartı" },
];

const analyzeAudioFile = async (file) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const channelData = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const duration = audioBuffer.duration;

  let sumSquares = 0;
  for (let i = 0; i < channelData.length; i++) sumSquares += channelData[i] * channelData[i];
  const rms = Math.sqrt(sumSquares / channelData.length);
  const rmsDb = 20 * Math.log10(rms + 1e-10);

  let peak = 0;
  for (let i = 0; i < channelData.length; i++) if (Math.abs(channelData[i]) > peak) peak = Math.abs(channelData[i]);
  const peakDb = 20 * Math.log10(peak + 1e-10);
  const lufs = rmsDb - 0.691;
  const dynamicRange = peakDb - rmsDb;

  const frameSize = Math.floor(sampleRate * 0.02);
  const energyFrames = [];
  for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
    let e = 0;
    for (let j = 0; j < frameSize; j++) e += channelData[i + j] * channelData[i + j];
    energyFrames.push(e / frameSize);
  }
  const onsets = [];
  for (let i = 1; i < energyFrames.length - 1; i++) {
    if (energyFrames[i] > energyFrames[i-1] * 1.5 && energyFrames[i] > energyFrames[i+1] * 0.8) onsets.push(i);
  }
  let bpm = 120;
  if (onsets.length > 2) {
    const intervals = [];
    for (let i = 1; i < Math.min(onsets.length, 20); i++) intervals.push((onsets[i] - onsets[i-1]) * frameSize / sampleRate);
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    bpm = Math.round(60 / avg);
    if (bpm < 60) bpm *= 2;
    if (bpm > 200) bpm = Math.round(bpm / 2);
    bpm = Math.max(60, Math.min(200, bpm));
  }

  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  const freqData = new Uint8Array(analyser.frequencyBinCount);
  source.start();
  await new Promise(r => setTimeout(r, 100));
  analyser.getByteFrequencyData(freqData);
  source.stop();

  const binSize = sampleRate / analyser.fftSize;
  const avg = arr => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  const lowAvg = avg(Array.from(freqData.slice(0, Math.floor(200 / binSize))));
  const midAvg = avg(Array.from(freqData.slice(Math.floor(200 / binSize), Math.floor(4000 / binSize))));
  const highAvg = avg(Array.from(freqData.slice(Math.floor(4000 / binSize))));

  // Groove analizi: energy variance (dinamik değişim)
  const segmentCount = 16;
  const segmentLength = Math.floor(channelData.length / segmentCount);
  const segments = [];
  for (let s = 0; s < segmentCount; s++) {
    let segRms = 0;
    for (let i = s * segmentLength; i < (s + 1) * segmentLength; i++) segRms += channelData[i] * channelData[i];
    segRms = Math.sqrt(segRms / segmentLength);
    const segDb = 20 * Math.log10(segRms + 1e-10);
    const timeMin = Math.floor((s * duration / segmentCount) / 60);
    const timeSec = Math.floor((s * duration / segmentCount) % 60);
    segments.push({ time: `${timeMin}:${timeSec.toString().padStart(2, "0")}`, energy: Math.round((segRms / (peak + 1e-10)) * 100), db: Math.round(segDb * 10) / 10 });
  }

  // Groove score: energy değişim varyansı
  const energyValues = segments.map(s => s.energy);
  const energyMean = avg(energyValues);
  const variance = avg(energyValues.map(v => (v - energyMean) ** 2));
  const grooveScore = Math.min(100, Math.round(Math.sqrt(variance) * 3));

  // Tension score: yüksek enerji segmentleri öncesindeki düşük segmentler
  let tensionScore = 0;
  for (let i = 1; i < segments.length; i++) {
    if (segments[i].energy > segments[i-1].energy * 1.4) tensionScore += 15;
    if (segments[i].energy < segments[i-1].energy * 0.6) tensionScore += 10;
  }
  tensionScore = Math.min(100, tensionScore);

  await audioContext.close();
  return {
    duration: Math.round(duration), bpm,
    rmsDb: Math.round(rmsDb * 10) / 10,
    peakDb: Math.round(peakDb * 10) / 10,
    lufs: Math.round(lufs * 10) / 10,
    dynamicRange: Math.round(dynamicRange * 10) / 10,
    lowEnd: Math.round(lowAvg), midRange: Math.round(midAvg), highEnd: Math.round(highAvg),
    segments, channels: audioBuffer.numberOfChannels, sampleRate,
    grooveScore, tensionScore,
  };
};

const Tag = ({ children, color = "#E8FF47" }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color, background: color + "22", fontFamily: "'DM Mono', monospace" }}>{children}</span>
);
const Pill = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 20, border: active ? "none" : "1px solid #2a2a2a", background: active ? "#E8FF47" : "#1a1a1a", color: active ? "#080808" : "#666", fontSize: 12, fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all 0.15s" }}>{children}</button>
);
const Card = ({ children, style = {} }) => (
  <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 14, padding: "16px", ...style }}>{children}</div>
);
const Label = ({ children }) => (
  <div style={{ color: "#555", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{children}</div>
);

function ScoreBar({ label, value, color = "#E8FF47" }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ color: "#555", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{label}</span>
        <span style={{ color, fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 2, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

function EnergyMap({ segments }) {
  if (!segments || !segments.length) return null;
  const displaySegs = segments.slice(0, 16);
  const max = Math.max(...displaySegs.map(s => s.energy), 1);
  return (
    <Card style={{ marginBottom: 16 }}>
      <Label>Enerji Haritası</Label>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 80, marginBottom: 12 }}>
        {displaySegs.map((seg, i) => {
          const h = Math.max(6, (seg.energy / max) * 72);
          const color = seg.risk === "high" ? "#FF4D4D" : seg.risk === "good" ? "#69DB7C" : "#E8FF47";
          return (
            <div key={i} style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", height: h, borderRadius: 2, background: color, opacity: seg.risk === "normal" ? 0.5 : 0.9 }} />
              {seg.risk !== "normal" && <div style={{ position: "absolute", top: -14, fontSize: 8 }}>{seg.risk === "high" ? "⚠" : "✓"}</div>}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {displaySegs.filter((_, i) => i % 4 === 0).map((seg, i) => (
          <span key={i} style={{ color: "#555", fontSize: 9, fontFamily: "'DM Mono', monospace" }}>{seg.time}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
        {[["#69DB7C", "Güçlü"], ["#E8FF47", "Normal"], ["#FF4D4D", "Zayıf"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            <span style={{ color: "#555", fontSize: 10 }}>{l}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TechStats({ stats, genre, mode }) {
  if (!stats || mode === "demo") return null;
  const std = GENRE_STANDARDS[genre] || GENRE_STANDARDS.trap;
  const items = [
    { label: "LUFS", value: `${stats.lufs} dB`, warn: !std.lufs_ok(stats.lufs) },
    { label: "RMS", value: `${stats.rmsDb} dB`, warn: false },
    { label: "True Peak", value: `${stats.peakDb} dB`, warn: !std.true_peak_ok(stats.peakDb) },
    { label: "BPM", value: stats.bpm, warn: false },
    { label: "Dinamik Aralık", value: `${stats.dynamicRange} dB`, warn: stats.dynamicRange < 5 },
    { label: "Süre", value: `${Math.floor(stats.duration/60)}:${(stats.duration%60).toString().padStart(2,"0")}`, warn: false },
  ];
  return (
    <Card style={{ marginBottom: 16 }}>
      <Label>Teknik Ölçümler</Label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        {items.map(item => (
          <div key={item.label} style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 12px", border: `1px solid ${item.warn ? "#FF4D4D44" : "#2a2a2a"}` }}>
            <div style={{ color: "#555", fontSize: 9, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{item.label}</div>
            <div style={{ color: item.warn ? "#FF4D4D" : "#E8FF47", fontSize: 15, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <ScoreBar label="GROOVE" value={stats.grooveScore} color="#69DB7C" />
        <ScoreBar label="TENSION" value={stats.tensionScore} color="#FF9500" />
      </div>
      <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "8px 12px", border: "1px solid #2a2a2a", marginBottom: 8 }}>
        <div style={{ color: "#555", fontSize: 9, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>FREKANS DAĞILIMI</div>
        <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 28 }}>
          {[{ label: "LOW", val: stats.lowEnd }, { label: "MID", val: stats.midRange }, { label: "HIGH", val: stats.highEnd }].map(f => (
            <div key={f.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", height: Math.max(3, (f.val / 255) * 24), borderRadius: 2, background: "#E8FF47", opacity: 0.7 }} />
              <span style={{ color: "#444", fontSize: 8, fontFamily: "'DM Mono', monospace" }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "8px 10px", background: "#111", borderRadius: 8, border: "1px solid #1e1e1e" }}>
        <span style={{ color: "#666", fontSize: 11, lineHeight: 1.5 }}>{std.lufs_note}</span>
      </div>
    </Card>
  );
}

function TodoList({ items, onToggle }) {
  if (!items || !items.length) return null;
  const done = items.filter(i => i.done).length;
  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Label>Yapılacaklar</Label>
        <span style={{ color: "#555", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{done}/{items.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} onClick={() => onToggle(i)} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", padding: "8px 10px", borderRadius: 8, background: item.done ? "#1a1a1a" : "#1e1e1e", border: `1px solid ${item.done ? "#2a2a2a" : "#333"}` }}>
            <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, marginTop: 1, border: `1.5px solid ${item.done ? "#E8FF47" : "#444"}`, background: item.done ? "#E8FF47" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.done && <span style={{ fontSize: 9, color: "#080808", fontWeight: 800 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: item.done ? "#555" : "#ccc", textDecoration: item.done ? "line-through" : "none", lineHeight: 1.4 }}>{item.text}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FeedbackCard({ item, index }) {
  const [open, setOpen] = useState(index === 0);
  const tagColor = item.severity === "critical" ? "#FF4D4D" : item.severity === "warning" ? "#FFB347" : "#69DB7C";
  const tagLabel = item.severity === "critical" ? "KRİTİK" : item.severity === "warning" ? "DÜZELTİLEBİLİR" : "İYİ";
  return (
    <div style={{ background: "#141414", border: `1px solid ${open ? "#2a2a2a" : "#1e1e1e"}`, borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#555", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{item.timestamp}</span>
          <span style={{ color: "#aaa", fontSize: 13, fontWeight: 500 }}>{item.section}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Tag color={tagColor}>{tagLabel}</Tag>
          <span style={{ color: "#444", fontSize: 12 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid #1e1e1e" }}>
          <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, margin: "12px 0 8px" }}>{item.feedback}</p>
          {item.plugin_tip && (
            <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "8px 12px", border: "1px solid #2a2a2a" }}>
              <span style={{ color: "#E8FF47", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>🎛 {item.plugin_tip}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChatBot({ genre, mode, audioStats, analysis }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "KRIT burada. Analiz hakkında soru sor, mix kararlarını tartış, plugin önerisi iste. Ne soruyorsun?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef();

  const std = GENRE_STANDARDS[genre] || GENRE_STANDARDS.trap;

  const systemPrompt = `Sen KRIT'sin — sert, dürüst, teknik müzik prodüksiyon koçu. Kullanıcıyla fikir alışverişi yapıyorsun. Kısa, net, Türkçe cevaplar ver. Gereksiz övgü yok.

${audioStats ? `Analiz edilen şarkı: ${audioStats.bpm} BPM, ${audioStats.lufs} LUFS, ${audioStats.peakDb} dBTP, ${audioStats.dynamicRange} dB DR, Groove: ${audioStats.grooveScore}%, Tension: ${audioStats.tensionScore}%` : ""}
${analysis ? `Genel puan: ${analysis.overall_score}/10. Verdict: ${analysis.overall_verdict}` : ""}
Genre: ${genre}. Mod: ${mode}.
EQ rehberi: ${std.eq_tips}
Stereo: ${std.stereo_tips}
Groove: ${std.groove_tips}
Kompresyon: ${std.compression}
Tension: ${std.tension_factors}`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 600,
          system: systemPrompt,
          messages: [...history, { role: "user", content: userMsg }]
        }),
      });
      const data = await res.json();
      if (!data.content) throw new Error("API hatası");
      const text = data.content.map(b => b.text || "").join("");
      setMessages(prev => [...prev, { role: "assistant", text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", text: "Bir hata oluştu. Tekrar dene." }]);
    }
    setLoading(false);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <Card style={{ marginTop: 16 }}>
      <Label>KRIT ile Fikir Alışverişi</Label>
      <div style={{ maxHeight: 280, overflowY: "auto", marginBottom: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "10px 13px", borderRadius: msg.role === "user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px", background: msg.role === "user" ? "#E8FF47" : "#1e1e1e", color: msg.role === "user" ? "#080808" : "#ccc", fontSize: 13, lineHeight: 1.6 }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 4, padding: "10px 13px" }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#444", animation: `pulse 0.8s ease-in-out ${i * 200}ms infinite alternate` }} />)}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Sor..."
          style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: 13, outline: "none" }}
        />
        <button onClick={sendMessage} disabled={loading} style={{ background: "#E8FF47", border: "none", borderRadius: 10, padding: "10px 16px", color: "#080808", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>→</button>
      </div>
    </Card>
  );
}

export default function KRIT() {
  const [screen, setScreen] = useState("upload");
  const [mode, setMode] = useState("demo");
  const [genre, setGenre] = useState("trap");
  const [engineerMode, setEngineerMode] = useState("both");
  const [plugins, setPlugins] = useState(DEFAULT_PLUGINS);
  const [newPlugin, setNewPlugin] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [demoFile, setDemoFile] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [audioStats, setAudioStats] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [energySegments, setEnergySegments] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("mix");
  const [analyzingStep, setAnalyzingStep] = useState("");
  const demoInputRef = useRef();

  const buildSystemPrompt = (stats) => {
    const pluginList = plugins.join(", ");
    const std = GENRE_STANDARDS[genre] || GENRE_STANDARDS.trap;
    const refs = (REFERENCE_TRACKS[genre] || []).join(", ");
    const genreProducers = [...(PRODUCERS[genre] || []), ...TR_PRODUCERS].map(p => `${p.name}: ${p.style}`).join("\n");
    const engineerList = ENGINEERS.map(e => `${e.name}: ${e.style} [${e.artists}]`).join("\n");
    const flowList = FLOW_ARTISTS.map(a => `${a.name}: ${a.style}`).join("\n");

    const modeContext = mode === "demo"
      ? "MOD: Demo analizi. Mastering/LUFS değerlerine odaklanma. Odak: aranje, mix kararları, enerji akışı, hook gücü, prodüksiyon kalitesi, groove ve tension."
      : mode === "mix"
      ? "MOD: Final Mix. Teknik ölçümler kritik. LUFS, True Peak, frekans, stereo, groove, tension — hepsini incele."
      : "MOD: Mastering. Spotify -14 LUFS, Apple -16 LUFS, True Peak max -1 dBTP. Streaming için optimize et.";

    const perspectiveContext = engineerMode === "producer"
      ? "PERSPEKTİF: Sadece prodüktör: aranje, melodi, beat yapısı, section geçişleri, groove, tension arc."
      : engineerMode === "engineer"
      ? "PERSPEKTİF: Sadece mix mühendisi: EQ, kompresyon, reverb, stereo, loudness, saturation."
      : "PERSPEKTİF: Hem prodüktör hem mühendis gözüyle tam analiz.";

    const techContext = stats && mode !== "demo" ? `
TEKNİK ÖLÇÜMLER:
- LUFS: ${stats.lufs} dB (${std.lufs_note})
- RMS: ${stats.rmsDb} dB | True Peak: ${stats.peakDb} dB ${!std.true_peak_ok(stats.peakDb) ? "(DİKKAT)" : "(OK)"}
- BPM: ${stats.bpm} | DR: ${stats.dynamicRange} dB | ${std.dr_note}
- Low/Mid/High: ${stats.lowEnd}/${stats.midRange}/${stats.highEnd} (0-255)
- Kanal: ${stats.channels === 2 ? "Stereo" : "Mono"} | ${stats.sampleRate}Hz
- Groove Score: ${stats.grooveScore}% | Tension Score: ${stats.tensionScore}%
` : stats ? `BPM: ${stats.bpm} | Groove: ${stats.grooveScore}% | Tension: ${stats.tensionScore}%` : "";

    return `Sen KRIT'sin — 2026 yılının en güncel müzik prodüksiyon koçu. Grammy seviyesi bilgin var. Asla yumuşatmazsın. Türkçe, teknik, sert.

${modeContext}
${perspectiveContext}
Plugin havuzu: ${pluginList}
Genre: ${genre}
${techContext}

GENRE STANDARTLARI (${genre.toUpperCase()}):
EQ: ${std.eq_tips}
Stereo: ${std.stereo_tips}
Groove: ${std.groove_tips}
Kompresyon: ${std.compression}
Tension faktörleri: ${std.tension_factors}

2026 GAME-CHANGER TEKNİKLER:
- Parallel compression (NY style): 808 ve drum punch için şart
- Mid-Side EQ: stereo field hassas kontrolü
- Dynamic EQ (FabFilter Pro-Q3): maskelenen frekansları açar
- Transient shaping: drum attack/sustain bağımsız kontrolü
- Multiband sidechain: kick-bass ilişkisi için
- Stem mastering: artık endüstri standardı
- True Peak limiter (inter-sample clipping önler)
- Saturation + harmonic excitation: analog warmth
- Vocal alignment + Melodyne pitch correction
- Bus glue: SSL G-Bus veya Neve 33609 emülasyon
- Room impulse response: gerçekçi reverb için
- Transient roll: attack yumuşatma, modern trap trendi
- Frequency-dependent stereo width: Ozone Imager
- Parallel distortion: lo-end saturation için
- Automation: her parametre animasyonlu olmalı

MÜHENDİSLER:
${engineerList}

PRODÜKTÖRLER (${genre}):
${genreProducers}

FLOW/YAPI:
${flowList}

REFERANS ŞARKILAR (${genre} — 30+ şarkı):
${refs}

SADECE JSON DÖNDÜR:
{
  "suggestion": {
    "engineer": "isim",
    "engineer_reason": "2-3 cümle spesifik, ölçümlere atıf",
    "producer": "isim",
    "producer_reason": "2-3 cümle spesifik",
    "reference_track": "Sanatçı — Şarkı",
    "reference_reason": "1-2 cümle spesifik benzerlik"
  },
  "energy_segments": [
    {"time": "0:00", "energy": 40, "risk": "normal", "label": "Intro"}
  ],
  "feedback": {
    "mix": [{"timestamp": "0:00", "section": "Bölüm", "severity": "critical|warning|good", "feedback": "Detaylı sert feedback.", "plugin_tip": "Plugin: ayar veya null"}],
    "aranje": [{"timestamp": "0:00", "section": "Bölüm", "severity": "warning", "feedback": "Feedback.", "plugin_tip": null}],
    "flow": [{"timestamp": "0:00", "section": "Bölüm", "severity": "warning", "feedback": "Feedback.", "plugin_tip": null}]
  },
  "todo": ["Madde 1", "Madde 2", "Madde 3", "Madde 4", "Madde 5"],
  "overall_score": 7.2,
  "overall_verdict": "2-3 cümle sert genel yorum, groove/tension/ölçümlere atıf"
}`;
  };

  const analyze = async () => {
    if (!demoFile) return;
    setScreen("analyzing");
    setError(null);
    try {
      setAnalyzingStep("Ses analiz ediliyor...");
      const stats = await analyzeAudioFile(demoFile);
      setAudioStats(stats);

      const avgEnergy = stats.segments.reduce((a, b) => a + b.energy, 0) / stats.segments.length;
      const segsWithRisk = stats.segments.map(seg => ({
        ...seg,
        risk: seg.energy > avgEnergy * 1.3 ? "good" : seg.energy < avgEnergy * 0.6 ? "high" : "normal"
      }));
      setEnergySegments(segsWithRisk);

      setAnalyzingStep("KRIT değerlendiriyor...");
      const segText = segsWithRisk.slice(0, 8).map(s => `${s.time}: %${s.energy}`).join(", ");
      const userMsg = `Şarkı analiz edildi. Segmentler: ${segText}. Genre: ${genre}, Mod: ${mode}, Perspektif: ${engineerMode}. Groove: ${stats.grooveScore}%, Tension: ${stats.tensionScore}%. Kapsamlı analiz yap.`;

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-opus-4-5", max_tokens: 4000, system: buildSystemPrompt(stats), messages: [{ role: "user", content: userMsg }] }),
      });
      if (!res.ok) throw new Error("API hatası: " + res.status);
      const data = await res.json();
      if (!data.content) throw new Error(JSON.stringify(data));
      const text = data.content.map(b => b.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

      setSuggestion(parsed.suggestion);
      setAnalysis(parsed);
      if (parsed.energy_segments?.length) setEnergySegments(parsed.energy_segments.map(s => ({ ...s, risk: s.risk || "normal" })));
      setTodoItems((parsed.todo || []).map(t => ({ text: t, done: false })));
      setScreen("suggestion");
    } catch (e) {
      setError("Analiz başarısız: " + e.message);
      setScreen("upload");
    }
  };

  const toggleTodo = (i) => setTodoItems(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  const fmtSize = (b) => b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1000).toFixed(0)} KB`;

  const goBack = () => {
    if (screen === "feedback") setScreen("suggestion");
    else if (screen === "suggestion") setScreen("upload");
  };

  const reset = () => {
    setScreen("upload");
    setAnalysis(null);
    setSuggestion(null);
    setAudioStats(null);
    setDemoFile(null);
    setError(null);
  };

  const std = GENRE_STANDARDS[genre] || GENRE_STANDARDS.trap;

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "'DM Sans', sans-serif", backgroundImage: "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(232,255,71,0.06) 0%, transparent 60%)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; } @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } } @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} } button { font-family: 'DM Sans', sans-serif; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }`}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "rgba(8,8,8,0.95)", backdropFilter: "blur(10px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {(screen === "suggestion" || screen === "feedback") && (
            <button onClick={goBack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18, padding: "0 8px 0 0" }}>←</button>
          )}
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 20, letterSpacing: 4, color: "#fff" }}>KRIT</span>
          {screen === "feedback" && analysis && (
            <div style={{ width: 34, height: 34, borderRadius: 8, border: "2px solid #E8FF47", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8 }}>
              <span style={{ color: "#E8FF47", fontWeight: 800, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{analysis.overall_score?.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(screen === "suggestion" || screen === "feedback") && (
            <button onClick={reset} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#666", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 11 }}>Yeni Analiz</button>
          )}
          <button onClick={() => setShowSettings(!showSettings)} style={{ background: showSettings ? "#1e1e1e" : "#1a1a1a", border: "1px solid #2a2a2a", color: "#666", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 14 }}>⚙</button>
        </div>
      </div>

      {showSettings && (
        <div style={{ background: "#111", borderBottom: "1px solid #1a1a1a", padding: "16px 20px" }}>
          <Label>Plugin Havuzu</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {plugins.map(p => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 4, background: "#1e1e1e", border: "1px solid #2a2a2a", borderRadius: 6, padding: "4px 8px" }}>
                <span style={{ fontSize: 12, color: "#aaa" }}>{p}</span>
                <button onClick={() => setPlugins(prev => prev.filter(x => x !== p))} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 14, padding: 0 }}>×</button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={newPlugin} onChange={e => setNewPlugin(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newPlugin.trim()) { setPlugins(p => [...p, newPlugin.trim()]); setNewPlugin(""); } }} placeholder="Plugin ekle..." style={{ flex: 1, background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 12, outline: "none" }} />
            <button onClick={() => { if (newPlugin.trim()) { setPlugins(p => [...p, newPlugin.trim()]); setNewPlugin(""); } }} style={{ background: "#E8FF47", border: "none", borderRadius: 8, padding: "8px 14px", color: "#080808", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>+</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 20px" }}>

        {screen === "upload" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ marginBottom: 20 }}>
              <Label>Mod</Label>
              <div style={{ display: "flex", gap: 8 }}>
                {MODES.map(m => (
                  <button key={m.id} onClick={() => setMode(m.id)} style={{ flex: 1, padding: "10px 8px", borderRadius: 10, cursor: "pointer", textAlign: "center", background: mode === m.id ? "#E8FF47" : "#141414", border: `1px solid ${mode === m.id ? "#E8FF47" : "#222"}`, color: mode === m.id ? "#080808" : "#666", transition: "all 0.15s" }}>
                    <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Label>Genre</Label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {GENRES.map(g => <Pill key={g.id} active={genre === g.id} onClick={() => setGenre(g.id)}>{g.label}</Pill>)}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Label>Perspektif</Label>
              <div style={{ display: "flex", gap: 6 }}>
                <Pill active={engineerMode === "producer"} onClick={() => setEngineerMode("producer")}>🎹 Prodüktör</Pill>
                <Pill active={engineerMode === "engineer"} onClick={() => setEngineerMode("engineer")}>🎚 Mühendis</Pill>
                <Pill active={engineerMode === "both"} onClick={() => setEngineerMode("both")}>Her İkisi</Pill>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <Label>Demo</Label>
              <div onClick={() => demoInputRef.current?.click()} style={{ border: `2px dashed ${demoFile ? "rgba(232,255,71,0.4)" : "#222"}`, borderRadius: 14, padding: demoFile ? "16px" : "36px 16px", textAlign: "center", cursor: "pointer", background: "#0e0e0e", transition: "all 0.2s" }}>
                {!demoFile ? (
                  <><div style={{ fontSize: 28, marginBottom: 8 }}>🎵</div><div style={{ color: "#888", fontSize: 14, fontWeight: 500 }}>Demo yükle</div><div style={{ color: "#444", fontSize: 12, marginTop: 4 }}>MP3 · WAV · M4A · FLAC</div></>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 24 }}>🎶</span>
                    <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{demoFile.name}</div>
                      <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>{fmtSize(demoFile.size)}</div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setDemoFile(null); }} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 20 }}>×</button>
                  </div>
                )}
              </div>
              <input ref={demoInputRef} type="file" accept="audio/*" style={{ display: "none" }} onChange={e => setDemoFile(e.target.files[0])} />
            </div>
            {error && <div style={{ background: "#FF4D4D11", border: "1px solid #FF4D4D44", borderRadius: 10, padding: "12px 14px", color: "#FF4D4D", fontSize: 13, marginBottom: 12 }}>⚠ {error}</div>}
            <button onClick={analyze} disabled={!demoFile} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: demoFile ? "#E8FF47" : "#1a1a1a", color: demoFile ? "#080808" : "#444", fontWeight: 700, fontSize: 14, cursor: demoFile ? "pointer" : "not-allowed", transition: "all 0.2s" }}>ANALİZ ET →</button>
          </div>
        )}

        {screen === "analyzing" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 24 }}>
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 60 }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ width: 6, borderRadius: 3, background: `hsl(${65 + i * 3}, 95%, 60%)`, height: 10 + Math.abs(Math.sin(i * 0.7)) * 30, animation: `pulse 0.8s ease-in-out ${i * 60}ms infinite alternate` }} />
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 6 }}>KRIT dinliyor...</div>
              <div style={{ color: "#555", fontSize: 13 }}>{analyzingStep || "Hazırlanıyor..."}</div>
            </div>
          </div>
        )}

        {screen === "suggestion" && suggestion && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <Tag color="#E8FF47">AŞAMA 2 / 3</Tag>
            <h2 style={{ margin: "10px 0 16px", fontSize: 20, fontWeight: 700 }}>KRIT'in Önerisi</h2>
            {audioStats && (
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                <Tag color="#E8FF47">{audioStats.bpm} BPM</Tag>
                {mode !== "demo" && <>
                  <Tag color={std.lufs_ok(audioStats.lufs) ? "#69DB7C" : "#FF4D4D"}>{audioStats.lufs} LUFS</Tag>
                  <Tag color={std.true_peak_ok(audioStats.peakDb) ? "#aaa" : "#FF4D4D"}>{audioStats.peakDb} dBTP</Tag>
                  <Tag color="#aaa">{audioStats.dynamicRange} dB DR</Tag>
                </>}
                <Tag color="#69DB7C">Groove {audioStats.grooveScore}%</Tag>
                <Tag color="#FF9500">Tension {audioStats.tensionScore}%</Tag>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <Card><Label>Ses Mühendisi</Label><div style={{ color: "#E8FF47", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{suggestion.engineer}</div><div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{suggestion.engineer_reason}</div></Card>
              <Card><Label>Prodüktör Tarzı</Label><div style={{ color: "#E8FF47", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{suggestion.producer}</div><div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{suggestion.producer_reason}</div></Card>
            </div>
            <Card style={{ marginBottom: 16 }}>
              <Label>Referans Şarkı</Label>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{suggestion.reference_track}</div>
              <div style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>{suggestion.reference_reason}</div>
            </Card>
            <button onClick={() => setScreen("feedback")} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "#E8FF47", color: "#080808", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Detaylı Analiz →</button>
            <ChatBot genre={genre} mode={mode} audioStats={audioStats} analysis={null} />
          </div>
        )}

        {screen === "feedback" && analysis && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <Card style={{ marginBottom: 16, borderColor: "#2a2a2a" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, border: "2px solid #E8FF47", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#E8FF47", fontWeight: 800, fontSize: 18, fontFamily: "'DM Mono', monospace" }}>{analysis.overall_score?.toFixed(1)}</span>
                </div>
                <div>
                  <div style={{ color: "#E8FF47", fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{suggestion?.engineer} × {suggestion?.producer}</div>
                  <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5 }}>{analysis.overall_verdict}</div>
                </div>
              </div>
            </Card>
            <TechStats stats={audioStats} genre={genre} mode={mode} />
            <EnergyMap segments={energySegments} />
            <TodoList items={todoItems} onToggle={toggleTodo} />
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[["mix", "MIX"], ["aranje", "ARANJE"], ["flow", "FLOW"]].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer", background: activeTab === id ? "#E8FF47" : "#141414", color: activeTab === id ? "#080808" : "#555", fontWeight: activeTab === id ? 700 : 400, fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>{label}</button>
              ))}
            </div>
            {(analysis.feedback?.[activeTab] || []).map((item, i) => <FeedbackCard key={i} item={item} index={i} />)}
            <ChatBot genre={genre} mode={mode} audioStats={audioStats} analysis={analysis} />
          </div>
        )}
      </div>
    </div>
  );
}
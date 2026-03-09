import { useState, useRef } from "react";

const ENGINEERS = [
  { id: "illangelo", name: "Illangelo", real: "Jason Charron", style: "Dark, atmospheric, cinematic. Vocal geri planda ama hissettiriyor. Mid-range'de boşluk sever. Reverb uzun ama kuru hissettirir.", artists: "The Weeknd", genres: ["trap", "rnb"] },
  { id: "mixedbyali", name: "MixedByAli", real: "Ali Tamposi", style: "Vocal clarity ustası. Kendrick ve Drake'in sesi ondan geçti. Punch'ı olan ama yorucu olmayan bir mix. Low-end kontrollü ve güçlü.", artists: "Kendrick Lamar, Drake", genres: ["hiphop", "trap"] },
  { id: "younguru", name: "Young Guru", real: "Gimel Keaton", style: "Jay-Z okulu. Analog sıcaklık, punch, warmth. Dinamikleri öldürmez. Her enstrümanın kendi alanı var.", artists: "Jay-Z", genres: ["hiphop"] },
  { id: "mikedean", name: "Mike Dean", real: "Michael Dean", style: "Distortion ve layering ustası. Kaotik ama kontrollü. Travis ve Kanye'nin karanlık enerjisi buradan geliyor.", artists: "Kanye West, Travis Scott", genres: ["trap", "hiphop"] },
  { id: "noah40", name: "Noah '40' Shebib", real: "Noah Shebib", style: "Lo-fi emotional. Reverb heavy, intimate, breath ve space kullanımı inanılmaz. Şarkı nefes alır.", artists: "Drake", genres: ["rnb", "hiphop"] },
  { id: "benbillions", name: "Ben Billions", real: "Ben Billions", style: "Modern trap clarity. Lil Baby ve Gunna'nın o parlak, clean trap sesi. 808 punch'ı mükemmel.", artists: "Lil Baby, Gunna", genres: ["trap"] },
];

const PRODUCERS = {
  trap: [
    { id: "metro", name: "Metro Boomin", style: "Dark, cinematic, orchestral trap. Boşluk ustası." },
    { id: "southside", name: "Southside", style: "Hard, minimal. Kick ve 808 ilişkisi kusursuz." },
    { id: "wheezy", name: "Wheezy", style: "Melodic trap. Layer yönetimi güçlü." },
    { id: "pierre", name: "Pi'erre Bourne", style: "Psychedelic trap. Quirky, beklenmedik aranje." },
  ],
  rnb: [
    { id: "nineteen85", name: "Nineteen85", style: "Sensual, spacious. Nefes alan R&B sesi." },
    { id: "noid", name: "No I.D.", style: "Soulful, sample-based. Hikaye anlatan aranje." },
    { id: "timbaland", name: "Timbaland", style: "Ritmik aranje ustası. Syncopation ve groove." },
  ],
  hiphop: [
    { id: "dre", name: "Dr. Dre", style: "Boom bap meets modern. İkinci plan detayları mükemmel." },
    { id: "kanye", name: "Kanye West", style: "Soul chop, sıra dışı yapı, emotionality." },
    { id: "dilla", name: "J Dilla", style: "Groove ve intentional looseness. Feel her şeyin önünde." },
    { id: "hitboy", name: "Hit-Boy", style: "Modern yapı, hook odaklı." },
  ],
  drill: [
    { id: "808melo", name: "808 Melo", style: "UK drill. Dark melodies, sliding 808." },
    { id: "ghosty", name: "Ghosty", style: "NY drill. Eerie, atmospheric." },
  ],
};

const TR_PRODUCERS = [
  { id: "djartz", name: "DJ Artz & Bugy", style: "Türk trap'in kurucuları. Raw enerji, güçlü 808." },
  { id: "farazi", name: "Farazi", style: "Melodic Türkçe trap. Atmosferik ve duygusal." },
  { id: "pango", name: "Pango", style: "Modern Türkçe trap & drill. Dark ve minimalist." },
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
];

const DEFAULT_PLUGINS = ["FabFilter", "Waves", "iZotope", "UAD", "Native Instruments", "Studio One 6"];
const GENRES = [{ id: "trap", label: "Trap" }, { id: "rnb", label: "R&B" }, { id: "hiphop", label: "Hip-Hop" }, { id: "drill", label: "Drill" }];
const MODES = [
  { id: "demo", label: "Demo", desc: "Kulak analizi" },
  { id: "mix", label: "Final Mix", desc: "Teknik + kulak" },
  { id: "master", label: "Mastering", desc: "Streaming standartı" },
];

// Web Audio API ile gerçek ses analizi
const analyzeAudioFile = async (file) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const arrayBuffer = await file.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
  const channelData = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const duration = audioBuffer.duration;
  
  // RMS hesapla (her kanal için)
  let sumSquares = 0;
  for (let i = 0; i < channelData.length; i++) {
    sumSquares += channelData[i] * channelData[i];
  }
  const rms = Math.sqrt(sumSquares / channelData.length);
  const rmsDb = 20 * Math.log10(rms + 1e-10);
  
  // True Peak hesapla
  let peak = 0;
  for (let i = 0; i < channelData.length; i++) {
    if (Math.abs(channelData[i]) > peak) peak = Math.abs(channelData[i]);
  }
  const peakDb = 20 * Math.log10(peak + 1e-10);
  
  // LUFS yaklaşımı (K-weighted RMS)
  const lufs = rmsDb - 0.691;
  
  // Dinamik aralık
  const dynamicRange = peakDb - rmsDb;
  
  // BPM tespiti (onset detection)
  const frameSize = Math.floor(sampleRate * 0.02); // 20ms frame
  const energyFrames = [];
  for (let i = 0; i < channelData.length - frameSize; i += frameSize) {
    let energy = 0;
    for (let j = 0; j < frameSize; j++) {
      energy += channelData[i + j] * channelData[i + j];
    }
    energyFrames.push(energy / frameSize);
  }
  
  // Onset detection
  const onsets = [];
  const threshold = 1.5;
  for (let i = 1; i < energyFrames.length - 1; i++) {
    if (energyFrames[i] > energyFrames[i-1] * threshold && energyFrames[i] > energyFrames[i+1] * 0.8) {
      onsets.push(i);
    }
  }
  
  let bpm = 120;
  if (onsets.length > 2) {
    const intervals = [];
    for (let i = 1; i < Math.min(onsets.length, 20); i++) {
      intervals.push((onsets[i] - onsets[i-1]) * frameSize / sampleRate);
    }
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    bpm = Math.round(60 / avgInterval);
    if (bpm < 60) bpm *= 2;
    if (bpm > 200) bpm = Math.round(bpm / 2);
    bpm = Math.max(60, Math.min(200, bpm));
  }
  
  // Frekans analizi (FFT)
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
  const lowEnd = freqData.slice(0, Math.floor(200 / binSize));
  const midRange = freqData.slice(Math.floor(200 / binSize), Math.floor(4000 / binSize));
  const highEnd = freqData.slice(Math.floor(4000 / binSize));
  
  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const lowAvg = avg(lowEnd);
  const midAvg = avg(midRange);
  const highAvg = avg(highEnd);
  
  // Segment analizi (8 parça)
  const segmentCount = 8;
  const segmentLength = Math.floor(channelData.length / segmentCount);
  const segments = [];
  for (let s = 0; s < segmentCount; s++) {
    let segRms = 0;
    for (let i = s * segmentLength; i < (s + 1) * segmentLength; i++) {
      segRms += channelData[i] * channelData[i];
    }
    segRms = Math.sqrt(segRms / segmentLength);
    const segDb = 20 * Math.log10(segRms + 1e-10);
    const timeMin = Math.floor((s * duration / segmentCount) / 60);
    const timeSec = Math.floor((s * duration / segmentCount) % 60);
    segments.push({
      time: `${timeMin}:${timeSec.toString().padStart(2, '0')}`,
      energy: Math.round((segRms / (peak + 1e-10)) * 100),
      db: Math.round(segDb * 10) / 10
    });
  }
  
  await audioContext.close();
  
  return {
    duration: Math.round(duration),
    bpm,
    rmsDb: Math.round(rmsDb * 10) / 10,
    peakDb: Math.round(peakDb * 10) / 10,
    lufs: Math.round(lufs * 10) / 10,
    dynamicRange: Math.round(dynamicRange * 10) / 10,
    lowEnd: Math.round(lowAvg),
    midRange: Math.round(midAvg),
    highEnd: Math.round(highAvg),
    segments,
    channels: audioBuffer.numberOfChannels,
    sampleRate,
  };
};

const Tag = ({ children, color = "#E8FF47" }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color, background: color + "22", fontFamily: "'DM Mono', monospace" }}>{children}</span>
);

const Pill = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{ padding: "6px 14px", borderRadius: 20, border: active ? "none" : "1px solid #2a2a2a", background: active ? "#E8FF47" : "#1a1a1a", color: active ? "#080808" : "#666", fontSize: 12, fontWeight: active ? 700 : 400, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>{children}</button>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: "#141414", border: "1px solid #222", borderRadius: 14, padding: "16px", ...style }}>{children}</div>
);

const Label = ({ children }) => (
  <div style={{ color: "#555", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{children}</div>
);

function EnergyMap({ segments }) {
  if (!segments || !segments.length) return null;
  const max = Math.max(...segments.map(s => s.energy), 1);
  return (
    <Card style={{ marginBottom: 16 }}>
      <Label>Enerji & Mood Haritası</Label>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 80, marginBottom: 12 }}>
        {segments.map((seg, i) => {
          const h = Math.max(8, (seg.energy / max) * 72);
          const color = seg.risk === "high" ? "#FF4D4D" : seg.risk === "good" ? "#69DB7C" : "#E8FF47";
          return (
            <div key={i} style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", height: h, borderRadius: 3, background: color, opacity: seg.risk === "normal" ? 0.5 : 0.9 }} />
              {seg.risk !== "normal" && <div style={{ position: "absolute", top: -16, fontSize: 9 }}>{seg.risk === "high" ? "⚠" : "✓"}</div>}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {segments.filter((_, i) => i % Math.ceil(segments.length / 5) === 0).map((seg, i) => (
          <span key={i} style={{ color: "#555", fontSize: 10, fontFamily: "'DM Mono', monospace" }}>{seg.time}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        {[["#69DB7C", "Güçlü An"], ["#E8FF47", "Normal"], ["#FF4D4D", "Zayıf An"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            <span style={{ color: "#555", fontSize: 10 }}>{l}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TechStats({ stats }) {
  if (!stats) return null;
  const items = [
    { label: "LUFS", value: `${stats.lufs} dB`, warn: stats.lufs > -8 },
    { label: "RMS", value: `${stats.rmsDb} dB`, warn: stats.rmsDb > -6 },
    { label: "True Peak", value: `${stats.peakDb} dB`, warn: stats.peakDb > -1 },
    { label: "BPM", value: stats.bpm, warn: false },
    { label: "Dinamik Aralık", value: `${stats.dynamicRange} dB`, warn: stats.dynamicRange < 6 },
    { label: "Süre", value: `${Math.floor(stats.duration/60)}:${(stats.duration%60).toString().padStart(2,'0')}`, warn: false },
  ];
  return (
    <Card style={{ marginBottom: 16 }}>
      <Label>Teknik Ölçümler</Label>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {items.map(item => (
          <div key={item.label} style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 12px", border: `1px solid ${item.warn ? "#FF4D4D44" : "#2a2a2a"}` }}>
            <div style={{ color: "#555", fontSize: 9, fontFamily: "'DM Mono', monospace", marginBottom: 4 }}>{item.label}</div>
            <div style={{ color: item.warn ? "#FF4D4D" : "#E8FF47", fontSize: 15, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
        <div style={{ flex: 1, background: "#1a1a1a", borderRadius: 8, padding: "8px 12px", border: "1px solid #2a2a2a" }}>
          <div style={{ color: "#555", fontSize: 9, fontFamily: "'DM Mono', monospace", marginBottom: 6 }}>FREKANS DAĞILIMI</div>
          <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 30 }}>
            {[
              { label: "LOW", val: stats.lowEnd },
              { label: "MID", val: stats.midRange },
              { label: "HIGH", val: stats.highEnd }
            ].map(f => (
              <div key={f.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div style={{ width: "100%", height: Math.max(4, (f.val / 255) * 26), borderRadius: 2, background: "#E8FF47", opacity: 0.7 }} />
                <span style={{ color: "#444", fontSize: 8, fontFamily: "'DM Mono', monospace" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
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

export default function KRIT() {
  const [screen, setScreen] = useState("upload");
  const [mode, setMode] = useState("demo");
  const [genre, setGenre] = useState("trap");
  const [engineerMode, setEngineerMode] = useState("both");
  const [plugins, setPlugins] = useState(DEFAULT_PLUGINS);
  const [newPlugin, setNewPlugin] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [demoFile, setDemoFile] = useState(null);
  const [refFile, setRefFile] = useState(null);
  const [abMode, setAbMode] = useState(false);
  const [abFile, setAbFile] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [audioStats, setAudioStats] = useState(null);
  const [todoItems, setTodoItems] = useState([]);
  const [energySegments, setEnergySegments] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("mix");
  const [analyzingStep, setAnalyzingStep] = useState("");
  const demoInputRef = useRef();
  const refInputRef = useRef();
  const abInputRef = useRef();

  const buildSystemPrompt = (stats) => {
    const pluginList = plugins.join(", ");
    const genreProducers = [...(PRODUCERS[genre] || []), ...TR_PRODUCERS].map(p => `${p.name}: ${p.style}`).join("\n");
    const engineerList = ENGINEERS.map(e => `${e.name} (${e.real}): ${e.style}`).join("\n");
    const flowList = FLOW_ARTISTS.map(a => `${a.name}: ${a.style}`).join("\n");
    
    const techContext = stats ? `
TEKNİK ÖLÇÜMLER (Web Audio API ile ölçüldü):
- LUFS: ${stats.lufs} dB ${stats.lufs > -8 ? "(FAZLA KOMPRESE - acil müdahale gerek)" : stats.lufs > -14 ? "(yüksek, streaming için sıkıştırılacak)" : "(iyi aralıkta)"}
- RMS: ${stats.rmsDb} dB
- True Peak: ${stats.peakDb} dB ${stats.peakDb > -1 ? "(CLIPPING RİSKİ)" : "(güvenli)"}
- BPM: ${stats.bpm}
- Dinamik Aralık: ${stats.dynamicRange} dB ${stats.dynamicRange < 6 ? "(çok dar, müzik nefes alamıyor)" : stats.dynamicRange < 10 ? "(orta)" : "(iyi)"}
- Düşük Frekans Yoğunluğu: ${stats.lowEnd}/255
- Orta Frekans Yoğunluğu: ${stats.midRange}/255  
- Yüksek Frekans Yoğunluğu: ${stats.highEnd}/255
- Kanal: ${stats.channels === 2 ? "Stereo" : "Mono"}
- Sample Rate: ${stats.sampleRate} Hz
- Süre: ${Math.floor(stats.duration/60)}:${(stats.duration%60).toString().padStart(2,'0')}

${mode === "master" ? `MASTERING HEDEFLERİ:
- Spotify: -14 LUFS (mevcut: ${stats.lufs} dB, fark: ${(stats.lufs - (-14)).toFixed(1)} dB)
- Apple Music: -16 LUFS (mevcut: ${stats.lufs} dB, fark: ${(stats.lufs - (-16)).toFixed(1)} dB)
- True Peak Max: -1 dBTP (mevcut: ${stats.peakDb} dB)` : ""}
` : "";

    return `Sen KRIT'sin — dünyanın en sert, en dürüst müzik prodüksiyon koçu. Grammy kazanmış ses mühendisleri ve prodüktörlerin bakış açısıyla konuşursun. Asla şeker kaplamazsın, asla teselli etmezsin. Sert, teknik, dürüst ve Türkçe konuşursun.

Kullanıcının plugin havuzu: ${pluginList}
Mod: ${mode === "demo" ? "Demo analizi" : mode === "mix" ? "Final Mix analizi" : "Mastering analizi"}
Genre: ${genre}

${techContext}

Ses Mühendisleri:
${engineerList}

Prodüktörler (${genre}):
${genreProducers}

Flow/Yapı Sanatçıları:
${flowList}

YANIT FORMATI — Sadece JSON döndür, başka hiçbir şey yazma:
{
  "suggestion": {
    "engineer": "isim",
    "engineer_reason": "neden bu mühendis seçildi (2-3 cümle, spesifik, teknik ölçümlere atıfla)",
    "producer": "isim",
    "producer_reason": "neden bu prodüktör seçildi (2-3 cümle, spesifik)",
    "reference_track": "Sanatçı — Şarkı Adı",
    "reference_reason": "neden bu referans (1-2 cümle)"
  },
  "energy_segments": [
    {"time": "0:00", "energy": 40, "risk": "normal", "label": "Intro"},
    {"time": "0:30", "energy": 75, "risk": "good", "label": "Drop"},
    {"time": "1:15", "energy": 30, "risk": "high", "label": "Köprü"}
  ],
  "feedback": {
    "mix": [{"timestamp": "0:00", "section": "Genel Mix", "severity": "critical", "feedback": "Detaylı sert feedback, teknik ölçümlere dayalı.", "plugin_tip": "FabFilter Pro-Q3: 250Hz bölgesini 3dB kes"}],
    "aranje": [{"timestamp": "0:00", "section": "Genel Aranje", "severity": "warning", "feedback": "Aranje feedback.", "plugin_tip": null}],
    "flow": [{"timestamp": "0:00", "section": "Genel Flow", "severity": "warning", "feedback": "Flow feedback.", "plugin_tip": null}]
  },
  "todo": ["Yapılacak 1", "Yapılacak 2"],
  "overall_score": 6.4,
  "overall_verdict": "2-3 cümle sert genel değerlendirme, LUFS/BPM/peak değerlerine atıfla"
}`;
  };

  const analyze = async () => {
    if (!demoFile) return;
    setScreen("analyzing");
    setError(null);
    
    try {
      // Adım 1: Web Audio API ile analiz
      setAnalyzingStep("Ses analiz ediliyor...");
      const stats = await analyzeAudioFile(demoFile);
      setAudioStats(stats);
      
      // Segment risk belirleme
      const avgEnergy = stats.segments.reduce((a, b) => a + b.energy, 0) / stats.segments.length;
      const segmentsWithRisk = stats.segments.map(seg => ({
        ...seg,
        risk: seg.energy > avgEnergy * 1.3 ? "good" : seg.energy < avgEnergy * 0.6 ? "high" : "normal"
      }));
      setEnergySegments(segmentsWithRisk);
      
      // Adım 2: Claude'a teknik veri + bağlam gönder
      setAnalyzingStep("KRIT değerlendiriyor...");
      
      const segmentText = segmentsWithRisk.map(s => 
        `${s.time}: enerji ${s.energy}%, ${s.db}dB`
      ).join(", ");
      
      const userMessage = `Şarkı analizi tamamlandı. Teknik ölçümler system prompt'ta. Segment detayları: ${segmentText}. Bu veriyi kullanarak kapsamlı bir analiz yap.`;
      
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-opus-4-5",
          max_tokens: 4000,
          system: buildSystemPrompt(stats),
          messages: [{ role: "user", content: userMessage }]
        }),
      });
      
      if (!res.ok) throw new Error("API hatası: " + res.status);
      const data = await res.json();
      if (!data.content) throw new Error(JSON.stringify(data));
const text = data.content.map(b => b.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      
      setSuggestion(parsed.suggestion);
      setAnalysis(parsed);
      if (parsed.energy_segments && parsed.energy_segments.length > 0) {
        setEnergySegments(parsed.energy_segments.map(s => ({...s, risk: s.risk || "normal"})));
      }
      setTodoItems((parsed.todo || []).map(t => ({ text: t, done: false })));
      setScreen("suggestion");
    } catch (e) {
      setError("Analiz başarısız: " + e.message);
      setScreen("upload");
    }
  };

  const toggleTodo = (i) => setTodoItems(prev => prev.map((t, idx) => idx === i ? { ...t, done: !t.done } : t));
  const fmtSize = (b) => b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1000).toFixed(0)} KB`;
  const reset = () => { setScreen("upload"); setAnalysis(null); setSuggestion(null); setAudioStats(null); setDemoFile(null); setRefFile(null); setAbFile(null); setError(null); };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "'DM Sans', sans-serif", backgroundImage: "radial-gradient(ellipse 70% 40% at 50% -5%, rgba(232,255,71,0.06) 0%, transparent 60%)" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } } @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} } button { font-family: 'DM Sans', sans-serif; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #1a1a1a", position: "sticky", top: 0, background: "rgba(8,8,8,0.95)", backdropFilter: "blur(10px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {screen !== "upload" && <button onClick={reset} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 18, padding: "0 8px 0 0" }}>←</button>}
          <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 20, letterSpacing: 4, color: "#fff" }}>KRIT</span>
          {screen === "feedback" && analysis && (
            <div style={{ width: 34, height: 34, borderRadius: 8, border: "2px solid #E8FF47", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 8 }}>
              <span style={{ color: "#E8FF47", fontWeight: 800, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{analysis.overall_score?.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {screen === "upload" && (
            <button onClick={() => setAbMode(!abMode)} style={{ background: abMode ? "#E8FF47" : "#1a1a1a", border: "1px solid #2a2a2a", color: abMode ? "#080808" : "#666", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>A/B</button>
          )}
          <button onClick={() => setShowSettings(!showSettings)} style={{ background: showSettings ? "#1e1e1e" : "#1a1a1a", border: "1px solid #2a2a2a", color: "#666", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 14 }}>⚙</button>
        </div>
      </div>

      {/* Settings */}
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

        {/* UPLOAD */}
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

            <div style={{ marginBottom: 12 }}>
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

            {abMode && (
              <div style={{ marginBottom: 12 }}>
                <Label>A/B — 2. Versiyon</Label>
                <div onClick={() => abInputRef.current?.click()} style={{ border: `1.5px dashed ${abFile ? "rgba(232,255,71,0.3)" : "#1a1a1a"}`, borderRadius: 12, padding: "14px 16px", cursor: "pointer", background: "#0d0d0d", display: "flex", alignItems: "center", gap: 12 }}>
                  {!abFile ? <><span style={{ color: "#444", fontSize: 20 }}>+</span><span style={{ color: "#444", fontSize: 13 }}>V2 ekle</span></> : <><span style={{ fontSize: 16 }}>🎵</span><span style={{ color: "#888", fontSize: 13, flex: 1 }}>{abFile.name}</span><button onClick={e => { e.stopPropagation(); setAbFile(null); }} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: 16 }}>×</button></>}
                </div>
                <input ref={abInputRef} type="file" accept="audio/*" style={{ display: "none" }} onChange={e => setAbFile(e.target.files[0])} />
              </div>
            )}

            {error && <div style={{ background: "#FF4D4D11", border: "1px solid #FF4D4D44", borderRadius: 10, padding: "12px 14px", color: "#FF4D4D", fontSize: 13, marginBottom: 12 }}>⚠ {error}</div>}

            <button onClick={analyze} disabled={!demoFile} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: demoFile ? "#E8FF47" : "#1a1a1a", color: demoFile ? "#080808" : "#444", fontWeight: 700, fontSize: 14, cursor: demoFile ? "pointer" : "not-allowed", transition: "all 0.2s" }}>ANALİZ ET →</button>
          </div>
        )}

        {/* ANALYZING */}
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

        {/* SUGGESTION */}
        {screen === "suggestion" && suggestion && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <Tag color="#E8FF47">AŞAMA 2 / 3</Tag>
            <h2 style={{ margin: "10px 0 20px", fontSize: 20, fontWeight: 700 }}>KRIT'in Önerisi</h2>
            {audioStats && (
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <Tag color="#E8FF47">{audioStats.bpm} BPM</Tag>
                <Tag color={audioStats.lufs > -8 ? "#FF4D4D" : "#69DB7C"}>{audioStats.lufs} LUFS</Tag>
                <Tag color={audioStats.peakDb > -1 ? "#FF4D4D" : "#aaa"}>{audioStats.peakDb} dBTP</Tag>
                <Tag color="#aaa">{audioStats.dynamicRange} dB DR</Tag>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <Card><Label>Ses Mühendisi</Label><div style={{ color: "#E8FF47", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{suggestion.engineer}</div><div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{suggestion.engineer_reason}</div></Card>
              <Card><Label>Prodüktör Tarzı</Label><div style={{ color: "#E8FF47", fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{suggestion.producer}</div><div style={{ color: "#888", fontSize: 12, lineHeight: 1.6 }}>{suggestion.producer_reason}</div></Card>
            </div>
            <Card style={{ marginBottom: 20 }}>
              <Label>Referans Şarkı</Label>
              <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{suggestion.reference_track}</div>
              <div style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>{suggestion.reference_reason}</div>
            </Card>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={reset} style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1px solid #222", background: "#141414", color: "#666", cursor: "pointer", fontSize: 13 }}>Değiştir</button>
              <button onClick={() => setScreen("feedback")} style={{ flex: 2, padding: "12px", borderRadius: 12, border: "none", background: "#E8FF47", color: "#080808", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Onayla & Detaylı Analiz →</button>
            </div>
          </div>
        )}

        {/* FEEDBACK */}
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
            <TechStats stats={audioStats} />
            <EnergyMap segments={energySegments} />
            <TodoList items={todoItems} onToggle={toggleTodo} />
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[["mix", "MIX"], ["aranje", "ARANJE"], ["flow", "FLOW"]].map(([id, label]) => (
                <button key={id} onClick={() => setActiveTab(id)} style={{ flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer", background: activeTab === id ? "#E8FF47" : "#141414", color: activeTab === id ? "#080808" : "#555", fontWeight: activeTab === id ? 700 : 400, fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>{label}</button>
              ))}
            </div>
            {(analysis.feedback?.[activeTab] || []).map((item, i) => <FeedbackCard key={i} item={item} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
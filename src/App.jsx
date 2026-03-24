import { useState, useRef, useEffect } from "react";

// ── THÈMES ────────────────────────────────────────────────────────────────────
const T = {
  jour: {
    bg: "linear-gradient(160deg,#f4f2ef 0%,#eceae5 50%,#e2dfd8 100%)",
    header: "rgba(244,242,239,0.95)", headerBorder: "rgba(201,168,76,0.2)",
    card: "rgba(255,255,255,0.75)", cardHov: "rgba(255,255,255,0.95)",
    cardBorder: "rgba(201,168,76,0.18)", cardAccent: "#c9a84c88",
    cardAccentHov: "#2a7a40", cardShadow: "0 2px 10px rgba(0,0,0,0.06)",
    text: "#1a2a1a", muted: "#6a8a70", ar: "#1a5a28",
    gold: "#c9a84c", green: "#2a7a40",
    tagOn: "rgba(42,122,64,0.18)", tagOnBorder: "#2a7a40", tagOnColor: "#2a7a40",
    tagOff: "rgba(42,122,64,0.06)", tagOffBorder: "rgba(42,122,64,0.2)", tagOffColor: "#6a8a70",
    juzBg: "rgba(201,168,76,0.1)", juzColor: "#a87838",
    mecBg: "rgba(42,122,64,0.1)", mecColor: "#2a7a40",
    medBg: "rgba(168,120,56,0.1)", medColor: "#a87838",
    sidebar: "rgba(244,242,239,0.97)", sidebarBorder: "rgba(201,168,76,0.25)",
    sidebarText: "#a8904888", sidebarActive: "#2a7a40",
    nav: "rgba(244,242,239,0.97)", navBorder: "rgba(201,168,76,0.2)",
    searchBg: "rgba(255,255,255,0.8)", searchBorder: "rgba(42,122,64,0.2)",
    versetBg: "rgba(255,255,255,0.75)", versetBorder: "rgba(201,168,76,0.2)",
    bismillah: "#1a5a28",
    togOn: "rgba(42,122,64,0.18)", togOnBd: "#2a7a40", togOnC: "#2a7a40",
    togOff: "rgba(42,122,64,0.06)", togOffBd: "rgba(42,122,64,0.2)", togOffC: "#6a8a70",
    mode: "🌙", modeLabel: "Nuit",
    modeBg: "rgba(42,122,64,0.08)", modeBd: "#2a7a4055", modeC: "#2a7a40",
    color: "#1a2a1a",
    titleG: ["#1a5a28","#2a7a40","#0e3d1c"],
  },
  nuit: {
    bg: "linear-gradient(160deg,#0e2a14 0%,#091e0e 50%,#061208 100%)",
    header: "rgba(6,15,8,0.96)", headerBorder: "rgba(168,120,56,0.2)",
    card: "rgba(10,28,14,0.85)", cardHov: "rgba(18,45,22,0.95)",
    cardBorder: "rgba(168,120,56,0.15)", cardAccent: "rgba(168,120,56,0.4)",
    cardAccentHov: "#a87838", cardShadow: "0 2px 12px rgba(0,0,0,0.35)",
    text: "#e8dfc8", muted: "#4a7050", ar: "#c8a050",
    gold: "#a87838", green: "#3a9a50",
    tagOn: "rgba(58,154,80,0.2)", tagOnBorder: "#3a9a50", tagOnColor: "#3a9a50",
    tagOff: "rgba(168,120,56,0.08)", tagOffBorder: "rgba(168,120,56,0.2)", tagOffColor: "#5a7050",
    juzBg: "rgba(168,120,56,0.15)", juzColor: "#c8a050",
    mecBg: "rgba(26,90,40,0.2)", mecColor: "#3a9a50",
    medBg: "rgba(168,120,56,0.15)", medColor: "#c8a050",
    sidebar: "rgba(4,12,6,0.97)", sidebarBorder: "rgba(168,120,56,0.2)",
    sidebarText: "#a8783855", sidebarActive: "#a87838",
    nav: "rgba(4,12,6,0.97)", navBorder: "rgba(168,120,56,0.2)",
    searchBg: "rgba(10,28,14,0.9)", searchBorder: "rgba(168,120,56,0.25)",
    versetBg: "rgba(6,18,9,0.85)", versetBorder: "rgba(168,120,56,0.2)",
    bismillah: "#c8a050",
    togOn: "rgba(58,154,80,0.2)", togOnBd: "#3a9a50", togOnC: "#3a9a50",
    togOff: "rgba(168,120,56,0.08)", togOffBd: "rgba(168,120,56,0.2)", togOffC: "#5a7050",
    mode: "☀️", modeLabel: "Jour",
    modeBg: "rgba(168,120,56,0.1)", modeBd: "#a8783855", modeC: "#a87838",
    color: "#e8dfc8",
    titleG: ["#e0b860","#a87838","#6a4a18"],
  },
};

// ── 114 SOURATES ──────────────────────────────────────────────────────────────
const S = [
  {n:1,ar:"الفاتحة",fr:"Al-Fatiha",v:7,t:"M",j:1},{n:2,ar:"البقرة",fr:"Al-Baqara",v:286,t:"D",j:1},
  {n:3,ar:"آل عمران",fr:"Ali Imran",v:200,t:"D",j:3},{n:4,ar:"النساء",fr:"An-Nisa",v:176,t:"D",j:4},
  {n:5,ar:"المائدة",fr:"Al-Maida",v:120,t:"D",j:6},{n:6,ar:"الأنعام",fr:"Al-Anam",v:165,t:"M",j:7},
  {n:7,ar:"الأعراف",fr:"Al-Araf",v:206,t:"M",j:8},{n:8,ar:"الأنفال",fr:"Al-Anfal",v:75,t:"D",j:9},
  {n:9,ar:"التوبة",fr:"At-Tawba",v:129,t:"D",j:10},{n:10,ar:"يونس",fr:"Yunus",v:109,t:"M",j:11},
  {n:11,ar:"هود",fr:"Hud",v:123,t:"M",j:11},{n:12,ar:"يوسف",fr:"Yusuf",v:111,t:"M",j:12},
  {n:13,ar:"الرعد",fr:"Ar-Rad",v:43,t:"D",j:13},{n:14,ar:"إبراهيم",fr:"Ibrahim",v:52,t:"M",j:13},
  {n:15,ar:"الحجر",fr:"Al-Hijr",v:99,t:"M",j:14},{n:16,ar:"النحل",fr:"An-Nahl",v:128,t:"M",j:14},
  {n:17,ar:"الإسراء",fr:"Al-Isra",v:111,t:"M",j:15},{n:18,ar:"الكهف",fr:"Al-Kahf",v:110,t:"M",j:15},
  {n:19,ar:"مريم",fr:"Maryam",v:98,t:"M",j:16},{n:20,ar:"طه",fr:"Ta-Ha",v:135,t:"M",j:16},
  {n:21,ar:"الأنبياء",fr:"Al-Anbiya",v:112,t:"M",j:17},{n:22,ar:"الحج",fr:"Al-Hajj",v:78,t:"D",j:17},
  {n:23,ar:"المؤمنون",fr:"Al-Muminun",v:118,t:"M",j:18},{n:24,ar:"النور",fr:"An-Nur",v:64,t:"D",j:18},
  {n:25,ar:"الفرقان",fr:"Al-Furqan",v:77,t:"M",j:18},{n:26,ar:"الشعراء",fr:"Ash-Shuara",v:227,t:"M",j:19},
  {n:27,ar:"النمل",fr:"An-Naml",v:93,t:"M",j:19},{n:28,ar:"القصص",fr:"Al-Qasas",v:88,t:"M",j:20},
  {n:29,ar:"العنكبوت",fr:"Al-Ankabut",v:69,t:"M",j:20},{n:30,ar:"الروم",fr:"Ar-Rum",v:60,t:"M",j:21},
  {n:31,ar:"لقمان",fr:"Luqman",v:34,t:"M",j:21},{n:32,ar:"السجدة",fr:"As-Sajda",v:30,t:"M",j:21},
  {n:33,ar:"الأحزاب",fr:"Al-Ahzab",v:73,t:"D",j:21},{n:34,ar:"سبإ",fr:"Saba",v:54,t:"M",j:22},
  {n:35,ar:"فاطر",fr:"Fatir",v:45,t:"M",j:22},{n:36,ar:"يس",fr:"Ya-Sin",v:83,t:"M",j:22},
  {n:37,ar:"الصافات",fr:"As-Saffat",v:182,t:"M",j:23},{n:38,ar:"ص",fr:"Sad",v:88,t:"M",j:23},
  {n:39,ar:"الزمر",fr:"Az-Zumar",v:75,t:"M",j:23},{n:40,ar:"غافر",fr:"Ghafir",v:85,t:"M",j:24},
  {n:41,ar:"فصلت",fr:"Fussilat",v:54,t:"M",j:24},{n:42,ar:"الشورى",fr:"Ash-Shura",v:53,t:"M",j:25},
  {n:43,ar:"الزخرف",fr:"Az-Zukhruf",v:89,t:"M",j:25},{n:44,ar:"الدخان",fr:"Ad-Dukhan",v:59,t:"M",j:25},
  {n:45,ar:"الجاثية",fr:"Al-Jathiya",v:37,t:"M",j:25},{n:46,ar:"الأحقاف",fr:"Al-Ahqaf",v:35,t:"M",j:26},
  {n:47,ar:"محمد",fr:"Muhammad",v:38,t:"D",j:26},{n:48,ar:"الفتح",fr:"Al-Fath",v:29,t:"D",j:26},
  {n:49,ar:"الحجرات",fr:"Al-Hujurat",v:18,t:"D",j:26},{n:50,ar:"ق",fr:"Qaf",v:45,t:"M",j:26},
  {n:51,ar:"الذاريات",fr:"Adh-Dhariyat",v:60,t:"M",j:26},{n:52,ar:"الطور",fr:"At-Tur",v:49,t:"M",j:27},
  {n:53,ar:"النجم",fr:"An-Najm",v:62,t:"M",j:27},{n:54,ar:"القمر",fr:"Al-Qamar",v:55,t:"M",j:27},
  {n:55,ar:"الرحمن",fr:"Ar-Rahman",v:78,t:"D",j:27},{n:56,ar:"الواقعة",fr:"Al-Waqia",v:96,t:"M",j:27},
  {n:57,ar:"الحديد",fr:"Al-Hadid",v:29,t:"D",j:27},{n:58,ar:"المجادلة",fr:"Al-Mujadila",v:22,t:"D",j:28},
  {n:59,ar:"الحشر",fr:"Al-Hashr",v:24,t:"D",j:28},{n:60,ar:"الممتحنة",fr:"Al-Mumtahana",v:13,t:"D",j:28},
  {n:61,ar:"الصف",fr:"As-Saf",v:14,t:"D",j:28},{n:62,ar:"الجمعة",fr:"Al-Jumua",v:11,t:"D",j:28},
  {n:63,ar:"المنافقون",fr:"Al-Munafiqun",v:11,t:"D",j:28},{n:64,ar:"التغابن",fr:"At-Taghabun",v:18,t:"D",j:28},
  {n:65,ar:"الطلاق",fr:"At-Talaq",v:12,t:"D",j:28},{n:66,ar:"التحريم",fr:"At-Tahrim",v:12,t:"D",j:28},
  {n:67,ar:"الملك",fr:"Al-Mulk",v:30,t:"M",j:29},{n:68,ar:"القلم",fr:"Al-Qalam",v:52,t:"M",j:29},
  {n:69,ar:"الحاقة",fr:"Al-Haqqa",v:52,t:"M",j:29},{n:70,ar:"المعارج",fr:"Al-Maarij",v:44,t:"M",j:29},
  {n:71,ar:"نوح",fr:"Nuh",v:28,t:"M",j:29},{n:72,ar:"الجن",fr:"Al-Jinn",v:28,t:"M",j:29},
  {n:73,ar:"المزمل",fr:"Al-Muzzammil",v:20,t:"M",j:29},{n:74,ar:"المدثر",fr:"Al-Muddathir",v:56,t:"M",j:29},
  {n:75,ar:"القيامة",fr:"Al-Qiyama",v:40,t:"M",j:29},{n:76,ar:"الإنسان",fr:"Al-Insan",v:31,t:"D",j:29},
  {n:77,ar:"المرسلات",fr:"Al-Mursalat",v:50,t:"M",j:29},{n:78,ar:"النبأ",fr:"An-Naba",v:40,t:"M",j:30},
  {n:79,ar:"النازعات",fr:"An-Naziat",v:46,t:"M",j:30},{n:80,ar:"عبس",fr:"Abasa",v:42,t:"M",j:30},
  {n:81,ar:"التكوير",fr:"At-Takwir",v:29,t:"M",j:30},{n:82,ar:"الانفطار",fr:"Al-Infitar",v:19,t:"M",j:30},
  {n:83,ar:"المطففين",fr:"Al-Mutaffifin",v:36,t:"M",j:30},{n:84,ar:"الانشقاق",fr:"Al-Inshiqaq",v:25,t:"M",j:30},
  {n:85,ar:"البروج",fr:"Al-Buruj",v:22,t:"M",j:30},{n:86,ar:"الطارق",fr:"At-Tariq",v:17,t:"M",j:30},
  {n:87,ar:"الأعلى",fr:"Al-Ala",v:19,t:"M",j:30},{n:88,ar:"الغاشية",fr:"Al-Ghashiya",v:26,t:"M",j:30},
  {n:89,ar:"الفجر",fr:"Al-Fajr",v:30,t:"M",j:30},{n:90,ar:"البلد",fr:"Al-Balad",v:20,t:"M",j:30},
  {n:91,ar:"الشمس",fr:"Ash-Shams",v:15,t:"M",j:30},{n:92,ar:"الليل",fr:"Al-Layl",v:21,t:"M",j:30},
  {n:93,ar:"الضحى",fr:"Ad-Duha",v:11,t:"M",j:30},{n:94,ar:"الشرح",fr:"Ash-Sharh",v:8,t:"M",j:30},
  {n:95,ar:"التين",fr:"At-Tin",v:8,t:"M",j:30},{n:96,ar:"العلق",fr:"Al-Alaq",v:19,t:"M",j:30},
  {n:97,ar:"القدر",fr:"Al-Qadr",v:5,t:"M",j:30},{n:98,ar:"البينة",fr:"Al-Bayyina",v:8,t:"D",j:30},
  {n:99,ar:"الزلزلة",fr:"Az-Zalzala",v:8,t:"D",j:30},{n:100,ar:"العاديات",fr:"Al-Adiyat",v:11,t:"M",j:30},
  {n:101,ar:"القارعة",fr:"Al-Qaria",v:11,t:"M",j:30},{n:102,ar:"التكاثر",fr:"At-Takathur",v:8,t:"M",j:30},
  {n:103,ar:"العصر",fr:"Al-Asr",v:3,t:"M",j:30},{n:104,ar:"الهمزة",fr:"Al-Humaza",v:9,t:"M",j:30},
  {n:105,ar:"الفيل",fr:"Al-Fil",v:5,t:"M",j:30},{n:106,ar:"قريش",fr:"Quraysh",v:4,t:"M",j:30},
  {n:107,ar:"الماعون",fr:"Al-Maun",v:7,t:"M",j:30},{n:108,ar:"الكوثر",fr:"Al-Kawthar",v:3,t:"M",j:30},
  {n:109,ar:"الكافرون",fr:"Al-Kafirun",v:6,t:"M",j:30},{n:110,ar:"النصر",fr:"An-Nasr",v:3,t:"D",j:30},
  {n:111,ar:"المسد",fr:"Al-Masad",v:5,t:"M",j:30},{n:112,ar:"الإخلاص",fr:"Al-Ikhlas",v:4,t:"M",j:30},
  {n:113,ar:"الفلق",fr:"Al-Falaq",v:5,t:"M",j:30},{n:114,ar:"الناس",fr:"An-Nas",v:6,t:"M",j:30},
];

const FATIHA_AYAHS = [
  {ar:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",tr:"Bismillāhi r-raḥmāni r-raḥīm",fr:"Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux"},
  {ar:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",tr:"Al-ḥamdu lillāhi rabbi l-ʿālamīn",fr:"Louange à Allah, Seigneur de l'univers"},
  {ar:"الرَّحْمَٰنِ الرَّحِيمِ",tr:"Ar-raḥmāni r-raḥīm",fr:"Le Tout Miséricordieux, le Très Miséricordieux"},
  {ar:"مَالِكِ يَوْمِ الدِّينِ",tr:"Māliki yawmi d-dīn",fr:"Maître du Jour de la rétribution"},
  {ar:"إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",tr:"Iyyāka naʿbudu wa-iyyāka nastaʿīn",fr:"C'est Toi seul que nous adorons et c'est Toi seul dont nous implorons le secours"},
  {ar:"اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",tr:"Ihdinā ṣ-ṣirāṭa l-mustaqīm",fr:"Guide-nous dans le droit chemin"},
  {ar:"صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",tr:"Ṣirāṭa llaḏīna anʿamta ʿalayhim ġayri l-maġḍūbi ʿalayhim wa-lā ḍ-ḍāllīn",fr:"Le chemin de ceux que Tu as comblés de faveurs, non de ceux qui ont encouru Ta colère, ni des égarés"},
];

// ── SIDEBAR NUMBERS ───────────────────────────────────────────────────────────
const SIDEBAR_NUMS = [1,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,114];

// ── VERSET SIDEBAR — zoom au survol/touch ────────────────────────────────────
function VersetSidebar({ total, t, onSelect }) {
  const [active, setActive] = useState(null);
  const nums = Array.from({length:total},(_,i)=>i+1);
  const sidebarRef = useRef(null);

  const handleTouch = (e) => {
    e.preventDefault();
    const rect = sidebarRef.current.getBoundingClientRect();
    const y = e.touches[0].clientY - rect.top;
    const idx = Math.floor((y / rect.height) * nums.length);
    const n = nums[Math.min(Math.max(idx,0), nums.length-1)];
    setActive(n);
    onSelect(n);
  };

  const handleTouchEnd = () => setTimeout(()=>setActive(null), 600);

  return (
    <div ref={sidebarRef}
      style={{
        width:28, flexShrink:0,
        background:t.sidebar,
        borderLeft:`1px solid ${t.sidebarBorder}`,
        display:"flex", flexDirection:"column",
        alignItems:"center",
        padding:"4px 0",
        overflowY:"hidden",
        cursor:"pointer",
        userSelect:"none",
        touchAction:"none",
      }}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
    >
      {nums.map(n=>(
        <div
          key={n}
          onMouseEnter={()=>setActive(n)}
          onMouseLeave={()=>setActive(null)}
          onClick={()=>onSelect(n)}
          style={{
            fontSize: active===n ? 13 : active && Math.abs(active-n)<=2 ? 10 : 8,
            fontWeight: active===n ? "900" : active && Math.abs(active-n)===1 ? "700" : "500",
            color: active===n ? t.green : active && Math.abs(active-n)<=2 ? t.gold : t.sidebarText,
            width:"100%", textAlign:"center",
            lineHeight: active===n ? 1.8 : 1.35,
            transition:"all 0.12s ease",
            transform: active===n ? "scale(1.3)" : "scale(1)",
            cursor:"pointer",
            fontFamily:"inherit",
          }}
        >
          {/* Afficher seulement les multiples de 5 et le 1, ou le numéro actif */}
          {(n===1 || n%5===0 || n===114 || active===n) ? n : "·"}
        </div>
      ))}
    </div>
  );
}

// ── CHAPITRES LIST COMPONENT ─────────────────────────────────────────────────
function ChapitresList({ list, tab, sort, t, SourateCard }) {
  let lastJ = -1;
  return (
    <div>
      {list.map(s => {
        const showJ = s.j !== lastJ && tab !== "favs" && sort !== "desc";
        if (showJ) lastJ = s.j;
        return (
          <div key={s.n}>
            {showJ && (
              <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0 4px", marginTop: lastJ > 1 ? 8 : 0 }}>
                <span style={{ fontSize:10, fontWeight:"700", color:t.juzColor, background:t.juzBg, border:`1px solid ${t.gold}44`, borderRadius:5, padding:"2px 8px" }}>
                  Juz {s.j}
                </span>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${t.gold}33,transparent)` }}/>
              </div>
            )}
            <SourateCard s={s} />
          </div>
        );
      })}
    </div>
  );
}

// ── DONNÉES DHIKR ───────────────────────────────────────────────────────────
const TASBIH = [
  {
    ar:"سُبْحَانَ اللَّهِ",tr:"Subḥāna llāh",fr:"Gloire à Allah",count:33,
    source:"Sahîh Muslim n° 597 — Abû Hurayrah (رضي الله عنه)",
    reward:"Celui qui dit 33x SubhanAllah, 33x Alhamdulillah, 34x Allahu Akbar après chaque prière — ses péchés seront effacés même s'ils sont aussi nombreux que l'écume de la mer",
  },
  {
    ar:"الْحَمْدُ لِلَّهِ",tr:"Al-ḥamdu lillāh",fr:"Louange à Allah",count:33,
    source:"Sahîh Muslim n° 597 — Abû Hurayrah (رضي الله عنه)",
    reward:"Al-Hamdulillah remplit la balance des bonnes œuvres",
  },
  {
    ar:"اللَّهُ أَكْبَرُ",tr:"Allāhu Akbar",fr:"Allah est le plus Grand",count:34,
    source:"Sahîh Muslim n° 597 — Abû Hurayrah (رضي الله عنه)",
    reward:"SubhanAllah et Alhamdulillah remplissent ce qui est entre le ciel et la terre",
  },
  {
    ar:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    tr:"Lā ilāha illā llāhu waḥdahu lā šarīka lah, lahu l-mulku wa lahu l-ḥamdu wa huwa ʿalā kulli šayʾin qadīr",
    fr:"Il n'y a de dieu qu'Allah, Seul, sans associé, à Lui la Royauté et la Louange, Il est Omnipotent",
    count:100,
    source:"Sahîh Al-Bukhârî n° 6403 — Abû Hurayrah (رضي الله عنه)",
    reward:"Équivaut à affranchir 10 esclaves, 100 bonnes actions inscrites, 100 mauvaises effacées, protection contre Shaytan jusqu'au soir",
  },
  {
    ar:"أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    tr:"Astaġfiru llāha l-ʿaẓīma llaḏī lā ilāha illā huwa l-ḥayyu l-qayyūmu wa atūbu ilayh",
    fr:"Je demande pardon à Allah le Très Grand, Lui qu'il n'y a de dieu que Lui, le Vivant, le Subsistant, et je me repens à Lui",
    count:100,
    source:"Sunan At-Tirmidhî n° 3577 — Ibn Masʿûd (رضي الله عنه)",
    reward:"Allah lui pardonnera même s'il a fui le champ de bataille",
  },
  {
    ar:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    tr:"Subḥāna llāhi wa biḥamdih",
    fr:"Gloire à Allah et Sa louange",
    count:100,
    source:"Sahîh Muslim n° 2691 — Abû Hurayrah (رضي الله عنه)",
    reward:"Ses péchés seront effacés même s'ils sont aussi nombreux que l'écume de la mer",
  },
  {
    ar:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ",
    tr:"Subḥāna llāhi wa biḥamdih, Subḥāna llāhi l-ʿaẓīm",
    fr:"Gloire à Allah et Sa louange, Gloire à Allah le Très Grand",
    count:null,
    source:"Sahîh Al-Bukhârî n° 6682 — Abû Hurayrah (رضي الله عنه)",
    reward:"Deux paroles légères sur la langue, lourdes dans la balance, chères au Miséricordieux",
  },
];

const WIRD_MATIN = [
  {
    ar:"اللهُ لاَ إِلَهَ إِلاَّ هُوَ الحَيُّ القَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ العَلَيُّ العَظِيمُ",
    tr:"Āyatu l-Kursī — Sourate Al-Baqarah, verset 255",
    fr:"Allah ! Point de divinité à part Lui, le Vivant, Celui qui subsiste par Lui-même... (Verset du Trône)",
    count:1,
    source:"Sahîh Al-Kalim At-Tayyib n° 22 — Al-Bukhârî dans Al-Adab Al-Mufrad",
    reward:"Celui qui la récite le matin est protégé de tout mal jusqu'au soir",
  },
  {
    ar:"قُلْ هُوَ اللهُ أَحَدٌ ۞ اللهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    tr:"Qul huwa llāhu aḥad... (Sourate Al-Ikhlāṣ 112) — 3 fois",
    fr:"Dis : Il est Allah, Unique... (Sourate Al-Ikhlās) — à réciter 3 fois",
    count:3,
    source:"Sahîh At-Tirmidhî n° 3575 — Abdullah Ibn Khubayb (رضي الله عنه)",
    reward:"Suffit pour tout protéger — équivaut à réciter un tiers du Coran",
  },
  {
    ar:"اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    tr:"Allāhumma anta rabbī lā ilāha illā ant, ḫalaqtanī wa anā ʿabduk...",
    fr:"Ô Allah, Tu es mon Seigneur, il n'y a de dieu que Toi. Tu m'as créé et je suis Ton serviteur, je suis fidèle à mon pacte envers Toi autant que je le peux. Je cherche refuge en Toi contre le mal que j'ai commis. Je reconnais Tes bienfaits sur moi et je reconnais mes péchés. Pardonne-moi car nul ne pardonne les péchés si ce n'est Toi.",
    count:1,
    source:"Sahîh Al-Bukhârî n° 6306 — Shaddâd Ibn Aws (رضي الله عنه)",
    reward:"Sayyid Al-Istighfâr — Celui qui le dit le matin avec conviction et meurt avant le soir entre au Paradis",
  },
  {
    ar:"اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ",
    tr:"Allāhumma bika aṣbaḥnā wa bika amsaynā wa bika naḥyā wa bika namūtu wa ilayka n-nušūr",
    fr:"Ô Allah, c'est par Toi que nous entrons dans le matin et par Toi dans le soir, c'est par Toi que nous vivons et mourons et vers Toi est la résurrection",
    count:1,
    source:"Sunan Abî Dâwûd n° 5068 — Abû Hurayrah (رضي الله عنه) — Hadith Hasan",
    reward:"Invocation authentique du matin transmise par le Prophète ﷺ",
  },
  {
    ar:"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ",
    tr:"Aṣbaḥnā wa aṣbaḥa l-mulku lillāh...",
    fr:"Nous voici au matin et le royaume appartient à Allah, louange à Allah, il n'y a de dieu qu'Allah Seul sans associé, à Lui la Royauté et la Louange. Seigneur, je Te demande le bien de ce jour et ce qui suit, et je cherche refuge en Toi contre le mal de ce jour et ce qui suit.",
    count:1,
    source:"Sahîh Muslim n° 2723 — Abdullah Ibn Masʿûd (رضي الله عنه)",
    reward:"Invocation du matin authentique transmise par le Prophète ﷺ",
  },
  {
    ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
    tr:"Allāhumma innī asʾaluka l-ʿāfiyata fi d-dunyā wa l-āḫira...",
    fr:"Ô Allah, je Te demande le salut dans cette vie et dans l'au-delà. Ô Allah, je Te demande le pardon et le salut dans ma religion, ma vie, ma famille et mes biens.",
    count:1,
    source:"Sunan Abî Dâwûd n° 5074 — Ibn Umar (رضي الله عنه) — Sahîh",
    reward:"Le Prophète ﷺ ne laissait jamais ces paroles le matin et le soir",
  },
  {
    ar:"بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    tr:"Bismillāhi llaḏī lā yaḍurru maʿa smihi šayʾun fi l-arḍi wa lā fi s-samāʾi wa huwa s-samīʿu l-ʿalīm",
    fr:"Au nom d'Allah, avec Son Nom rien ne peut nuire sur la Terre ni dans le ciel, Il est l'Audient, l'Omniscient",
    count:3,
    source:"Sahîh At-Tirmidhî n° 3388 — ʿUthmân Ibn ʿAffân (رضي الله عنه)",
    reward:"Celui qui le dit 3x le matin rien ne lui nuira jusqu'au soir",
  },
  {
    ar:"سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    tr:"Subḥāna llāhi wa biḥamdih",
    fr:"Gloire à Allah et Sa louange",
    count:100,
    source:"Sahîh Muslim n° 2691 — Abû Hurayrah (رضي الله عنه)",
    reward:"Ses péchés seront effacés même s'ils sont aussi nombreux que l'écume de la mer",
  },
];

const WIRD_SOIR = [
  {
    ar:"اللهُ لاَ إِلَهَ إِلاَّ هُوَ الحَيُّ القَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلاَّ بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَئُودُهُ حِفْظُهُمَا وَهُوَ العَلَيُّ العَظِيمُ",
    tr:"Āyatu l-Kursī — Sourate Al-Baqarah, verset 255",
    fr:"Allah ! Point de divinité à part Lui, le Vivant... (Verset du Trône)",
    count:1,
    source:"Sahîh Al-Kalim At-Tayyib n° 22 — Al-Bukhârî dans Al-Adab Al-Mufrad",
    reward:"Protégé de tout mal jusqu'au matin",
  },
  {
    ar:"قُلْ هُوَ اللهُ أَحَدٌ ۞ اللهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ ۞ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
    tr:"Sourates Al-Ikhlāṣ (112), Al-Falaq (113), An-Nās (114) — 3 fois chacune",
    fr:"Réciter Al-Ikhlas, Al-Falaq et An-Nas — 3 fois chacune",
    count:3,
    source:"Sahîh At-Tirmidhî n° 3575 — Abdullah Ibn Khubayb (رضي الله عنه)",
    reward:"Suffit pour tout protéger",
  },
  {
    ar:"اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ",
    tr:"Allāhumma bika amsaynā wa bika aṣbaḥnā wa bika naḥyā wa bika namūtu wa ilayka l-maṣīr",
    fr:"Ô Allah, c'est par Toi que nous entrons dans le soir et par Toi dans le matin, par Toi nous vivons et mourons et vers Toi est la destinée",
    count:1,
    source:"Sunan Abî Dâwûd n° 5068 — Abû Hurayrah (رضي الله عنه) — Hadith Hasan",
    reward:"Invocation authentique du soir transmise par le Prophète ﷺ",
  },
  {
    ar:"أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا",
    tr:"Amsaynā wa amsa l-mulku lillāh...",
    fr:"Nous voici au soir et le royaume appartient à Allah... Seigneur, je Te demande le bien de cette nuit et ce qui suit.",
    count:1,
    source:"Sahîh Muslim n° 2723 — Abdullah Ibn Masʿûd (رضي الله عنه)",
    reward:"Invocation du soir authentique transmise par le Prophète ﷺ",
  },
  {
    ar:"اللَّهُمَّ إِنِّي أَمْسَيْتُ أُشْهِدُكَ وَأُشْهِدُ حَمَلَةَ عَرْشِكَ وَمَلاَئِكَتَكَ وَجَمِيعَ خَلْقِكَ أَنَّكَ أَنْتَ اللَّهُ لاَ إِلَهَ إِلاَّ أَنْتَ وَأَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُولُكَ",
    tr:"Allāhumma innī amsaytu ušhiduka wa ušhidu ḥamalata ʿaršika...",
    fr:"Ô Allah, je prends ce soir à témoin Toi, les porteurs de Ton Trône, Tes anges et toutes Tes créatures que Tu es Allah, il n'y a de dieu que Toi, et que Muhammad est Ton serviteur et Ton messager",
    count:4,
    source:"Sunan Abî Dâwûd n° 5069 — Anas Ibn Mâlik (رضي الله عنه) — Hadith Hasan",
    reward:"Allah libère un quart de celui qui le dit une fois — 4x = libéré du feu",
  },
  {
    ar:"بِسْمِ اللهِ الَّذِي لاَ يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الأَرْضِ وَلاَ فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    tr:"Bismillāhi llaḏī lā yaḍurru maʿa smihi šayʾun fi l-arḍi wa lā fi s-samāʾi wa huwa s-samīʿu l-ʿalīm",
    fr:"Au nom d'Allah, avec Son Nom rien ne peut nuire sur la Terre ni dans le ciel",
    count:3,
    source:"Sahîh At-Tirmidhî n° 3388 — ʿUthmân Ibn ʿAffân (رضي الله عنه)",
    reward:"Rien ne lui nuira jusqu'au matin",
  },
  {
    ar:"أَعُوذُ بِكلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    tr:"Aʿūḏu bi kalimāti llāhi t-tāmmāti min šarri mā ḫalaq",
    fr:"Je cherche refuge dans les paroles parfaites d'Allah contre le mal de ce qu'Il a créé",
    count:3,
    source:"Sahîh Muslim n° 2709 — Abû Hurayrah (رضي الله عنه)",
    reward:"Aucune piqûre venimeuse ne lui fera mal cette nuit",
  },
  {
    ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي دِينِي وَدُنْيَايَ وَأَهْلِي وَمَالِي",
    tr:"Allāhumma innī asʾaluka l-ʿāfiyata fi d-dunyā wa l-āḫira...",
    fr:"Ô Allah, je Te demande le salut dans cette vie et dans l'au-delà, le pardon et la santé dans ma religion, ma vie, ma famille et mes biens",
    count:1,
    source:"Sunan Abî Dâwûd n° 5074 — Ibn Umar (رضي الله عنه) — Sahîh",
    reward:"Le Prophète ﷺ ne laissait jamais ces paroles le matin et le soir",
  },
];

const AID_DHIKR = [
  {
    ar:"اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ",
    tr:"Allāhu Akbar, Allāhu Akbar, lā ilāha illā llāh, wa llāhu Akbar, Allāhu Akbar wa lillāhi l-ḥamd",
    fr:"Allah est le plus Grand, Allah est le plus Grand, il n'y a de dieu qu'Allah, Allah est le plus Grand, Allah est le plus Grand et louange à Allah",
    count:null,
    source:"Rapporté par Ibn Abî Shaybah — Pratique des Compagnons le jour de l'Aïd",
    note:"Takbîr de l'Aïd — à réciter depuis Fajr jusqu'à la prière de l'Aïd",
  },
  {
    ar:"اللَّهُ أَكْبَرُ كَبِيرًا وَالْحَمْدُ لِلَّهِ كَثِيرًا وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا",
    tr:"Allāhu Akbaru kabīran wa l-ḥamdu lillāhi kaṯīrā wa subḥāna llāhi bukratan wa aṣīlā",
    fr:"Allah est très grand, louange abondante à Allah, gloire à Allah le matin et le soir",
    count:null,
    source:"Sahîh Muslim n° 601 — Ibn ʿUmar (رضي الله عنه)",
    note:"Formule du Takbîr authentique",
  },
  {
    ar:"تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ",
    tr:"Taqabbala llāhu minnā wa minkum",
    fr:"Qu'Allah accepte de nous et de vous",
    count:null,
    source:"Rapporté par Al-Bukhârî dans Al-Adab Al-Mufrad — pratique des Compagnons",
    note:"Ce que les Compagnons se disaient le jour de l'Aïd",
  },
  {
    ar:"سُبْحَانَ اللَّهِ",tr:"Subḥāna llāh",fr:"Gloire à Allah",count:33,
    source:"Sahîh Muslim n° 597",note:"Tasbih après la prière de l'Aïd",
  },
  {
    ar:"الْحَمْدُ لِلَّهِ",tr:"Al-ḥamdu lillāh",fr:"Louange à Allah",count:33,
    source:"Sahîh Muslim n° 597",note:"Tasbih après la prière de l'Aïd",
  },
  {
    ar:"اللَّهُ أَكْبَرُ",tr:"Allāhu Akbar",fr:"Allah est le plus Grand",count:34,
    source:"Sahîh Muslim n° 597",note:"Tasbih après la prière de l'Aïd",
  },
];

const JUMUAH_DHIKR = [
  {
    ar:"اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    tr:"Allāhumma ṣalli wa sallim ʿalā nabiyyinā Muḥammad",
    fr:"Ô Allah, envoie bénédictions et paix sur notre Prophète Muhammad",
    count:80,
    source:"At-Tabarânî dans Al-Awsat — rapporté par Al-Albânî comme Hasan",
    note:"80x le vendredi = 80 ans de péchés effacés",
  },
  {
    ar:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ",
    tr:"Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammadin kamā ṣallayta ʿalā Ibrāhīma...",
    fr:"Ô Allah, envoie Tes bénédictions sur Muhammad et la famille de Muhammad comme Tu en as envoyé sur Ibrahim et la famille d'Ibrahim",
    count:100,
    source:"Sahîh Al-Bukhârî n° 3370 — Kaʿb Ibn ʿUjra (رضي الله عنه)",
    note:"Salawat Ibrahimiyya — abondante le vendredi",
  },
  {
    ar:"سُورَةُ الْكَهْفِ — الآيات 1 إلى 10",
    tr:"Sūrat Al-Kahf (Sourate 18) — à réciter le vendredi",
    fr:"Réciter la Sourate Al-Kahf — le vendredi de préférence avant Fajr jusqu'à Maghrib",
    count:null,
    source:"Sahîh Muslim n° 803 — Abû Saʿîd Al-Khudrî (رضي الله عنه)",
    note:"Une lumière entre les deux vendredis — protection du Dajjal pour celui qui lit les 10 premiers versets",
  },
  {
    ar:"اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    tr:"Allāhumma innaka ʿafuwwun tuḥibbu l-ʿafwa faʿfu ʿannī",
    fr:"Ô Allah, Tu es le Pardonneur, Tu aimes le pardon, pardonne-moi",
    count:null,
    source:"Sunan At-Tirmidhî n° 3513 — ʿĀʾisha (رضي الله عنها) — Sahîh",
    note:"À répéter entre Asr et Maghrib — heure bénie du vendredi",
  },
  {
    ar:"أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    tr:"Astaġfiru llāha l-ʿaẓīma llaḏī lā ilāha illā huwa l-ḥayyu l-qayyūmu wa atūbu ilayh",
    fr:"Je demande pardon à Allah le Très Grand, il n'y a de dieu que Lui, le Vivant, le Subsistant, et je me repens à Lui",
    count:100,
    source:"Sunan At-Tirmidhî n° 3577 — Ibn Masʿûd (رضي الله عنه)",
    note:"Istighfâr abondant — particulièrement recommandé le vendredi",
  },
  {
    ar:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
    tr:"Lā ilāha illā llāhu waḥdahu lā šarīka lah, lahu l-mulku wa lahu l-ḥamd wa huwa ʿalā kulli šayʾin qadīr",
    fr:"Il n'y a de dieu qu'Allah Seul, sans associé, à Lui la Royauté, la Louange, Il est Omnipotent",
    count:null,
    source:"Sahîh Al-Bukhârî n° 6403 — Abû Hurayrah (رضي الله عنه)",
    note:"À répéter entre Asr et Maghrib le vendredi — heure de l'acceptation des invocations",
  },
];

// ── DONNÉES DOUAAS ──────────────────────────────────────────────────────────
const CATEGORIES = [

  // ── 1. RÉVEIL ──────────────────────────────────────────────────────
  { id:"reveil", icon:"🌅", titre:"Au Réveil", titreAr:"عند الاستيقاظ", douaas:[
    { s:"Douaa 1 au réveil",
      ar:"الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
      tr:"Al-ḥamdu lillāhi llaḏī aḥyānā baʿda mā amātanā wa ilayhi n-nušūr",
      fr:"Louange à Allah qui nous a redonné la vie après nous avoir fait mourir, et vers Lui est la résurrection",
      src:"Sahîh Al-Bukhârî n°6312 — Ḥuḏayfa (رضي الله عنه)",
      reward:"" },
    { s:"Douaa 2 au réveil",
      ar:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ رَبِّ اغْفِرْ لِي",
      tr:"Lā ilāha illā llāhu waḥdahu... Subḥāna llāhi wa l-ḥamdu lillāhi wa lā ilāha illā llāhu wa llāhu Akbar wa lā ḥawla wa lā quwwata illā billāhi l-ʿAliyyi l-ʿAẓīm. Rabbi ġfir lī",
      fr:"Il n'y a de dieu qu'Allah Seul sans associé, à Lui la Royauté et la Louange, Il est Omnipotent. Gloire à Allah, louange à Allah, il n'y a de dieu qu'Allah, Allah est le plus Grand, pas de force ni de puissance qu'en Allah le Très-Haut, le Plus Grand. Seigneur pardonne-moi",
      src:"Sahîh Al-Bukhârî n°1154, Sahîh Muslim n°2711 — ʿUbâda ibn As-Sâmit (رضي الله عنه)",
      reward:"Quiconque se réveille et dit cela puis dit Allahumma ighfir lî, il sera exaucé. S'il fait le wudû et prie, sa prière sera acceptée" },
    { s:"Douaa 3 au réveil",
      ar:"الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي وَرَدَّ عَلَيَّ رُوحِي وَأَذِنَ لِي بِذِكْرِهِ",
      tr:"Al-ḥamdu lillāhi llaḏī ʿāfānī fī jasadī wa radda ʿalayya rūḥī wa aḏina lī biḏikrih",
      fr:"Louange à Allah qui m'a accordé la santé dans mon corps, qui m'a rendu mon âme et qui m'a permis de Le mentionner",
      src:"Sunan At-Tirmidhî n°3401 — Abû Hurayra (رضي الله عنه) — Hasan",
      reward:"" },
  ]},

  // ── 2. S'HABILLER ──────────────────────────────────────────────────
  { id:"habiller", icon:"👕", titre:"En s'habillant", titreAr:"عند اللباس", douaas:[
    { s:"En mettant un vêtement",
      ar:"الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      tr:"Al-ḥamdu lillāhi llaḏī kasānī hāḏā wa razaqanīhi min ġayri ḥawlin minnī wa lā quwwa",
      fr:"Louange à Allah qui m'a vêtu de ceci et me l'a accordé sans force ni puissance de ma part",
      src:"Sunan Abî Dâwûd n°4023, Sunan At-Tirmidhî n°3458 — Muʿāḏ ibn Anas (رضي الله عنه) — Sahîh",
      reward:"Ses péchés passés lui sont pardonnés" },
    { s:"En mettant un vêtement neuf",
      ar:"اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ",
      tr:"Allāhumma laka l-ḥamdu anta kasawtanīhi asʾaluka min ḫayrihī wa ḫayri mā ṣuniʿa lahu wa aʿūḏu bika min šarrihī wa šarri mā ṣuniʿa lah",
      fr:"Ô Allah, louange à Toi, Tu m'as vêtu de ceci. Je Te demande son bien et le bien pour lequel il a été fait, et je cherche refuge en Toi contre son mal et le mal pour lequel il a été fait",
      src:"Sunan Abî Dâwûd n°4020 — Abû Saʿîd Al-Khudrî (رضي الله عنه) — Hasan",
      reward:"" },
    { s:"Ce que l'on dit à celui qui met un vêtement neuf",
      ar:"تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى",
      tr:"Tubli wa yuḫlifu llāhu taʿālā",
      fr:"Puisses-tu l'user jusqu'à la corde et qu'Allah te le remplace",
      src:"Sunan Abî Dâwûd n°4020 — Sahîh",
      reward:"" },
    { s:"Avant de se déshabiller",
      ar:"بِسْمِ اللَّهِ",
      tr:"Bismillāh",
      fr:"Au nom d'Allah",
      src:"Sunan At-Tirmidhî n°606, Ibn Mâjah n°297 — ʿAlî (رضي الله عنه) — Hasan",
      reward:"Protection des regards des djinns sur la nudité" },
  ]},

  // ── 3. TOILETTES ───────────────────────────────────────────────────
  { id:"toilettes", icon:"🚿", titre:"Toilettes", titreAr:"الخلاء", douaas:[
    { s:"En entrant aux toilettes",
      ar:"بِسْمِ اللَّهِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ",
      tr:"Bismillāh, Allāhumma innī aʿūḏu bika mina l-ḫubuṯi wa l-ḫabāʾiṯ",
      fr:"Au nom d'Allah. Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles",
      src:"Sahîh Al-Bukhârî n°142, Sahîh Muslim n°375 — Anas ibn Mālik (رضي الله عنه)",
      reward:"Protection contre les shayâtîn" },
    { s:"En sortant des toilettes",
      ar:"غُفْرَانَكَ",
      tr:"Ġufrānak",
      fr:"(Ô Allah) j'implore Ton pardon",
      src:"Sunan Abî Dâwûd n°30, Sunan At-Tirmidhî n°7 — ʿĀʾisha (رضي الله عنها) — Sahîh",
      reward:"" },
  ]},

  // ── 4. ABLUTIONS ───────────────────────────────────────────────────
  { id:"ablutions", icon:"💧", titre:"Ablutions (Wudû)", titreAr:"الوضوء", douaas:[
    { s:"Avant les ablutions",
      ar:"بِسْمِ اللَّهِ",
      tr:"Bismillāh",
      fr:"Au nom d'Allah",
      src:"Sunan Abî Dâwûd n°101, Sunan At-Tirmidhî n°25 — Abû Hurayra (رضي الله عنه) — Sahîh",
      reward:"Pas de wudû valide sans le Bismillah selon certains savants" },
    { s:"Après les ablutions — 1",
      ar:"أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      tr:"Ash-hadu an lā ilāha illā llāhu waḥdahu lā šarīka lahu wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh",
      fr:"J'atteste qu'il n'y a de divinité qu'Allah, Seul sans associé, et j'atteste que Muhammad est Son serviteur et Son Messager",
      src:"Sahîh Muslim n°234 — ʿUmar ibn Al-Khaṭṭāb (رضي الله عنه)",
      reward:"Les 8 portes du Paradis s'ouvrent pour lui, il peut entrer par celle qu'il veut" },
    { s:"Après les ablutions — 2",
      ar:"اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
      tr:"Allāhumma jʿalnī mina t-tawwābīna wa jʿalnī mina l-mutaṭahhirīn",
      fr:"Ô Allah, mets-moi au nombre de ceux qui se repentent et de ceux qui se purifient",
      src:"Sunan At-Tirmidhî n°55 — ʿUmar (رضي الله عنه) — Hasan",
      reward:"" },
    { s:"Après les ablutions — 3",
      ar:"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
      tr:"Subḥānaka llāhumma wa biḥamdika ash-hadu an lā ilāha illā anta astaġfiruka wa atūbu ilayk",
      fr:"Gloire à Toi Ô Allah et Ta louange. J'atteste qu'il n'y a de dieu que Toi, je Te demande pardon et me repens à Toi",
      src:"Sunan An-Nasâʾî — Abû Saʿîd Al-Khudrî (رضي الله عنه) — Sahîh",
      reward:"Écrit sur un papier, mis sous un sceau, ne sera pas brisé jusqu'au Jour du Jugement" },
  ]},

  // ── 5. ADHAN ───────────────────────────────────────────────────────
  { id:"adhan", icon:"📢", titre:"Adhan (Appel à la prière)", titreAr:"الأذان", douaas:[
    { s:"Répéter après le muezzin (sauf Hayya ʿala s-salâh)",
      ar:"لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      tr:"Lā ḥawla wa lā quwwata illā billāh",
      fr:"Il n'y a de force ni de puissance qu'en Allah",
      src:"Sahîh Al-Bukhârî n°614, Sahîh Muslim n°383 — ʿUmar (رضي الله عنه)",
      reward:"Dire cela à chaque phrase de l'adhan puis la douaa suivante = ses péchés sont pardonnés" },
    { s:"Après la Shahada dans l'adhan",
      ar:"وَأَنَا أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ رَضِيتُ بِاللَّهِ رَبًّا وَبِمُحَمَّدٍ رَسُولًا وَبِالْإِسْلَامِ دِينًا",
      tr:"Wa anā ash-hadu an lā ilāha illā llāhu waḥdahu lā šarīka lahu wa anna Muḥammadan ʿabduhu wa rasūluh. Raḍītu billāhi rabban wa bi Muḥammadin rasūlan wa bi l-islāmi dīnā",
      fr:"Moi aussi j'atteste qu'il n'y a de divinité qu'Allah... J'agrée Allah comme Seigneur, Muhammad comme messager et l'Islam comme religion",
      src:"Sahîh Muslim n°386 — Saʿd ibn Abî Waqqâs (رضي الله عنه)",
      reward:"Ses péchés lui sont pardonnés" },
    { s:"Douaa après l'adhan",
      ar:"اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
      tr:"Allāhumma rabba hāḏihi d-daʿwati t-tāmmati wa ṣ-ṣalāti l-qāʾimati āti Muḥammadan al-wasīlata wa l-faḍīlata wa bʿaṯhu maqāman maḥmūdan allaḏī waʿadtah",
      fr:"Ô Allah, Maître de cet appel parfait et de la prière qui va être accomplie, donne à Muhammad la wasîla et la faveur, et ressuscite-le dans la position louable que Tu lui as promise",
      src:"Sahîh Al-Bukhârî n°614 — Jâbir ibn ʿAbdillāh (رضي الله عنه)",
      reward:"L'intercession du Prophète ﷺ lui sera accordée le Jour du Jugement" },
  ]},

  // ── 6. MOSQUÉE ─────────────────────────────────────────────────────
  { id:"mosquee", icon:"🕌", titre:"Mosquée", titreAr:"المسجد", douaas:[
    { s:"En allant à la mosquée",
      ar:"اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَفِي لِسَانِي نُورًا وَفِي سَمْعِي نُورًا وَفِي بَصَرِي نُورًا وَمِنْ فَوْقِي نُورًا وَمِنْ تَحْتِي نُورًا وَعَنْ يَمِينِي نُورًا وَعَنْ شِمَالِي نُورًا وَمِنْ أَمَامِي نُورًا وَمِنْ خَلْفِي نُورًا وَاجْعَلْ فِي نَفْسِي نُورًا وَأَعْظِمْ لِي نُورًا",
      tr:"Allāhumma jʿal fī qalbī nūran wa fī lisānī nūran... wa aʿẓim lī nūrā",
      fr:"Ô Allah, mets dans mon cœur de la lumière, dans ma langue de la lumière, dans mon ouïe de la lumière, dans ma vue de la lumière, au-dessus de moi de la lumière, en-dessous de moi de la lumière, à ma droite de la lumière, à ma gauche de la lumière, devant moi de la lumière, derrière moi de la lumière, et mets en moi de la lumière et augmente ma lumière",
      src:"Sahîh Al-Bukhârî n°6316, Sahîh Muslim n°763 — Ibn ʿAbbâs (رضي الله عنه)",
      reward:"" },
    { s:"En entrant à la mosquée",
      ar:"أَعُوذُ بِاللَّهِ الْعَظِيمِ وَبِوَجْهِهِ الْكَرِيمِ وَسُلْطَانِهِ الْقَدِيمِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      tr:"Aʿūḏu billāhi l-ʿaẓīmi wa bi wajhihi l-karīmi wa sulṭānihi l-qadīmi mina š-šayṭāni r-rajīm",
      fr:"Je cherche refuge auprès d'Allah le Très Grand, de Sa noble Face et de Son pouvoir éternel contre Satan le maudit",
      src:"Sunan Abî Dâwûd n°466 — ʿAbdullāh ibn ʿAmr (رضي الله عنه) — Sahîh",
      reward:"Satan dit : 'il est protégé de moi pour toute la journée'" },
    { s:"En entrant à la mosquée — salutation",
      ar:"بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
      tr:"Bismillāh wa ṣ-ṣalātu wa s-salāmu ʿalā rasūlillāh. Allāhumma ftaḥ lī abwāba raḥmatik",
      fr:"Au nom d'Allah, bénédictions et paix sur le Messager d'Allah. Ô Allah, ouvre-moi les portes de Ta miséricorde",
      src:"Sahîh Muslim n°713 — Abû Ḥumayd ou Abû Usayd (رضي الله عنه)",
      reward:"" },
    { s:"En sortant de la mosquée",
      ar:"بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
      tr:"Bismillāh wa ṣ-ṣalātu wa s-salāmu ʿalā rasūlillāh. Allāhumma innī asʾaluka min faḍlik",
      fr:"Au nom d'Allah, bénédictions et paix sur le Messager d'Allah. Ô Allah, je Te demande de Ta grâce",
      src:"Sahîh Muslim n°713 — Abû Ḥumayd ou Abû Usayd (رضي الله عنه)",
      reward:"" },
  ]},

  // ── 7. PRIÈRE ──────────────────────────────────────────────────────
  { id:"priere", icon:"🙏", titre:"La Prière", titreAr:"الصلاة", douaas:[
    { s:"Ouverture de la prière (Duaa Al-Istiftâh) — Version 1",
      ar:"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ",
      tr:"Subḥānaka llāhumma wa biḥamdika wa tabāraka smuka wa taʿālā jadduka wa lā ilāha ġayruk",
      fr:"Gloire à Toi Ô Allah et Ta louange, béni soit Ton Nom, élevée est Ta majesté et il n'y a de dieu que Toi",
      src:"Sunan Abî Dâwûd n°775, Sunan At-Tirmidhî n°243 — Abû Saʿîd Al-Khudrî (رضي الله عنه) — Sahîh",
      reward:"" },
    { s:"Ouverture de la prière — Version 2",
      ar:"اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ",
      tr:"Allāhumma bāʿid baynī wa bayna ḫaṭāyāya... Allāhumma naqqinī... Allāhumma ġsilnī min ḫaṭāyāya bi ṯ-ṯalji wa l-māʾi wa l-barad",
      fr:"Ô Allah, éloigne entre moi et mes péchés comme Tu as éloigné l'orient de l'occident. Ô Allah, purifie-moi de mes péchés comme on nettoie le vêtement blanc de sa saleté. Ô Allah, lave-moi de mes péchés avec la neige, l'eau et la grêle",
      src:"Sahîh Al-Bukhârî n°744, Sahîh Muslim n°598 — Abû Hurayra (رضي الله عنه)",
      reward:"" },
    { s:"Pendant le rukû (inclinaison)",
      ar:"سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      tr:"Subḥāna rabbiya l-ʿaẓīm",
      fr:"Gloire à mon Seigneur le Très Grand",
      src:"Sahîh Muslim n°772 — ʿĀʾisha (رضي الله عنها)",
      reward:"À dire 3 fois minimum" },
    { s:"En se relevant du rukû",
      ar:"رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
      tr:"Rabbanā wa laka l-ḥamdu ḥamdan kaṯīran ṭayyiban mubārakan fīh",
      fr:"Ô notre Seigneur, louange à Toi, louange abondante, bonne et bénie",
      src:"Sahîh Al-Bukhârî n°799 — Rifâʿa ibn Râfiʿ (رضي الله عنه)",
      reward:"Le Prophète ﷺ dit : 'J'ai vu plus de trente anges se disputer pour l'écrire en premier'" },
    { s:"Pendant le sujûd (prosternation)",
      ar:"سُبْحَانَ رَبِّيَ الْأَعْلَى",
      tr:"Subḥāna rabbiya l-Aʿlā",
      fr:"Gloire à mon Seigneur le Très Haut",
      src:"Sahîh Muslim n°772 — ʿĀʾisha (رضي الله عنها)",
      reward:"À dire 3 fois minimum. Moment de la plus grande proximité avec Allah" },
    { s:"Entre les deux prosternations",
      ar:"رَبِّ اغْفِرْ لِي رَبِّ اغْفِرْ لِي",
      tr:"Rabbi ġfir lī, Rabbi ġfir lī",
      fr:"Seigneur pardonne-moi, Seigneur pardonne-moi",
      src:"Sunan Abî Dâwûd n°874, Sunan Ibn Mājah n°897 — ʿĀʾisha (رضي الله عنها) — Sahîh",
      reward:"" },
    { s:"Tashahud (Attestation de foi)",
      ar:"التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
      tr:"At-taḥiyyātu lillāhi wa ṣ-ṣalawātu wa ṭ-ṭayyibāt, as-salāmu ʿalayka ayyuha n-nabiyyu wa raḥmatu llāhi wa barakātuh, as-salāmu ʿalaynā wa ʿalā ʿibādi llāhi ṣ-ṣāliḥīn, ash-hadu an lā ilāha illā llāhu wa ash-hadu anna Muḥammadan ʿabduhu wa rasūluh",
      fr:"Les hommages, les prières et les bonnes choses appartiennent à Allah. Que la paix, la miséricorde et les bénédictions d'Allah soient sur toi ô Prophète. Que la paix soit sur nous et sur les serviteurs vertueux d'Allah. J'atteste qu'il n'y a de divinité qu'Allah et que Muhammad est Son serviteur et messager",
      src:"Sahîh Al-Bukhârî n°831, Sahîh Muslim n°402 — Ibn Masʿūd (رضي الله عنه)",
      reward:"Pilier de la prière" },
    { s:"Salawat Ibrahimiyya (après le tashahud)",
      ar:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ",
      tr:"Allāhumma ṣalli ʿalā Muḥammadin wa ʿalā āli Muḥammadin kamā ṣallayta ʿalā Ibrāhīma wa ʿalā āli Ibrāhīma innaka ḥamīdun majīd...",
      fr:"Ô Allah, envoie Tes bénédictions sur Muhammad et la famille de Muhammad comme Tu en as envoyé sur Ibrahim et la famille d'Ibrahim. Tu es le Digne de louange, le Glorieux. Ô Allah, bénis Muhammad et la famille de Muhammad comme Tu as béni Ibrahim...",
      src:"Sahîh Al-Bukhârî n°3370, Sahîh Muslim n°406 — Kaʿb ibn ʿUjra (رضي الله عنه)",
      reward:"Pilier de la prière selon de nombreux savants" },
    { s:"Douaa avant le salâm (dernier tashahud)",
      ar:"اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
      tr:"Allāhumma innī aʿūḏu bika min ʿaḏābi jahannama wa min ʿaḏābi l-qabri wa min fitnati l-maḥyā wa l-mamāti wa min šarri fitnati l-masīḥi d-dajjāl",
      fr:"Ô Allah, je cherche refuge auprès de Toi contre le châtiment de l'Enfer, contre le châtiment de la tombe, contre les épreuves de la vie et de la mort et contre le mal de l'épreuve du Dajjal",
      src:"Sahîh Al-Bukhârî n°1377, Sahîh Muslim n°588 — Abû Hurayra (رضي الله عنه)",
      reward:"Obligatoire selon certains savants avant le salâm" },
    { s:"Après la prière — 1",
      ar:"أَسْتَغْفِرُ اللَّهَ أَسْتَغْفِرُ اللَّهَ أَسْتَغْفِرُ اللَّهَ",
      tr:"Astaġfiru llāh (3 fois)",
      fr:"Je demande pardon à Allah (3 fois)",
      src:"Sahîh Muslim n°591 — Thawbân (رضي الله عنه)",
      reward:"Le Prophète ﷺ le disait 3 fois après le salâm" },
    { s:"Après la prière — 2",
      ar:"اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
      tr:"Allāhumma anta s-salāmu wa minka s-salāmu tabārakta yā ḏa l-jalāli wa l-ikrām",
      fr:"Ô Allah, Tu es la Paix et de Toi vient la paix. Tu es béni, Ô Détenteur de la Majesté et de la Générosité",
      src:"Sahîh Muslim n°592 — ʿĀʾisha (رضي الله عنها)",
      reward:"" },
    { s:"Après la prière — Tasbih (33x chacun)",
      ar:"سُبْحَانَ اللَّهِ × ٣٣ — الْحَمْدُ لِلَّهِ × ٣٣ — اللَّهُ أَكْبَرُ × ٣٤",
      tr:"Subḥāna llāh (33x) — Al-ḥamdu lillāh (33x) — Allāhu Akbar (34x)",
      fr:"Gloire à Allah 33 fois — Louange à Allah 33 fois — Allah est le plus Grand 34 fois",
      src:"Sahîh Muslim n°597 — Abû Hurayra (رضي الله عنه)",
      reward:"Ses péchés sont effacés même s'ils sont aussi nombreux que l'écume de la mer" },
    { s:"Après la prière — Âyat Al-Kursî",
      ar:"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
      tr:"Āyatu l-Kursī — Sourate Al-Baqara v.255",
      fr:"Réciter le Verset du Trône (Sourate Al-Baqara 2:255) après chaque prière obligatoire",
      src:"Sunan An-Nasâʾî dans Al-Yawm wa l-Layla n°100 — Abû Umâma (رضي الله عنه) — Sahîh",
      reward:"Celui qui la récite après chaque prière, rien ne l'empêchera d'entrer au Paradis sauf la mort" },
    { s:"Salat Al-Istikhâra (prière de consultation)",
      ar:"اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ",
      tr:"Allāhumma innī astakhīruka biʿilmika wa astaqdiruka biqudratika wa asʾaluka min faḍlika l-ʿaẓīm...",
      fr:"Ô Allah, je Te demande de choisir pour moi par Ta science, je Te demande de me donner la capacité par Ta puissance... Si Tu sais que cette chose est bonne pour moi dans ma religion, ma vie et mes affaires, décrète-la pour moi, facilite-la moi puis bénis-la. Si Tu sais qu'elle est mauvaise, éloigne-la de moi et oriente-moi vers le bien où qu'il soit, puis fais-moi en être satisfait",
      src:"Sahîh Al-Bukhârî n°1166 — Jâbir ibn ʿAbdillāh (رضي الله عنه)",
      reward:"2 rakʿas + cette douaa en mentionnant la chose concernée — Le Prophète ﷺ enseignait cela pour toute décision importante" },
  ]},

  // ── 8. REPAS ───────────────────────────────────────────────────────
  { id:"repas", icon:"🍽️", titre:"Repas & Boisson", titreAr:"الطعام والشراب", douaas:[
    { s:"Avant de manger",
      ar:"بِسْمِ اللَّهِ",
      tr:"Bismillāh",
      fr:"Au nom d'Allah",
      src:"Sahîh Al-Bukhârî n°5376, Sahîh Muslim n°2022 — ʿUmar ibn Abî Salama (رضي الله عنه)",
      reward:"" },
    { s:"Si on oublie le Bismillah au début",
      ar:"بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ",
      tr:"Bismillāhi awwalahu wa āḫirah",
      fr:"Au nom d'Allah au début et à la fin (du repas)",
      src:"Sunan Abî Dâwûd n°3767, Sahîh At-Tirmidhî n°1858 — ʿĀʾisha (رضي الله عنها)",
      reward:"Satan crache ce qu'il avait déjà mangé et ne peut plus manger avec lui" },
    { s:"Après le repas",
      ar:"الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
      tr:"Al-ḥamdu lillāhi llaḏī aṭʿamanī hāḏā wa razaqanīhi min ġayri ḥawlin minnī wa lā quwwa",
      fr:"Louange à Allah qui m'a nourri de ceci et me l'a accordé sans force ni pouvoir de ma part",
      src:"Sunan Abî Dâwûd n°4023, Sunan At-Tirmidhî n°3458 — Muʿāḏ ibn Anas (رضي الله عنه) — Sahîh",
      reward:"Ses péchés passés lui sont pardonnés" },
    { s:"Douaa pour l'hôte chez qui on mange",
      ar:"اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ",
      tr:"Allāhumma bārik lahum fīmā razaqtahum wa ġfir lahum wa rḥamhum",
      fr:"Ô Allah, bénis ce que Tu leur as accordé, pardonne-leur et fais-leur miséricorde",
      src:"Sahîh Muslim n°2042 — ʿAbdullāh ibn Busr (رضي الله عنه)",
      reward:"Le Prophète ﷺ la disait quand on lui offrait à manger" },
    { s:"Douaa pour celui qui vous a offert à manger",
      ar:"اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي",
      tr:"Allāhumma aṭʿim man aṭʿamanī wa sqi man saqānī",
      fr:"Ô Allah, nourris celui qui m'a nourri et abreuve celui qui m'a abreuvé",
      src:"Sahîh Muslim n°2055 — Al-Miqdâd ibn Al-Aswad (رضي الله عنه)",
      reward:"" },
    { s:"Rupture du jeûne (Iftâr)",
      ar:"ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
      tr:"Ḏahaba ẓ-ẓamaʾu wa btallatil ʿurūqu wa ṯabata l-ajru in šāʾa llāh",
      fr:"La soif a disparu, les veines sont désaltérées et la récompense est assurée si Allah le veut",
      src:"Sunan Abî Dâwûd n°2357 — Ibn ʿUmar (رضي الله عنه) — Hasan",
      reward:"" },
  ]},

  // ── 9. MAISON ──────────────────────────────────────────────────────
  { id:"maison", icon:"🏠", titre:"Maison & Déplacements", titreAr:"البيت والتنقل", douaas:[
    { s:"En entrant chez soi",
      ar:"بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
      tr:"Bismillāhi walajanā wa bismillāhi ḫarajnā wa ʿalā llāhi rabbinā tawakkalnā",
      fr:"Au nom d'Allah nous entrons, au nom d'Allah nous sortons et nous nous en remettons à Allah notre Seigneur",
      src:"Sunan Abî Dâwûd n°5096 — Abû Mālik Al-Ashʿarî (رضي الله عنه) — Hasan",
      reward:"Satan dit à ses acolytes : pas de logement ni de repas ici pour vous" },
    { s:"En sortant de chez soi",
      ar:"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
      tr:"Bismillāh, tawakkaltu ʿalā llāh, lā ḥawla wa lā quwwata illā billāh",
      fr:"Au nom d'Allah, je m'en remets à Allah, il n'y a de force ni de puissance qu'en Allah",
      src:"Sunan Abî Dâwûd n°5095, Sunan At-Tirmidhî n°3426 — Anas ibn Mālik (رضي الله عنه) — Sahîh",
      reward:"Il lui est dit : tu es guidé, préservé et protégé — Satan s'éloigne" },
    { s:"En montant dans un véhicule / moyen de transport",
      ar:"بِسْمِ اللَّهِ سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ",
      tr:"Bismillāh. Subḥāna llaḏī saḫḫara lanā hāḏā wa mā kunnā lahu muqrinīna wa innā ilā rabbinā la-munqalibūn",
      fr:"Au nom d'Allah. Gloire à Celui qui nous a soumis ceci alors que nous n'en étions pas capables, et nous retournerons à notre Seigneur",
      src:"Sahîh Muslim n°1342, Sunan Abî Dâwûd n°2602 — ʿAlî ibn Abî Ṭālib (رضي الله عنه)",
      reward:"" },
  ]},

  // ── 10. SOMMEIL ────────────────────────────────────────────────────
  { id:"sommeil", icon:"🌙", titre:"Sommeil", titreAr:"النوم", douaas:[
    { s:"Avant de dormir — 1",
      ar:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
      tr:"Bismika llāhumma amūtu wa aḥyā",
      fr:"En Ton nom, Ô Allah, je meurs et je vis",
      src:"Sahîh Al-Bukhârî n°6312 — Ḥuḏayfa ibn Al-Yamān (رضي الله عنه)",
      reward:"" },
    { s:"Avant de dormir — 2 (Douaa complète)",
      ar:"اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ",
      tr:"Allāhumma qinī ʿaḏābaka yawma tabʿaṯu ʿibādak",
      fr:"Ô Allah, préserve-moi de Ton châtiment le jour où Tu ressusciteras Tes serviteurs",
      src:"Sunan Abî Dâwûd n°5045, Sunan At-Tirmidhî n°3398 — Ḥafṣa (رضي الله عنها) — Sahîh",
      reward:"Le Prophète ﷺ la disait 3 fois" },
    { s:"Avant de dormir — Al-Mulk (Sourate 67)",
      ar:"تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ... (سورة الملك كاملة)",
      tr:"Sourate Al-Mulk (67) — à réciter entièrement",
      fr:"Réciter la Sourate Al-Mulk (sourate 67) avant de dormir",
      src:"Sunan At-Tirmidhî n°2891, Sunan Abî Dâwûd n°1400 — Ibn ʿAbbâs (رضي الله عنه) — Sahîh",
      reward:"Protection du châtiment de la tombe" },
    { s:"Avant de dormir — Sourate Al-Kâfirûn (109)",
      ar:"قُلْ يَا أَيُّهَا الْكَافِرُونَ... (سورة الكافرون كاملة)",
      tr:"Sourate Al-Kāfirūn (109) — à réciter entièrement",
      fr:"Réciter la Sourate Al-Kâfirûn entièrement avant de dormir",
      src:"Sunan Abî Dâwûd n°5055, Sunan At-Tirmidhî n°3403 — Nawfal Al-Ashjaʿî (رضي الله عنه) — Sahîh",
      reward:"Protection contre le shirk pendant le sommeil" },
    { s:"Avant de dormir — Âyat Al-Kursî",
      ar:"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ... (آية الكرسي)",
      tr:"Āyatu l-Kursī (Al-Baqara 2:255)",
      fr:"Réciter le Verset du Trône avant de dormir",
      src:"Sahîh Al-Bukhârî n°2311 — Abû Hurayra (رضي الله عنه)",
      reward:"Un ange le protège toute la nuit et Satan ne peut pas s'approcher de lui" },
    { s:"En changeant de côté en dormant",
      ar:"لَا إِلَٰهَ إِلَّا اللَّهُ الْوَاحِدُ الْقَهَّارُ رَبُّ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا الْعَزِيزُ الْغَفَّارُ",
      tr:"Lā ilāha illā llāhu l-wāḥidu l-qahhāru rabbu s-samāwāti wa l-arḍi wa mā baynahumā l-ʿazīzu l-ġaffār",
      fr:"Il n'y a de dieu qu'Allah, l'Unique, le Dominateur, Seigneur des cieux et de la terre et de ce qui est entre eux, le Puissant, le Pardonneur",
      src:"Sahîh Al-Bukhârî dans Al-Adab Al-Mufrad — Confirmé par Al-Albânî",
      reward:"" },
    { s:"Après un cauchemar",
      ar:"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ غَضَبِهِ وَعِقَابِهِ وَشَرِّ عِبَادِهِ وَمِنْ هَمَزَاتِ الشَّيَاطِينِ وَأَنْ يَحْضُرُونِ",
      tr:"Aʿūḏu bi kalimāti llāhi t-tāmmāti min ġaḍabihi wa ʿiqābihi wa šarri ʿibādihi wa min hamazāti š-šayāṭīni wa an yaḥḍurūn",
      fr:"Je cherche refuge dans les paroles parfaites d'Allah contre Sa colère, Sa punition, le mal de Ses serviteurs et contre les souffles des démons",
      src:"Sunan Abî Dâwûd n°3893, Sunan At-Tirmidhî n°3528 — Sahîh",
      reward:"Cracher légèrement 3 fois à gauche puis réciter" },
  ]},

  // ── 11. VOYAGE ─────────────────────────────────────────────────────
  { id:"voyage", icon:"✈️", titre:"Voyage", titreAr:"السفر", douaas:[
    { s:"Douaa du voyageur (en partant)",
      ar:"اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَى وَمِنَ الْعَمَلِ مَا تَرْضَى اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَٰذَا وَاطْوِ عَنَّا بُعْدَهُ اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ وَالْخَلِيفَةُ فِي الْأَهْلِ",
      tr:"Allāhu Akbar (3x). Subḥāna llaḏī saḫḫara lanā hāḏā... Allāhumma innā nasʾaluka fī safarinā hāḏā l-birra wa t-taqwā...",
      fr:"Allah est le plus Grand (3x). Gloire à Celui qui nous a soumis cela... Ô Allah, nous Te demandons dans ce voyage la piété et la crainte... Ô Allah, facilite-nous ce voyage, raccourcis sa distance. Ô Allah, Tu es notre compagnon dans le voyage et le gardien de notre famille",
      src:"Sahîh Muslim n°1342 — ʿAbdullāh ibn ʿUmar (رضي الله عنه)",
      reward:"" },
    { s:"Au retour du voyage (à ajouter)",
      ar:"آيِبُونَ تَائِبُونَ عَابِدُونَ لِرَبِّنَا حَامِدُونَ",
      tr:"Āʾibūna tāʾibūna ʿābidūna li-rabbinā ḥāmidūn",
      fr:"Nous voilà de retour, repentants, adorateurs de notre Seigneur, Le louant",
      src:"Sahîh Muslim n°1342 — ʿAbdullāh ibn ʿUmar (رضي الله عنه)",
      reward:"" },
    { s:"Douaa pour celui qui reste (dit au voyageur)",
      ar:"أَسْتَوْدِعُ اللَّهَ دِينَكَ وَأَمَانَتَكَ وَخَوَاتِيمَ عَمَلِكَ",
      tr:"Astawdiʿu llāha dīnaka wa amānataka wa ḫawātīma ʿamalik",
      fr:"Je confie à Allah ta religion, ta fidélité et la fin de tes actes",
      src:"Sunan Abî Dâwûd n°2600, Sunan At-Tirmidhî n°3443 — Sahîh",
      reward:"" },
  ]},

  // ── 12. PROTECTION ─────────────────────────────────────────────────
  { id:"protection", icon:"🛡️", titre:"Protection & Épreuves", titreAr:"الحماية والابتلاء", douaas:[
    { s:"Contre la tristesse et l'anxiété",
      ar:"اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ عَدْلٌ فِيَّ قَضَاؤُكَ أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ سَمَّيْتَ بِهِ نَفْسَكَ أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي وَجَلَاءَ حُزْنِي وَذَهَابَ هَمِّي",
      tr:"Allāhumma innī ʿabduka bnu ʿabdika bnu amatika nāṣiyatī biyadika māḍin fiyya ḥukmuka ʿadlun fiyya qaḍāʾuka asʾaluka bi kulli smin huwa laka... an tajʿala l-qurʾāna rabīʿa qalbī wa nūra ṣadrī wa jalāʾa ḥuznī wa ḏahāba hammī",
      fr:"Ô Allah, je suis Ton serviteur, fils de Ton serviteur, fils de Ta servante... je Te demande de faire du Coran le printemps de mon cœur, la lumière de ma poitrine, la dissipation de ma tristesse et la disparition de mon anxiété",
      src:"Musnad Ahmad n°3528 — Sahîh Ibn Hibbân — Ibn Masʿūd (رضي الله عنه)",
      reward:"Allah dissipera sa tristesse et remplacera sa peine par de la joie" },
    { s:"Contre une douleur corporelle (7 fois)",
      ar:"أَعُوذُ بِعِزَّةِ اللَّهِ وَقُدْرَتِهِ مِنْ شَرِّ مَا أَجِدُ وَأُحَاذِرُ",
      tr:"Aʿūḏu biʿizzati llāhi wa qudratihī min šarri mā ajidu wa uḥāḏir",
      fr:"Je cherche refuge dans la majesté d'Allah et Sa puissance contre le mal que je ressens et contre ce que je crains",
      src:"Sahîh Muslim n°2202 — ʿUthmān ibn Abî l-ʿĀṣ (رضي الله عنه)",
      reward:"À dire 7 fois en posant la main sur l'endroit douloureux" },
    { s:"Contre le mauvais œil",
      ar:"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
      tr:"Aʿūḏu bi kalimāti llāhi t-tāmmati min kulli šayṭānin wa hāmmatin wa min kulli ʿaynin lāmma",
      fr:"Je cherche refuge dans les paroles parfaites d'Allah contre tout démon, tout animal nuisible et tout mauvais œil",
      src:"Sahîh Al-Bukhârî n°3371 — Abû Hurayra (رضي الله عنه)",
      reward:"Le Prophète ﷺ protégeait Al-Hasan et Al-Husayn avec cette douaa" },
    { s:"En cas de colère",
      ar:"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
      tr:"Aʿūḏu billāhi mina š-šayṭāni r-rajīm",
      fr:"Je cherche refuge auprès d'Allah contre Satan le maudit",
      src:"Sahîh Al-Bukhârî n°3282, Sahîh Muslim n°2610 — Sulaymān ibn Ṣurad (رضي الله عنه)",
      reward:"La colère s'apaise — le Prophète ﷺ l'a enseigné à celui qui était en colère" },
    { s:"En cas d'affliction ou d'épreuve",
      ar:"إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
      tr:"Innā lillāhi wa innā ilayhi rājiʿūn. Allāhumma ʾjurnī fī muṣībatī wa aḫlif lī ḫayran minhā",
      fr:"Nous appartenons à Allah et c'est à Lui que nous retournons. Ô Allah, récompense-moi dans mon épreuve et remplace-moi par quelque chose de mieux",
      src:"Sahîh Muslim n°918 — Umm Salama (رضي الله عنها)",
      reward:"Allah le remplacera par quelque chose de mieux — Umm Salama dit qu'elle le dit au décès d'Abû Salama et qu'Allah lui accorda le Prophète ﷺ comme mari" },
    { s:"En cas de dette ou difficulté financière",
      ar:"اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
      tr:"Allāhumma kfinī biḥalālika ʿan ḥarāmika wa aġninī bifaḍlika ʿamman siwāk",
      fr:"Ô Allah, suffit-moi de ce qui est licite pour m'éloigner de l'illicite, et enrichis-moi par Ta grâce de sorte que je n'aie besoin de personne d'autre que Toi",
      src:"Sunan At-Tirmidhî n°3563 — ʿAlî ibn Abî Ṭālib (رضي الله عنه) — Hasan",
      reward:"" },
  ]},

  // ── 13. NATURE ─────────────────────────────────────────────────────
  { id:"nature", icon:"⛈️", titre:"Nature & Météo", titreAr:"الطبيعة", douaas:[
    { s:"Quand il pleut",
      ar:"اللَّهُمَّ صَيِّبًا نَافِعًا",
      tr:"Allāhumma ṣayyiban nāfiʿā",
      fr:"Ô Allah, (fais-en) une pluie bienfaisante",
      src:"Sahîh Al-Bukhârî n°1032 — ʿĀʾisha (رضي الله عنها)",
      reward:"" },
    { s:"Après la pluie",
      ar:"مُطِرْنَا بِفَضْلِ اللَّهِ وَرَحْمَتِهِ",
      tr:"Muṭirnā bi faḍli llāhi wa raḥmatih",
      fr:"Nous avons reçu la pluie par la grâce et la miséricorde d'Allah",
      src:"Sahîh Al-Bukhârî n°846, Sahîh Muslim n°71 — Zayd ibn Khālid (رضي الله عنه)",
      reward:"Préserve la foi — celui qui dit le contraire est dans la mécréance selon le hadith" },
    { s:"Quand il y a du tonnerre",
      ar:"سُبْحَانَ الَّذِي يُسَبِّحُ الرَّعْدُ بِحَمْدِهِ وَالْمَلَائِكَةُ مِنْ خِيفَتِهِ",
      tr:"Subḥāna llaḏī yusabbiḥu r-raʿdu biḥamdihi wa l-malāʾikatu min ḫīfatih",
      fr:"Gloire à Celui que le tonnerre glorifie en Sa louange, ainsi que les anges par crainte de Lui",
      src:"Al-Muwāṭṭaʾ d'Imâm Mâlik — Ibn ʿUmar (رضي الله عنه) — Authentifié",
      reward:"" },
    { s:"En cas de vent fort",
      ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا فِيهَا وَخَيْرَ مَا أُرْسِلَتْ بِهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَشَرِّ مَا فِيهَا وَشَرِّ مَا أُرْسِلَتْ بِهِ",
      tr:"Allāhumma innī asʾaluka ḫayrahā wa ḫayra mā fīhā wa ḫayra mā ursilat bih wa aʿūḏu bika min šarrihā...",
      fr:"Ô Allah, je Te demande son bien et le bien pour lequel elle a été envoyée. Je cherche refuge en Toi contre son mal et le mal pour lequel elle a été envoyée",
      src:"Sahîh Muslim n°899 — ʿĀʾisha (رضي الله عنها)",
      reward:"" },
    { s:"En voyant le croissant de lune",
      ar:"اللَّهُ أَكْبَرُ اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ رَبِّي وَرَبُّكَ اللَّهُ",
      tr:"Allāhu Akbar. Allāhumma ahillahu ʿalaynā bi l-amni wa l-īmāni wa s-salāmati wa l-islām. Rabbī wa rabbuka llāh",
      fr:"Allah est le plus Grand. Ô Allah, fais que ce croissant soit pour nous (signe de) sécurité, foi, salut et Islam. Mon Seigneur et ton Seigneur est Allah",
      src:"Sunan At-Tirmidhî n°3451 — Ṭalḥa ibn ʿUbaydillāh (رضي الله عنه) — Hasan",
      reward:"" },
    { s:"En cas de chaleur extrême",
      ar:"اللَّهُمَّ أَجِرْنَا مِنَ النَّارِ",
      tr:"Allāhumma ajrinā mina n-nār",
      fr:"Ô Allah, protège-nous du Feu",
      src:"Sunan Abî Dâwûd n°5105 — Abû Dharr (رضي الله عنه) — Hasan",
      reward:"Le Prophète ﷺ disait cela quand il faisait très chaud : 'la chaleur de la Géhenne'" },
  ]},

  // ── 14. MALADE & DÉCÈS ─────────────────────────────────────────────
  { id:"malade", icon:"🏥", titre:"Maladie & Décès", titreAr:"المرض والوفاة", douaas:[
    { s:"Douaa pour guérir le malade (posée sur lui — 7 fois)",
      ar:"اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ اشْفِهِ وَأَنْتَ الشَّافِي لَا شِفَاءَ إِلَّا شِفَاؤُكَ شِفَاءً لَا يُغَادِرُ سَقَمًا",
      tr:"Allāhumma rabba n-nāsi aḏhibi l-baʾsa ašfihī wa anta š-šāfī lā šifāʾa illā šifāʾuka šifāʾan lā yuġādiru saqamā",
      fr:"Ô Allah, Seigneur des hommes, éloigne la souffrance, guéris-le. Tu es le Guérisseur, il n'y a de guérison que la Tienne, une guérison qui ne laisse aucune maladie",
      src:"Sahîh Al-Bukhârî n°5675, Sahîh Muslim n°2191 — ʿĀʾisha (رضي الله عنها)",
      reward:"Le Prophète ﷺ lisait cette douaa 7 fois sur le malade" },
    { s:"Réconfort au malade",
      ar:"لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ",
      tr:"Lā baʾsa ṭahūrun in šāʾa llāh",
      fr:"Pas de mal, c'est une purification (des péchés) si Allah le veut",
      src:"Sahîh Al-Bukhârî n°3616 — Ibn ʿAbbâs (رضي الله عنه)",
      reward:"La maladie efface les péchés" },
    { s:"À l'annonce d'un décès",
      ar:"إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا",
      tr:"Innā lillāhi wa innā ilayhi rājiʿūn. Allāhumma ʾjurnī fī muṣībatī wa aḫlif lī ḫayran minhā",
      fr:"Nous appartenons à Allah et c'est à Lui que nous retournons. Ô Allah, récompense-moi dans mon épreuve et remplace-moi par quelque chose de mieux",
      src:"Sahîh Muslim n°918 — Umm Salama (رضي الله عنها)",
      reward:"Allah lui accorde une récompense et un meilleur remplacement" },
    { s:"Prière funéraire — Douaa principale",
      ar:"اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا وَشَاهِدِنَا وَغَائِبِنَا وَصَغِيرِنَا وَكَبِيرِنَا وَذَكَرِنَا وَأُنْثَانَا",
      tr:"Allāhumma ġfir liḥayyinā wa mayyitinā wa šāhidinā wa ġāʾibinā wa ṣaġīrinā wa kabīrinā wa ḏakarinā wa unṯānā",
      fr:"Ô Allah, pardonne à nos vivants et à nos morts, à ceux présents et absents, à nos petits et grands, à nos hommes et femmes",
      src:"Sunan Abî Dâwûd n°3201, Sunan At-Tirmidhî n°1024 — Abû Hurayra (رضي الله عنه) — Sahîh",
      reward:"" },
    { s:"Prière funéraire — Douaa pour le défunt",
      ar:"اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ وَأَكْرِمْ نُزُلَهُ وَوَسِّعْ مُدْخَلَهُ وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ",
      tr:"Allāhumma ġfir lahu wa rḥamhu wa ʿāfihi wa ʿfu ʿanhu wa akrimnuzulahu wa wassiʿ mudḫalahu wa ġsilhu bil-māʾi wa ṯ-ṯalji wa l-baradi wa naqqihi...",
      fr:"Ô Allah, pardonne-lui, fais-lui miséricorde, préserve-le, pardonne-lui, honore sa réception, élargis son entrée (dans la tombe), lave-le avec l'eau, la neige et la grêle, purife-le des péchés comme on nettoie le vêtement blanc",
      src:"Sahîh Muslim n°963 — ʿAwf ibn Mālik (رضي الله عنه)",
      reward:"La meilleure douaa pour le défunt" },
    { s:"En visitant le cimetière",
      ar:"السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ وَإِنَّا إِنْ شَاءَ اللَّهُ بِكُمْ لَاحِقُونَ نَسْأَلُ اللَّهَ لَنَا وَلَكُمُ الْعَافِيَةَ",
      tr:"As-salāmu ʿalaykum ahla d-diyāri mina l-muʾminīna wa l-muslimīn... nasʾalu llāha lanā wa lakumu l-ʿāfiya",
      fr:"Que la paix soit sur vous, habitants de ces demeures, croyants et musulmans. Nous vous rejoindrons si Allah le veut. Nous demandons à Allah pour nous et pour vous le salut",
      src:"Sahîh Muslim n°975 — ʿĀʾisha (رضي الله عنها)",
      reward:"" },
  ]},

  // ── 15. MARIAGE & FAMILLE ──────────────────────────────────────────
  { id:"mariage", icon:"💍", titre:"Mariage & Famille", titreAr:"الزواج والأسرة", douaas:[
    { s:"Pour les nouveaux mariés",
      ar:"بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
      tr:"Bāraka llāhu laka wa bāraka ʿalayka wa jamaʿa baynakumā fī ḫayr",
      fr:"Qu'Allah te bénisse, te comble de bénédictions et vous réunisse dans le bien",
      src:"Sunan Abî Dâwûd n°2130, Sunan At-Tirmidhî n°1091 — Abû Hurayra (رضي الله عنه) — Sahîh",
      reward:"Ce que le Prophète ﷺ disait aux nouveaux mariés" },
    { s:"Douaa du marié la nuit de noces",
      ar:"اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَهَا وَخَيْرَ مَا جَبَلْتَهَا عَلَيْهِ وَأَعُوذُ بِكَ مِنْ شَرِّهَا وَمِنْ شَرِّ مَا جَبَلْتَهَا عَلَيْهِ",
      tr:"Allāhumma innī asʾaluka ḫayrahā wa ḫayra mā jabaltahā ʿalayhi wa aʿūḏu bika min šarrihā wa min šarri mā jabaltahā ʿalayh",
      fr:"Ô Allah, je Te demande son bien et le bien de son naturel. Je cherche refuge en Toi contre son mal et le mal de son naturel",
      src:"Sunan Abî Dâwûd n°2160, Ibn Mājah n°1918 — Sahîh",
      reward:"" },
    { s:"Avant les relations conjugales",
      ar:"بِسْمِ اللَّهِ اللَّهُمَّ جَنِّبْنَا الشَّيْطَانَ وَجَنِّبِ الشَّيْطَانَ مَا رَزَقْتَنَا",
      tr:"Bismillāh, Allāhumma jannibna š-šayṭāna wa jannib iš-šayṭāna mā razaqtanā",
      fr:"Au nom d'Allah. Ô Allah, éloigne-nous de Satan et éloigne Satan de ce que Tu nous accorderas",
      src:"Sahîh Al-Bukhârî n°141, Sahîh Muslim n°1434 — Ibn ʿAbbâs (رضي الله عنه)",
      reward:"Si un enfant naît de cette union, Satan ne pourra jamais lui nuire" },
    { s:"Protection d'un nouveau-né",
      ar:"أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
      tr:"Aʿūḏu bi kalimāti llāhi t-tāmmati min kulli šayṭānin wa hāmmatin wa min kulli ʿaynin lāmma",
      fr:"Je cherche refuge dans les paroles parfaites d'Allah contre tout démon, tout animal nuisible et tout mauvais œil",
      src:"Sahîh Al-Bukhârî n°3371 — Abû Hurayra (رضي الله عنه)",
      reward:"Le Prophète ﷺ protégeait Al-Hasan et Al-Husayn avec cette douaa" },
  ]},

  // ── 16. ÉTERNUEMENT & BÂILLEMENT ───────────────────────────────────
  { id:"eternuement", icon:"🤧", titre:"Éternuement & Bâillement", titreAr:"العطاس والتثاؤب", douaas:[
    { s:"Quand on éternue",
      ar:"الْحَمْدُ لِلَّهِ",
      tr:"Al-ḥamdu lillāh",
      fr:"Louange à Allah",
      src:"Sahîh Al-Bukhârî n°6224 — Abû Hurayra (رضي الله عنه)",
      reward:"Signe de bonne santé — le Prophète ﷺ aimait l'éternuement" },
    { s:"Ce que l'on répond à celui qui éternue",
      ar:"يَرْحَمُكَ اللَّهُ",
      tr:"Yarḥamuka llāh",
      fr:"Qu'Allah te fasse miséricorde",
      src:"Sahîh Al-Bukhârî n°6224 — Abû Hurayra (رضي الله عنه)",
      reward:"" },
    { s:"Ce que l'éternueur répond",
      ar:"يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ",
      tr:"Yahdīkumu llāhu wa yuṣliḥu bālakum",
      fr:"Qu'Allah vous guide et améliore votre état",
      src:"Sahîh Al-Bukhârî n°6224 — Abû Hurayra (رضي الله عنه)",
      reward:"" },
    { s:"En cas de bâillement",
      ar:"(retenir le bâillement autant que possible — pas de douaa — c'est de Satan)",
      tr:"Retenir le bâillement",
      fr:"Le Prophète ﷺ a dit : 'Le bâillement vient de Satan, si l'un d'eux bâille, qu'il retienne autant qu'il peut'",
      src:"Sahîh Al-Bukhârî n°3289, Sahîh Muslim n°2994 — Abû Hurayra (رضي الله عنه)",
      reward:"" },
  ]},

  // ── 17. SALUTATIONS ────────────────────────────────────────────────
  { id:"salam", icon:"🤝", titre:"Salutations & Rencontres", titreAr:"السلام والتحيات", douaas:[
    { s:"En donnant le salam",
      ar:"السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      tr:"As-salāmu ʿalaykum wa raḥmatu llāhi wa barakātuh",
      fr:"Que la paix, la miséricorde et les bénédictions d'Allah soient sur vous",
      src:"Sunan Abî Dâwûd n°5195 — ʿImrān ibn Ḥusayn (رضي الله عنه) — Sahîh",
      reward:"La forme complète vaut 30 bonnes actions" },
    { s:"Quand on rencontre un frère",
      ar:"يَغْفِرُ اللَّهُ لَنَا وَلَكُمْ",
      tr:"Yaġfiru llāhu lanā wa lakum",
      fr:"Qu'Allah nous pardonne à nous et à vous",
      src:"Sahîh Al-Bukhârî — pratique des Compagnons",
      reward:"" },
    { s:"Douaa pour celui qu'on aime en Allah",
      ar:"أَحَبَّكَ الَّذِي أَحْبَبْتَنِي لَهُ",
      tr:"Aḥabbaka llaḏī aḥbabtan lah",
      fr:"Que Celui pour lequel tu m'as aimé t'aime",
      src:"Sunan Abî Dâwûd n°5125 — Anas ibn Mālik (رضي الله عنه) — Sahîh",
      reward:"" },
  ]},

  // ── 18. MARCHÉ ─────────────────────────────────────────────────────
  { id:"marche", icon:"🛒", titre:"Au Marché", titreAr:"السوق", douaas:[
    { s:"En entrant au marché",
      ar:"لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
      tr:"Lā ilāha illā llāhu waḥdahu lā šarīka lahu lahu l-mulku wa lahu l-ḥamdu yuḥyī wa yumītu wa huwa ḥayyun lā yamūtu biyadihi l-ḫayru wa huwa ʿalā kulli šayʾin qadīr",
      fr:"Il n'y a de dieu qu'Allah Seul sans associé, à Lui la Royauté et la Louange, Il donne la vie et la mort, Il est Vivant et ne meurt pas, en Sa main est le bien, Il est Omnipotent",
      src:"Sunan At-Tirmidhî n°3428, Ibn Mājah n°2235 — ʿUmar ibn Al-Khaṭṭāb (رضي الله عنه) — Hasan",
      reward:"Allah lui écrit un million de bonnes actions, efface un million de mauvaises et élève son rang d'un million de degrés" },
  ]},

];


// ── COMPOSANTS DHIKR ─────────────────────────────────────────────────────────
function Counter({ item, t }) {
  const [count, setCount] = useState(0);
  const [done,  setDone]  = useState(false);
  const [pulse, setPulse] = useState(false);
  const target = item.count;
  const tap = () => {
    if (done) return;
    setPulse(true); setTimeout(()=>setPulse(false),140);
    const next = count+1; setCount(next);
    if (target && next>=target) setTimeout(()=>setDone(true),300);
  };
  return (
    <div style={{ padding:"14px 16px", marginBottom:10,
      background:done?t.tagOn:t.card,
      border:`1px solid ${done?t.tagOnBorder:t.cardBorder}`,
      borderRadius:14, boxShadow:t.cardShadow, transition:"all 0.3s" }}>
      <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:20, color:t.ar, direction:"rtl", textAlign:"right", lineHeight:1.9, marginBottom:6 }}>{item.ar}</div>
      <div style={{ fontSize:11, color:t.gold, fontStyle:"italic", marginBottom:4, lineHeight:1.5 }}>{item.tr}</div>
      <div style={{ fontSize:12, color:t.muted, marginBottom:8, lineHeight:1.6 }}>{item.fr}</div>
      {item.note && <div style={{ fontSize:10, color:`${t.gold}bb`, fontStyle:"italic", borderLeft:`2px solid ${t.gold}44`, paddingLeft:8, marginBottom:8, lineHeight:1.5 }}>{item.note}</div>}
      {item.reward && (
        <div style={{ padding:"8px 10px", background:`${t.gold}12`, border:`1px solid ${t.gold}44`, borderRadius:8, marginBottom:8 }}>
          <div style={{ fontSize:9, color:t.gold, letterSpacing:2, marginBottom:3, textTransform:"uppercase" }}>✦ Récompense</div>
          <div style={{ fontSize:11, color:t.gold, fontStyle:"italic", lineHeight:1.5, opacity:0.85 }}>{item.reward}</div>
        </div>
      )}
      <div style={{ padding:"5px 8px", background:`${t.green}0a`, border:`1px solid ${t.cardBorder}`, borderRadius:6, marginBottom:target?10:0 }}>
        <div style={{ fontSize:9, color:t.green }}>📚 {item.source}</div>
      </div>
      {target && (
        <div>
          <div style={{ height:3, background:`${t.tagOn}`, borderRadius:2, marginBottom:10, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${Math.min(count/target,1)*100}%`, background:done?t.gold:t.green, borderRadius:2, transition:"width 0.2s" }}/>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={tap} style={{
              flex:1, padding:"11px",
              background:done?`linear-gradient(135deg,${t.gold},#a87838)`:`linear-gradient(135deg,${t.green},#1a5a28)`,
              border:`1px solid ${done?t.gold:t.green}`, borderRadius:10,
              cursor:done?"default":"pointer", color:"#fff", fontSize:14, fontWeight:"700",
              transform:pulse?"scale(0.96)":"scale(1)", transition:"transform 0.14s",
            }}>{done?"✅ Terminé !": `${count} / ${target}`}</button>
            <button onClick={()=>{setCount(0);setDone(false);}} style={{ width:38, height:38, background:t.tagOff, border:`1px solid ${t.tagOffBorder}`, borderRadius:9, cursor:"pointer", color:t.muted, fontSize:15, display:"flex", alignItems:"center", justifyContent:"center" }}>↺</button>
          </div>
        </div>
      )}
    </div>
  );
}

function SpecialSection({ title, titleAr, icon, items, t, isOpen, onToggle }) {
  return (
    <div style={{ marginBottom:12, border:`1px solid ${t.cardBorder}`, borderRadius:16, overflow:"hidden", boxShadow:t.cardShadow }}>
      <button onClick={onToggle} style={{ width:"100%", padding:"16px 18px", background:t.tagOff, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left" }}>
        <span style={{ fontSize:24 }}>{icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:"800", fontStyle:"italic", color:t.green, marginBottom:2 }}>{title}</div>
          <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:13, color:t.ar }}>{titleAr}</div>
        </div>
        <div style={{ color:t.gold, fontSize:20, transition:"transform 0.3s", transform:isOpen?"rotate(90deg)":"rotate(0)" }}>›</div>
      </button>
      {isOpen && <div style={{ padding:"12px 14px", background:t.card }}>{items.map((item,i)=><Counter key={i} item={item} t={t}/>)}</div>}
    </div>
  );
}

// ── COMPOSANTS DOUAAS ────────────────────────────────────────────────────────
function DuaaCard({ d, t }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom:10, background:t.card, border:`1px solid ${t.cardBorder}`, borderRadius:14, overflow:"hidden", boxShadow:t.cardShadow }}>
      <button onClick={()=>setOpen(!open)} style={{ width:"100%", padding:"13px 16px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", textAlign:"left" }}>
        <div style={{ flex:1, marginRight:10 }}>
          <div style={{ fontSize:11, fontWeight:"700", color:t.green, marginBottom:3 }}>{d.s}</div>
          <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:16, color:t.ar, direction:"rtl", textAlign:"right", lineHeight:1.7 }}>{d.ar.length>55?d.ar.substring(0,55)+"...":d.ar}</div>
        </div>
        <div style={{ color:t.gold, fontSize:18, transition:"transform 0.25s", transform:open?"rotate(90deg)":"rotate(0)", flexShrink:0 }}>›</div>
      </button>
      {open && (
        <div style={{ padding:"0 16px 14px", borderTop:`1px solid ${t.cardBorder}` }}>
          <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:19, color:t.ar, direction:"rtl", textAlign:"right", lineHeight:2, marginTop:10, marginBottom:10 }}>{d.ar}</div>
          <div style={{ fontSize:11, color:t.gold, fontStyle:"italic", lineHeight:1.7, marginBottom:8 }}>{d.tr}</div>
          <div style={{ fontSize:12, color:t.muted, lineHeight:1.7, marginBottom:d.reward?8:10 }}>{d.fr}</div>
          {d.reward && (
            <div style={{ padding:"8px 10px", background:`${t.gold}12`, border:`1px solid ${t.gold}44`, borderRadius:8, marginBottom:8 }}>
              <div style={{ fontSize:9, color:t.gold, letterSpacing:2, marginBottom:3, textTransform:"uppercase" }}>✦ Récompense</div>
              <div style={{ fontSize:11, color:t.gold, fontStyle:"italic", lineHeight:1.5, opacity:0.85 }}>{d.reward}</div>
            </div>
          )}
          <div style={{ padding:"5px 10px", background:`${t.green}0a`, border:`1px solid ${t.cardBorder}`, borderRadius:8 }}>
            <div style={{ fontSize:9, color:t.green, lineHeight:1.5 }}>📚 {d.src}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function CatDouaa({ cat, t, isOpen, onToggle }) {
  return (
    <div style={{ marginBottom:10, border:`1px solid ${t.cardBorder}`, borderRadius:16, overflow:"hidden", boxShadow:t.cardShadow }}>
      <button onClick={onToggle} style={{ width:"100%", padding:"14px 18px", background:t.tagOff, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left" }}>
        <span style={{ fontSize:22, flexShrink:0 }}>{cat.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:13, fontWeight:"800", fontStyle:"italic", color:t.green, marginBottom:2 }}>{cat.titre}</div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ fontFamily:"'Traditional Arabic',serif", fontSize:12, color:t.ar }}>{cat.titreAr}</span>
            <span style={{ fontSize:9, color:t.muted }}>{cat.douaas.length} invocation{cat.douaas.length>1?"s":""}</span>
          </div>
        </div>
        <div style={{ color:t.gold, fontSize:20, transition:"transform 0.3s", transform:isOpen?"rotate(90deg)":"rotate(0)", flexShrink:0 }}>›</div>
      </button>
      {isOpen && <div style={{ padding:"12px 14px", background:t.card }}>{cat.douaas.map((d,i)=><DuaaCard key={i} d={d} t={t}/>)}</div>}
    </div>
  );
}


// ══════════════════════════════════════════════════════════════════════════════
// APP PRINCIPALE
// ══════════════════════════════════════════════════════════════════════════════
export default function ByMuslim() {
  const [mode,       setMode]      = useState("jour");
  const [page,       setPage]      = useState("home");
  // Coran
  const [view,       setView]      = useState("list");
  const [tab,        setTab]       = useState("chapitres");
  const [sort,       setSort]      = useState("asc");
  const [search,     setSearch]    = useState("");
  const [selected,   setSelected]  = useState(null);
  const [favs,       setFavs]      = useState([1,18,36,67,112]);
  const [recent,     setRecent]    = useState([1,18,36]);
  const [lastRead,   setLastRead]  = useState({n:1,v:1});
  const [showAr,     setShowAr]    = useState(true);
  const [showTr,     setShowTr]    = useState(true);
  const [showFr,     setShowFr]    = useState(true);
  const [verses,     setVerses]    = useState([]);
  const [loading,    setLoading]   = useState(false);
  const [cache,      setCache]     = useState({});
  // Dhikr
  const [dhikrTab,   setDhikrTab]  = useState("tasbih");
  const [openAid,    setOpenAid]   = useState(false);
  const [openJum,    setOpenJum]   = useState(false);
  // Douaas
  const [openCats,   setOpenCats]  = useState({});
  const [dSearch,    setDSearch]   = useState("");
  // Global
  const [fade,       setFade]      = useState(false);
  const scrollRef = useRef(null);
  const t = T[mode];

  const switchMode = () => {
    setFade(true);
    setTimeout(()=>{ setMode(m=>m==="jour"?"nuit":"jour"); setFade(false); }, 280);
  };
  const go = (p) => {
    setPage(p);
    if (p==="coran") setView("list");
  };
  const openSourate = (s) => {
    setSelected(s); setLastRead({n:s.n,v:1});
    setRecent(r=>[s.n,...r.filter(x=>x!==s.n)].slice(0,5));
    setView("read");
    // Al-Fatiha déjà en local
    if (s.n === 1) { setVerses(FATIHA_AYAHS); return; }
    // Vérifier le cache
    if (cache[s.n]) { setVerses(cache[s.n]); return; }
    // Appel API
    setLoading(true);
    setVerses([]);
    fetch(`https://api.quran.com/api/v4/verses/by_chapter/${s.n}?language=fr&words=true&translations=136&per_page=300&fields=text_uthmani&word_fields=transliteration`)
      .then(r => r.json())
      .then(data => {
        const parsed = data.verses.map(v => ({
          ar: v.text_uthmani,
          tr: v.words.map(w => w.transliteration?.text || "").join(" ").trim(),
          fr: v.translations?.[0]?.text?.replace(/<[^>]*>/g,"") || "",
        }));
        setVerses(parsed);
        setCache(c => ({...c, [s.n]: parsed}));
        setLoading(false);
      })
      .catch(() => {
        setVerses([{ar:"خطأ في التحميل", tr:"Erreur de chargement", fr:"Impossible de charger les versets. Vérifiez votre connexion."}]);
        setLoading(false);
      });
  };
  const toggleFav = (n,e) => {
    e.stopPropagation();
    setFavs(f=>f.includes(n)?f.filter(x=>x!==n):[...f,n]);
  };
  const scrollTo = (n) => {
    const el = document.getElementById("s-"+n);
    if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
  };
  const buildList = () => {
    let list = tab==="favs" ? S.filter(s=>favs.includes(s.n)) : [...S];
    if (sort==="desc") list = [...list].reverse();
    if (sort==="rev")  list = [...list].sort((a,b)=>a.j-b.j||a.n-b.n);
    if (search) list = list.filter(s=>
      s.fr.toLowerCase().includes(search.toLowerCase()) ||
      s.ar.includes(search) ||
      String(s.n).includes(search)
    );
    return list;
  };

  const SourateCard = ({s}) => (
    <div id={"s-"+s.n}>
      <button onClick={()=>openSourate(s)} style={{
        display:"flex", alignItems:"center", gap:12, padding:"12px 14px", marginBottom:6,
        background:t.card, border:`1px solid ${favs.includes(s.n)?`${t.gold}55`:t.cardBorder}`,
        borderLeft:`3.5px solid ${favs.includes(s.n)?t.gold:t.cardAccent}`,
        borderRadius:12, cursor:"pointer", textAlign:"left", width:"100%",
        backdropFilter:"blur(6px)", boxShadow:t.cardShadow, transition:"all 0.2s",
      }}>
        <div style={{ width:36, height:36, flexShrink:0, background:t.tagOff, border:`1px solid ${t.tagOffBorder}`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:"700", color:t.gold }}>{s.n}</div>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3 }}>
            <span style={{ fontSize:14, fontWeight:"700", fontStyle:"italic", color:t.green }}>{s.fr}</span>
            <span style={{ fontSize:9, padding:"1px 6px", background:s.t==="M"?t.mecBg:t.medBg, color:s.t==="M"?t.mecColor:t.medColor, borderRadius:6 }}>{s.t==="M"?"Mecquoise":"Médinoise"}</span>
          </div>
          <div style={{ display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontFamily:"'Traditional Arabic',serif", fontSize:14, color:t.ar }}>{s.ar}</span>
            <span style={{ fontSize:10, color:t.muted }}>{s.v} versets · Juz {s.j}</span>
          </div>
        </div>
        <button onClick={e=>{e.stopPropagation();toggleFav(s.n,e);}} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, flexShrink:0, opacity:favs.includes(s.n)?1:0.2, transition:"all 0.2s" }}>⭐</button>
      </button>
    </div>
  );

  const totalDouaas = CATEGORIES.reduce((a,c)=>a+c.douaas.length, 0);

  return (
    <div style={{ height:"100vh", maxWidth:480, margin:"0 auto", display:"flex", flexDirection:"column", fontFamily:"'Palatino Linotype',Palatino,serif", color:t.color, position:"relative", overflow:"hidden", opacity:fade?0:1, transition:"opacity 0.28s ease" }}>

      {/* FOND + ZELLIJ */}
      <div style={{ position:"absolute", inset:0, background:t.bg, zIndex:0 }}/>
      <svg width="100%" height="100%" style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1 }} preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="zel2" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>{
              const r=Math.PI/180, cx=50, cy=50;
              const p=(a,d)=>[cx+d*Math.cos(a*r), cy+d*Math.sin(a*r)];
              const [tx,ty]=p(deg,30), [l1x,l1y]=p(deg-14,14), [l2x,l2y]=p(deg+14,14);
              const [s1x,s1y]=p(deg-22,22), [s2x,s2y]=p(deg+22,22);
              return <polygon key={i} points={`${l1x},${l1y} ${s1x},${s1y} ${tx},${ty} ${s2x},${s2y} ${l2x},${l2y}`} fill="none" stroke={t.gold} strokeWidth="0.5" opacity="0.15"/>;
            })}
            <circle cx="50" cy="50" r="18" fill="none" stroke={t.green} strokeWidth="0.4" opacity="0.1"/>
            <polygon points="50,34 56,36 61,42 63,50 61,58 56,64 50,66 44,64 39,58 37,50 39,42 44,36" fill="none" stroke={t.gold} strokeWidth="0.4" opacity="0.12"/>
          </pattern>
          <radialGradient id="vig2" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="100%" stopColor={t.titleG[2]} stopOpacity="0.3"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#zel2)"/>
        <rect width="100%" height="100%" fill="url(#vig2)"/>
      </svg>

      {/* HEADER */}
      <div style={{ flexShrink:0, background:t.header, backdropFilter:"blur(16px)", borderBottom:`1px solid ${t.headerBorder}`, padding:"12px 16px 10px", position:"relative", zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:(page==="coran"&&view==="list")||page==="douaas"||page==="dhikr"?10:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {page==="coran"&&view==="read" && (
              <button onClick={()=>setView("list")} style={{ background:"none", border:"none", cursor:"pointer", color:t.gold, fontSize:22, lineHeight:1, padding:"0 6px 0 0" }}>‹</button>
            )}
            <div>
              <div style={{ fontSize:16, fontWeight:"700", fontStyle:"italic", color:t.green, lineHeight:1.2 }}>
                {page==="home"      ? "ByMuslim"
                :page==="coran"&&view==="list" ? "القرآن الكريم"
                :page==="coran"&&view==="read" ? selected?.ar
                :page==="dhikr"    ? "الذكر والتسبيح"
                :                    "الأدعية والأذكار"}
              </div>
              <div style={{ fontSize:10, color:t.muted, letterSpacing:0.8 }}>
                {page==="home"      ? "Votre compagnon spirituel"
                :page==="coran"&&view==="list" ? "Le Saint Coran"
                :page==="coran"&&view==="read" ? selected?.fr
                :page==="dhikr"    ? "Dhikr & Tasbih"
                :                    `${totalDouaas} invocations vérifiées`}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            {page==="coran"&&view==="read" && (
              <div style={{ display:"flex", gap:5 }}>
                {[["ع",showAr,setShowAr],["tr",showTr,setShowTr],["fr",showFr,setShowFr]].map(([l,on,set],i)=>(
                  <button key={i} onClick={()=>set(!on)} style={{ background:on?t.togOn:t.togOff, border:`1px solid ${on?t.togOnBd:t.togOffBd}`, color:on?t.togOnC:t.togOffC, fontSize:10, padding:"4px 8px", borderRadius:10, cursor:"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>{l}</button>
                ))}
              </div>
            )}
            <button onClick={switchMode} style={{ display:"flex", alignItems:"center", gap:5, background:t.modeBg, border:`1px solid ${t.modeBd}`, color:t.modeC, fontSize:10, padding:"6px 12px", borderRadius:20, cursor:"pointer", fontFamily:"inherit" }}>
              <span style={{ fontSize:14 }}>{t.mode}</span>
              <span style={{ letterSpacing:1 }}>{t.modeLabel}</span>
            </button>
          </div>
        </div>

        {/* Sous-header selon page */}
        {page==="coran"&&view==="list" && (
          <div style={{ position:"relative" }}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une sourate..."
              style={{ width:"100%", boxSizing:"border-box", padding:"9px 14px 9px 34px", background:t.searchBg, border:`1px solid ${t.searchBorder}`, borderRadius:10, outline:"none", fontSize:12, color:t.color, fontFamily:"inherit" }}/>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, opacity:0.4 }}>🔍</span>
            {search && <button onClick={()=>setSearch("")} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:t.muted, fontSize:15 }}>×</button>}
          </div>
        )}
        {page==="dhikr" && (
          <div style={{ display:"flex", gap:6 }}>
            {[{k:"tasbih",l:"Tasbih",i:"📿"},{k:"matin",l:"Matin",i:"🌅"},{k:"soir",l:"Soir",i:"🌙"},{k:"special",l:"Spécial",i:"⭐"}].map(tb=>(
              <button key={tb.k} onClick={()=>setDhikrTab(tb.k)} style={{ flex:1, padding:"7px 4px", background:dhikrTab===tb.k?t.tagOn:t.tagOff, border:`1px solid ${dhikrTab===tb.k?t.tagOnBorder:t.tagOffBorder}`, color:dhikrTab===tb.k?t.tagOnColor:t.tagOffColor, borderRadius:10, cursor:"pointer", fontSize:9, fontFamily:"inherit", fontWeight:dhikrTab===tb.k?"700":"400", display:"flex", flexDirection:"column", alignItems:"center", gap:2, transition:"all 0.2s" }}>
                <span style={{ fontSize:15 }}>{tb.i}</span>{tb.l}
              </button>
            ))}
          </div>
        )}
        {page==="douaas" && (
          <div style={{ position:"relative" }}>
            <input value={dSearch} onChange={e=>setDSearch(e.target.value)} placeholder="Rechercher une douaa ou situation..."
              style={{ width:"100%", boxSizing:"border-box", padding:"9px 14px 9px 34px", background:t.searchBg, border:`1px solid ${t.searchBorder}`, borderRadius:10, outline:"none", fontSize:12, color:t.color, fontFamily:"inherit" }}/>
            <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, opacity:0.4 }}>🔍</span>
            {dSearch && <button onClick={()=>setDSearch("")} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:t.muted, fontSize:15 }}>×</button>}
          </div>
        )}
      </div>

      {/* CONTENU */}
      <div style={{ flex:1, overflowY:"auto", overflowX:"hidden", position:"relative", zIndex:2 }} ref={scrollRef}>

        {/* ── ACCUEIL ── */}
        {page==="home" && (
          <div style={{ padding:"28px 22px 100px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:15, color:`${t.green}77`, direction:"rtl", letterSpacing:2, marginBottom:22 }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div style={{ fontSize:66, fontWeight:"900", fontStyle:"italic", lineHeight:1.15, paddingBottom:6, letterSpacing:-1.5, marginBottom:12, display:"inline-block",
              background:`linear-gradient(160deg,${t.titleG[0]} 0%,${t.titleG[1]} 45%,${t.titleG[2]} 100%)`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              filter:`drop-shadow(0 3px 14px ${t.green}22)`,
            }}>ByMuslim</div>
            <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:28, color:t.gold, direction:"rtl", marginBottom:10 }}>باي مسلم</div>
            <div style={{ fontSize:10, color:t.muted, letterSpacing:4, textTransform:"uppercase", marginBottom:20 }}>Votre compagnon spirituel</div>
            {/* Séparateur or */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, margin:"8px 0 18px" }}>
              <div style={{ height:1, width:80, background:`linear-gradient(90deg,transparent,${t.gold}66)` }}/>
              <svg width="22" height="22" viewBox="0 0 22 22"><polygon points="11,1 13,7.5 20,6 16,10.5 21,11 16,11.5 20,16 13,14.5 11,21 9,14.5 2,16 6,11.5 1,11 6,10.5 2,6 9,7.5" fill={t.gold} opacity="0.7"/></svg>
              <div style={{ height:1, width:80, background:`linear-gradient(90deg,${t.gold}66,transparent)` }}/>
            </div>

            {/* Verset du jour */}
            <div style={{ textAlign:"left", padding:"16px 18px", background:t.versetBg, border:`1px solid ${t.versetBorder}`, borderRadius:14, marginBottom:20, boxShadow:t.cardShadow, position:"relative" }}>
              {/* Coins dorés */}
              {[["top:-1px","left:-1px","borderTop","borderLeft"],["top:-1px","right:-1px","borderTop","borderRight"],["bottom:-1px","left:-1px","borderBottom","borderLeft"],["bottom:-1px","right:-1px","borderBottom","borderRight"]].map(([t1,t2,b1,b2],i)=>(
                <div key={i} style={{ position:"absolute", [t1.split(":")[0]]:t1.split(":")[1], [t2.split(":")[0]]:t2.split(":")[1], width:16, height:16, [b1]:`2px solid ${t.gold}88`, [b2]:`2px solid ${t.gold}88`, borderRadius:3 }}/>
              ))}
              <div style={{ fontSize:9, color:t.muted, letterSpacing:3, marginBottom:10, textTransform:"uppercase" }}>✦ Verset du jour</div>
              <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:21, color:t.ar, direction:"rtl", lineHeight:2, textAlign:"right", marginBottom:8 }}>وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا</div>
              <div style={{ fontSize:11, color:t.muted, fontStyle:"italic" }}>« Et quiconque craint Allah, Il lui trouvera une issue »</div>
              <div style={{ fontSize:10, color:t.muted, marginTop:4, opacity:0.7 }}>At-Talaq · 65:2</div>
            </div>

            {/* Catégories */}
            <div style={{ display:"flex", flexDirection:"column", gap:12, textAlign:"left" }}>
              {[
                {key:"coran",  fr:"Coran",  ar:"القرآن الكريم",    desc:"Lire · Écouter · Mémoriser",          icon:"📖"},
                {key:"dhikr",  fr:"Dhikr",  ar:"الذكر والتسبيح",  desc:"Tasbih · Wird · Récompenses",          icon:"📿"},
                {key:"douaas", fr:"Douaas", ar:"الأدعية والأذكار", desc:`${totalDouaas} invocations vérifiées`, icon:"🤲"},
              ].map(cat=>(
                <button key={cat.key} onClick={()=>go(cat.key)} style={{
                  display:"flex", alignItems:"center", gap:16, padding:"18px 20px",
                  background:t.card, border:`1px solid ${t.cardBorder}`,
                  borderLeft:`4px solid ${t.cardAccent}`, borderRadius:16,
                  cursor:"pointer", textAlign:"left", width:"100%",
                  backdropFilter:"blur(10px)", boxShadow:t.cardShadow, transition:"all 0.25s",
                }}>
                  <div style={{ width:52, height:52, flexShrink:0, background:t.tagOff, border:`1px solid ${t.tagOffBorder}`, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{cat.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:5 }}>
                      <span style={{ fontSize:20, fontWeight:"700", fontStyle:"italic", color:t.green }}>{cat.fr}</span>
                      <span style={{ fontFamily:"'Traditional Arabic',serif", fontSize:14, color:`${t.gold}99` }}>{cat.ar}</span>
                    </div>
                    <div style={{ fontSize:11, color:t.muted }}>{cat.desc}</div>
                  </div>
                  <div style={{ color:`${t.gold}88`, fontSize:22 }}>›</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop:22, fontSize:9, color:t.muted, opacity:0.6, letterSpacing:2 }}>بارك الله فيكم · BYMUSLIM · GRATUIT · SANS PUB</div>
          </div>
        )}

        {/* ── CORAN LISTE ── */}
        {page==="coran"&&view==="list" && (
          <div style={{ display:"flex", height:"100%" }}>
            <div style={{ flex:1, padding:"14px 28px 100px 14px", overflowY:"auto" }}>
              {/* Lu récemment */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:"700", color:t.green, marginBottom:8 }}>Lu Récemment</div>
                <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4 }}>
                  {recent.map(n=>{ const s=S.find(x=>x.n===n); if(!s) return null; return (
                    <button key={n} onClick={()=>openSourate(s)} style={{ flexShrink:0, display:"flex", alignItems:"center", gap:8, padding:"9px 12px", background:n===lastRead.n?t.tagOn:t.card, border:`1px solid ${n===lastRead.n?t.tagOnBorder:t.cardBorder}`, borderRadius:10, cursor:"pointer", minWidth:120, boxShadow:t.cardShadow }}>
                      <div style={{ fontSize:9, fontWeight:"700", color:t.gold, background:t.tagOff, borderRadius:5, padding:"2px 5px", flexShrink:0 }}>{n}:{n===lastRead.n?lastRead.v:1}</div>
                      <div>
                        <div style={{ fontSize:11, fontWeight:"700", color:t.green }}>{s.fr}</div>
                        <div style={{ fontSize:9, color:t.muted }}>Juz {s.j}</div>
                      </div>
                    </button>
                  );})}
                </div>
              </div>
              {/* Onglets */}
              <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                {[["chapitres","Chapitres"],["parties","Parties"],["favs","⭐ Favoris"]].map(([val,lbl])=>(
                  <button key={val} onClick={()=>setTab(val)} style={{ padding:"6px 12px", background:tab===val?t.tagOn:t.tagOff, border:`1px solid ${tab===val?t.tagOnBorder:t.tagOffBorder}`, color:tab===val?t.tagOnColor:t.tagOffColor, borderRadius:18, cursor:"pointer", fontSize:11, fontFamily:"inherit", fontWeight:tab===val?"700":"400", transition:"all 0.2s" }}>{lbl}</button>
                ))}
              </div>
              {/* Tri */}
              {(tab==="chapitres"||tab==="favs") && (
                <div style={{ display:"flex", gap:6, alignItems:"center", marginBottom:12 }}>
                  <span style={{ fontSize:9, color:t.muted, letterSpacing:1 }}>TRIER</span>
                  {[["asc","↑ Croissant"],["desc","↓ Décroissant"],["rev","★ Révélation"]].map(([val,lbl])=>(
                    <button key={val} onClick={()=>setSort(val)} style={{ padding:"4px 10px", background:sort===val?t.tagOn:"transparent", border:`1px solid ${sort===val?t.tagOnBorder:t.cardBorder}`, color:sort===val?t.tagOnColor:t.muted, borderRadius:14, cursor:"pointer", fontSize:10, fontFamily:"inherit", transition:"all 0.2s" }}>{lbl}</button>
                  ))}
                </div>
              )}
              {(tab==="chapitres"||tab==="favs") && <ChapitresList list={buildList()} tab={tab} sort={sort} t={t} SourateCard={SourateCard}/>}
              {tab==="parties" && (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {Array.from({length:30},(_,i)=>i+1).map(juz=>{
                    const sours=S.filter(s=>s.j===juz);
                    return (
                      <div key={juz} style={{ background:t.card, border:`1px solid ${t.cardBorder}`, borderRadius:12, overflow:"hidden", boxShadow:t.cardShadow }}>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 14px", borderBottom:sours.length?`1px solid ${t.cardBorder}`:"none" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                            <div style={{ width:30, height:30, background:t.tagOn, border:`1px solid ${t.tagOnBorder}`, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:"700", color:t.tagOnColor }}>{juz}</div>
                            <div>
                              <div style={{ fontSize:12, fontWeight:"700", color:t.color }}>Juz {juz}</div>
                              <div style={{ fontSize:10, color:t.muted }}>Hizb {juz*2-1} & Hizb {juz*2}</div>
                            </div>
                          </div>
                          <div style={{ fontSize:10, color:t.muted }}>{sours.length?`${sours.length} sourate${sours.length>1?"s":""}` : "Suite préc."}</div>
                        </div>
                        {sours.length>0 && (
                          <div style={{ padding:"8px 10px", display:"flex", flexWrap:"wrap", gap:5 }}>
                            {sours.map(s=><button key={s.n} onClick={()=>openSourate(s)} style={{ padding:"5px 12px", background:t.tagOff, border:`1px solid ${t.tagOffBorder}`, borderRadius:8, cursor:"pointer", fontSize:11, color:t.green, fontFamily:"inherit", fontStyle:"italic" }}>{s.n}. {s.fr}</button>)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <VersetSidebar t={t} onSelect={scrollTo}/>
          </div>
        )}

        {/* ── CORAN LECTURE ── */}
        {page==="coran"&&view==="read"&&selected && (
          <div style={{ padding:"16px 18px 100px" }}>
            <div style={{ textAlign:"center", padding:"14px 0 18px", borderBottom:`1px solid ${t.cardBorder}`, marginBottom:16 }}>
              <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:32, color:t.ar, marginBottom:4 }}>{selected.ar}</div>
              <div style={{ fontSize:17, fontWeight:"700", fontStyle:"italic", color:t.green, marginBottom:8 }}>{selected.fr}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:12, fontSize:11, color:t.muted }}>
                <span>{selected.v} versets</span><span>·</span>
                <span style={{ color:selected.t==="M"?t.mecColor:t.medColor }}>{selected.t==="M"?"Mecquoise":"Médinoise"}</span>
                <span>·</span><span>Juz {selected.j}</span>
              </div>
            </div>
            {selected.n!==1&&selected.n!==9 && (
              <div style={{ textAlign:"center", padding:"12px", fontFamily:"'Traditional Arabic',serif", fontSize:20, color:t.bismillah, marginBottom:14, background:t.versetBg, border:`1px solid ${t.versetBorder}`, borderRadius:12 }}>
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            )}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {loading && (
                <div style={{ textAlign:"center", padding:"40px 20px", color:t.muted }}>
                  <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:28, color:t.ar, marginBottom:12 }}>بِسْمِ اللَّهِ</div>
                  <div style={{ fontSize:12, fontStyle:"italic" }}>Chargement des versets...</div>
                </div>
              )}
              {!loading && verses.map((v,i)=>(
                <div key={i} id={"v-"+(i+1)} style={{ padding:"12px 14px", background:t.versetBg, border:`1px solid ${t.versetBorder}`, borderRadius:12, boxShadow:t.cardShadow }}>
                  <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                    <div style={{ width:26, height:26, flexShrink:0, background:t.tagOn, border:`1px solid ${t.tagOnBorder}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:"700", color:t.tagOnColor, marginTop:2 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      {showAr && <div style={{ fontFamily:"'Traditional Arabic',serif", fontSize:22, color:t.ar, direction:"rtl", lineHeight:2, textAlign:"right", marginBottom:(showTr||showFr)?8:0, paddingBottom:(showTr||showFr)?8:0, borderBottom:(showTr||showFr)?`1px solid ${t.cardBorder}`:"none" }}>{v.ar}</div>}
                      {showTr && v.tr && <div style={{ fontSize:12, color:t.gold, fontStyle:"italic", lineHeight:1.7, marginBottom:showFr?6:0, paddingBottom:showFr?6:0, borderBottom:showFr?`1px solid ${t.cardBorder}`:"none" }}>{v.tr}</div>}
                      {showFr && v.fr && <div style={{ fontSize:12, color:t.muted, lineHeight:1.7 }}>{v.fr}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── DHIKR ── */}
        {page==="dhikr" && (
          <div style={{ padding:"14px 14px 100px" }}>
            {dhikrTab!=="special" && (
              <div>
                <div style={{ fontSize:9, color:t.muted, letterSpacing:3, marginBottom:12, textTransform:"uppercase" }}>
                  {dhikrTab==="tasbih"?"✦ Tasbih — sources authentiques":dhikrTab==="matin"?"✦ Wird du matin — après Fajr":"✦ Wird du soir — après Asr"}
                </div>
                {(dhikrTab==="tasbih"?TASBIH:dhikrTab==="matin"?WIRD_MATIN:WIRD_SOIR).map((item,i)=><Counter key={i} item={item} t={t}/>)}
              </div>
            )}
            {dhikrTab==="special" && (
              <div>
                <div style={{ fontSize:9, color:t.muted, letterSpacing:3, marginBottom:14, textTransform:"uppercase" }}>✦ Occasions spéciales — sources vérifiées</div>
                <SpecialSection title="Jour de l'Aïd" titleAr="يَوْمُ الْعِيدِ" icon="🌙" items={AID_DHIKR} t={t} isOpen={openAid} onToggle={()=>setOpenAid(!openAid)}/>
                <SpecialSection title="Jour du Vendredi" titleAr="يَوْمُ الْجُمُعَةِ" icon="🕌" items={JUMUAH_DHIKR} t={t} isOpen={openJum} onToggle={()=>setOpenJum(!openJum)}/>
              </div>
            )}
          </div>
        )}

        {/* ── DOUAAS ── */}
        {page==="douaas" && (
          <div style={{ padding:"12px 12px 100px" }}>
            <div style={{ fontSize:9, color:t.muted, letterSpacing:2.5, marginBottom:12, textTransform:"uppercase" }}>
              ✦ {CATEGORIES.length} catégories · Bukhârî · Muslim · Abî Dâwûd · At-Tirmidhî
            </div>
            {(dSearch
              ? CATEGORIES.map(c=>({...c, douaas:c.douaas.filter(d=>d.s.toLowerCase().includes(dSearch.toLowerCase())||d.fr.toLowerCase().includes(dSearch.toLowerCase())||d.ar.includes(dSearch))})).filter(c=>c.douaas.length>0)
              : CATEGORIES
            ).map(cat=>(
              <CatDouaa key={cat.id} cat={cat} t={t} isOpen={!!openCats[cat.id]} onToggle={()=>setOpenCats(o=>({...o,[cat.id]:!o[cat.id]}))}/>
            ))}
          </div>
        )}
      </div>

      {/* NAV BAS */}
      <div style={{ flexShrink:0, background:t.nav, backdropFilter:"blur(16px)", borderTop:`1px solid ${t.navBorder}`, padding:"8px 10px 12px", display:"flex", justifyContent:"space-around", position:"relative", zIndex:10 }}>
        {[{icon:"🏠",l:"Accueil",k:"home"},{icon:"📖",l:"Coran",k:"coran"},{icon:"📿",l:"Dhikr",k:"dhikr"},{icon:"🤲",l:"Douaas",k:"douaas"}].map(item=>(
          <button key={item.k} onClick={()=>go(item.k)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", color:page===item.k?t.green:t.muted, fontSize:10, fontFamily:"inherit", flex:1, transition:"color 0.2s" }}>
            <span style={{ fontSize:22 }}>{item.icon}</span>
            <span style={{ fontWeight:page===item.k?"700":"400", borderBottom:page===item.k?`2px solid ${t.gold}`:"2px solid transparent", paddingBottom:1 }}>{item.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
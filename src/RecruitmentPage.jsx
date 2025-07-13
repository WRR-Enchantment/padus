// RecruitmentPage.jsx
import Navbar from "./Navbar";
import BackgroundLayerShape from "./BackgroundLayer";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useState, useEffect, useMemo } from "react";
import {
  FaUserPlus,
  FaWhatsapp,
  FaInstagram,
  FaQuestionCircle,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const definitions = {
  "Sopran": "Suara perempuan tertinggi. Biasanya menyanyikan melodi utama atau nada tinggi.",
  "Alto": "Suara perempuan rendah. Mendukung harmoni dengan warna suara yang lembut.",
  "Tenor": "Suara laki-laki tinggi. Sering mengisi bagian penting dalam harmoni.",
  "Bass": "Suara laki-laki paling rendah. Memberikan dasar kuat pada paduan suara.",
};

const testimonials = [
  { quote: "Seru banget kalian wajib coba.", author: "@aameeliaps" },
  { quote: "Padus bagi gw bagaikan keluarga ke 2", author: "@simoncalvinpanogari" },
  { quote: "Eskul paling enjoy dan bikin rileks", author: "@rafli_rizki_" },
  { quote: "Nyesel gw masuknya pas akhir² mau purna, soalnya seru 😭", author: "@farrelevanss." },
];

const jobdesks = [
  {
    title: "🎤 Obade Upacara Sekolah",
    desc: "Menjadi tim vokal pembuka dalam upacara setiap hari Senin.",
  },
  {
    title: "🏛️ Mengisi Acara Kecamatan",
    desc: "Tampil saat peringatan hari besar nasional di tingkat kecamatan.",
  },
  {
    title: "🎶 Latihan Rutin & Lomba",
    desc: "Latihan bersama dan mempersiapkan event lomba atau penampilan khusus.",
  },
];

const faqs = [
  {
    question: "Apakah harus punya suara bagus dulu untuk gabung?",
    answer: "Tidak. Yang penting mau belajar dan rajin latihan, kemampuan akan berkembang.",
  },
  {
    question: "Kapan jadwal latihannya?",
    answer: "Latihan rutin setiap hari Selasa dan Kamis setelah pulang sekolah. Jadwal bisa bertambah menjelang acara.",
  },
  {
    question: "Apa saja yang dinyanyikan?",
    answer: "Lagu kebangsaan, lagu nasional, lagu daerah, dan lagu pop yang sesuai untuk acara.",
  },
  {
    question: "Apakah bisa ikut walau belum pernah ikut paduan suara?",
    answer: "Bisa banget! Kami akan bantu dari awal, termasuk latihan dasar vokal.",
  },
  {
    question: "Apakah paduan suara ini sering tampil?",
    answer: "Iya, kami tampil di upacara sekolah dan acara kecamatan saat hari besar nasional.",
  },
];
const allGamePaths = [
  [
    {
      question: "Kamu baru daftar Sandya Gantari. Apa alasan kamu ikut paduan suara?",
      options: [
        { text: "Karena suka nyanyi dan pengen tampil di acara sekolah", points: 2, next: 1 },
        { text: "Karena diajak teman dan iseng coba-coba dulu", points: 1, next: 1 },
      ],
    },
    {
      question: "Hari pertama latihan, kamu belum kenal siapa-siapa. Kamu akan...",
      options: [
        { text: "Mencoba menyapa dan kenalan dengan anggota lain", points: 2, next: 2 },
        { text: "Diam saja dan ikut latihan tanpa banyak bicara", points: 1, next: 2 },
      ],
    },
    {
      question: "Pelatih minta semua hafal lagu Indonesia Raya untuk upacara.",
      options: [
        { text: "Langsung latihan sendiri di rumah", points: 2, next: 3 },
        { text: "Menunggu latihan berikutnya saja", points: 0, next: 3 },
      ],
    },
    {
      question: "Suaramu fals saat latihan dan semua dengar.",
      options: [
        { text: "Minta maaf dan minta bimbingan", points: 2, next: 4 },
        { text: "Diam dan pura-pura tidak terjadi apa-apa", points: 0, next: 4 },
      ],
    },
    {
      question: "Pelatih minta kamu coba nyanyi solo bagian awal lagu.",
      options: [
        { text: "Coba saja, walau deg-degan", points: 2, next: 5 },
        { text: "Menolak karena belum siap", points: 0, next: 5 },
      ],
    },
    {
      question: "Hari H upacara, salah satu anggota tidak hadir.",
      options: [
        { text: "Kamu siap mengisi posisi suara yang kosong", points: 2, next: 6 },
        { text: "Biarkan pelatih saja yang atur", points: 1, next: 6 },
      ],
    },
    {
      question: "Kamu diminta tampil di kecamatan, tapi bentrok dengan kegiatan lain.",
      options: [
        { text: "Diskusi dan cari solusi biar tetap bisa tampil", points: 2, next: "result" },
        { text: "Pilih kegiatan lain karena tampilnya takut", points: 0, next: "result" },
      ],
    },
  ],
];

function getResult(score) {
  if (score >= 10) {
    return "🎉 Kamu cocok banget jadi bagian Sandya Gantari! Semangat dan komitmenmu luar biasa!";
  } else if (score >= 6) {
    return "👍 Kamu cukup siap! Dengan latihan dan keberanian, kamu bisa berkembang pesat.";
  } else {
    return "💡 Masih perlu banyak latihan dan keberanian. Tapi semangatmu bisa diasah!";
  }
}

function ScrollReveal({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
export default function RecruitmentPage() {
  const [selected, setSelected] = useState(null);
  const [typedIndex, setTypedIndex] = useState(0);
  const [showFAQ, setShowFAQ] = useState(false);
  const [gameStep, setGameStep] = useState(null);
  const [gamePath, setGamePath] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/sandya-gantari/visits")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.value));
  }, []);

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const titles = ["Sopran", "Alto", "Tenor", "Bass"];

  const gamePaths = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * allGamePaths.length);
    return allGamePaths[randomIndex];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-yellow-400 font-bold text-2xl tracking-widest">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SANDYA GANTARI
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 text-white px-4 pt-16 pb-6"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* MENU STRIP 3 KIRI ATAS */}
      <div className="fixed top-13 left-2 z-50">
        <button
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          className="p-2 rounded-md bg-white/90 text-black shadow-lg hover:bg-white/95 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mt-2 w-48 bg-white/90 text-black rounded-lg shadow-lg backdrop-blur-md border border-white/50"
            >
              <ul>
                <li>
                  <Link
                    to="/"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-yellow-300 transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/rekrutmen"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-yellow-300 transition"
                  >
                    Pendaftaran
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BackgroundLayerShape />

      {/* MARQUEE */}
      <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-xl overflow-hidden whitespace-nowrap rounded-md bg-white/100 text-black font-semibold text-sm select-none shadow-md px-4 py-1">
        <motion.div
          className="flex gap-12 animate-marquee"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <span>🎶 Satu suara, satu irama. Gabung Sandya Gantari sekarang juga!</span>
          <span>✨ Latihan setiap Selasa & Kamis. Siap tampil di acara-acara penting!</span>
        </motion.div>
      </div>
      {/* JUDUL & LOGO */}
      <ScrollReveal>
        <div className="flex flex-col items-center justify-center mt-8 mb-6">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 mb-2" />
          <h1 className="text-2xl font-semibold text-center leading-tight">Open Recruitment</h1>
          <p className="text-lg font-bold text-yellow-300 text-center tracking-wide">
            PADUAN SUARA SMAN 1 TAJURHALANG
          </p>
        </div>
      </ScrollReveal>

      {/* DEFINISI 4 SUARA */}
      <ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
          {Object.keys(definitions).map((role) => (
            <motion.div
              key={role}
              onClick={() => setSelected(role)}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer p-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 transition-all group"
            >
              <h2 className="text-sm font-semibold group-hover:text-yellow-300 transition-colors duration-300">
                {role}
              </h2>
              <AnimatePresence>
                {selected === role && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-xs text-white/80 overflow-hidden"
                  >
                    {definitions[role]}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* JOBDESK */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">💼 Kegiatan Utama</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobdesks.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-lg p-3 backdrop-blur-lg border border-white/10 shadow"
              >
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-white/80 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      {/* TOMBOL DAFTAR */}
      <ScrollReveal>
        <div className="mt-10 mb-6 flex justify-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc2rSNsoAd2VauTdZNrYg-NVB9Vt6jxIizntmbRfBi1cWFjTg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-base bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full shadow-md backdrop-blur-xl transition-all flex items-center gap-2"
          >
            <FaUserPlus /> Daftar Sekarang
          </a>
        </div>
      </ScrollReveal>

      {/* KONTAK */}
<ScrollReveal>
  <div className="mt-12 text-center">
    <h2 className="text-lg font-bold text-yellow-300 mb-3">📞 Kontak Kami</h2>

    {/* WhatsApp - tanpa link */}
    <div className="flex flex-col items-center gap-2 text-sm text-white font-medium mb-4">
      <div className="flex items-center gap-2 px-4 py-1.5 bg-green-600 rounded-lg shadow-md backdrop-blur-xl">
        <FaWhatsapp /> 0812-9686-2691 (Fires)
      </div>
      <div className="flex items-center gap-2 px-4 py-1.5 bg-green-600 rounded-lg shadow-md backdrop-blur-xl">
        <FaWhatsapp /> 0838-9884-5627 (Rere)
      </div>
    </div>

    {/* Instagram - tetap link */}
    <div className="flex justify-center">
      <a
        href="https://www.instagram.com/padussman1ta?igsh=MXFwODJkMmd2dHYyMw=="
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-1.5 text-xs bg-pink-600 hover:bg-pink-500 text-white font-medium rounded-lg shadow-md backdrop-blur-xl transition-all flex items-center gap-2"
      >
        <FaInstagram /> Instagram
      </a>
    </div>
  </div>
</ScrollReveal>

      {/* TESTIMONI */}
      <ScrollReveal>
        <div className="mt-14 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold mb-3 text-center">💬 Testimoni</h3>
          <div className="space-y-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-3 bg-white/10 rounded-lg backdrop-blur-md border border-white/10 shadow"
              >
                <p className="italic text-white/80 text-sm">"{t.quote}"</p>
                <p className="text-right text-yellow-300 text-xs font-medium mt-1">
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
      {/* MINI SIMULASI */}
      <ScrollReveal>
        <div className="mt-14 max-w-xl mx-auto text-sm">
          <h3 className="text-lg font-semibold text-center mb-4">
            🎮 Mini Simulasi: Masuk Paduan Suara
          </h3>

          {gameStep === null ? (
            <div className="text-center">
              <button
                onClick={() => {
                  setGameStep(0);
                  setTotalScore(0);
                  setGamePath(gamePaths);
                }}
                className="bg-white/20 px-4 py-2 rounded-lg backdrop-blur-md hover:bg-white/30 transition"
              >
                Mulai Simulasi
              </button>
            </div>
          ) : (
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/20">
              {gameStep === "result" ? (
                <div className="text-center">
                  <p className="mb-3 font-medium">{getResult(totalScore)}</p>
                  <button
                    onClick={() => {
                      setGameStep(null);
                      setTotalScore(0);
                      setGamePath([]);
                    }}
                    className="text-xs underline text-white/70"
                  >
                    Coba Ulang
                  </button>
                </div>
              ) : (
                <>
                  <p className="mb-3 font-medium">
                    {gamePath[gameStep].question}
                  </p>
                  <div className="space-y-2">
                    {gamePath[gameStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setTotalScore((prev) => prev + opt.points);
                          setGameStep(opt.next);
                        }}
                        className="w-full text-left px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </ScrollReveal>
      {/* FAQ BUTTON & PANEL */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setShowFAQ(!showFAQ)}
          className="bg-yellow-400 text-black p-2 rounded-full shadow hover:bg-yellow-300 transition-all"
          aria-label="Toggle FAQ"
        >
          {showFAQ ? <FaTimes /> : <FaQuestionCircle />}
        </button>
        <AnimatePresence>
          {showFAQ && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-3 bg-white/20 backdrop-blur-xl text-white p-3 rounded-lg shadow-lg border border-white/30 w-64 max-h-80 overflow-y-auto text-sm"
            >
              <h4 className="font-semibold mb-2">❓ FAQ</h4>
              {faqs.map((faq, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold">Q: {faq.question}</p>
                  <p className="text-white/80 text-xs">A: {faq.answer}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.footer
  className="mt-24 py-6 text-center text-sm text-white/60 border-t border-white/10"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <p>© {new Date().getFullYear()} Sandya Gantari - Paduan Suara SMAN 1 Tajurhalang</p>
  <p className="mt-1">Satu Suara, Satu Irama.</p>
</motion.footer>
    </motion.div>
  );
}

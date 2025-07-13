// Home.jsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import BackgroundLayerShape from "./BackgroundLayer";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function QuizGame() {
  const allQuestions = [
    {
      question: "Dari mana asal lagu 'Ampar-Ampar Pisang'?",
      options: ["Kalimantan Selatan", "Jawa Barat", "Sumatera Barat", "Papua"],
      answer: "Kalimantan Selatan",
    },
    {
      question: "Lagu 'Apuse' berasal dari daerah?",
      options: ["Maluku", "Papua", "NTT", "Bali"],
      answer: "Papua",
    },
    {
      question: "Lagu daerah 'Gundul-Gundul Pacul' berasal dari?",
      options: ["Jawa Tengah", "Jawa Timur", "Jawa Barat", "Madura"],
      answer: "Jawa Tengah",
    },
    {
      question: "Lagu 'Yamko Rambe Yamko' berasal dari?",
      options: ["Papua", "Sulawesi", "Aceh", "Jambi"],
      answer: "Papua",
    },
    {
      question: "Dari daerah mana lagu 'Soleram' berasal?",
      options: ["Riau", "Sumatera Utara", "Minang", "Bengkulu"],
      answer: "Riau",
    },
    {
      question: "Lagu 'Tokecang' berasal dari?",
      options: ["Jawa Barat", "Jawa Tengah", "Aceh", "Sumatera Selatan"],
      answer: "Jawa Barat",
    },
    {
      question: "Dari mana lagu 'Manuk Dadali' berasal?",
      options: ["Jawa Barat", "Jawa Tengah", "Papua", "Sumatera Utara"],
      answer: "Jawa Barat",
    },
    {
      question: "Lagu 'Si Patokaan' berasal dari daerah?",
      options: ["Sulawesi Utara", "Papua", "Bali", "Kalimantan Timur"],
      answer: "Sulawesi Utara",
    },
    {
      question: "Lagu 'Cik-Cik Periuk' berasal dari?",
      options: ["Kalimantan Barat", "Riau", "Aceh", "Jambi"],
      answer: "Kalimantan Barat",
    },
    {
      question: "Lagu 'Bungong Jeumpa' berasal dari?",
      options: ["Aceh", "Sumatera Barat", "Lampung", "Jambi"],
      answer: "Aceh",
    },
    {
      question: "Lagu 'Butet' berasal dari daerah?",
      options: ["Sumatera Utara", "Sumatera Selatan", "Riau", "Bengkulu"],
      answer: "Sumatera Utara",
    },
    {
      question: "Dari mana asal lagu 'Rasa Sayange'?",
      options: ["Maluku", "Papua", "Sulawesi Selatan", "Jawa Timur"],
      answer: "Maluku",
    },
    {
      question: "Lagu 'Kicir-Kicir' berasal dari?",
      options: ["DKI Jakarta", "Jawa Barat", "Banten", "Jawa Tengah"],
      answer: "DKI Jakarta",
    },
    {
      question: "Lagu 'Bubuy Bulan' berasal dari?",
      options: ["Jawa Barat", "Jawa Tengah", "Kalimantan Timur", "NTB"],
      answer: "Jawa Barat",
    },
    {
      question: "Lagu 'O Ina Ni Keke' berasal dari?",
      options: ["Sulawesi Utara", "Maluku", "NTT", "Papua"],
      answer: "Sulawesi Utara",
    },
    {
      question: "Lagu 'Lisoi' berasal dari daerah?",
      options: ["Batak", "Sunda", "Minang", "Bugis"],
      answer: "Batak",
    },
    {
      question: "Lagu 'Jali-Jali' berasal dari?",
      options: ["Betawi", "Minang", "Dayak", "Bali"],
      answer: "Betawi",
    },
    {
      question: "Lagu 'Tanduk Majeng' berasal dari?",
      options: ["Madura", "Bali", "Jawa Tengah", "Sulawesi"],
      answer: "Madura",
    },
    {
      question: "Lagu 'Es Lilin' berasal dari?",
      options: ["Sunda", "Minang", "Ambon", "Aceh"],
      answer: "Sunda",
    },
    {
      question: "Lagu 'Indung-Indung' berasal dari?",
      options: ["Kalimantan Timur", "Riau", "Jambi", "Papua"],
      answer: "Kalimantan Timur",
    },
  ];

  const questions = useMemo(() => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // ambil 5 random
  }, []);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);

  const currentQ = questions[current];

  function handleAnswer(option) {
    setSelectedAnswer(option);
    if (option === currentQ.answer) setScore((s) => s + 1);
    setTimeout(() => {
      setSelectedAnswer(null);
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
      } else {
        setShowScore(true);
      }
    }, 900);
  }

  if (showScore) {
    return (
      <div className="text-center bg-white/10 text-white p-6 rounded-xl shadow-lg backdrop-blur-lg mt-12 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-yellow-300 mb-2">🎉 Skor Akhir</h3>
        <p className="text-base mb-4">Kamu menjawab benar {score} dari {questions.length} soal!</p>
        <button
          onClick={() => {
            setShowScore(false);
            setCurrent(0);
            setScore(0);
          }}
          className="px-4 py-2 bg-yellow-400 text-black rounded shadow hover:bg-yellow-500 transition"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-lg max-w-md mx-auto text-white">
      <h3 className="text-lg font-bold mb-4 text-yellow-300">🎵 Tebak Lagu Daerah</h3>
      <p className="mb-4 text-sm">{current + 1}. {currentQ.question}</p>
      <div className="space-y-2">
        {currentQ.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedAnswer}
            className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200
              ${
                selectedAnswer
                  ? option === currentQ.answer
                    ? "bg-green-500 text-white"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "bg-white/10 text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Loading Animation
function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black text-white text-xl font-bold">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", repeatType: "reverse" }}
      >
        Memuat...
      </motion.div>
    </div>
  );
}

// Foto flip (galeri kegiatan)
function FotoFlip({ images }) {
  const [index, setIndex] = useState(0);
  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };
  return (
    <div
      onClick={nextImage}
      className="cursor-pointer w-full h-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-700 hover:scale-[1.02]"
    >
      <motion.img
        key={index}
        src={images[index]}
        alt="Foto Kegiatan"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full h-auto object-cover rounded-xl"
      />
    </div>
  );
}
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulasi loading awal
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600); // 1.6 detik loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="relative z-10 px-4 pt-16 pb-6 text-white"
  style={{
    minHeight: "calc(var(--vh, 1vh) * 100)",
  }}
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

      {/* LOGO DAN SOSMED */}
      <motion.div
        className="flex flex-col items-center justify-center mt-20 mb-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <img src="/logo.png" alt="Logo" className="w-20 h-20 mb-2" />
        <h1 className="text-2xl font-semibold text-center leading-tight">Sandya Gantari</h1>
        <div className="flex gap-4 mt-3 justify-center">
          <a
            href="https://www.instagram.com/padussman1ta?igsh=MXFwODJkMmd2dHYyMw=="
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm bg-pink-500 hover:bg-pink-600 rounded-full shadow text-white transition"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@padussman1ta?_t=ZS-8xztDWgBJJQ&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm bg-black hover:bg-gray-800 rounded-full shadow text-white transition"
          >
            TikTok
          </a>
        </div>
      </motion.div>
      {/* FOTO UTAMA & DESKRIPSI */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-24 mb-10 px-4">
        <motion.div
          className="w-full md:w-1/2 max-w-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/utama.jpg"
            alt="Paduan Suara Sandya Gantari"
            className="rounded-xl shadow-lg border border-white/20"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-yellow-200 leading-relaxed whitespace-pre-line bg-white/10 p-4 rounded-xl backdrop-blur-lg border border-white/10 shadow">
            Sandya Gantari adalah ekstrakurikuler paduan suara resmi di SMAN 1 Tajurhalang. Kami menyanyikan lagu-lagu nasional, daerah, dan populer dalam berbagai acara sekolah dan kecamatan. Bergabung bersama kami untuk merasakan kebersamaan, latihan seru, dan tampil membanggakan di setiap kesempatan!
          </p>
        </motion.div>
      </div>

      {/* GALERI KEGIATAN */}
      <div id="kegiatan" className="mt-12 max-w-md mx-auto text-center relative">
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-2"
              >
                <motion.div
                  className="bg-white/10 p-4 rounded-xl backdrop-blur-lg border border-white/10 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <img
                    src={`/kegiatan${index + 1}.jpg`}
                    alt={`Kegiatan ${index + 1}`}
                    className="w-full rounded-md mb-2"
                  />
                  <p className="text-sm text-white/80">
                    {index === 0 && "Latihan rutin setiap minggu membangun kekompakan dan kualitas suara seluruh anggota Sandya Gantari."}
                    {index === 1 && "Penampilan paduan suara di berbagai event sekolah."}
                    {index === 2 && "ikut serta sebagai obade di upacara hari besar tingkat kecamatan."}
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* TOMBOL NEXT/PREV */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1))
            }
            className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 text-white rounded shadow backdrop-blur"
          >
            ⬅ Prev
          </button>
          <button
            onClick={() =>
              setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1))
            }
            className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 text-white rounded shadow backdrop-blur"
          >
            Next ➡
          </button>
        </div>

        {/* NAVIGASI BULAT */}
        <div className="flex justify-center gap-3 mt-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === i ? "bg-yellow-300" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
{/* JENIS SUARA */}
<motion.div
  className="mt-20 max-w-4xl mx-auto px-4 text-center"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2 className="text-xl font-bold text-yellow-300 mb-4">🔊 Jenis Suara di Sandya Gantari</h2>
  <p className="text-white/80 mb-6">
    Dalam paduan suara, kami membagi anggota berdasarkan warna suara untuk menciptakan harmoni yang indah. Kami menggunakan 4 tipe suara utama:
  </p>
  <div className="grid md:grid-cols-2 gap-6 text-left text-white/90">
    <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur shadow">
      <strong>🎵 Sopran</strong> – Suara perempuan tinggi, biasanya menyanyikan melodi utama.
    </div>
    <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur shadow">
      <strong>🎵 Alto</strong> – Suara perempuan rendah, memberikan harmoni bawah sopran.
    </div>
    <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur shadow">
      <strong>🎵 Tenor</strong> – Suara laki-laki tinggi, memperkaya lapisan harmoni atas.
    </div>
    <div className="bg-white/10 p-4 rounded-xl border border-white/10 backdrop-blur shadow">
      <strong>🎵 Bass</strong> – Suara laki-laki rendah, menjadi fondasi harmoni.
    </div>
  </div>
</motion.div>
{/* INSTRUMEN */}
<motion.div
  className="mt-20 max-w-3xl mx-auto px-4 text-center"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <h2 className="text-xl font-bold text-yellow-300 mb-4">🎹 Instrumen Pendukung</h2>
  <p className="text-white/80">
    Dalam latihan dan penampilan, Sandya Gantari biasa menggunakan:
  </p>
  <ul className="text-white/80 mt-4 list-disc list-inside text-left">
    <li>🎹 <strong>Keyboard</strong> – Untuk mengiringi lagu dan membantu latihan nada dasar.</li>
    <li>🎸 <strong>Gitar Akustik</strong> – Memberi warna suara lebih hidup saat acara informal.</li>
    <li>🔔 <strong>Perkusi ringan</strong> – Seperti shaker atau cajon, untuk menambah dinamika.</li>
  </ul>
</motion.div>

      {/* JADWAL LATIHAN */}
      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-lg font-bold text-yellow-300 mb-2">📅 Jadwal Latihan</h2>
        <ul className="text-sm text-white/80 space-y-1">
          <li>🎵 Selasa, 15:30 - 17:00 WIB</li>
          <li>🎵 Kamis, 15:30 - 17:00 WIB</li>
        </ul>
      </motion.div>
      {/* LOKASI SEKOLAH */}
      <motion.div
        className="mt-20 max-w-xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold text-center mb-4 text-yellow-300">
          📍 Lokasi Sekolah
        </h2>
        <div className="rounded-xl overflow-hidden shadow-lg border border-white/10 backdrop-blur-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.3536656587835!2d106.75370977366657!3d-6.476810993514978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3d9c51b07d9%3A0xac25ac6010be4208!2sSMA%20Terbuka%201%20Tajurhalang%20Kab.%20Bogor!5e0!3m2!1sid!2sid!4v1752419302299!5m2!1sid!2sid"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi SMA Terbuka 1 Tajurhalang"
          ></iframe>
        </div>
      </motion.div>
      <QuizGame />



      {/* FOOTER */}
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

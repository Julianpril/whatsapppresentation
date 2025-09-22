import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Smartphone,
  MessageSquare,
  AlertTriangle,
  LockKeyhole,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  PartyPopper,
  Timer,
  Eye,
  EyeOff,
  Gamepad2,
  Image as ImageIcon,
  Fingerprint,
  Hand,
  ThumbsUp,
} from "lucide-react";

/**
 * Presentación web hiper‑interactiva para funcionarios (no técnica)
 * Mejoras clave:
 *  - Texto reducido + muchas imágenes.
 *  - "Microjuegos" cortos entre secciones para recuperar atención.
 *  - Paso a paso ilustrado: cómo activar 2FA (WhatsApp) sin tecnicismos.
 *  - Encuesta en vivo, caso interactivo, clasificador "Seguro vs Sospechoso",
 *    bingo de hábitos y analizador simple de enlaces.
 *  - Modo Enfoque para momentos de explicación.
 */

// ============== utilidades base con 3D ==============
const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex items-center gap-3 mb-4">
      {Icon && (
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotateY: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity }
          }}
          className="text-indigo-600"
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      )}
      <motion.h2 
        className="text-2xl sm:text-3xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-800 to-slate-900 bg-clip-text text-transparent"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ backgroundSize: "200% 100%" }}
      >
        {title}
      </motion.h2>
    </div>
    <div className="text-slate-700 text-lg leading-relaxed">{children}</div>
  </section>
);

const Card = ({ children, onClick, className = "" }) => (
  <motion.div 
    whileHover={{ 
      y: -3, 
      scale: 1.02,
      rotateY: 5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }} 
    onClick={onClick} 
    className={`rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all p-5 transform-gpu ${className}`}
  >
    {children}
  </motion.div>
);

// ============== barra superior con 3D ==============
const TopBar = ({ progress, focus, toggleFocus }) => (
  <div className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-slate-200">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.div
          animate={{ 
            rotateY: [0, 360],
            rotateZ: [0, 10, -10, 0]
          }}
          transition={{ 
            rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
            rotateZ: { duration: 2, repeat: Infinity }
          }}
          className="text-indigo-600"
        >
          <ShieldCheck className="w-5 h-5" />
        </motion.div>
        <span className="font-semibold">Seguridad Digital • U. Boyacá</span>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <div className="w-40 h-2 rounded-full bg-slate-100 overflow-hidden" title="Progreso de la sesión">
          <motion.div 
            className="h-2 bg-gradient-to-r from-indigo-600 to-blue-600" 
            style={{ width: `${progress}%` }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        <motion.button 
          onClick={toggleFocus} 
          whileHover={{ scale: 1.05, rotateY: 10 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-xl px-3 py-2 border border-slate-300 flex items-center gap-2"
        >
          <motion.div
            animate={{ 
              rotateY: focus ? [0, 180, 360] : [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {focus ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
          </motion.div>
          Modo Enfoque
        </motion.button>
      </div>
    </div>
  </div>
);

// ============== hero ==============
const Hero = ({ onScrollDown }) => (
  <div className="relative">
    <img src="https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=1920&auto=format&fit=crop" alt="Personas con móviles" className="h-[42vh] w-full object-cover brightness-90"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute inset-0 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-6">
      <div className="text-white">
        <h1 className="text-3xl sm:text-5xl font-semibold">WhatsApp + SMS: usa, pero con seguridad</h1>
        <p className="mt-2 text-lg max-w-2xl">Aprende señales de riesgo y hábitos rápidos para evitar fraudes y pérdidas de información.</p>
        <button onClick={onScrollDown} className="mt-4 rounded-xl px-4 py-2 bg-white/90 text-slate-900 hover:bg-white">Empezar</button>
      </div>
    </div>
  </div>
);

// ============== encuesta rápida ==============
const QuickPoll = () => {
  const [votes, setVotes] = useState({ a: 0, b: 0 });
  const total = votes.a + votes.b;
  const pct = (n) => (total ? Math.round((n * 100) / total) : 0);
  return (
    <Card>
      <div className="flex items-start gap-3">
        <MessageSquare className="w-6 h-6" />
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-lg">Encuesta</h3>
          <p className="text-slate-700">¿Recibiste un SMS raro en el último mes?</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setVotes(v => ({ ...v, a: v.a + 1 }))} className="rounded-xl px-4 py-2 bg-indigo-600 text-white">Sí</button>
            <button onClick={() => setVotes(v => ({ ...v, b: v.b + 1 }))} className="rounded-xl px-4 py-2 border border-slate-300">No</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-2 bg-indigo-500" style={{ width: `${pct(votes.a)}%` }} /></div>
              <p className="mt-1">Sí: {pct(votes.a)}% ({votes.a})</p>
            </div>
            <div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-2 bg-slate-500" style={{ width: `${pct(votes.b)}%` }} /></div>
              <p className="mt-1">No: {pct(votes.b)}% ({votes.b})</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============== tarjetas visuales con imagen ==============
const VisualCard = ({ title, bullets, img, example }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div whileHover={{ y: -2 }} className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-1"><img src={img} alt={title} className="h-full w-full object-cover"/></div>
        <div className="md:col-span-2 p-5">
          <h3 className="font-semibold text-slate-900 text-lg">{title}</h3>
          <ul className="mt-2 text-slate-700 list-disc ml-5 space-y-1">{bullets.map((b,i)=>(<li key={i}>{b}</li>))}</ul>
          <AnimatePresence>
            {open && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-slate-800"><span className="font-medium">Ejemplo:</span> {example}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-2 text-xs text-slate-400">Pulsa para ver ejemplo</p>
        </div>
      </div>
    </motion.div>
  );
};

// ============== micro‑juego: clasificador seguro vs sospechoso ==============
const ClassifierGame = () => {
  const dataset = [
    { text: "Su paquete no pudo ser entregado, pague tarifas aquí: bit.ly/xyz", safe: false, why: "Enlace acortado y urgencia." },
    { text: "Código de WhatsApp: 123‑456. No lo compartas con nadie.", safe: true, why: "Mensaje automático. No debes reenviarlo." },
    { text: "Banco: verifique su cuenta en whatsapp-soporte-seguro.com", safe: false, why: "Dominio imita marca con guiones." },
    { text: "Recordatorio reunión interna, sala 203 10:00 a.m.", safe: true, why: "Mensaje esperado y sin enlaces." },
  ];
  const [idx, setIdx] = useState(0);
  const [flash, setFlash] = useState(null);
  const item = dataset[idx % dataset.length];
  const choose = (val) => {
    const ok = val === (item.safe ? "safe" : "phish");
    setFlash({ ok, why: item.why });
    setTimeout(()=>{ setIdx(i=>i+1); setFlash(null); }, 1000);
  };
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Gamepad2 className="w-6 h-6" />
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-lg">¿Seguro o Sospechoso?</h3>
          <p className="mt-2 text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3">“{item.text}”</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={()=>choose("safe")} className="rounded-xl px-3 py-2 bg-emerald-600 text-white">Seguro</button>
            <button onClick={()=>choose("phish")} className="rounded-xl px-3 py-2 bg-rose-600 text-white">Sospechoso</button>
          </div>
          <AnimatePresence>
            {flash && (
              <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} exit={{opacity:0, y:6}} className={`mt-3 rounded-xl p-3 border ${flash.ok?"bg-emerald-50 border-emerald-200 text-emerald-700":"bg-rose-50 border-rose-200 text-rose-700"}`}>
                {flash.ok ? <CheckCircle2 className="w-4 h-4 inline mr-1"/> : <XCircle className="w-4 h-4 inline mr-1"/>}
                {flash.ok ? "¡Bien! " : "Atención: "}{flash.why}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

// ============== micro‑juego: caso de 20s con cuenta regresiva y 3D ==============
const LightningRound = () => {
  const [time, setTime] = useState(20);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running || time <= 0) return;
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time, running]);
  const reset = () => { setTime(20); setRunning(false); };
  return (
    <Card>
      <div className="flex items-start gap-3">
        <motion.div
          animate={{ 
            rotateY: running ? [0, 360] : [0, 10, -10, 0],
            scale: time <= 5 && running ? [1, 1.3, 1] : [1, 1.1, 1]
          }}
          transition={{ 
            rotateY: { duration: running ? 2 : 4, repeat: Infinity, ease: running ? "linear" : "easeInOut" },
            scale: { duration: time <= 5 ? 0.5 : 2, repeat: Infinity }
          }}
          className={`${time <= 5 && running ? "text-red-600" : "text-orange-600"}`}
        >
          <Timer className="w-6 h-6" />
        </motion.div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900 text-lg">Reto de 20 segundos</h3>
          <p className="text-slate-700">En 20s: digan 3 señales de un SMS sospechoso.</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-48 h-3 rounded-full bg-slate-100 overflow-hidden">
              <motion.div 
                className={`h-3 transition-all ${time <= 5 ? "bg-red-500" : "bg-rose-500"}`} 
                style={{ width: `${(time / 20) * 100}%` }}
                animate={{ 
                  scale: time <= 5 && running ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5, repeat: time <= 5 && running ? Infinity : 0 }}
              />
            </div>
            <motion.span 
              className={`font-mono ${time <= 5 && running ? "text-red-600 font-bold" : ""}`}
              animate={{ 
                scale: time <= 5 && running ? [1, 1.2, 1] : 1,
                rotateZ: time <= 3 && running ? [-5, 5, -5] : 0
              }}
              transition={{ 
                scale: { duration: 0.5, repeat: time <= 5 && running ? Infinity : 0 },
                rotateZ: { duration: 0.3, repeat: time <= 3 && running ? Infinity : 0 }
              }}
            >
              {String(time).padStart(2, '0')}s
            </motion.span>
            {!running ? (
              <motion.button 
                onClick={() => setRunning(true)} 
                whileHover={{ scale: 1.05, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 rounded-xl px-3 py-2 bg-slate-900 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <motion.span
                  animate={{ rotateZ: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡ Iniciar
                </motion.span>
              </motion.button>
            ) : (
              <motion.button 
                onClick={() => setRunning(false)} 
                whileHover={{ scale: 1.05, rotateY: -10 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 rounded-xl px-3 py-2 border border-slate-300 hover:shadow-lg transition-all"
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⏸️ Pausar
                </motion.span>
              </motion.button>
            )}
            <motion.button 
              onClick={reset} 
              whileHover={{ scale: 1.05, rotateZ: 360 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl px-3 py-2 border border-slate-300 hover:shadow-lg transition-all"
            >
              <motion.span
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                🔄 Reiniciar
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============== mini‑quiz (3 preguntas) ==============
const QuizVF = () => {
  const questions = useMemo(() => [
    { q: "¿Compartir un PIN si lo pide 'soporte'?", a: false, why: "Nadie legítimo pide tu PIN." },
    { q: "¿Dejar WhatsApp Web abierto en un PC ajeno?", a: false, why: "Otro podría usar tu sesión." },
    { q: "¿Los mensajes con urgencia suelen ser sospechosos?", a: true, why: "Buscan que no verifiques." },
  ], []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState(null);
  const [boom, setBoom] = useState(false);

  const done = i >= questions.length;
  const answer = (val) => {
    if (done) return;
    const ok = questions[i].a === val;
    setFlash(ok);
    if (ok) setScore(s => s + 1);
    if (ok) { setBoom(true); setTimeout(() => setBoom(false), 800); }
    setTimeout(() => { setI(i + 1); setFlash(null); }, 900);
  };

  if (done) {
    return <div className="text-center"><CheckCircle2 className="w-10 h-10 mx-auto" /><p className="text-xl font-semibold">¡Listo! {score}/{questions.length}</p></div>;
  }

  return (
    <motion.div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
      <p className="text-lg font-medium">{questions[i].q}</p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => answer(true)} className="rounded-xl px-4 py-2 bg-emerald-600 text-white">Sí / Verdadero</button>
        <button onClick={() => answer(false)} className="rounded-xl px-4 py-2 bg-rose-600 text-white">No / Falso</button>
        {boom && <span className="text-2xl">🎉</span>}
      </div>
      {flash !== null && (<p className={`mt-3 ${flash ? "text-emerald-600" : "text-rose-600"}`}>{flash ? "¡Correcto!" : "Incorrecto"} — {questions[i].why}</p>)}
    </motion.div>
  );
};

// ============== bingo de hábitos (gamificación) ==============
const HabitsBingo = () => {
  const cells = [
    "Activa 2FA",
    "Cierra WhatsApp Web",
    "No compartas PIN",
    "No abras enlaces raros",
    "Bloquea spam",
    "Actualiza apps",
    "Usa canales oficiales",
    "Haz backup",
    "Verifica remitente",
  ];
  const [marked, setMarked] = useState(Array(cells.length).fill(false));
  const toggle = (i) => setMarked(m => m.map((v,idx)=> idx===i ? !v : v));
  const rows = [[0,1,2],[3,4,5],[6,7,8]];
  const bingo = rows.some(r => r.every(i => marked[i]));
  return (
    <Card>
      <h3 className="font-semibold text-slate-900 text-lg mb-3">Bingo de hábitos (marca los que ya haces)</h3>
      <div className="grid grid-cols-3 gap-2">
        {cells.map((c,i)=> (
          <button key={i} onClick={()=>toggle(i)} className={`aspect-square rounded-xl border ${marked[i]?"bg-emerald-600 text-white border-emerald-600":"bg-white border-slate-300"}`}>{c}</button>
        ))}
      </div>
      {bingo && <div className="mt-3 rounded-xl p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2"><PartyPopper className="w-4 h-4"/> ¡Bingo! Buenos hábitos.</div>}
    </Card>
  );
};

// ============== paso a paso: activar 2FA en WhatsApp ==============
const WhatsApp2FA = () => {
  const steps = [
    { t: "Abrir WhatsApp", d: "En tu celular.", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop" },
    { t: "Ajustes → Cuenta", d: "Busca el menú de Cuenta.", img: "https://images.unsplash.com/photo-1555617981-dac3880f7f49?q=80&w=1200&auto=format&fit=crop" },
    { t: "Verificación en dos pasos", d: "Actívala.", img: "https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=1200&auto=format&fit=crop" },
    { t: "Crea un PIN", d: "Memorízalo, no lo compartas.", img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop" },
    { t: "Correo de recuperación", d: "Opcional pero recomendado.", img: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?q=80&w=1200&auto=format&fit=crop" },
  ];
  const [i, setI] = useState(0);
  return (
    <Card>
      <div className="grid md:grid-cols-2 gap-4 items-center">
        <div>
          <img src={steps[i].img} alt={steps[i].t} className="w-full h-64 object-cover rounded-xl border border-slate-200"/>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 text-xl">Activa 2FA (5 pasos)</h3>
          <p className="mt-2 text-slate-800"><span className="font-medium">{i+1}. {steps[i].t}</span> — {steps[i].d}</p>
          <div className="mt-4 flex items-center gap-2">
            <button onClick={()=>setI(i=>Math.max(0, i-1))} className="rounded-xl px-3 py-2 border border-slate-300">Anterior</button>
            <button onClick={()=>setI(i=>Math.min(steps.length-1, i+1))} className="rounded-xl px-3 py-2 bg-indigo-600 text-white">Siguiente</button>
          </div>
          <p className="mt-3 text-sm text-slate-600">Consejo: No compartas el PIN con nadie. Si te lo piden por SMS o chat, es fraude.</p>
        </div>
      </div>
    </Card>
  );
};

// ============== Simulador de PIN avanzado (nuevo) ==============
const PinSimulator = () => {
  const [pin, setPin] = useState("");
  const [stage, setStage] = useState("input"); // input | sending | hacked | reset
  const [hackerSteps, setHackerSteps] = useState([]);

  const hackingSequence = [
    "🎯 Interceptando PIN...",
    "📱 Accediendo a WhatsApp...", 
    "👤 Clonando tu identidad...",
    "💸 Enviando mensajes pidiendo dinero...",
    "📧 Cambiando tu email de recuperación...",
    "🔒 Bloqueando tu acceso...",
    "💰 Usando tu cuenta para estafas..."
  ];

  const simulateHacking = () => {
    setStage("sending");
    setTimeout(() => {
      setStage("hacked");
      setHackerSteps([]);
      
      // Mostrar pasos del hacker uno por uno
      hackingSequence.forEach((step, i) => {
        setTimeout(() => {
          setHackerSteps(prev => [...prev, step]);
        }, i * 800);
      });
    }, 2000);
  };

  const reset = () => {
    setStage("input");
    setPin("");
    setHackerSteps([]);
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="text-center">
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotateY: stage === "hacked" ? [0, 360] : 0,
              scale: stage === "hacked" ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 2, repeat: stage === "hacked" ? Infinity : 0 }}
          >
            📱🔐
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">🚨 Simulador de PIN: ¿Qué pasa si lo envío?</h3>
          <p className="text-slate-600">Experimenta de forma segura las consecuencias de compartir tu PIN</p>
        </div>

        {stage === "input" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">📲</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Escenario: Recibiste este SMS</h4>
                  <p className="text-sm text-slate-600">Número desconocido</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-300 shadow-sm">
                <p className="text-slate-800">
                  🔴 <strong>URGENTE:</strong> Tu cuenta WhatsApp será suspendida en 2 horas. 
                  Para verificar tu identidad, envía tu PIN de 6 dígitos a este número. 
                  Soporte WhatsApp.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">
                Ingresa un PIN ficticio (6 dígitos) para simular
              </label>
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                placeholder="123456"
                className="w-full text-center text-2xl font-mono tracking-wider rounded-xl border-2 border-slate-300 px-4 py-4 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                inputMode="numeric"
                maxLength="6"
              />
            </div>

            <motion.button
              onClick={simulateHacking}
              disabled={pin.length < 6}
              whileHover={{ scale: pin.length >= 6 ? 1.02 : 1 }}
              whileTap={{ scale: pin.length >= 6 ? 0.98 : 1 }}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                pin.length >= 6 
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {pin.length >= 6 ? "📤 Enviar PIN (SIMULAR)" : "⚠️ Ingresa 6 dígitos"}
            </motion.button>
          </motion.div>
        )}

        {stage === "sending" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-4"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-6xl"
            >
              📤
            </motion.div>
            <h4 className="text-xl font-bold text-red-600">Enviando PIN...</h4>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div 
                className="bg-red-500 h-3 rounded-full"
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {stage === "hacked" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border-2 border-red-300">
              <div className="text-center mb-4">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl mb-2"
                >
                  🚨
                </motion.div>
                <h4 className="text-2xl font-bold text-red-700">¡CUENTA COMPROMETIDA!</h4>
                <p className="text-red-600">Esto es lo que está pasando en tiempo real:</p>
              </div>

              <div className="space-y-3">
                {hackerSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 bg-red-100 rounded-lg p-3 border border-red-200"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-xl"
                    >
                      ⚡
                    </motion.div>
                    <span className="font-medium text-red-800">{step}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-red-200 rounded-lg border border-red-400">
                <h5 className="font-bold text-red-800 mb-2">💔 Daños causados:</h5>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>✓ Perdiste el control de tu WhatsApp</li>
                  <li>✓ Tus contactos están recibiendo mensajes falsos</li>
                  <li>✓ Tu reputación está en riesgo</li>
                  <li>✓ Pueden acceder a tus conversaciones privadas</li>
                  <li>✓ Tu información personal está siendo usada para estafas</li>
                </ul>
              </div>
            </div>

            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              🔄 Reiniciar Simulación
            </motion.button>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <h5 className="font-bold text-green-800 mb-2">💡 Recuerda:</h5>
              <p className="text-green-700 text-sm">
                <strong>NUNCA compartas tu PIN</strong> - WhatsApp, bancos o cualquier empresa legítima 
                JAMÁS te pedirán tu PIN por SMS, llamada o chat. Si te lo piden, es 100% fraude.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
};

// ============== Analizador de Enlaces con 3D ==============
const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const riskyDomains = [
    "whatsap-support.com", "whatsapp-help-secure.com", "bank-seguro.co", 
    "udboyaca.soporte.link", "xn--whtspp-0wa.com", "bancobogota-seguro.co",
    "whatsapp-verification.net", "soporte-whatsapp.org"
  ];

  const shorteners = ["bit.ly", "tinyurl.com", "rb.gy", "t.co", "ow.ly", "goo.gl"];

  const analyzeUrl = () => {
    if (!url.trim()) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      try {
        const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
        const host = parsed.hostname.toLowerCase();
        
        const threats = [];
        let riskLevel = "low";
        
        // Verificar IP directa
        if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) {
          threats.push({ type: "IP directa", desc: "Usa dirección IP en lugar de dominio", severity: "high" });
          riskLevel = "high";
        }
        
        // Verificar acortadores
        if (shorteners.some(s => host.includes(s))) {
          threats.push({ type: "Acortador", desc: "Oculta el destino real del enlace", severity: "medium" });
          if (riskLevel === "low") riskLevel = "medium";
        }
        
        // Verificar dominios sospechosos
        if (riskyDomains.includes(host)) {
          threats.push({ type: "Dominio malicioso", desc: "En lista de sitios peligrosos conocidos", severity: "high" });
          riskLevel = "high";
        }
        
        // Verificar imitación de marcas
        const brandPatterns = [
          /whatsapp[-_]/i, /banco[-_]/i, /udboyaca[-_]/i, /paypal[-_]/i, /microsoft[-_]/i
        ];
        if (brandPatterns.some(p => p.test(host))) {
          threats.push({ type: "Imitación de marca", desc: "Imita marcas conocidas con guiones o caracteres extra", severity: "high" });
          riskLevel = "high";
        }
        
        // Verificar caracteres sospechosos
        if (/xn--|[^\w.-]/.test(host)) {
          threats.push({ type: "Caracteres sospechosos", desc: "Usa punycode o caracteres no estándar", severity: "medium" });
          if (riskLevel === "low") riskLevel = "medium";
        }
        
        setResult({ host, threats, riskLevel, url: parsed.href });
      } catch {
        setResult({ error: "URL inválida. Verifica el formato." });
      }
      setIsAnalyzing(false);
    }, 1200);
  };

  const getRiskColor = (level) => {
    switch(level) {
      case "high": return "from-red-50 to-rose-50 border-red-300";
      case "medium": return "from-amber-50 to-yellow-50 border-amber-300";
      default: return "from-emerald-50 to-green-50 border-emerald-300";
    }
  };

  const getRiskIcon = (level) => {
    switch(level) {
      case "high": return "🚨";
      case "medium": return "⚠️";
      default: return "✅";
    }
  };

  return (
    <Card>
      <div className="space-y-6">
        <div className="text-center">
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            🔗🛡️
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">🔍 Analizador de Enlaces</h3>
          <p className="text-slate-600">Analiza enlaces sospechosos y detecta señales de peligro</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Pega el enlace sospechoso aquí
            </label>
            <div className="flex gap-2">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ejemplo-sospechoso.com/verificar-cuenta"
                className="flex-1 rounded-xl border-2 border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <motion.button
                onClick={analyzeUrl}
                disabled={!url.trim() || isAnalyzing}
                whileHover={{ scale: url.trim() && !isAnalyzing ? 1.02 : 1 }}
                whileTap={{ scale: url.trim() && !isAnalyzing ? 0.98 : 1 }}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  url.trim() && !isAnalyzing
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    ></motion.div>
                    Analizando...
                  </div>
                ) : (
                  "🔍 Analizar"
                )}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className={`rounded-xl p-6 border-2 bg-gradient-to-r ${
                  result.error ? "from-slate-50 to-gray-50 border-slate-300" : getRiskColor(result.riskLevel)
                }`}
              >
                {result.error ? (
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ rotateZ: [-10, 10, -10] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      ❌
                    </motion.div>
                    <p className="text-slate-700 font-medium">{result.error}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <motion.div 
                        className="text-4xl mb-3"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotateY: result.riskLevel === "high" ? [0, 360] : 0
                        }}
                        transition={{ 
                          scale: { duration: 1, repeat: 2 },
                          rotateY: { duration: 2, repeat: Infinity }
                        }}
                      >
                        {getRiskIcon(result.riskLevel)}
                      </motion.div>
                      <h4 className="text-xl font-bold mb-2">
                        {result.riskLevel === "high" ? "🚨 ALTO RIESGO" : 
                         result.riskLevel === "medium" ? "⚠️ RIESGO MODERADO" : 
                         "✅ APARENTEMENTE SEGURO"}
                      </h4>
                    </div>

                    <div className="bg-white rounded-lg p-4 border">
                      <p className="text-sm text-slate-600 mb-1">Dominio analizado:</p>
                      <p className="font-mono text-sm break-all bg-slate-50 px-3 py-2 rounded border">
                        {result.host}
                      </p>
                    </div>

                    {result.threats.length > 0 ? (
                      <div className="space-y-3">
                        <h5 className="font-bold text-slate-800">🔍 Amenazas detectadas:</h5>
                        {result.threats.map((threat, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`flex items-start gap-3 p-3 rounded-lg border ${
                              threat.severity === "high" ? "bg-red-100 border-red-200" :
                              threat.severity === "medium" ? "bg-amber-100 border-amber-200" :
                              "bg-blue-100 border-blue-200"
                            }`}
                          >
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-lg"
                            >
                              {threat.severity === "high" ? "🚨" : threat.severity === "medium" ? "⚠️" : "ℹ️"}
                            </motion.div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{threat.type}</p>
                              <p className="text-xs text-slate-700">{threat.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg p-4 border border-emerald-200">
                        <div className="flex items-center gap-3">
                          <motion.div
                            animate={{ rotateZ: [0, 360] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="text-2xl"
                          >
                            ✅
                          </motion.div>
                          <div>
                            <p className="font-semibold text-emerald-800">No se detectaron amenazas obvias</p>
                            <p className="text-sm text-slate-600">Aún así, mantén precaución con enlaces inesperados</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <h5 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                        <motion.div
                          animate={{ rotateY: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          💡
                        </motion.div>
                        Recomendación
                      </h5>
                      <p className="text-blue-700 text-sm">
                        {result.riskLevel === "high" ? 
                          "🚫 NO hagas clic en este enlace. Es muy probable que sea malicioso." :
                          result.riskLevel === "medium" ?
                          "⚠️ Procede con extrema precaución. Verifica la fuente antes de continuar." :
                          "✅ El enlace parece legítimo, pero siempre verifica que esperabas recibirlo."
                        }
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-200">
          <h5 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotateZ: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🛡️
            </motion.div>
            Regla de oro
          </h5>
          <p className="text-slate-700 text-sm">
            Si recibiste un enlace inesperado, <strong>NO hagas clic</strong>. 
            En su lugar, ve directamente al sitio oficial escribiendo la dirección manualmente.
          </p>
        </div>
      </div>
    </Card>
  );
};

// ============== página principal ==============
export default function SeguridadInteractiva() {
  const [focus, setFocus] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(Math.min(100, Math.round((window.scrollY / h) * 100)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`min-h-screen ${focus ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
      <TopBar progress={progress} focus={focus} toggleFocus={()=>setFocus(v=>!v)} />
      <Hero onScrollDown={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })} />

      <main className="space-y-10 pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Objetivo resumido */}
        <Section id="intro" icon={ShieldCheck} title="Objetivo en 3 puntos">
          <div className="grid md:grid-cols-3 gap-4">
            <Card><p>Reconocer <span className="font-semibold">señales de riesgo</span> en WhatsApp y SMS.</p></Card>
            <Card><p>Aplicar <span className="font-semibold">hábitos simples</span> que protegen datos.</p></Card>
            <Card><p>Practicar con <span className="font-semibold">microjuegos</span> para mantener la atención.</p></Card>
          </div>
        </Section>

        {/* Calentamiento */}
        <Section id="poll" icon={MessageSquare} title="Encuesta en vivo (rompehielo)">
          <QuickPoll />
        </Section>

        {/* WhatsApp con imágenes */}
        <Section id="wa" icon={MessageSquare} title="WhatsApp: riesgos con ejemplos visuales">
          <div className="grid gap-4">
            <VisualCard title="Links maliciosos" bullets={["Parecen oficiales","Piden datos/descargas","Usan urgencia"]} example="Enlace de 'actualiza tu cuenta' que pide usuario/clave" img="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" />
            <VisualCard title="Archivos infectados" bullets={["PDF/Word/APK","Pueden traer malware","Aunque venga de un contacto"]} example="PDF que aparenta ser comunicado oficial" img="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop" />
            <VisualCard title="WhatsApp Web abierto" bullets={["Sesiones olvidadas","Acceso no autorizado","Laboratorios/cafés"]} example="No cerraste sesión en un PC compartido" img="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop" />
          </div>
        </Section>

        {/* Microjuego intermedio */}
        <Section id="game1" icon={Gamepad2} title="Microjuego #1: ¿Seguro o Sospechoso?">
          <ClassifierGame />
        </Section>

        {/* SMS con poco texto + galería */}
        <Section id="sms" icon={Smartphone} title="SMS: señales de fraude (rápidas)">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <h3 className="font-semibold text-slate-900 text-lg">Señales rápidas</h3>
              <ul className="mt-2 list-disc ml-5 space-y-1">
                <li><span className="font-medium">Urgencia</span>: “en 24h se bloquea”.</li>
                <li>Te piden <span className="font-medium">PIN</span> o contraseñas.</li>
                <li>Enlaces acortados o dominios raros.</li>
                <li>Remitente extraño o texto con errores.</li>
              </ul>
            </Card>
            <div className="grid grid-cols-2 gap-3">
              {["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1555421689-43cad7100751?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1494883759339-0b042055a4ee?q=80&w=800&auto=format&fit=crop","https://images.unsplash.com/photo-1555617981-dac3880f7f49?q=80&w=800&auto=format&fit=crop"].map((src,i)=> (
                <motion.figure key={i} whileHover={{ scale: 1.02 }} className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                  <img src={src} alt="ilustración SMS" className="h-36 w-full object-cover" />
                </motion.figure>
              ))}
            </div>
          </div>
        </Section>

        {/* Dinámica relámpago */}
        <Section id="lightning" icon={Timer} title="Reto de 20 segundos">
          <LightningRound />
        </Section>

        {/* Paso a paso 2FA */}
        <Section id="2fa" icon={LockKeyhole} title="Activar verificación en dos pasos (WhatsApp)">
          <WhatsApp2FA />
        </Section>

        {/* Mini‑quiz */}
        <Section id="quiz" icon={AlertTriangle} title="Mini‑quiz (3 preguntas)">
          <QuizVF />
        </Section>

        {/* Bingo de hábitos + Analizador de enlaces */}
        <Section id="habitos" icon={ShieldCheck} title="Bingo de hábitos + Enlaces">
          <div className="grid md:grid-cols-2 gap-4">
            <HabitsBingo />
            <LinkChecker />
          </div>
        </Section>

        <footer className="pt-6 text-sm text-slate-500">
          <p>Universidad de Boyacá · Presentación interactiva · WhatsApp + SMS</p>
          <p className="mt-1">Tip del presentador: activa el <span className="font-medium">Modo Enfoque</span> cuando quieras bajar estímulos y explicar algo clave.</p>
        </footer>
      </main>
    </div>
  );
}

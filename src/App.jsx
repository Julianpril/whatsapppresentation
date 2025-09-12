import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  MessageSquare,
  Smartphone,
  AlertTriangle,
  LockKeyhole,
  Link as LinkIcon,
  CheckCircle2,
  XCircle,
  FileWarning,
  ClipboardList,
  Info,
  BookOpen,
  Users,
  Building2,
  FileText,
  GraduationCap,
  Fingerprint,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Sitio interactivo de una sola página para exponer (sin diapositivas) los riesgos en WhatsApp y SMS.
 * Versión mejorada con mejor responsividad y UI/UX
 */

// ---------- Utilidades UI mejoradas ----------
const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Section = ({ id, icon: Icon, title, children, className = "" }) => (
  <section id={id} className={`scroll-mt-20 py-8 sm:py-12 lg:py-16 ${className}`}>
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          {Icon && (
            <div className="flex-shrink-0 rounded-xl p-2.5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 shadow-sm">
              <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600"/>
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">{title}</h2>
        </div>
        <div className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-none">{children}</div>
      </motion.div>
    </Container>
  </section>
);

const Card = ({ children, className = "", onClick, hover = true }) => (
  <motion.div 
    whileHover={hover ? { y: -4, scale: 1.02 } : {}} 
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className={`rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

const Pill = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-700 border-slate-200",
    primary: "bg-indigo-100 text-indigo-700 border-indigo-200",
    warning: "bg-amber-100 text-amber-700 border-amber-200",
    success: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border transition-colors ${variants[variant]}`}>
      {children}
    </span>
  );
};

// ---------- Navbar mejorada ----------
const Nav = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Item = ({ id, label }) => (
    <motion.a 
      href={`#${id}`} 
      whileHover={{ scale: 1.05 }}
      className="block px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 transition-colors"
      onClick={() => setOpen(false)}
    >
      {label}
    </motion.a>
  );

  return (
    <motion.div 
      className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'bg-white/90 shadow-lg border-b border-slate-200' : 'bg-white/75 border-b border-slate-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <div className="py-3 sm:py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="rounded-lg p-1.5 bg-gradient-to-br from-indigo-500 to-blue-600">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base text-slate-900">Seguridad Digital</span>
              <span className="text-xs text-slate-500 hidden sm:block">Universidad de Boyacá</span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 text-slate-700">
            {items.slice(0, 6).map(s => <Item key={s.id} id={s.id} label={s.label} />)}
            <motion.button 
              onClick={() => window.print()} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-3 rounded-xl px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 transition-all shadow-sm font-medium text-sm"
            >
              Guardar PDF
            </motion.button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <motion.button 
            className="lg:hidden rounded-xl p-2.5 hover:bg-slate-100 transition-colors"
            onClick={() => setOpen(v => !v)} 
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir menú"
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </motion.button>
        </div>
      </Container>

      {/* Mobile/Tablet Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-slate-200 bg-white"
          >
            <Container>
              <div className="py-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map(s => (
                  <Item key={s.id} id={s.id} label={s.label} />
                ))}
                <motion.button 
                  onClick={() => { setOpen(false); window.print(); }} 
                  whileTap={{ scale: 0.95 }}
                  className="col-span-2 sm:col-span-1 rounded-xl px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-700 text-white font-medium text-sm"
                >
                  Guardar PDF
                </motion.button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ---------- Datos base ----------
const autores = [
  "Adriana Zoraya Flórez Sandoval",
  "Francy Daniela Olmos",
  "Julián Gdo Abril Herrera",
];

const riesgosWA = [
  { t: "Links maliciosos (phishing/malware)", d: "Enlaces que aparentan ser de fuentes confiables. Buscan robar datos o instalar programas dañinos.", e: "Un link que promete 'verificación de cuenta' y te pide usuario/clave.", icon: LinkIcon, color: "rose" },
  { t: "Archivos adjuntos infectados", d: "PDF, Word o APK enviados por WhatsApp pueden incluir código malicioso.", e: "Un PDF que parece comunicado oficial pero contiene malware.", icon: FileText, color: "amber" },
  { t: "Secuestro de sesión (WhatsApp Web)", d: "Si dejas la sesión abierta en un computador compartido, otra persona puede usarla.", e: "Abriste WhatsApp Web en un laboratorio y no cerraste sesión.", icon: Smartphone, color: "violet" },
  { t: "Propagación automática", d: "Tu cuenta comprometida reenvía virus a contactos de la universidad.", e: "Mensajes masivos con el mismo enlace sospechoso.", icon: Users, color: "orange" },
  { t: "Suplantación de identidad", d: "Envían mensajes falsos desde tu cuenta, afectando reputación.", e: "Piden dinero a un colega haciéndose pasar por ti.", icon: AlertTriangle, color: "red" },
  { t: "Acoso o extorsión", d: "Con datos privados, presionan o chantajean.", e: "Amenazan con publicar información si no pagas.", icon: FileWarning, color: "pink" },
];

const smsVectores = [
  { t: "Smishing (phishing por SMS)", d: "Mensajes que dirigen a páginas falsas para capturar datos.", icon: MessageSquare, color: "blue" },
  { t: "Solicitud de PIN/códigos", d: "Piden reenviar códigos de verificación para tomar control de cuentas.", icon: LockKeyhole, color: "red" },
  { t: "Urgencia engañosa", d: "'Bloquearemos su cuenta en 24h' para que actúes sin verificar.", icon: AlertTriangle, color: "amber" },
  { t: "Spoofing de remitente", d: "El SMS aparenta venir de un número/nombre confiable.", icon: Building2, color: "purple" },
  { t: "Enlaces acortados/extraños", d: "Ocultan el destino real o usan dominios con caracteres confusos.", icon: Search, color: "green" },
];

const buenasPracticas = [
  { t: "Activar verificación en dos pasos en WhatsApp", icon: ShieldCheck },
  { t: "Cerrar sesión en WhatsApp Web tras usar computadores compartidos", icon: Smartphone },
  { t: "No abrir enlaces sospechosos en WhatsApp o SMS", icon: LinkIcon },
  { t: "No compartir PIN ni contraseñas bajo ninguna circunstancia", icon: LockKeyhole },
  { t: "Separar lo personal de lo institucional: usar canales oficiales", icon: Building2 },
  { t: "Bloquear/reportar números sospechosos y activar filtros anti‑spam", icon: XCircle },
  { t: "Mantener el sistema y las apps actualizados desde tiendas oficiales", icon: CheckCircle2 },
  { t: "Respaldar (backup) periódicamente la información relevante", icon: FileText },
];

const glosario = [
  { k: "Phishing", v: "Engaño para que entregues datos (contraseñas, tarjetas) haciéndose pasar por alguien confiable." },
  { k: "Smishing", v: "Phishing por SMS." },
  { k: "Malware", v: "Software malicioso que daña o roba información." },
  { k: "Secuestro de sesión", v: "Alguien reutiliza tu sesión abierta para entrar sin tu clave." },
  { k: "Spoofing", v: "Falsificación de identidad del remitente." },
];

// ---------- Componentes interactivos mejorados ----------
const RiskGrid = () => {
  const [open, setOpen] = useState(null);
  
  const colorClasses = {
    rose: "bg-rose-50 border-rose-200 text-rose-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
    violet: "bg-violet-50 border-violet-200 text-violet-600",
    orange: "bg-orange-50 border-orange-200 text-orange-600",
    red: "bg-red-50 border-red-200 text-red-600",
    pink: "bg-pink-50 border-pink-200 text-pink-600",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
      {riesgosWA.map((r, i) => (
        <motion.div key={i} layout>
          <Card onClick={() => setOpen(open === i ? null : i)} className="h-full">
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 rounded-xl p-2.5 border ${colorClasses[r.color]}`}>
                  <r.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-base sm:text-lg leading-tight mb-2">{r.t}</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{r.d}</p>
                </div>
              </div>
              
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }} 
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 p-3 sm:p-4">
                      <p className="text-slate-800 text-sm sm:text-base">
                        <span className="font-semibold text-indigo-600">Ejemplo:</span> {r.e}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400">Pulsa para ver ejemplo</p>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const SMSPanel = () => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-600",
    red: "bg-red-50 border-red-200 text-red-600",
    amber: "bg-amber-50 border-amber-200 text-amber-600",
    purple: "bg-purple-50 border-purple-200 text-purple-600",
    green: "bg-green-50 border-green-200 text-green-600",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {smsVectores.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card hover={false} className="h-full">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`flex-shrink-0 rounded-xl p-2.5 border ${colorClasses[v.color]}`}>
                  <v.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-base sm:text-lg leading-tight mb-2">{v.t}</h3>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">{v.d}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <Pill variant="warning">SMS</Pill>
                    <Pill variant="primary">Enlaces</Pill>
                    <Pill variant="default">Urgencia</Pill>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="rounded-xl p-2.5 bg-red-50 border border-red-200">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-lg mb-3">Indicadores de fraude en SMS</h3>
              <ul className="space-y-2">
                {[
                  "Remitente extraño o que cambia entre números",
                  "Ortografía/gramática deficiente o traducciones raras",
                  "Promesas o amenazas con tiempo limitado",
                  "Enlaces acortados o dominios que imitan marcas",
                  "Solicitan datos, pagos o PIN"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 flex-shrink-0"></div>
                    <span className="text-slate-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="rounded-xl p-2.5 bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-lg mb-3">Buenas prácticas específicas en SMS</h3>
              <ul className="space-y-2">
                {[
                  "No respondas a mensajes sospechosos; bloquea y reporta",
                  "Verifica en el sitio oficial o por teléfono institucional",
                  "Desconfía de enlaces en campañas o promociones inesperadas",
                  "Activa filtros anti‑spam del dispositivo/operador",
                  "Educa a compañeros para reducir el riesgo colectivo"
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2.5 flex-shrink-0"></div>
                    <span className="text-slate-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const QuizVF = () => {
  const questions = useMemo(() => [
    { q: "Dejar WhatsApp Web abierto en un computador compartido es seguro si confías en el lugar.", a: false, why: "La sesión puede quedar disponible para cualquiera." },
    { q: "Si un SMS pide 'confirmar en 24h' con un enlace, puede ser fraude.", a: true, why: "La urgencia es una táctica común." },
    { q: "Compartir un PIN de verificación por chat es aceptable si lo solicita 'soporte'.", a: false, why: "Nadie legítimo solicita tu PIN." },
    { q: "Un contacto conocido no garantiza que un archivo sea seguro.", a: true, why: "Su cuenta pudo ser comprometida." },
  ], []);

  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const done = i >= questions.length;
  
  const answer = (val) => {
    if (done) return;
    const ok = questions[i].a === val;
    setFlash(ok);
    if (ok) setScore(s => s + 1);
    setShowExplanation(true);
    setTimeout(() => { 
      setI(n => n + 1); 
      setFlash(null); 
      setShowExplanation(false);
    }, 2500);
  };

  if (done) {
    const pct = Math.round(score * 100 / questions.length);
    return (
      <Card className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="space-y-4"
        >
          <div className="rounded-full p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 w-fit mx-auto">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Quiz Completado!</h3>
            <p className="text-xl text-slate-700">Puntuación: {score}/{questions.length} ({pct}%)</p>
          </div>
          <motion.button
            onClick={() => { setI(0); setScore(0); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl px-6 py-3 bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 font-medium transition-all"
          >
            Reintentar Quiz
          </motion.button>
        </motion.div>
      </Card>
    );
  }

  const q = questions[i];
  const progress = ((i + 1) / questions.length) * 100;

  return (
    <Card>
      <div className="space-y-6">
        {/* Progress Bar */}
        <div className="w-full">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Pregunta {i + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question */}
        <div>
          <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">{q.q}</p>
        </div>

        {/* Answer Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={() => answer(true)}
            disabled={showExplanation}
            whileHover={{ scale: showExplanation ? 1 : 1.02 }}
            whileTap={{ scale: showExplanation ? 1 : 0.98 }}
            className="flex-1 rounded-xl px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verdadero
          </motion.button>
          <motion.button
            onClick={() => answer(false)}
            disabled={showExplanation}
            whileHover={{ scale: showExplanation ? 1 : 1.02 }}
            whileTap={{ scale: showExplanation ? 1 : 0.98 }}
            className="flex-1 rounded-xl px-6 py-3 bg-gradient-to-r from-rose-600 to-red-600 text-white hover:from-rose-700 hover:to-red-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Falso
          </motion.button>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {flash !== null && showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`rounded-xl p-4 border-2 ${flash 
                ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200" 
                : "bg-gradient-to-r from-rose-50 to-red-50 border-rose-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {flash ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-semibold ${flash ? "text-emerald-800" : "text-rose-800"}`}>
                    {flash ? "¡Correcto!" : "Respuesta incorrecta"}
                  </p>
                  <p className="text-slate-700 text-sm mt-1">{q.why}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

const PinSimulator = () => {
  const [pin, setPin] = useState("");
  const [shared, setShared] = useState(false);
  
  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
            <Fingerprint className="w-7 h-7 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">Simulador de PIN</h3>
            <p className="text-slate-700 text-sm sm:text-base">
              Es tu llave de acceso. Si la entregas, otra persona puede tomar tu cuenta.
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Escribe un PIN ficticio (6 dígitos)
            </label>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-lg font-mono tracking-wider outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              inputMode="numeric"
              maxLength="6"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <motion.button
              onClick={() => setShared(true)}
              disabled={pin.length < 4}
              whileHover={{ scale: pin.length >= 4 ? 1.02 : 1 }}
              whileTap={{ scale: pin.length >= 4 ? 0.98 : 1 }}
              className="flex-1 rounded-xl px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Compartir PIN
            </motion.button>
            <motion.button
              onClick={() => { setShared(false); setPin(""); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 rounded-xl px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium transition-all text-sm"
            >
              Limpiar
            </motion.button>
          </div>

          <AnimatePresence>
            {shared && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="rounded-xl p-4 bg-gradient-to-r from-rose-50 to-red-50 border-2 border-rose-200"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-rose-700 font-semibold text-sm">
                      ⚠️ Simulación: Acabas de entregar tu llave
                    </p>
                    <p className="text-slate-700 text-sm mt-1">
                      Un atacante podría tomar tu cuenta.
                    </p>
                    <p className="text-slate-800 text-sm mt-2">
                      <span className="font-semibold">Conclusión:</span> no compartas códigos. 
                      Si te lo piden por mensaje, es fraude.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

const LinkChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const riskyHosts = [
    "whatsap-support.com",
    "whatsapp-help-secure.com",
    "bank-seguro.co",
    "udboyaca.soporte.link",
    "xn--whtspp-0wa.com",
  ];

  const check = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      try {
        const parsed = new URL(url);
        const host = parsed.hostname.toLowerCase();
        const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
        const shortener = /(bit\.ly|tinyurl\.com|rb\.gy|t\.co)$/i.test(host);
        const brandDash = /(whatsapp|banco|udboyaca)[-].+/.test(host);
        const puny = /xn--/.test(host);
        const inList = riskyHosts.includes(host);
        const risky = isIp || shortener || brandDash || puny || inList;
        
        setResult({ 
          host, 
          risky, 
          reasons: { isIp, shortener, brandDash, puny, inList },
          url: parsed.href 
        });
      } catch {
        setResult({ error: "URL inválida" });
      }
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <LinkIcon className="w-7 h-7 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">Analizador de Enlaces</h3>
            <p className="text-slate-700 text-sm sm:text-base">
              Pega un enlace recibido por chat o SMS. Detectamos señales de riesgo comunes.
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              URL a analizar
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ejemplo.com/actualiza-tu-cuenta"
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
              <motion.button
                onClick={check}
                disabled={!url.trim() || isAnalyzing}
                whileHover={{ scale: url.trim() && !isAnalyzing ? 1.02 : 1 }}
                whileTap={{ scale: url.trim() && !isAnalyzing ? 0.98 : 1 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm whitespace-nowrap"
              >
                {isAnalyzing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analizando...
                  </div>
                ) : (
                  "Analizar"
                )}
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`rounded-xl p-4 border-2 ${
                  result.error 
                    ? "bg-slate-50 border-slate-200"
                    : result.risky
                    ? "bg-gradient-to-r from-rose-50 to-red-50 border-rose-200"
                    : "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200"
                }`}
              >
                {result.error ? (
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <p className="text-slate-700">{result.error}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      {result.risky ? (
                        <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm break-all">
                          Dominio: <span className="font-mono">{result.host}</span>
                        </p>
                        <p className={`text-sm font-medium ${
                          result.risky ? "text-rose-700" : "text-emerald-700"
                        }`}>
                          {result.risky 
                            ? "⚠️ Señales de riesgo detectadas" 
                            : "✅ No se detectaron señales comunes de riesgo"
                          }
                        </p>
                      </div>
                    </div>

                    {result.risky && (
                      <div className="pl-8">
                        <p className="text-xs font-medium text-slate-600 mb-2">Señales detectadas:</p>
                        <ul className="space-y-1 text-xs text-slate-700">
                          {result.reasons.isIp && (
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                              Usa dirección IP en lugar de nombre
                            </li>
                          )}
                          {result.reasons.shortener && (
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                              Usa acortador de enlaces (oculta destino real)
                            </li>
                          )}
                          {result.reasons.brandDash && (
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                              Imita marcas con guiones
                            </li>
                          )}
                          {result.reasons.puny && (
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                              Dominio con caracteres raros (punycode)
                            </li>
                          )}
                          {result.reasons.inList && (
                            <li className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-rose-400 rounded-full flex-shrink-0"></div>
                              En lista de dominios riesgosos
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    <div className="pl-8 pt-2 border-t border-slate-200">
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold">Regla de oro:</span> si no esperabas el mensaje, 
                        <span className="font-semibold"> no hagas clic</span>. 
                        Ingresa manualmente al sitio oficial.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
};

const Checklist = () => {
  const [done, setDone] = useState(buenasPracticas.map(() => false));
  const toggle = (i) => setDone(arr => arr.map((v, idx) => idx === i ? !v : v));
  const progress = Math.round(done.filter(Boolean).length * 100 / buenasPracticas.length);

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200">
            <LockKeyhole className="w-7 h-7 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-xl mb-2">Buenas Prácticas de Seguridad</h3>
            <p className="text-slate-700 text-sm sm:text-base mb-4">
              Marca las prácticas que ya implementas en tu día a día
            </p>
            
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Progreso de implementación</span>
                <span className="font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-slate-500">
                {done.filter(Boolean).length} de {buenasPracticas.length} implementadas
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {buenasPracticas.map((practice, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                done[i] 
                  ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200" 
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="flex-shrink-0 mt-0.5">
                  <input
                    id={`practice-${i}`}
                    type="checkbox"
                    checked={done[i]}
                    onChange={() => toggle(i)}
                    className="w-5 h-5 rounded border-2 border-slate-300 text-emerald-600 focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0 transition-all"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`rounded-lg p-1.5 ${
                      done[i] ? "bg-emerald-100" : "bg-slate-100 group-hover:bg-slate-200"
                    } transition-colors`}>
                      <practice.icon className={`w-4 h-4 ${
                        done[i] ? "text-emerald-600" : "text-slate-600"
                      }`} />
                    </div>
                    <span className={`text-sm font-medium leading-tight ${
                      done[i] ? "text-emerald-800 line-through" : "text-slate-900"
                    } transition-colors`}>
                      {practice.t}
                    </span>
                  </div>
                </div>
              </label>
            </motion.div>
          ))}
        </div>

        {/* Congratulations */}
        <AnimatePresence>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="rounded-xl p-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-lg font-bold">¡Excelente trabajo!</span>
              </div>
              <p className="text-emerald-100">
                Has implementado todas las buenas prácticas de seguridad. 
                Tu nivel de protección es óptimo.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
};

// ---------- Flujo de decisión mejorado ----------
const DecisionFlow = () => (
  <Card>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200">
          <Search className="w-7 h-7 text-sky-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-xl mb-2">Flujo de Decisión Rápida</h3>
          <p className="text-slate-700 text-sm sm:text-base">
            Sigue estos pasos cuando recibas un mensaje sospechoso
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            step: "1",
            title: "¿Esperabas el mensaje?",
            desc: "Si no, sospecha inmediatamente",
            icon: AlertTriangle,
            color: "amber"
          },
          {
            step: "2", 
            title: "Revisa el remitente",
            desc: "Nombre raro, número desconocido o errores → desconfía",
            icon: Users,
            color: "blue"
          },
          {
            step: "3",
            title: "No abras enlaces",
            desc: "Visita el sitio oficial escribiendo la dirección manualmente",
            icon: LinkIcon,
            color: "red"
          },
          {
            step: "4",
            title: "Nunca compartas PIN/códigos",
            desc: "Ninguna entidad seria los solicita por chat/SMS",
            icon: LockKeyhole,
            color: "purple"
          },
          {
            step: "5",
            title: "Reporta y bloquea",
            desc: "El número o chat si es sospechoso",
            icon: XCircle,
            color: "rose"
          },
          {
            step: "6",
            title: "Si ya hiciste clic",
            desc: "Desconecta internet, cambia contraseñas y comunica al área responsable",
            icon: FileWarning,
            color: "orange"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-4 border-2 bg-gradient-to-br ${
              item.color === "amber" ? "from-amber-50 to-yellow-50 border-amber-200" :
              item.color === "blue" ? "from-blue-50 to-sky-50 border-blue-200" :
              item.color === "red" ? "from-red-50 to-rose-50 border-red-200" :
              item.color === "purple" ? "from-purple-50 to-violet-50 border-purple-200" :
              item.color === "rose" ? "from-rose-50 to-pink-50 border-rose-200" :
              "from-orange-50 to-amber-50 border-orange-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 rounded-lg p-2 ${
                item.color === "amber" ? "bg-amber-100 text-amber-600" :
                item.color === "blue" ? "bg-blue-100 text-blue-600" :
                item.color === "red" ? "bg-red-100 text-red-600" :
                item.color === "purple" ? "bg-purple-100 text-purple-600" :
                item.color === "rose" ? "bg-rose-100 text-rose-600" :
                "bg-orange-100 text-orange-600"
              } font-bold text-sm min-w-[2rem] h-8 flex items-center justify-center`}>
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 text-sm mb-1 leading-tight">
                  {item.title}
                </h4>
                <p className="text-slate-700 text-xs leading-tight">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Card>
);

// ---------- Plan de respuesta mejorado ----------
const PlanRespuesta = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200">
            <FileWarning className="w-7 h-7 text-rose-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">Si sospechas fraude</h3>
            <p className="text-slate-600 text-sm">Acciones preventivas inmediatas</p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {[
            "No interactúes con el mensaje; no hagas clic",
            "Toma capturas de pantalla como prueba",
            "Bloquea y reporta el número o chat",
            "Informa al canal institucional designado"
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-rose-50 to-red-50 border border-rose-100"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-rose-600">{i + 1}</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>

    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
            <ClipboardList className="w-7 h-7 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-lg mb-2">Si ya hiciste clic</h3>
            <p className="text-slate-600 text-sm">Protocolo de respuesta inmediata</p>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {[
            "Activa modo avión / desconecta el equipo comprometido",
            "Cambia contraseñas y habilita verificación en dos pasos",
            "Revisa movimientos inusuales (correo, banca, redes)",
            "Comunica el incidente al área responsable para apoyo"
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-amber-600">{i + 1}</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

// ---------- Glosario mejorado ----------
const Glossary = () => (
  <Card>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 rounded-xl p-3 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200">
          <BookOpen className="w-7 h-7 text-violet-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-xl mb-2">Glosario de Términos</h3>
          <p className="text-slate-700 text-sm sm:text-base">
            Definiciones clave para entender los riesgos de seguridad
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {glosario.map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl p-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 hover:shadow-md transition-shadow"
          >
            <dt className="font-semibold text-slate-900 text-base mb-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-violet-400"></div>
              {g.k}
            </dt>
            <dd className="text-slate-700 text-sm leading-relaxed">{g.v}</dd>
          </motion.div>
        ))}
      </div>
    </div>
  </Card>
);

// ---------- Portada mejorada ----------
const Portada = () => (
  <div className="relative rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 p-6 sm:p-8 lg:p-10 overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-200 to-blue-300 rounded-full opacity-20"></div>
      <div className="absolute top-1/2 -left-6 w-32 h-32 bg-gradient-to-br from-sky-200 to-indigo-300 rounded-full opacity-15"></div>
      <div className="absolute -bottom-6 right-1/3 w-20 h-20 bg-gradient-to-br from-blue-200 to-sky-300 rounded-full opacity-25"></div>
    </div>

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sensibilización: 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600"> 
              Riesgos en WhatsApp y SMS
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-2"
          >
            <p className="text-slate-700 text-base sm:text-lg font-medium">
              Universidad de Boyacá
            </p>
            <p className="text-slate-600 text-sm sm:text-base">
              Facultad de Ciencias e Ingeniería · Ingeniería de Sistemas · Tunja · 2025
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <p className="text-slate-800 font-semibold text-sm">Autores:</p>
            <div className="space-y-1">
              {autores.map((a, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  className="text-slate-700 text-sm flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                  {a}
                </motion.p>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap gap-2"
          >
            {["WhatsApp", "SMS", "Phishing", "PIN", "Buenas prácticas"].map((tag, i) => (
              <motion.div
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium bg-white/80 backdrop-blur border border-indigo-200 text-indigo-700"
              >
                {tag}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-6"
      >
        <Card className="bg-white/90 backdrop-blur border-2 border-white shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-800">
              <div className="flex items-center gap-2">
                <div className="rounded-lg p-2 bg-gradient-to-br from-green-100 to-emerald-100">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div className="rounded-lg p-2 bg-gradient-to-br from-blue-100 to-sky-100">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <span className="font-semibold text-lg">Presentación Interactiva</span>
            </div>
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Navega por secciones, responde el quiz, analiza enlaces y usa el flujo de decisión en tiempo real.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span className="font-semibold text-sm text-slate-900">Interactivo</span>
                </div>
                <p className="text-xs text-slate-600">Simuladores, quiz y herramientas</p>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold text-sm text-slate-900">Accesible</span>
                </div>
                <p className="text-xs text-slate-600">Lenguaje claro y universal</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contexto')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 rounded-xl px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium text-sm hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                Comenzar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.print()}
                className="flex-1 rounded-xl px-4 py-2.5 border-2 border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition-all"
              >
                Descargar PDF
              </motion.button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  </div>
);

// ---------- Modo presentador mejorado ----------
const usePresenterNav = (ids) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        scrollTo(+1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        scrollTo(-1);
      }
    };

    const currentIndex = () => {
      const y = window.scrollY + 100;
      let best = 0;
      ids.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        if (top <= y) best = idx;
      });
      return best;
    };

    const scrollTo = (delta) => {
      const idx = currentIndex();
      const next = Math.max(0, Math.min(ids.length - 1, idx + delta));
      document.getElementById(ids[next])?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [ids]);
};

// ---------- Página principal mejorada ----------
export default function SeguridadWhatsAppSMS() {
  const sections = [
    { id: "portada", label: "Inicio", icon: ShieldCheck },
    { id: "contexto", label: "Contexto", icon: Info },
    { id: "riesgos-wa", label: "WhatsApp", icon: MessageSquare },
    { id: "riesgos-sms", label: "SMS", icon: Smartphone },
    { id: "flujo", label: "Decisión", icon: Search },
    { id: "plan", label: "Respuesta", icon: FileWarning },
    { id: "quiz", label: "Quiz", icon: AlertTriangle },
    { id: "simuladores", label: "Simuladores", icon: Fingerprint },
    { id: "buenas", label: "Prácticas", icon: LockKeyhole },
    { id: "glosario", label: "Glosario", icon: BookOpen },
  ];

  usePresenterNav(sections.map(s => s.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 text-slate-900">
      <Nav items={sections} />

      <Section id="portada" icon={ShieldCheck} title="" className="pt-6 sm:pt-8">
        <Portada />
      </Section>

      <Section id="contexto" icon={Info} title="Contexto e Importancia">
        <Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 flex-shrink-0">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">¿Por qué es importante?</h3>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    Los funcionarios manejan información personal y datos de la universidad en conversaciones cotidianas. 
                    Un acceso no autorizado puede poner en riesgo a la persona y a la institución.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 ml-12">
                {[
                  "Protección de datos personales y reputación profesional",
                  "Prevención de incidentes que afecten la imagen institucional",
                  "Continuidad operativa y reducción de fraudes"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0"></div>
                    <span className="text-slate-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl p-2.5 bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Ámbitos de Riesgo</h3>
                  <p className="text-slate-700 leading-relaxed mb-3">
                    Los riesgos se manifiestan en diferentes niveles y contextos.
                  </p>
                </div>
              </div>

              <div className="space-y-3 ml-12">
                {[
                  { title: "Ciberseguridad", desc: "Enlaces, archivos, secuestro de sesión, propagación de malware" },
                  { title: "Riesgos personales", desc: "Suplantación, extorsión, sanciones internas" },
                  { title: "SMS fraudulentos", desc: "Smishing, PIN, urgencia engañosa, spoofing, acortadores" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.3 }}
                    className="p-3 rounded-lg bg-red-50 border border-red-100"
                  >
                    <p className="font-semibold text-red-800 text-sm mb-1">{item.title}</p>
                    <p className="text-slate-700 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </Card>
      </Section>

      <Section id="riesgos-wa" icon={MessageSquare} title="Riesgos en WhatsApp">
        <RiskGrid />
      </Section>

      <Section id="riesgos-sms" icon={Smartphone} title="Riesgos en SMS">
        <SMSPanel />
      </Section>

      <Section id="flujo" icon={Search} title="Flujo de Decisión ante Mensajes Sospechosos">
        <DecisionFlow />
      </Section>

      <Section id="plan" icon={FileWarning} title="Plan de Respuesta ante Incidentes">
        <PlanRespuesta />
      </Section>

      <Section id="quiz" icon={AlertTriangle} title="Quiz de Conocimientos">
        <QuizVF />
      </Section>

      <Section id="simuladores" icon={Fingerprint} title="Simuladores Interactivos">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <PinSimulator />
          <LinkChecker />
        </div>
      </Section>

      <Section id="buenas" icon={LockKeyhole} title="Implementación de Buenas Prácticas">
        <Checklist />
      </Section>

      <Section id="glosario" icon={BookOpen} title="Glosario de Términos">
        <Glossary />
      </Section>

      <Container className="py-12">
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              <p className="text-lg font-semibold">Universidad de Boyacá</p>
              <p className="text-slate-300 text-sm">
                Proyecto de sensibilización en seguridad digital · 2025
              </p>
              <p className="text-slate-400 text-xs">
                Presenta: {autores.join(" · ")}
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p className="font-medium">Controles de navegación:</p>
              <div className="flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <span className="rounded px-1.5 py-0.5 bg-slate-700">←</span>
                  <span className="rounded px-1.5 py-0.5 bg-slate-700">→</span> 
                  Navegar secciones
                </span>
                <span>Botón "Guardar PDF" para descarga</span>
              </div>
            </div>
          </div>
        </motion.footer>
      </Container>
    </div>
  );
}
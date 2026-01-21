import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, ContactShadows } from '@react-three/drei';
import {
  Code, globe, Layers, Rocket, Zap, ArrowRight, Menu, X, Twitter, Linkedin, Mail, ChevronRight, Play, Cpu, Globe
} from 'lucide-react';

// --- Global Essentials ---

const NoiseOverlay = () => <div className="noise-overlay" />;

const SectionTitle = ({ children, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    viewport={{ once: true }}
    className="mb-12"
  >
    {subtitle && <p className="text-[#00f2ea] text-xs font-bold tracking-[0.3em] uppercase mb-4">{subtitle}</p>}
    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">{children}</h2>
  </motion.div>
);

// --- 3D Elements ---

const AbstractShape = ({ color = "#00f2ea", speed = 1, distort = 0.4 }) => {
  const meshRef = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1 * speed;
      meshRef.current.rotation.y = time * 0.15 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 64, 64]} ref={meshRef} scale={1.5}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed * 2}
          roughness={0}
          metalness={1}
          wireframe
        />
      </Sphere>
    </Float>
  );
};

// --- Sections ---

const Intro = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6 text-center"
    >
      <div className="max-w-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse" />
        </motion.div>
        <motion.h1
          className="text-2xl md:text-3xl font-light tracking-widest text-white/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
        >
          Crafting the future <br />
          <span className="text-white font-medium">of digital experiences</span>
        </motion.h1>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-1000 ${scrolled ? 'bg-black/60 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <motion.a
          href="#"
          className="text-2xl font-black tracking-tighter text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ORBIT<span className="text-cyan-500">.</span>
        </motion.a>
        <div className="hidden md:flex gap-10">
          {['Works', 'Services', 'Process', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase font-bold tracking-widest text-white/50 hover:text-white transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
            >
              {item}
            </motion.a>
          ))}
        </div>
        <motion.button
          className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-5 h-5 text-white" />
        </motion.button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black pb-20">
      <div className="container mx-auto px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h2 className="text-[#00f2ea] text-sm font-bold tracking-[0.4em] mb-6">EST. 2026</h2>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8">
                We Design <br />
                <span className="text-reveal">Experiences</span> <br />
                <span className="italic font-light">That Move</span>
              </h1>
              <p className="text-lg text-white/50 max-w-sm mb-10 leading-relaxed">
                A creative digital agency focused on immersive web, 3D, and interactive storytelling.
              </p>
              <div className="flex gap-6">
                <button className="px-10 py-5 bg-white text-black font-bold uppercase text-xs tracking-widest rounded-full hover:bg-cyan-400 transition-colors">
                  Start Project
                </button>
                <button className="px-10 py-5 border border-white/20 text-white font-bold uppercase text-xs tracking-widest rounded-full hover:bg-white/5 transition-colors">
                  Explore
                </button>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 h-[500px] lg:h-[700px] relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              className="w-full h-full"
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ea" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
                <Suspense fallback={null}>
                  <AbstractShape speed={1} />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.5 }}
          className="flex items-center gap-4 text-white/30 text-xs font-bold tracking-widest uppercase"
        >
          <span>Scroll to explore</span>
          <div className="w-12 h-px bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const words = "We don’t build websites. We build feelings. Motion. Impact.".split(" ");

  return (
    <section ref={container} className="py-40 bg-black overflow-hidden px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {words.map((word, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {word}
            </Word>
          ))}
        </div>
      </div>
    </section>
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [20, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-4xl md:text-8xl font-black tracking-tighter text-white"
    >
      {children}
    </motion.span>
  );
}

const Services = () => {
  const services = [
    { title: "3D Web Experiences", icon: <Globe />, desc: "High-performance digital realms built with Three.js." },
    { title: "Interactive UI & Motion", icon: <Layers />, desc: "Interfaces that respond, breathe, and guide." },
    { title: "Brand Identity", icon: <Cpu />, desc: "Futuristic visual systems for modern startups." },
    { title: "Conversion Systems", icon: <Zap />, desc: "Landing pages engineered for massive growth." },
  ];

  return (
    <section id="services" className="py-32 relative bg-[#050505] px-10">
      <div className="container mx-auto">
        <SectionTitle subtitle="Capabilities">Our Expertise</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl glass hover:border-cyan-500/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-cyan-500 transition-colors">
                {React.cloneElement(item.icon, { className: "w-8 h-8" })}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/40 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedWorks = () => {
  const projects = [
    { name: "Void Finance", category: "Web3/3D", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2664&auto=format&fit=crop" },
    { name: "Nebula OS", category: "SaaS/Motion", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { name: "Nova Studio", category: "Agency/Clean", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop" },
  ];

  return (
    <section id="works" className="py-32 bg-black px-10">
      <div className="container mx-auto">
        <SectionTitle subtitle="Portfolio">Selected Impact</SectionTitle>
        <div className="space-y-32">
          {projects.map((project, i) => (
            <div key={project.name} className="group cursor-pointer">
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[2rem] border border-white/10 mb-10">
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 2 }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-10 left-10">
                  <p className="text-[#ff00ff] text-xs font-black tracking-widest uppercase mb-2">{project.category}</p>
                  <h4 className="text-4xl md:text-6xl font-black text-white">{project.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { title: "Discover", desc: "We dive deep into your brand's soul." },
    { title: "Concept", desc: "Abstracting ideas into visual logic." },
    { title: "Build", desc: "Engineering the future with precision." },
    { title: "Launch", desc: "Unveiling the experience to the world." },
  ];

  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 20%"]
  });

  return (
    <section id="process" className="py-32 bg-[#050505] px-10 overflow-hidden">
      <div className="container mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <SectionTitle subtitle="How we work">Our Method</SectionTitle>
          <p className="text-white/40 max-w-md leading-relaxed mb-12">
            We follow a cinematic development arc that ensures every pixel has a purpose and every interaction tells a story.
          </p>
          <div className="relative pl-12" ref={lineRef}>
            <motion.div
              style={{ scaleY: scrollYProgress, originY: 0 }}
              className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full"
            />
            <div className="absolute left-0 top-0 w-1 h-full bg-white/5 rounded-full" />

            <div className="space-y-20">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-white/40 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <div className="w-96 h-96 relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border border-white/10 rounded-full animate-spin duration-[10s]" />
              <div className="absolute w-20 h-20 border border-cyan-500/50 rounded-full animate-ping duration-[5s]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  return (
    <section className="py-40 bg-black text-center px-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12 leading-tight">
            Design-led development <br />
            <span className="text-white/20">without templates or limits.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-left pt-20 border-t border-white/5">
            {[
              { label: "Custom Only", val: "No boilerplate. Every line of code is bespoke." },
              { label: "High Contrast", val: "Performance tuned for cinematic speeds." },
              { label: "Detail Obsessed", val: "We care about the pixels you don't even see." }
            ].map((item) => (
              <div key={item.label}>
                <h5 className="text-[#00f2ea] text-xs font-black tracking-[0.3em] uppercase mb-4">{item.label}</h5>
                <p className="text-white/50 text-sm leading-relaxed">{item.val}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-10">
      <div className="absolute inset-0 opacity-40">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <AbstractShape color="#ff00ff" distort={0.6} speed={0.5} />
          </Suspense>
        </Canvas>
      </div>
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter mb-10 leading-none">
            Let's create <br />
            <span className="text-reveal">unforgettable</span>
          </h2>
          <button className="group relative px-12 py-6 bg-white text-black font-black uppercase text-sm tracking-[0.2em] rounded-full overflow-hidden transition-all hover:pr-16">
            <span className="relative z-10">Start the Experience</span>
            <div className="absolute right-0 top-0 h-full w-0 group-hover:w-16 bg-cyan-400 transition-all flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-black border-t border-white/5 px-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <p className="text-2xl font-black text-white mb-2">ORBIT<span className="text-cyan-500">.</span></p>
          <p className="text-xs text-white/30 tracking-widest uppercase">Crafting immersive digital experiences.</p>
        </div>
        <div className="flex gap-10 text-xs font-black tracking-[0.2em] uppercase text-white/40">
          <a href="#" className="hover:text-cyan-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Twitter</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Dribbble</a>
        </div>
        <p className="text-[10px] text-white/20 uppercase tracking-widest">© 2026 Void Nebula Studio</p>
      </div>
    </footer>
  );
};

// --- App Root ---

function App() {
  const [introShow, setIntroShow] = useState(true);

  return (
    <div className="bg-black text-white selection:bg-cyan-400 selection:text-black min-h-screen">
      <AnimatePresence>
        {introShow && <Intro onComplete={() => setIntroShow(false)} />}
      </AnimatePresence>

      {!introShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <NoiseOverlay />
          <Navbar />
          <Hero />
          <Manifesto />
          <Services />
          <FeaturedWorks />
          <Process />
          <WhyUs />
          <CTA />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;

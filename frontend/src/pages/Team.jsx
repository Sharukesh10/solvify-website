import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "../components/Reveal";

// Import real team images
import sharukeshImg from "../assets/team/sharukesh.jpg";
import tharakeshImg from "../assets/team/tharakesh.png";
import shahidImg from "../assets/team/shahid.png";
import shamanthImg from "../assets/team/shamanth.jpg";
import sharathImg from "../assets/team/sharath.png";

const TEAM = [
  {
    name: "N. Sharukesh",
    role: "Founder & CEO",
    desc: "Visionary leader driving Solvify's mission to solve real-world problems through intelligent digital products.",
    image: sharukeshImg
  },
  {
    name: "K. Tharakesh",
    role: "Co-Founder & COO",
    desc: "Product strategist focused on user-centric design and building scalable solutions for sports and mobility.",
    image: tharakeshImg
  },
  {
    name: "S. MD. Shahid Afrid",
    role: "CTO",
    desc: "Technology architect leading the engineering team to build robust, high-performance digital infrastructure.",
    image: shahidImg
  },
  {
    name: "V. Shamanth Chowdary",
    role: "CFO",
    desc: "Financial strategist managing Solvify's growth, investments, and sustainable business operations.",
    image: shamanthImg
  },
  {
    name: "M. Sharath Chandra",
    role: "CMO",
    desc: "Brand architect crafting Solvify's narrative and driving adoption through innovative marketing strategies.",
    image: sharathImg
  }
];

export default function Team() {
  return (
    <main className="bg-brand-dark min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <section className="text-center mb-20">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-green" />
              <span className="font-mono text-brand-green text-xs tracking-widest uppercase">The Brains</span>
              <div className="w-8 h-px bg-brand-green" />
            </div>
          </Reveal>
          <h1 className="font-display font-black text-6xl sm:text-7xl lg:text-[5.5rem] text-white leading-tight mb-6">
            Our <span className="text-gradient">Team</span>
          </h1>
          <p className="font-body text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Meet the team building Solvify — a group of innovators committed to simplifying the complex.
          </p>
        </section>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl border border-brand-border p-8 flex flex-col items-center text-center group hover:border-brand-green/30 transition-all duration-500"
            >
              <div className="relative mb-6">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-brand-green/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-white/10 bg-brand-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="font-display font-bold text-2xl text-white mb-2">{member.name}</h3>
              <div className="font-mono text-brand-green text-xs tracking-widest uppercase mb-4 px-3 py-1 bg-brand-green/10 rounded-full border border-brand-green/20">
                {member.role}
              </div>
              <p className="font-body text-white/45 text-sm sm:text-base leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Culture CTA */}
        <section className="mt-32 text-center p-12 glass rounded-3xl border border-brand-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/5 to-transparent pointer-events-none" />
          <div className="relative">
            <h2 className="font-display font-black text-4xl text-white mb-4">Want to join us?</h2>
            <p className="font-body text-white/50 text-lg mb-8 max-w-xl mx-auto">
              We're always looking for brilliant builders who want to create impact-first technology.
            </p>
            <Link to="/join" className="btn-primary inline-flex">Join Us →</Link>
          </div>
        </section>

      </div>
    </main>
  );
}

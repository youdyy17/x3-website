import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import TechStackSection from "./components/TechStackSection";
import WhyUsSection from "./components/WhyUsSection";
import ProcessSection from "./components/ProcessSection";
import CTASection from "./components/CTASection";
import FooterSection from "./components/FooterSection";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">
      {/* Global aurora background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob aurora-blob-1"></div>
        <div className="aurora-blob aurora-blob-2"></div>
        <div className="aurora-blob aurora-blob-3"></div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="relative z-10">
        <HeroSection />
        <div className="section-divider" />
        <AboutSection />
        <div className="section-divider" />
        <ServicesSection />
        <div className="section-divider" />
        <PortfolioSection />
        <div className="section-divider" />
        <TechStackSection />
        <div className="section-divider" />
        <WhyUsSection />
        <div className="section-divider" />
        <ProcessSection />
        <div className="section-divider" />
        <CTASection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

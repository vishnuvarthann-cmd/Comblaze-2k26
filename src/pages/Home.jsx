import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutCollege from '../components/AboutCollege';
import AboutDepartment from '../components/AboutDepartment';
import AboutSymposium from '../components/AboutSymposium';
import EventsPreview from '../components/EventsPreview';
import Schedule from '../components/Schedule';
import Highlights from '../components/Highlights';
import Coordinators from '../components/Coordinators';
import ContactMap from '../components/ContactMap';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-transparent text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <Hero />
      <AboutCollege />
      <AboutDepartment />
      <AboutSymposium />
      <EventsPreview />
      <Schedule />
      <Highlights />
      <Coordinators />
      <ContactMap />
      <Footer />
    </div>
  );
}

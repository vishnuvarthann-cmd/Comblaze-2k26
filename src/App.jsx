import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EventsCatalog from './pages/EventsCatalog';
import EventPage from './pages/EventPage';
import Register from './pages/Register';
import Success from './pages/Success';
import Team from './pages/Team';
import AdminCheckin from './pages/AdminCheckin';
import NotFound from './pages/NotFound';
import ParticleSwarmBackground from './components/ParticleSwarmBackground';
import Preloader from './components/Preloader';

export default function App() {
  return (
    <BrowserRouter>
      {/* Laser Cyber Scanner Preloader */}
      <Preloader />

      {/* 3D Holographic Particle Swarm Background */}
      <ParticleSwarmBackground />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsCatalog />} />
        <Route path="/events/:slug" element={<EventPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/success" element={<Success />} />
        <Route path="/team" element={<Team />} />
        <Route path="/admin/checkin" element={<AdminCheckin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

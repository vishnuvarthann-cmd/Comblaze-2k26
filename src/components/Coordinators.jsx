import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, UserCheck, Phone, Mail, Award, Sparkles, GraduationCap, ShieldCheck } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules';
import { fetchOrganizingCommittee, supabase } from '../lib/supabase';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Coordinators() {
  const [committee, setCommittee] = useState(null);

  useEffect(() => {
    fetchOrganizingCommittee().then(data => {
      if (data) setCommittee(data);
    });

    const channel = supabase
      .channel('public:organizing_committee_home')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'organizing_committee' }, () => {
        fetchOrganizingCommittee().then(updated => {
          if (updated) setCommittee(updated);
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Format all committee members into carousel cards
  const rawChiefGuests = committee?.chiefGuests || [
    {
      name: "Shri. V. Aravindhan, IPS",
      role: "Chief Guest & Keynote Speaker",
      department: "Distinguished Guest of Honour",
      category: "chief_guest",
      image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80"
    }
  ];

  const rawPatrons = committee?.patrons || [
    { name: "Dr. M. A. Mohamed Nizam", role: "Secretary & Correspondent", department: "M.A.M. Group of Institutions", category: "patron" },
    { name: "Dr. P. Rajendran", role: "Principal", department: "M.A.M. College of Engineering", category: "patron" }
  ];

  const rawConveners = committee?.conveners || [
    { name: "Dr. K. Senthil Kumar", role: "Professor & HOD", department: "Department of Computer Science & Engineering", phone: "+91 98424 12345", email: "hod.cse@mamce.org", category: "convener" }
  ];

  const rawCoordinators = committee?.coordinators || [
    { name: "Prof. R. Kavitha", role: "Associate Professor", department: "Department of CSE", phone: "+91 97890 12345", category: "coordinator" },
    { name: "Prof. S. Karthik", role: "Assistant Professor", department: "Department of CSE", phone: "+91 96291 54321", category: "coordinator" }
  ];

  const rawStudentLeads = committee?.studentLeads || [
    { name: "P. Vignesh", role: "Student President (IV Year CSE)", department: "Department of CSE", phone: "+91 91234 56789", category: "student_lead" },
    { name: "M. Ananya", role: "Student Vice-President (IV Year CSE)", department: "Department of CSE", phone: "+91 98765 43210", category: "student_lead" },
    { name: "K. Rahul", role: "Technical Event Lead (III Year CSE)", department: "Department of CSE", phone: "+91 90123 45678", category: "student_lead" }
  ];

  const defaultAvatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80"
  ];

  const categoryBadges = {
    chief_guest: { label: "CHIEF GUEST", color: "bg-amber-500/20 text-amber-300 border-amber-500/50" },
    patron: { label: "CHIEF PATRON", color: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    convener: { label: "CONVENER & HOD", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" },
    coordinator: { label: "FACULTY LEAD", color: "bg-purple-500/20 text-purple-300 border-purple-500/40" },
    student_lead: { label: "STUDENT LEAD", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" }
  };

  const allMembers = [
    ...rawChiefGuests,
    ...rawPatrons,
    ...rawConveners,
    ...rawCoordinators,
    ...rawStudentLeads
  ].map((member, index) => {
    const validImg = (member.image_url && member.image_url.trim() !== '') 
      ? member.image_url.trim() 
      : ((member.image && member.image.trim() !== '') ? member.image.trim() : defaultAvatars[index % defaultAvatars.length]);
    return {
      ...member,
      image: validImg,
      badge: categoryBadges[member.category] || categoryBadges.coordinator
    };
  });

  const customCoverflowStyles = `
    .committee-coverflow-swiper {
      width: 100%;
      padding-top: 20px;
      padding-bottom: 60px !important;
    }
    .committee-coverflow-swiper .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 320px;
      height: 440px;
      transition: all 0.3s ease;
    }
    .committee-coverflow-swiper .swiper-pagination-bullet {
      background-color: #00f3ff !important;
      opacity: 0.4;
    }
    .committee-coverflow-swiper .swiper-pagination-bullet-active {
      opacity: 1;
      width: 24px;
      border-radius: 9999px;
      background-color: #00f3ff !important;
      box-shadow: 0 0 10px rgba(0, 243, 255, 0.8);
    }
  `;

  return (
    <section id="coordinators" className="py-20 bg-transparent relative border-t border-slate-900/60 overflow-hidden">
      <style>{customCoverflowStyles}</style>

      {/* Decorative Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-black text-cyan-400 uppercase tracking-widest mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Leadership & Committee</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-orbitron">
            Organizing Committee
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            The visionary patrons, faculty mentors, and student leaders behind COMBLAZE 2K26.
          </p>
        </div>

        {/* 3D Coverflow Swiper Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-5xl mx-auto"
        >
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 35,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="committee-coverflow-swiper"
            modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          >
            {allMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 flex flex-col justify-between items-center text-center shadow-2xl backdrop-blur-xl hud-card relative overflow-hidden group hover:border-cyan-400 transition-colors">
                  
                  {/* Badge */}
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-3 ${member.badge.color}`}>
                    {member.badge.label}
                  </span>

                  {/* Profile Avatar Image */}
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/40 shadow-xl my-2 shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Member Details */}
                  <div className="space-y-1 my-auto">
                    <h3 className="text-lg font-black text-white font-orbitron line-clamp-1">{member.name}</h3>
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wide">{member.role}</p>
                    <p className="text-[11px] text-slate-400 font-medium line-clamp-2">{member.department}</p>
                  </div>

                  {/* Contact Action Buttons if available */}
                  {(member.phone || member.email) && (
                    <div className="pt-3 flex items-center justify-center gap-2 w-full">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-cyan-400 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span className="truncate">{member.phone}</span>
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="py-2 px-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-slate-300 hover:text-white text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Mail className="w-3 h-3 text-cyan-400" />
                          <span>Email</span>
                        </a>
                      )}
                    </div>
                  )}

                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center cursor-pointer hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-xl backdrop-blur-md">
              <ChevronLeft className="w-6 h-6" />
            </div>

            <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center cursor-pointer hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-xl backdrop-blur-md">
              <ChevronRight className="w-6 h-6" />
            </div>
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}

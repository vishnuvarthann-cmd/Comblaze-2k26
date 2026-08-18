import { createClient } from '@supabase/supabase-js';
import { EVENTS } from '../data/eventsData';
import { sendConfirmationEmailDirect } from './resend';

// Clean Supabase URL if trailing /rest/v1/ is present
const rawUrl = import.meta.env.VITE_SUPABASE_URL || 'https://exvipxjgtfwqxztlaasp.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmlweGpndGZ3cXh6dGxhYXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0NTc2MiwiZXhwIjoyMTAyMjIxNzYyfQ.Mia5wWqvyCgI4_13Br8Nlb-GnC2XbNQ4Vi86bamG_Rw';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Normalize event record fields from Supabase DB
 */
export function normalizeEvent(event) {
  if (!event) return null;

  const defaultSubtitles = {
    'code-battle': 'CS Fundamentals & HackerRank Coding',
    'db-detectives': 'DBMS Concepts & SQL Query Challenge',
    'paper-presentation': 'Innovative PPT Research Presentation',
    'reverse-charades': 'Speed Mime & Team Guessing Battle',
    'connectrix': 'Screen Sync, Picture Connections & Dance Step Challenge',
    'maniax': 'Think • Strategize • Collaborate • Conquer',
    'gaming-arena': 'eSports Battlegrounds Mobile India (BGMI)',
    'short-film': 'Cinematic Storytelling & Reel Editing Contest',
    'treasure-hunt': 'Campus Cryptic Clues & QR Treasure Quest',
    'tech-quiz-memes': 'Tech Trivia Mastery & Live Meme Creation'
  };

  const matchedSubtitle = event.subtitle || defaultSubtitles[event.slug] || (event.category === 'technical' ? 'Technical Innovation Challenge' : 'Creative Non-Technical Showcase');

  return {
    ...event,
    subtitle: matchedSubtitle,
    image: event.image_url || event.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    teamSize: event.team_size || event.teamSize || 'Individual',
    shortDesc: event.description 
      ? (event.description.length > 110 ? event.description.slice(0, 110) + '...' : event.description) 
      : (event.shortDesc || ''),
    maxTeamSize: event.team_size && event.team_size.includes('4') ? 4 : (event.team_size && event.team_size.includes('3') ? 3 : 2),
    rules: Array.isArray(event.rules) 
      ? event.rules 
      : (typeof event.rules === 'string' && event.rules.startsWith('[') 
          ? JSON.parse(event.rules) 
          : [event.rules || 'Standard symposium rules apply.'])
  };
}

/**
 * Fetch events STRICTLY from Supabase DB
 */
export async function fetchEvents() {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn('[Supabase] Live events query warning:', error.message);
      return [];
    }
    if (data && data.length > 0) {
      return data.map(normalizeEvent);
    }
    return [];
  } catch (err) {
    console.warn('[Supabase] Fetch failed:', err);
    return [];
  }
}

/**
 * Fetch single event by slug STRICTLY from Supabase DB
 */
export async function fetchEventBySlug(slug) {
  if (!slug) return null;

  const rawSlug = decodeURIComponent(slug).trim();
  const hyphenatedSlug = rawSlug.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');
  const spaceSlug = rawSlug.toLowerCase().replace(/-/g, ' ');

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(rawSlug);
    
    let query = supabase.from('events').select('*');
    if (isUuid) {
      query = query.or(`id.eq.${rawSlug},slug.eq.${hyphenatedSlug}`);
    } else {
      query = query.or(`slug.ilike.${hyphenatedSlug},slug.ilike.${rawSlug},slug.ilike.${spaceSlug},name.ilike.%${hyphenatedSlug.replace(/-/g, '%')}%`);
    }

    const { data, error } = await query.limit(1);

    if (!error && data && data.length > 0) {
      const foundEvent = data[0];
      const { data: coords } = await supabase.from('coordinators').select('*').eq('event_id', foundEvent.id);
      return normalizeEvent({
        ...foundEvent,
        coordinators: coords || []
      });
    }
  } catch (err) {
    console.warn('[Supabase] fetchEventBySlug error:', err);
  }

  const localEvent = EVENTS.find(e => {
    const eSlug = (e.slug || '').toLowerCase();
    const eId = (e.id || '').toLowerCase();
    const eName = (e.name || '').toLowerCase();
    return (
      eSlug === hyphenatedSlug ||
      eSlug === rawSlug.toLowerCase() ||
      eId === hyphenatedSlug ||
      eId === rawSlug.toLowerCase() ||
      eName.includes(hyphenatedSlug.replace(/-/g, ' '))
    );
  });

  return normalizeEvent(localEvent || null);
}

/**
 * Create a new registration record STRICTLY in Supabase DB
 */
export async function createRegistration(formData) {
  const liveEvents = await fetchEvents();
  const eventsList = liveEvents.length > 0 ? liveEvents : EVENTS;

  const resolvedEventIds = [];
  const selectedEventNames = [];

  if (Array.isArray(formData.event_ids)) {
    formData.event_ids.forEach(idOrSlug => {
      const found = eventsList.find(e => e.id === idOrSlug || e.slug === idOrSlug);
      if (found) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(found.id);
        if (isUuid) {
          resolvedEventIds.push(found.id);
        }
        selectedEventNames.push(found.name.trim());
      }
    });
  }

  const payload = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    college: formData.college,
    department: formData.department,
    year: formData.year,
    event_ids: resolvedEventIds,
    event_names: selectedEventNames,
    payment_status: 'pending',
    checked_in: false
  };

  const { data, error } = await supabase
    .from('registrations')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('[Supabase] createRegistration API error:', error.message);
    throw new Error(`Registration failed: ${error.message}`);
  }

  return { success: true, data, registration: data };
}

/**
 * Mark a registration as paid STRICTLY updating razorpay_payment_id, razorpay_order_id, qr_ticket_url in Supabase
 */
export async function markRegistrationPaid(registrationId, paymentResponse) {
  const paymentId = typeof paymentResponse === 'string'
    ? paymentResponse
    : (paymentResponse?.razorpay_payment_id || `pay_${Math.random().toString(36).substring(2, 10)}`);

  const orderId = typeof paymentResponse === 'object' && paymentResponse?.razorpay_order_id
    ? paymentResponse.razorpay_order_id
    : `order_${Math.random().toString(36).substring(2, 10)}`;

  const qrTicketUrl = `${window.location.origin}/register/success?id=${registrationId}`;

  const { data, error } = await supabase
    .from('registrations')
    .update({
      payment_status: 'paid',
      payment_ref: paymentId,
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      qr_ticket_url: qrTicketUrl
    })
    .eq('id', registrationId)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] markRegistrationPaid API error:', error.message);
    throw new Error(`Payment status update failed: ${error.message}`);
  }

  if (data) {
    try {
      await sendConfirmationEmailDirect(data);
    } catch (e) {
      console.warn('[Resend] Email dispatch warning:', e);
    }
  }

  return { success: true, data };
}

/**
 * Fetch Registration by ID STRICTLY from Supabase API
 */
export async function fetchRegistrationById(idText) {
  if (!idText || !idText.trim()) return null;

  const clean = idText.trim();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clean);

  if (isUuid) {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', clean)
      .single();

    if (!error && data) return data;
  }

  // Fallback search if idText is a payment_ref, order_id, name, or phone
  const { data } = await supabase
    .from('registrations')
    .select('*')
    .or(`name.ilike.%${clean}%,phone.ilike.%${clean}%,email.ilike.%${clean}%,payment_ref.eq.${clean},razorpay_payment_id.eq.${clean}`)
    .limit(1);

  return (data && data.length > 0) ? data[0] : null;
}

/**
 * Search Registrations STRICTLY from Supabase API
 */
export async function searchRegistrations(queryText) {
  if (!queryText || !queryText.trim()) return [];

  const cleanQuery = queryText.trim();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanQuery);

  const filterStr = isUuid
    ? `name.ilike.%${cleanQuery}%,phone.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%,college.ilike.%${cleanQuery}%,id.eq.${cleanQuery}`
    : `name.ilike.%${cleanQuery}%,phone.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%,college.ilike.%${cleanQuery}%`;

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .or(filterStr)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.warn('[Supabase] searchRegistrations error:', error.message);
    return [];
  }
  return data || [];
}

/**
 * Confirm Check-in for participant at Staff Portal via Supabase API
 */
export async function confirmCheckin(registrationId) {
  const { data: existing, error: fetchErr } = await supabase
    .from('registrations')
    .select('*')
    .eq('id', registrationId)
    .single();

  if (fetchErr) throw fetchErr;

  if (existing && existing.checked_in) {
    return {
      success: false,
      duplicate: true,
      message: `Participant ${existing.name} has ALREADY checked in!`,
      registration: existing,
      checked_in_at: existing.checked_in_at
    };
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('registrations')
    .update({ checked_in: true, checked_in_at: now })
    .eq('id', registrationId)
    .select()
    .single();

  if (error) throw error;

  return {
    success: true,
    duplicate: false,
    message: `Check-in confirmed for ${data.name}! Entry granted.`,
    registration: data,
    checked_in_at: now
  };
}

/**
 * Fetch Organizing Committee members directly from Supabase DB
 */
export async function fetchOrganizingCommittee() {
  try {
    const { data, error } = await supabase
      .from('organizing_committee')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data && data.length > 0) {
      const normalized = data.map(m => {
        const cat = (m.category || '').trim().toLowerCase();
        const img = (m.image_url && m.image_url.trim() !== '') 
          ? m.image_url.trim() 
          : ((m.image && m.image.trim() !== '') ? m.image.trim() : null);
        return {
          ...m,
          name: (m.name || '').trim(),
          role: (m.role || '').trim(),
          department: (m.department || '').trim(),
          category: cat,
          image_url: img,
          image: img
        };
      });

      return {
        chiefGuests: normalized.filter(m => m.category === 'chief_guest'),
        patrons: normalized.filter(m => m.category === 'patron'),
        conveners: normalized.filter(m => m.category === 'convener'),
        coordinators: normalized.filter(m => m.category === 'coordinator'),
        studentLeads: normalized.filter(m => m.category.startsWith('student') || m.category === 'student_lead')
      };
    }
  } catch (err) {
    console.warn('[Supabase] fetchOrganizingCommittee error:', err);
  }

  // Fallback to local default object
  return {
    chiefGuests: [
      { 
        name: "Shri. V. Aravindhan, IPS", 
        role: "Chief Guest & Keynote Speaker", 
        department: "Distinguished Guest of Honour",
        image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80"
      }
    ],
    patrons: [
      { name: "Dr. M. A. Mohamed Nizam", role: "Secretary & Correspondent", department: "M.A.M. Group of Institutions" },
      { name: "Dr. P. Rajendran", role: "Principal", department: "M.A.M. College of Engineering" }
    ],
    conveners: [
      { name: "Dr. K. Senthil Kumar", role: "Professor & HOD", department: "Department of Computer Science & Engineering", phone: "+91 98424 12345", email: "hod.cse@mamce.org" }
    ],
    coordinators: [
      { name: "Prof. R. Kavitha", role: "Associate Professor", department: "Department of CSE", phone: "+91 97890 12345" },
      { name: "Prof. S. Karthik", role: "Assistant Professor", department: "Department of CSE", phone: "+91 96291 54321" }
    ],
    studentLeads: [
      { name: "P. Vignesh", role: "Student President (IV Year CSE)", phone: "+91 91234 56789" },
      { name: "M. Ananya", role: "Student Vice-President (IV Year CSE)", phone: "+91 98765 43210" },
      { name: "K. Rahul", role: "Technical Event Lead (III Year CSE)", phone: "+91 90123 45678" }
    ]
  };
}

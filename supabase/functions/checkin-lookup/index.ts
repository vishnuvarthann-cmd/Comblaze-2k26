// Supabase Edge Function: checkin-lookup
// Looks up registration details by ID, Phone, or Name for staff check-in terminal

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || 'https://exvipxjgtfwqxztlaasp.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query) {
      throw new Error('Query parameter missing');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Search by UUID or partial match on name / phone
    let dbQuery = supabase.from('registrations').select('*');

    const cleanQuery = query.trim();

    // UUID regex check
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanQuery);

    if (isUuid) {
      dbQuery = dbQuery.eq('id', cleanQuery);
    } else {
      dbQuery = dbQuery.or(`phone.ilike.%${cleanQuery}%,name.ilike.%${cleanQuery}%,email.ilike.%${cleanQuery}%`);
    }

    const { data: registrations, error } = await dbQuery.limit(10);

    if (error) throw error;

    // Also fetch event details for the matched registrations
    const enriched = await Promise.all(
      (registrations || []).map(async (reg) => {
        if (reg.event_ids && reg.event_ids.length > 0) {
          const { data: events } = await supabase
            .from('events')
            .select('id, name, slug, category')
            .in('id', reg.event_ids);
          return { ...reg, events: events || [] };
        }
        return { ...reg, events: [] };
      })
    );

    return new Response(
      JSON.stringify({ success: true, count: enriched.length, results: enriched }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

// Supabase Edge Function: checkin-confirm
// Updates checked_in status and timestamp for a participant

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
    const { registration_id } = await req.json();

    if (!registration_id) {
      throw new Error('Registration ID required');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch existing record first
    const { data: existing, error: fetchError } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registration_id)
      .single();

    if (fetchError || !existing) {
      throw new Error('Registration record not found');
    }

    // Duplicate Check-In Warning
    if (existing.checked_in) {
      return new Response(
        JSON.stringify({
          success: true,
          duplicate: true,
          message: 'Warning: Participant has ALREADY checked in previously!',
          checked_in_at: existing.checked_in_at,
          registration: existing
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    // Perform check-in
    const checkinTime = new Date().toISOString();
    const { data: updated, error: updateError } = await supabase
      .from('registrations')
      .update({
        checked_in: true,
        checked_in_at: checkinTime
      })
      .eq('id', registration_id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        duplicate: false,
        message: 'Check-in confirmed successfully!',
        checked_in_at: checkinTime,
        registration: updated
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exvipxjgtfwqxztlaasp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmlweGpndGZ3cXh6dGxhYXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0NTc2MiwiZXhwIjoyMTAyMjIxNzYyfQ.Mia5wWqvyCgI4_13Br8Nlb-GnC2XbNQ4Vi86bamG_Rw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectSchema() {
  console.log('Fetching events table...');
  const { data: events, error: eErr } = await supabase.from('events').select('id, name, slug');
  console.log('Events in DB:', events, eErr);

  console.log('Fetching sample registration...');
  const { data: regs, error: rErr } = await supabase.from('registrations').select('*').limit(1);
  console.log('Sample registration:', regs, rErr);
}

inspectSchema();

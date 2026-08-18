import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exvipxjgtfwqxztlaasp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmlweGpndGZ3cXh6dGxhYXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0NTc2MiwiZXhwIjoyMTAyMjIxNzYyfQ.Mia5wWqvyCgI4_13Br8Nlb-GnC2XbNQ4Vi86bamG_Rw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSearch(q) {
  const clean = q.trim();
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clean);
  const filter = isUuid
    ? `name.ilike.%${clean}%,phone.ilike.%${clean}%,email.ilike.%${clean}%,college.ilike.%${clean}%,id.eq.${clean}`
    : `name.ilike.%${clean}%,phone.ilike.%${clean}%,email.ilike.%${clean}%,college.ilike.%${clean}%`;

  console.log(`Testing search for: "${clean}"`);
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .or(filter);

  if (error) console.error('ERROR:', error);
  else console.log(`SUCCESS (${data.length} records):`, data.map(d => ({ name: d.name, phone: d.phone, college: d.college })));
}

async function main() {
  await testSearch('Gayathri');
  await testSearch('63939');
  await testSearch('NSCET');
}

main();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exvipxjgtfwqxztlaasp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmlweGpndGZ3cXh6dGxhYXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0NTc2MiwiZXhwIjoyMTAyMjIxNzYyfQ.Mia5wWqvyCgI4_13Br8Nlb-GnC2XbNQ4Vi86bamG_Rw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPaid() {
  console.log('Testing insert with lowercase payment_status paid...');
  const payload = {
    name: 'Test Participant Paid',
    college: 'M.A.M. College of Engineering',
    department: 'Computer Science & Engineering',
    year: 'III Year',
    phone: '9876543210',
    email: 'testpaid@example.com',
    event_ids: ['a1111111-1111-4111-a111-111111111111', 'a2222222-2222-4222-a222-222222222222'],
    event_names: ['Code Battle', 'Paper Presentation'],
    payment_status: 'paid',
    payment_ref: 'pay_test123'
  };

  const { data, error } = await supabase
    .from('registrations')
    .insert([payload])
    .select();

  if (error) {
    console.error('SUPABASE INSERT ERROR:', JSON.stringify(error, null, 2));
  } else {
    console.log('SUPABASE INSERT PAID SUCCESS! Data:', data);
  }
}

testPaid();

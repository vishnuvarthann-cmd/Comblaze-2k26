import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exvipxjgtfwqxztlaasp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmlweGpndGZ3cXh6dGxhYXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0NTc2MiwiZXhwIjoyMTAyMjIxNzYyfQ.Mia5wWqvyCgI4_13Br8Nlb-GnC2XbNQ4Vi86bamG_Rw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRegistration() {
  console.log('Testing insert into registrations table...');
  const testPayload = {
    name: 'Test Participant',
    email: 'test@example.com',
    phone: '9876543210',
    college: 'MAMCE',
    department: 'CSE',
    year: 'III Year',
    event_ids: ['paper-presentation'],
    event_names: ['Paper Presentation'],
    payment_status: 'pending',
    checked_in: false
  };

  const { data, error } = await supabase
    .from('registrations')
    .insert([testPayload])
    .select();

  if (error) {
    console.error('INSERT ERROR:', error);
  } else {
    console.log('INSERT SUCCESS:', data);
    // clean up test record
    if (data && data[0]?.id) {
      await supabase.from('registrations').delete().eq('id', data[0].id);
      console.log('Cleaned up test record.');
    }
  }
}

testRegistration();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://exvipxjgtfwqxztlaasp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4dmlweGpndGZ3cXh6dGxhYXNwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY0NTc2MiwiZXhwIjoyMTAyMjIxNzYyfQ.Mia5wWqvyCgI4_13Br8Nlb-GnC2XbNQ4Vi86bamG_Rw';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCommittee() {
  console.log('Fetching organizing_committee from Supabase...');
  const { data, error } = await supabase
    .from('organizing_committee')
    .select('*');

  if (error) {
    console.error('ERROR:', error);
  } else {
    console.log(`FETCHED ${data ? data.length : 0} RECORDS:`);
    console.log(JSON.stringify(data, null, 2));
  }
}

testCommittee();

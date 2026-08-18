import { fetchEventBySlug } from './src/lib/supabase.js';

async function testRhythmRoyale() {
  console.log('Testing fetchEventBySlug("rhythm royale")...');
  const res1 = await fetchEventBySlug("rhythm royale");
  console.log('RESULT WITH SPACE:', res1?.name, res1?.slug);

  console.log('Testing fetchEventBySlug("rhythm-royale")...');
  const res2 = await fetchEventBySlug("rhythm-royale");
  console.log('RESULT WITH HYPHEN:', res2?.name, res2?.slug);
}

testRhythmRoyale();

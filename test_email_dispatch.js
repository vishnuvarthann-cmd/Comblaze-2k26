import { sendConfirmationEmailDirect } from './src/lib/resend.js';

async function testEmailDispatch() {
  console.log('Testing sendConfirmationEmailDirect locally...');
  const result = await sendConfirmationEmailDirect({
    id: 'test-uuid-12345',
    name: 'Test Participant',
    email: 'pavun@example.com',
    college: 'MAMCE',
    department: 'CSE',
    year: 'III Year',
    event_names: ['Code Battle', 'Paper Presentation']
  });

  console.log('RESULT:', JSON.stringify(result, null, 2));
}

testEmailDispatch();

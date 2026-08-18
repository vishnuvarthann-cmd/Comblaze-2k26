import { sendConfirmationEmailDirect } from './src/lib/resend.js';

async function testEmailDispatch() {
  console.log('Testing sendConfirmationEmailDirect locally...');
  const result = await sendConfirmationEmailDirect({
    id: 'test-uuid-12345',
    name: 'Test Participant',
    email: 'pavun@example.com', // Change if testing real email
    college: 'MAMCE',
    department: 'CSE',
    year: 'III Year',
    event_names: ['Code Battle', 'Paper Presentation']
  });

  console.log('RESULT:', result);
}

testEmailDispatch();

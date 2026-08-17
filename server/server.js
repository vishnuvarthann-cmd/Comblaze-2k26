const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Razorpay = require('razorpay');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(REGISTRATIONS_FILE)) {
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([], null, 2));
}

// Razorpay instance initialization (with placeholder safety check)
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder_key';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret';

let razorpayInstance = null;
if (razorpayKeyId !== 'rzp_test_placeholder_key' && razorpayKeySecret !== 'placeholder_secret') {
  razorpayInstance = new Razorpay({
    key_id: razorpayKeyId,
    key_secret: razorpayKeySecret
  });
}

// Helper: Read registrations
const getRegistrations = () => {
  try {
    const data = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading registrations file:', err);
    return [];
  }
};

// Helper: Save registration
const saveRegistration = (registration) => {
  const registrations = getRegistrations();
  registrations.push(registration);
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2));
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    event: 'MAMCE COMBLAZE2K26 API Service',
    timestamp: new Date().toISOString()
  });
});

// Endpoint: Create Payment Order
app.post('/api/payment/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = `rcpt_${Date.now()}` } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }

    // If live Razorpay key exists, create actual order
    if (razorpayInstance) {
      const options = {
        amount: Math.round(amount * 100), // amount in paise
        currency,
        receipt
      };
      const order = await razorpayInstance.orders.create(options);
      return res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: razorpayKeyId,
        mode: 'live'
      });
    }

    // Fallback Mock Mode (Safe local development / testing without API keys)
    const mockOrderId = `order_mock_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return res.json({
      success: true,
      orderId: mockOrderId,
      amount: Math.round(amount * 100),
      currency: 'INR',
      key: 'rzp_test_demo_key',
      mode: 'mock_demo',
      message: 'Razorpay keys not set. Operating in seamless Demo Mode.'
    });
  } catch (error) {
    console.error('Create Order Error:', error);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
});

// Endpoint: Verify Payment & Save Registration
app.post('/api/payment/verify', (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      participantDetails,
      selectedEvents,
      totalAmount
    } = req.body;

    if (!participantDetails || !selectedEvents || selectedEvents.length === 0) {
      return res.status(400).json({ error: 'Missing participant or event details' });
    }

    let isValid = false;

    // Live Razorpay HMAC verification if production keys are set
    if (razorpay_signature && razorpayKeySecret !== 'placeholder_secret') {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', razorpayKeySecret)
        .update(body.toString())
        .digest('hex');

      isValid = expectedSignature === razorpay_signature;
    } else {
      // Mock mode verification for sandbox / quick start testing
      isValid = true;
    }

    if (!isValid) {
      return res.status(400).json({ success: false, error: 'Payment signature verification failed' });
    }

    // Generate unique Registration ID: COMBLAZE-2K26-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const registrationId = `COMBLAZE-2K26-${randomSuffix}`;

    const newRecord = {
      registrationId,
      name: participantDetails.name,
      email: participantDetails.email,
      phone: participantDetails.phone,
      college: participantDetails.college,
      department: participantDetails.department,
      year: participantDetails.year,
      collegeId: participantDetails.collegeId,
      selectedEvents,
      totalAmount: totalAmount || 0,
      paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`,
      orderId: razorpay_order_id || `order_mock_${Date.now()}`,
      paymentStatus: 'SUCCESS',
      registrationDate: new Date().toISOString()
    };

    saveRegistration(newRecord);

    res.json({
      success: true,
      message: 'Registration verified and saved successfully',
      registration: newRecord
    });
  } catch (error) {
    console.error('Verify Payment Error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Endpoint: Fetch Registrations (Admin / Audit ready)
app.get('/api/registrations', (req, res) => {
  const registrations = getRegistrations();
  res.json({
    count: registrations.length,
    registrations
  });
});

app.listen(PORT, () => {
  console.log(`⚡ MAMCE COMBLAZE2K26 API Server running on port ${PORT}`);
});

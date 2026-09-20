import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure data file exists
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Trivedi Associates',
    domain: 'Trivedi Associates . Com',
    contact: '7977117256',
    email: 'trivedi.associates13@gmail.com',
    timestamp: new Date().toISOString()
  });
});

// Contact / Consultation Inquiry API
app.post('/api/contact', (req, res) => {
  try {
    const { name, phone, email, interest, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name, phone number, and email are required fields.'
      });
    }

    const newInquiry = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      interest: interest || 'General Consultation',
      message: message ? message.trim() : '',
      createdAt: new Date().toISOString()
    };

    // Read and append to file
    let existingInquiries = [];
    try {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
      existingInquiries = JSON.parse(data);
    } catch (err) {
      existingInquiries = [];
    }

    existingInquiries.push(newInquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existingInquiries, null, 2));

    console.log(`[Trivedi Associates Lead] Received consultation request from ${name} (${phone}, ${email})`);

    return res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully. Our senior relationship manager will contact you promptly.',
      inquiryId: newInquiry.id
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request.'
    });
  }
});

// Get all inquiries (Admin endpoint)
app.get('/api/inquiries', (req, res) => {
  try {
    const data = fs.readFileSync(INQUIRIES_FILE, 'utf8');
    const inquiries = JSON.parse(data);
    return res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve inquiries' });
  }
});

// Serve frontend in production if built
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Trivedi Associates API Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

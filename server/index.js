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
const PROJECTS_FILE = path.join(__dirname, 'data', 'projects.json');

// Admin Credentials
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@trivediassociates.com';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'Trivedi@2026';
const ADMIN_TOKEN = 'trivedi_secret_token_983742618';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support base64 image uploads if needed

// Ensure data files exist
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(PROJECTS_FILE)) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify([], null, 2));
}

// Helpers
const readData = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return [];
  }
};

const writeData = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Admin Auth Middleware
const requireAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({ success: false, error: 'Forbidden: Invalid admin token' });
  }
  next();
};

// ----------------- PUBLIC APIS -----------------

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

// Get Projects (Public for Website Carousel & Showcase)
app.get('/api/projects', (req, res) => {
  const projects = readData(PROJECTS_FILE);
  res.json({ success: true, count: projects.length, data: projects });
});

// Contact / Consultation Inquiry API (Public)
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
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const inquiries = readData(INQUIRIES_FILE);
    inquiries.unshift(newInquiry);
    writeData(INQUIRIES_FILE, inquiries);

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

// ----------------- ADMIN APIS -----------------

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (
    (username === ADMIN_EMAIL || username === ADMIN_USER) &&
    password === ADMIN_PASS
  ) {
    console.log(`[Admin] Successful login by ${username}`);
    return res.json({
      success: true,
      token: ADMIN_TOKEN,
      user: {
        username: ADMIN_USER,
        email: ADMIN_EMAIL,
        role: 'Super Admin'
      }
    });
  }

  return res.status(401).json({
    success: false,
    error: 'Invalid email/username or password. Please verify your admin credentials.'
  });
});

// Admin: Add New Project
app.post('/api/admin/projects', requireAdmin, (req, res) => {
  try {
    const { titleMain, titleItalic, subtitle, category, image } = req.body;

    if (!titleMain || !titleItalic || !image) {
      return res.status(400).json({
        success: false,
        error: 'Project Main Title, Italic Sub-title, and Image are required.'
      });
    }

    const newProject = {
      id: Date.now().toString(),
      titleMain: titleMain.trim(),
      titleItalic: titleItalic.trim(),
      subtitle: subtitle ? subtitle.trim() : 'Trivedi Associates Development',
      category: category || 'Residential',
      image: image.trim(),
      createdAt: new Date().toISOString()
    };

    const projects = readData(PROJECTS_FILE);
    projects.push(newProject);
    writeData(PROJECTS_FILE, projects);

    console.log(`[Admin] Added new project: ${newProject.titleMain} ${newProject.titleItalic}`);

    return res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to add project' });
  }
});

// Admin: Update Project
app.put('/api/admin/projects/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { titleMain, titleItalic, subtitle, category, image } = req.body;

    const projects = readData(PROJECTS_FILE);
    const index = projects.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    projects[index] = {
      ...projects[index],
      titleMain: titleMain !== undefined ? titleMain.trim() : projects[index].titleMain,
      titleItalic: titleItalic !== undefined ? titleItalic.trim() : projects[index].titleItalic,
      subtitle: subtitle !== undefined ? subtitle.trim() : projects[index].subtitle,
      category: category !== undefined ? category : projects[index].category,
      image: image !== undefined ? image.trim() : projects[index].image,
      updatedAt: new Date().toISOString()
    };

    writeData(PROJECTS_FILE, projects);
    return res.json({ success: true, message: 'Project updated successfully', data: projects[index] });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update project' });
  }
});

// Admin: Delete Project
app.delete('/api/admin/projects/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const projects = readData(PROJECTS_FILE);
    const filtered = projects.filter((p) => p.id !== id);

    if (filtered.length === projects.length) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    writeData(PROJECTS_FILE, filtered);
    console.log(`[Admin] Deleted project ID: ${id}`);
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete project' });
  }
});

// Admin: Get All Inquiries
app.get('/api/admin/inquiries', requireAdmin, (req, res) => {
  try {
    const inquiries = readData(INQUIRIES_FILE);
    return res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to retrieve inquiries' });
  }
});

// Admin: Delete Inquiry
app.delete('/api/admin/inquiries/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const inquiries = readData(INQUIRIES_FILE);
    const filtered = inquiries.filter((inq) => inq.id !== id);
    writeData(INQUIRIES_FILE, filtered);
    return res.json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
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
  console.log(`Admin Login: POST /api/admin/login`);
});

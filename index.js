const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (like uploaded photos)
app.use('/uploads', express.static('uploads'));

// Route to handle form submission and photo upload
app.post('/upload', upload.single('photo'), (req, res) => {
  const { name, age } = req.body;
  const photoUrl = req.file ? `https://testniyas.onrender.com/uploads/${req.file.filename}` : null;

  res.status(200).json({
    name,
    age,
    photoUrl,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

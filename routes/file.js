const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 }, // 100 MB
}).single("myfile");

// File upload route
router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    // Handle file upload errors
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    // Validate the request
    if (!req.file) {
      return res.status(422).json({ error: "File is required." });
    }

    try {
      // Save file details to the database
      const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size: req.file.size,
      });

      const response = await file.save();

      return res.json({
        file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
      });
    } catch (error) {
      return res.status(500).send({ error: "Something went wrong." });
    }
  });
});

// Email sending route
router.post('/send', async (req, res) => {
  try {
    // console.log('Request body:', req.body);

    const { uuid, emailTo, emailFrom } = req.body;

    if (!uuid || !emailTo || !emailFrom) {
      return res.status(422).json({ error: 'All fields are required.' });
    }

    const file = await File.findOne({ uuid });
    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    if (file.sender) {
      return res.status(422).json({ error: 'Email already sent.' });
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    await file.save();

    const sendMail = require('../services/emailService');
    await sendMail({
      from: emailFrom,
      to: emailTo,
      subject: 'inShare File Sharing',
      text: `${emailFrom} shared a file with you.`,
      html: require('../services/emailTemplate')({
        emailFrom,
        download: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
        size: `${Math.round(file.size / 1000)} KB`,
        expires: '24 hours',
      }),
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error in /send route:', error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


module.exports = router;

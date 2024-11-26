const express = require('express'); // Import express
const router = express.Router(); // Initialize the router
const File = require('../models/file'); // Import the File model

router.get('/:uuid', async (req, res) => {
    try {
        // Find the file in the database by its UUID
        const file = await File.findOne({ uuid: req.params.uuid });

        // If the file is not found, render the 'download' view with an error message
        if (!file) {
            return res.render('download', { error: 'Link has expired.' });
        }

        // Render the 'download' view with the file details
        return res.render('download', {
            uuid: file.uuid,
            filename: file.filename,
            fileSize: file.size,
            download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            // Example: http://localhost:3000/files/download/fsldjflkj
        });
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging
        return res.render('download', { error: 'Something went wrong.' });
    }
});

module.exports = router; // Export the router

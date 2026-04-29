const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to handle contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // In a real application, you would save this to a database 
    // or send an email. For now, we'll just log it.
    console.log('--- Pesan Baru Diterima ---');
    console.log(`Nama   : ${ name }`);
    console.log(`Email  : ${ email }`);
    console.log(`Subjek : ${ subject }`);
    console.log(`Pesan  : ${ message }`);
    console.log('---------------------------');
    
    // Send success response back to client
    res.status(200).json({ 
        success: true, 
        message: 'Pesan berhasil diterima oleh server Node.js!' 
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log('Tekan Ctrl+C untuk menghentikan server.');
});

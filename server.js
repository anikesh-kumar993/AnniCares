const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payload and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory storage (Replacing MongoDB for this example)
// This array will reset every time the Node.js server restarts
let appointments = [
    { id: 1, patientName: 'John Doe', doctor: 'Dr. Smith (Cardiology)', date: '2026-03-20', status: 'Scheduled' }
];

/**
 * API ROUTE: Create an Appointment (POST Request)
 * Connect frontend fetch API by sending a POST request to '/api/appointments'
 * with JSON body containing patientName, doctor, and date.
 */
app.post('/api/appointments', (req, res) => {
    // 1. Extract data from request body
    const { patientName, doctor, date } = req.body;
    
    // 2. Validate input
    if(!patientName || !doctor || !date) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // 3. Create new appointment object
    const newAppointment = {
        id: Date.now(), // Generate unique simple ID
        patientName,
        doctor,
        date,
        status: 'Scheduled'
    };
    
    // 4. Store in database (Array in this case)
    appointments.push(newAppointment);
    
    console.log(`[API] New Appointment Booked for: ${patientName}`);
    
    // 5. Send success response back to the client
    res.status(201).json({ 
        message: 'Appointment booked successfully!', 
        appointment: newAppointment 
    });
});

/**
 * API ROUTE: Get all Appointments (GET Request)
 * Used by the Admin page to retrieve and display appointments
 */
app.get('/api/appointments', (req, res) => {
    // Send array of appointments as a JSON response
    res.json(appointments);
});

// Start the server
app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`========================================`);
    console.log(`Try accessing:`);
    console.log(`- http://localhost:${PORT}/index.html (Booking)`);
    console.log(`- http://localhost:${PORT}/login.html (Login)`);
    console.log(`- http://localhost:${PORT}/admin.html (Dashboard)`);
});

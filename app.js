import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import authRoutes from './routes/authRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// mengatur folder statis
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

// routes route
app.get('/', (req, res) =>{
    res.send('Welcome')
});

// Routes
app.use('/', authRoutes);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/loginRegisterApp', {
    
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

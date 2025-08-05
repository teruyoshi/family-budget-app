import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Family Budget App API is running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    message: 'Hello from Family Budget API!',
    environment: process.env.NODE_ENV || 'development',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Family Budget App API`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
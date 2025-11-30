const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/calculator-hub';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Connection Error:', err));

// Calculation History Schema
const calculationSchema = new mongoose.Schema({
  calculatorType: {
    type: String,
    required: true,
    index: true
  },
  input: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  result: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  steps: [{
    description: String,
    value: String
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 2592000 // 30 days
  }
});

const Calculation = mongoose.model('Calculation', calculationSchema);

// API Routes
app.post('/api/calculate', async (req, res) => {
  try {
    const { calculatorType, input, result, steps } = req.body;
    
    const calculation = new Calculation({
      calculatorType,
      input,
      result,
      steps
    });
    
    await calculation.save();
    
    res.json({ 
      success: true, 
      calculationId: calculation._id,
      message: 'Calculation saved successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error saving calculation',
      error: error.message 
    });
  }
});

app.get('/api/history/:calculatorType', async (req, res) => {
  try {
    const { calculatorType } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const history = await Calculation.find({ calculatorType })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching history',
      error: error.message 
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


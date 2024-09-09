const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let uploadedResults = [];

// Get all results
app.get('/results', (req, res) => {
  res.json(uploadedResults);
});

// Add result
app.post('/results', (req, res) => {
  const newResult = req.body;
  uploadedResults.push(newResult);
  res.status(201).json(newResult);
});

// Update result
app.put('/results/:address', (req, res) => {
  const address = req.params.address;
  const updatedResult = req.body;
  const index = uploadedResults.findIndex(res => res.studentAddress === address);
  if (index !== -1 && uploadedResults[index].isVerified) {
    uploadedResults[index] = updatedResult;
    res.json(updatedResult);
  } else {
    res.status(400).send('Only verified results can be updated');
  }
});

// Verify result
app.post('/verify/:address', (req, res) => {
  const address = req.params.address;
  const result = uploadedResults.find(res => res.studentAddress === address);
  if (result) {
    result.isVerified = true;
    res.json(result);
  } else {
    res.status(404).send('Result not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

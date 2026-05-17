const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Self Storage Backend Running'
  });
});

app.get('/api/storage-units', (req, res) => {
  res.json([
    {
      id: 1,
      unit: 'A101',
      size: '10x10',
      status: 'Available'
    },
    {
      id: 2,
      unit: 'B201',
      size: '20x20',
      status: 'Occupied'
    }
  ]);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
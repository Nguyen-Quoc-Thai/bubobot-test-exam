const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const port = 3000;

app.get('/api/healthz', (_req, res) => {
  res.json({
    isWorking: true
  });
});

app.post('/api/send-test', (_req, res) => {
  console.log(new Date(), "/send-test")
  res.json({
    code: 'send-test',
    message: 'Working',
  });
});

app.post('/api/save', (_req, res) => {
  console.log(new Date(), "/save")
  res.json({
    code: 'save',
    message: 'Working',
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

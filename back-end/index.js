const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();

app.use(cors());
app.use(bodyParser.json())

const port = 3000;

app.get('/api/healthz', (_req, res) => {
  res.json({
    isWorking: true
  });
});

app.post('/api/send-test', async (req, res) => {
  console.log(new Date(), "/send-test")

  try {
    const { webhookURL, friendlyName, botDisplayName } = req.body;

    const resp = await axios
      .create({ timeout: 30 * 1000 })
      .post(webhookURL, {
        content: `Hello from ${friendlyName}!`,
        username: botDisplayName || 'Default Bot Display Name',
      })

    return res.json({
      code: 'send-test',
      message: 'Working',
      data: resp?.data,
    });
  } catch (error) {
    return res.json({
      code: 'send-test-failed',
      message: error,
    });
  }
});

app.post('/api/save', (_req, res) => {
  console.log(new Date(), "/save")
  return res.json({
    code: 'save',
    message: 'Working',
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

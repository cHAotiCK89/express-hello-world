const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/location', (req, res) => {
  const { latitude, longitude, accuracy, deviceInfo } = req.body;
  const { userAgent, language, platform } = deviceInfo;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const now = new Date();
  const timestamp = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

  console.log(`(${timestamp}, ${userAgent}, ${clientIp}, ${latitude.toFixed(6)}, ${longitude.toFixed(6)}, ${accuracy})`);

  res.json({ status: 'success' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

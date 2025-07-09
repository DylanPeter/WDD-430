const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const documentRoutes = require('./server/routes/documents');
const messageRoutes = require('./server/routes/messages');
const contactRoutes = require('./server/routes/contacts');

const index = require('./server/routes/app'); // ✅ only declared once

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Routes
app.use('/', index); // ✅ use once
app.use('/documents', documentRoutes);
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);

// Fallback route
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
// });

// Start server
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
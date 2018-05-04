// Import Node Modules Here:
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/dbConfig.js');
// Add Routing Servers Here:
const projectRoutes = require('./routes/projects');
const actionRoutes = require('./routes/actions');

// Add Server Here:
const server = express();

// Add Middleware Here:
server.use(express.json());
server.use(helmet());
server.use(cors());

// Add Route Handling Here:
server.get('/', (req, res) => {
  res.json({status: 'API RUNNING'});
});
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

// Add Server Listening Here:
server.listen(5000, () => console.log('n\== API Running on port 5000 ==\n'));
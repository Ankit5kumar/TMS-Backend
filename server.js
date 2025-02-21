const helmet = require('helmet');
const express = require('express');
const http = require('http');
const socket = require('./src/utils/socket');
const connectDB = require('./src/config/db');
var cors = require('cors')
require('./src/config/env'); 
connectDB();
const app = express();
const server = http.createServer(app);
const io = socket.init(server , {
   // cors: {
   cors: {
 
      origin: "https://ticket-management-frontend.netlify.app",
      methods: ["*"]
    }
});

app.use(express.json());
app.use(helmet());
app.use(cors({
   origin: "*",
   credentials: true
}))

// Register routes
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/tasks', require('./src/routes/taskRoutes'));
app.use('/api/Team', require('./src/routes/teamRoutes'));
app.get('/',(req,res)=>{
   return res.send({msg:"Welcome to TMS"})
})

io.on('connection', (socket) => {
   console.log('a user connected');
   socket.on('disconnect', () => {
      console.log('user disconnected');
   });
  
})

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { app, server, io };
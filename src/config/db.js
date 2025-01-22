const mongoose = require('mongoose');
require('./env');
// 
const connectDB = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://ak8068716:Ankit5kumar@task-managment-system.1rpkw.mongodb.net/?retryWrites=true&w=majority&appName=Task-managment-system/test",{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
           
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB connection error:", err)
        process.exit(1);
    }
}

module.exports = connectDB;
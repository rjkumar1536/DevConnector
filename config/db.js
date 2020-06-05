const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

// @objective connectDB
// @access    public
// @desc      connect to db
const connectDB = async ()=>{
    try{
        await mongoose.connect(db,{
            useUnifiedTopology : true,
            useNewUrlParser : true,
            useCreateIndex : true
        });
        console.log('mongodb connected');
    }
    catch(err){
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;
const mongoose=require('mongoose');
const colors=require('colors');
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`database connected successfully to ${mongoose.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`MongoDB error ${error}`.bgRed.white)
    }
}
module.exports=connectDB
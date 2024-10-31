const mongoose = require('mongoose');
const mongo_uri = `mongodb+srv://sha7hid:arthur540913@cluster0.ved5oat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo DB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


module.exports = connectDB;
import mongoose from 'mongoose';
import config from 'config';
const db=config.get('mongoURI');

const connectDB = async () =>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Mongodb Connected');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

export default connectDB
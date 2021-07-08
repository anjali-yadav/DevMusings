import express from 'express';
import connectDB from './config/db.js';
const app = express();

connectDB();

//Init middleware
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to node server</h1>');
})

//define the routes
import usersRoute from './routes/api/users.js'
import authRoute from './routes/api/auth.js'
import postRoute from './routes/api/posts.js'
import profileRoute from './routes/api/profile.js'

app.use('/users',usersRoute);
app.use('/auth',authRoute);
app.use('/posts',postRoute);
app.use('/profiles',profileRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server running in  mode on ${PORT}`);
})


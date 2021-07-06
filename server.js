import express from 'express';
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to node server</h1>');
})

app.listen(PORT, ()=>{
    console.log(`Server running in  mode on ${PORT}`);
})

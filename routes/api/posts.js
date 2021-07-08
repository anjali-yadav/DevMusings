import express from 'express';
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('Post route');
});

export default router;
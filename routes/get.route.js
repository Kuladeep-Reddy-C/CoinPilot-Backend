import express from 'express'

const router = express.Router();

router.get('/', async (req,res)=>{
    res.status(200).json({message:"server is runnin", success:true})
})

router.get('/print-token', async(req,res) => {
    const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract the Bearer token
  console.log('Received Token:', token);

  res.json({ message: 'Token received successfully', token });
})

export default router;
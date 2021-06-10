import {Router} from 'express';
import{ User} from '../model/user.js';
const router = Router();
import {registerValidation, loginValidation} from '../Validation/validate.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//REGISTER
router.post('/register', async(req,res)=>{
     //Validate the input details of user
    const {error} = registerValidation(req.body);
    
    if(error)  return res.status(400).json(error.details[0].message)

    
    const { name, email, password } = req.body;
   //Check if user is in database
  const emailExist = await User.findOne({email});
  if(emailExist) return res.status(400).json({msg:"email already exist!"})
  

  //Hash the password
  const salt = await bcrypt.genSalt(10);
 const hashedPassword = await bcrypt.hash(password, salt);

   //Create a new user 
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try{
      const savedUser = await user.save();
      const {id}= savedUser;
      res.json({user:id})
    } catch(err){
      res.status(400).json(err)
    }
    }
)

//LOGIN
router.post('/login', async (req,res)=>{
    
     //Validate the input details of user
  const {error} = loginValidation(req.body);  
  if(error)  return res.status(400).json(error.details[0].message)
  
     
  const { email, password } = req.body;
   //Check if email exists
  const user = await User.findOne({email});
  if(!user)  return res.status(400).json({msg:"email provided is wrong!"});
  
  //check if password is correct
  const validPassword = await bcrypt.compare( password, user.password);
  if(!validPassword)  return res.status(400).json({msg:"incorrect password!"})
  

  

// Create and assign a token
const token = jwt.sign({id:user.id}, process.env.SECRET_KEY);
res.header('auth-token', token).json(token)
 
})

export default router;
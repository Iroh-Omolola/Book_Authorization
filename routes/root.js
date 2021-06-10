import {Router} from 'express';
const router = Router();
import verify from '../routes/verifyToken.js';
import {createBooks, findBooks, updateBooks, deleteBooks} from '../queries/bookRoute.js';

router.get('/', verify, (req, res) => {
    res.json({
      status: 'success',
      message: 'hello world',
    });
  });
// add a new student to database



  
//   //create
  router.post('/books',verify, createBooks);
  
  //read
 router.get('/books', verify, findBooks);
  
  //update
  router.patch('/books/:id', verify, updateBooks);
  //delete
  router.delete('/books/:id', verify, deleteBooks);

  export default router;
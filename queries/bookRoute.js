
import {Book} from '../model/bookSchema.js';


// add a new book to database
export const createBooks = async(req,res,next)=>{
   try{
    Book.create(req.body).then(function(book){
        res.send(book);
    }).catch(next);
   }catch(err){
       console.error(err)
   }
};
// get a list of book from the database
export const findBooks = async(req,res,next)=>{
   try{
    await Book.find({}).then(function(book){
        res.send(book);
    }).catch(next);
   }catch(err){
    console.error(err)
}
};


// update a book in the database
export const updateBooks = async(req,res,next)=>{
    try{
        await Book.findOneAndUpdate({_id: req.params.id},req.body).then(function(book){
            Book.findOne({_id: req.params.id}).then(function(book){
                res.send(book);
            });
        });
    }catch(err){
        console.error(err)
    }
};

// delete a book in the database
export const deleteBooks = async(req,res,next)=>{
   try{
    await Book.findOneAndDelete({_id: req.params.id}).then(function(book){
        res.send(book);
    });
   }catch(err){
    console.error(err)
   }
};

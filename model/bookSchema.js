import pkg from 'mongoose';
import validator from 'validator';

const { Schema, model } = pkg;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    author:{
        type: String,
        required: true,
        min: 7,
        max: 255
        
    },
    ISBN: {
        type: String,
        required: true,
        min: 6,
        max: 255
    } 
},
{ timestamps: true }
);

export const Book = model('Book-Details', bookSchema);
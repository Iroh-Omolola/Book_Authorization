import pkg from 'mongoose';
import validator from 'validator';

const { Schema, model } = pkg;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 7,
        max: 255,
        validate:{
            validator: validator.isEmail,
            message:`This is not a valid email`,
            isAsync: false
        }
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    } 
},
{ timestamps: true }
);

export const User = model('user', userSchema);
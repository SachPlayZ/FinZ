import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

const TransactionSchema = new mongoose.Schema({
    user: String,
    amount: Number,
    category: String,
    mode: {
        type: String,
        enum: ['cash', 'bank'],
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    description: String,
    date: 
    {
        type: Date,
        default: Date.now
    },
    tags: [String],
});

const TransferSchema = new mongoose.Schema({
    user: String,
    from: {
        type: String,
        required: true,
        enum: ['cash', 'bank']
    },
    to: {
        type: String,
        required: true,
        enum: ['cash', 'bank']
    },
    amount: Number,
    date: 
    {
        type: Date,
        default: Date.now
    },
    description: String,
    tags: [String],
});



export { 
    UserSchema, 
    TransactionSchema, 
    TransferSchema 
};
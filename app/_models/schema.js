import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

const TransactionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
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
        default: Date.now,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
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
    amount: {
        type: Number,
        required: true
    },
    date: 
    {
        type: Date,
        default: Date.now,
        required: true
    },
    description: String,
    tags: {
        type: [String],
        default: []
    },
});

const BudgetSchema = new mongoose.Schema({
    user: String,
    category: String,
    amount: Number,
    startDate: Date,
    endDate: Date,
});

const CustomTagSchema = new mongoose.Schema({
    user: String,
    tag: String,
});

const CategorySchema = new mongoose.Schema({
    user: String,
    category: String,
});

const ParentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    childId: String
});

const AdoptSchema = new mongoose.Schema({
    parentId: String,
    childId: String,
    resolved: {
        type: Boolean,
        default: false
    }
});

const CashBalanceSchema = new mongoose.Schema({
    user: String,
    balance: Number
});

const BankBalanceSchema = new mongoose.Schema({
    user: String,
    balance: Number
});


export { 
    UserSchema, 
    TransactionSchema, 
    TransferSchema,
    BudgetSchema,
    CustomTagSchema,
    CategorySchema,
    ParentSchema,
    AdoptSchema,
    CashBalanceSchema,
    BankBalanceSchema
};
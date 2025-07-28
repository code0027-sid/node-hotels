const mongoose= require( 'mongoose');

const  adminSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true,

    },
    age:{
            type: Number,
            required:true,
            min: 18, 
            max: 100,
    },

    profession:{
        type:String,
        enum :['chief','waiter','manager'],
        required:true,
    }
    ,
    email:{
        type:String,
       
    },
    mobile: {
        type:Number ,
        required:true,
        match: [/^[6-9]\d{9}$/, 'Invalid Indian mobile number'],
    },
    address:{
            type :String,
            required:true,
    },
    salary :{
        type : Number ,
        required:true,
        min: 0,
    },
    userName:{
        type : String,
        required:true,
        unique: true,
        trim:true,
    },
    password:{
        type :String,
        required:true,
        
    }

})

module.exports = mongoose.model('Admin', adminSchema);

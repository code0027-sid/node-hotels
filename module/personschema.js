const mongoose= require( 'mongoose');
const bcrypt = require('bcrypt');
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
adminSchema.pre('save',async function (next)
{
    const person=this;
        if(!person.isModified('password'))
        return next();
    try {
        const salt = await bcrypt.genSalt(12);
        //
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password=hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }

    personschema.methods.comparePassword = async function (candidatePassword) {
        try{const isMAtch = await bcrypt.compare(candidatePassword,this.password);
            return isMAtch;
        } catch(errer)
        {
            throw errer;
        }
    }
})
module.exports = mongoose.model('Admin', adminSchema);

const mongoose=require('mongoose')

const UserSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
       // required:'Password is required',
    }
})
const UserModel=mongoose.model('User',UserSchema);
module.exports=UserModel;
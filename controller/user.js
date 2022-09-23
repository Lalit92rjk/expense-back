const User  =  require('../models/users');

function isstringinvalid(string){
    if(string == undefined || string.length===0){
        return true
    }else{
        return false
    }
}

const signup  =  async (req, res)=>{
    try{
        const { name, email, password } = req.body;
        console.log('email',email)
        if(isstringinvalid(name)|| isstringinvalid(email|| isstringinvalid(password))){
            return res.status(400).json({err:"bad parameters something went wrong"})
        }
        await User.create({name,email,password})
        res.status(201).json({message:'successfully created new user'})
        
    }catch(err){
        res.status(500).json(err);
    }
    
}


const login = (req,res)=>{
    const {email,password} =  req.body
    if(isstringinvalid(email)|| isstringinvalid(password)){
        return res.status(400).json({message:"emailid or password is missing",success:false})
    }
    console.log(password);
    User.findAll({where:{email}}).then(user=>{
        if(user.length>0){
            if(user[0].password===password){
                res.status(200).json({success:true,message:"user logged in successfully"})
            }else{
                return res.status(400).json(({success:false,message:"password is incorrect"}))
            }
        }else{
            return res.status(404).json({success:false,message:"user doesn't exist"})
        }
    }).catch(err=>{
        res.status(500).json({message:err,success:false})
    })
}


module.exports = {
        signup,
        login
    
    }
    
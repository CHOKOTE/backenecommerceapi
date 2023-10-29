
const isAuth = (req,res,next)=>{
     try{
      
        

       if(!req.headers.authorization || 
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1])
        {
            res.status(400).send({message:'please send corrrect token'})
        }
       next();
     }catch(err){
        console.log(err.message)
     }
}

export default isAuth


import emailForgetPassword from "../helpers/emailForgetPassword.js";
import emailRegister from "../helpers/emailRegister.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";
import PhysioModel from "../models/PhysioModel.js";

const register = async (req,res) => {
    const{name, email,password} = req.body;
    //Prevent duplicate users
    const existsUser = await PhysioModel.findOne({email});
    if(existsUser){
        const error = new Error('Usuario ya Registrado');
        return res.status(400).json({msg: error.message});
    }
    // Register new Physio
    try {
        const physio = new PhysioModel(req.body);
        const physioSaved = await physio.save(); 
          
    
        emailRegister({
            name,
            email,
            token: physioSaved.token
        });

        res.json(physioSaved);
    } catch (error) {
        console.log(error);
    }
};
//Profile
const profile = (req,res) => {
    const {physio} = req
    res.json( physio)
};

//Confirm Token
const confirm = async (req,res) => {
    const {token} = req.params;
    const userConfirm = await PhysioModel.findOne({token});

    if(!userConfirm){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }
    try {
        userConfirm.token = null;
        userConfirm.confirm =true;
        await userConfirm.save();
        res.json({msg:"Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error);
    }   
};

//Authenticate User
const auth = async (req,res) => {
    const {email,password} = req.body;
    //Check user exists
    const user = await PhysioModel.findOne({email});
    if(!user){
        const error = new Error('Usuario NO Existe ');
        return res.status(404).json({msg: error.message});
    }
    
    //Check if user is confirm 
    if(!user.confirm){
        const error = new Error('Usuario NO Confirmado ');
        return res.status(403).json({msg: error.message});
    }

    //Check Password
    if(await user.checkPassword(password)){
        //JSON Web Token
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user.id)
        }); 
    }else{
        const error = new Error('Password Incorrecto ');
        return res.status(403).json({msg: error.message});
    }
};

//Forget Password
const forgetPassword = async (req,res) => {
    const {email} = req.body;
    const existsPhysio = await PhysioModel.findOne({email});
    if(!existsPhysio){
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg:error.message})
    }

    try {
        existsPhysio.token = generateId();
        await existsPhysio.save();
        //Send email 
        emailForgetPassword({
            email,
            name: existsPhysio.name,
            token: existsPhysio.token
        });
        res.json({msg: 'Email enviado con las intrucciones'})
    } catch (error) {
        console.log(error);
    }
}
//Check Token
const checkToken = async (req,res) => {
    const {token} = req.params;
    const tokenValid = await PhysioModel.findOne({token});
    if(tokenValid){
        //Token Valid
        res.json({msg: 'Token Válido'})
    }else{
        const error = new Error('Token no Válido');
        return res.status(400).json({msg: error.message})

    }

}
//New Password
const newPassword = async (req,res) => {
    const {token} = req.params;
    const {password} = req.body;
    const physio = await PhysioModel.findOne({token});
    if(!physio){
        const error = new Error('Error en nuevo password');
        return res.status(400).json({msg: error.message});
    }
    try {
        physio.token = null;
        physio.password = password;
        await physio.save();
        res.json({msg:'Password modificado correctamente'});
    } catch (error) {
        console.log(error);
    }
};

//Update Profile
const updateProfile  = async (req,res) => {
    const physio = await PhysioModel.findById(req.params.id)
    if(!physio){
        const error = new Error('Error desde updateProfile')
        return res.status(404).json({msg: error.message})
    }

    const {email} = req.body
    if(physio.email !== req.body.email){
        const existEmail = await PhysioModel.findOne({email})
        if(existEmail){
            const error = new Error('Email no disponible')
        return res.status(404).json({msg: error.message})
        }
    }

    try {
        physio.name = req.body.name ;
        physio.mobile = req.body.mobile ;
        physio.web = req.body.web ;
        physio.email = req.body.email ;

        const physioUpdate = await physio.save();
        res.json(physioUpdate);
        
    } catch (error) {
        console.log(error)
    }
};

const updatePassword = async (req,res) => {
  
    //Read data
    const {id} =req.physio
    const {password_actual, password_new}  = req.body
    
    //Check physio exists
    const physio = await PhysioModel.findById(id)
    if(!physio){
        const error = new Error('Error desde updatePasword')
        return res.status(404).json({msg: error.message})
    }
    //Check password
    if(await physio.checkPassword(password_actual)){
        //Save new password
        physio.password = password_new;
        await physio.save()
        res.json({msg: 'Password Actualizado' })
    }else{
        const error = new Error('Password No Válido')
        return res.status(404).json({msg: error.message})
    }
}

export {
    register,
    profile,
    confirm,
    auth,
    forgetPassword,
    checkToken, 
    newPassword,
    updateProfile,
    updatePassword
}
import Client from "../models/ClientModel.js";



const addClient = async (req,res) => {  
    const client = new Client(req.body);
   client.physio = req.physio._id
   
    try {
        console.log(`Desde Controllers${client}`);
       const clientSaved = await client.save() ;
       res.json(clientSaved);
    } catch (error) {
        console.log(error);
    }
};

const getClient = async (req,res) => {
    const clients = await Client.find().where('physio').equals(req.physio);
    res.json(clients);
};

const getClientOne = async (req,res) => {
    const {id} = req.params
    const client = await Client.findById(id);
    if(!client){
        res.status(404).json({msg: 'Cliente no encontrado de getClientOne'})
    }

    if(client.physio._id.toString() !== req.physio._id.toString()){
       return res.json({msg:'Acción no válida desde getClientOne'});  
    }
    
    res.json(client);
    
};

const updateClientOne = async (req,res) => {
    const {id} = req.params
    const client = await Client.findById(id);
    if(!client){
        res.status(404).json({msg: 'Cliente no encontrado desde updateClientOne'})
    }
    console.log(client.physio._id);
    console.log(req.physio._id);
    if(client.physio._id.toString() !== req.physio._id.toString()){
       return res.json({msg:'Acción no válida desde updateClientOne'});  
    }
        //Update Client

        client.name = req.body.name || client.name;
        client.surname = req.body.surname || client.surname;
        client.email = req.body.email || client.email;
        client.date = req.body.date || client.date;
        
        try {
            const clientUpdate = await client.save();
            res.json(clientUpdate);
        } catch (error) {
            console.log(error);
        }
};

const deleteClientOne = async (req,res) => {
    const {id} = req.params
    const client = await Client.findById(id);
    if(!client){
        res.status(404).json({msg: 'Cliente no encontrado desde deleteClientOne'})
    }
    console.log(client.physio._id);
    console.log(req.physio._id);
    if(client.physio._id.toString() !== req.physio._id.toString()){
       return res.json({msg:'Acción no válida desde deleteClientOne'});  
    }
    try {
        await client.deleteOne();
        res.json({msg: 'Cliente Eliminado'})
    } catch (error) {
        console.log(error);
    }
};

export {
    addClient,
    getClient,
    getClientOne,
    updateClientOne,
    deleteClientOne
}
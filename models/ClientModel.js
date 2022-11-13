import mongoose from "mongoose";

const clientsSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    physio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhysioModel',
    }, 
},{
    timestamps:true,
});

const Client = mongoose.model('Client', clientsSchema);

export default Client;


import express from "express";
import conectDB from "./config/db.js";
import dotenv from "dotenv";
import physioRoutes from "./routes/physioRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

dotenv.config();

conectDB();

const domain = [process.env.FRONTEND_URL ]
const corsOptions = {
    origin: function(origin, callback){
        if(domain.indexOf(origin) !== -1){
            //Origin request is enable
            callback(null, true)
        }else{
            callback(new Error('No permito por CORS 127.0.0.1'))

        }
    }
}
app.use(cors(corsOptions));

app.use("/api/physios", physioRoutes);
app.use("/api/clients", clientRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`);
});
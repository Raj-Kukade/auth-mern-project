import express from 'express' 
import 'dotenv/config'
import cors from 'cors'


import AuthRouter from './routes/AuthRouter.js'
import ProductRouter from './routes/Productrouter.js'


import {connectDB} from './models/db.js'
const PORT = process.env.PORT;


const app = express();
app.use(express.json());
app.use(cors());


app.use("/auth",AuthRouter);

app.use("/products",ProductRouter);                             


app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    connectDB();
});


const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const multer = require("multer")
const path = require("path")
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    new Promise((resolve, reject)=>{
    console.log("MongoDB connected")
}));


const corsOptions ={
    origin:'https://mjsocial.netlify.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://mjsocial.netlify.app/",
      "http://localhost:3000"
    );
    next();
});

app.use("/images",express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images");
    },
    filename:(req, file, cb)=> {
        cb(null, req.body.name);
    }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req,res)=> {
    try{
        return res.status(200).json("File uploaded successfully.")
    }catch(err){
        console.log(err)
    }
})

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

const port =  8800;

app.listen(port, ()=> {
    console.log("Backend server is running!")
})
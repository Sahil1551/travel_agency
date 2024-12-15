const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const app = express();
const port = process.env.PORT || 5000;

const dotenv=require('dotenv')
dotenv.config();
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  useTempFiles: true
}));
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//MongodbConnection
mongoose.connect('mongodb+srv://sahilchhabra1551:v83T6YtW11Eg2oGo@cluster0.ga9vhez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

//api Endpoint
app.use('/admin',require('./Routes/admin'))  
app.use('/api',require('./Routes/packages'))
app.use('/api',require('./Routes/booking'))
app.use('/api',require('./Routes/upload'))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });  
import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import pkg from "pg";


dotenv.config();


const app = express();
const port = process.env.PORT || 5000;
const {Client } = pkg ;

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: 'Restaurant ',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function connectDB() {
  try {
    await db.connect();
    console.log("Connected to Database!");
  } catch (error) {
    console.error("Error connecting to Database", error);
  }
}
connectDB();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(express.json());

app.get("/" , (req , res)=>{
    res.send('<h1> Welcome to the Restauarnt Backend ');
});

app.post('/restaurant/menu' , async (req, res)=>{
   try {
    console.log("Request recvied ! ");
    const menu = [];
    const response = await db.query("SELECT * FROM menu");
    console.log("VLAUES RECIVED : ");
     console.log(response.rows); 
     for(const row of response.rows){
      menu.push(row);
     }  
     console.log("VLAUES ASSIGNED  : ");
     console.log(menu);
     res.json(menu);
  } catch (error) {
    console.error('Database error  :', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
});


app.post('/restaurant/table' , async (req , res)=>{
try {
  const table = [];
  const response = await db.query("SELECT * FROM tabless ");
  for( const row of response.rows){
    table.push(row) ;
  }
  res.json(table);

  console.log(table);
} catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch menu' });
}
});
app.post('/booking', async (req, res) => {
  const bookingData = req.body; 
  
  
  console.log('Received Booking Data:', bookingData);
  
  // You can then access the specific arrays/fields:
  const selectedTables = bookingData.selected_tables;
  const userName = bookingData.user_name;
  
  console.log('Selected Table IDs:', selectedTables);
  
   try {
    
    for(const tablesid of selectedTables){
      await db.query("UPDATE tabless SET isbook = $1 WHERE table_id = $2" , [true , tablesid]);
      
    }
    
    res.status(200).json({ message: "Booking received successfully." });
    
   } catch (error) {
      res.status(400).json({ message: "some issue in booking " });
   }
  
});

app.post('/admin' , async (req , res)=>{
const table_id = req.body.table_id;
console.log(table_id);

try {
  await db.query("UPDATE tabless SET isbook = $1 WHERE table_id = $2 " , [false , table_id]);
  res.status(200).json({ message: " successfull." });
} catch (error) {
  console.error("the error " , error);
  res.status(400).json({ message: "some issue backned " });
}

});

app.listen(port , ()=>{
    console.log("Resatuarant server started running at Port : 5000");
});
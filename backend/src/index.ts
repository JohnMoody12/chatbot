import app from "./app.js";
import { connectToDatabase } from "./db/connect.js";

//connections and listeners
const PORT = process.env.PORT || 5000;

connectToDatabase()
.then(()=>{
  app.listen(PORT,()=>console.log('Listening on port ' + PORT));
})
.catch((err=>console.log(err)));


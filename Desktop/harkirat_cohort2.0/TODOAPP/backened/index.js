//write basic express blueprint code,
//with express.json() middleware

const  express =require("express");
const app = express();

app.use(express.json());

//body {
  title:string;
//   description:string;  that is two thing that user send for todo so we have to validate it is user input is correct or not so we use zod 

// }



app.post("todo/", function(res,req){

})

app.get("/todos", function(res,req){

})

app.put("/completed", function(res,req){

})
const express= require("express")
const app= express()
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    port:3308,
    user: "root",
    password: "",
    database: "todo"
    
});
/*connection.connect(function(err) {
  
  if (err) {
 console.log('error: ' + err.message);
  }
})*/
  
app.get('/',(req,res)=>{
 res.send("welcome to mysql")
})

app.post('/LoginHandle',(req,res)=>{
console.log(req.body.userEmail)


  
    connection.query("select * from user where email=? and password=? ",[req.body.userEmail,req.body.userPassword],(err,result)=>{
      if (err) {
         console.log('error: ' + err.message);
      }
     // else{
       // console.log(result[0].name)
       if (result.length>0){
        res.send({statuscode:200,message:"successful"})

       }
       else{
       res.send({statuscode:304,message:"unsuccessful"})

       }
       
      //}
    })
  

})

app.post('/AddTodo',(req,res)=>{
  console.log(req.body.userEmail)
  
  
  var datetime = new Date();

      connection.query("insert into todolist(title,description,useremail,createdtime) values(?,?,?,?)",[req.body.title,req.body.description,req.body.userEmail,datetime],(err,result)=>{
        if (err) {
           console.error('error: ' + err.message);
         res.send({statuscode:304,message:"unsuccessful"})

        }
        else{
         // console.log(result[0].name)
         
         res.send({statuscode:200,message:"successful"})
  
        }
      })
    
  
  })


app.post('/RegisterHandle',(req,res)=>{
  console.log(req.body.userEmail)
  
  
    
      connection.query("insert into user(name,email,password) values(?,?,?)",[req.body.userName,req.body.userEmail,req.body.userPassword],(err,result)=>{
        if (err) {
           console.error('error: ' + err.message);
         res.send({statuscode:304,message:"unsuccessful"})

        }
        else{
         // console.log(result[0].name)
         
         res.send({statuscode:200,message:"successful"})
  
        }
      })
    
  
  })

app.post('/GetTodoList',(req,res)=>{

  connection.query("select * from todolist where useremail =? ",[req.body.userEmail],(err,result)=>{
    if (err) {
       console.log('error: ' + err.message);
    }
   // else{
     // console.log(result[0].name)
     if (result.length>=0){
      res.send({statuscode:200,message:"successful",todolist:result})

     }
     else{
     res.send({statuscode:304,message:"unsuccessful"})

     }
     
    //}
  })
})

app.post('/DeleteTodo',(req,res)=>{


  connection.query("delete from todolist where useremail=? &&title=?",[req.body.userEmail,req.body.title],(err,result)=>{
    if (err) {
       console.log('error: ' + err.message);
    }
   // else{
     // console.log(result[0].name)
      res.send({statuscode:200,message:"successful"})

     

  })


  
})
app.post('/UpdateTodo',(req,res)=>{
  connection.query("update todolist set title=?,description=? where useremail=?&&id=?",[req.body.title,req.body.description,req.body.userEmail,req.body.id],(err,result)=>{
    if (err) {
       console.log('error: ' + err.message);
    }
   // else{
     // console.log(result[0].name)
      res.send({statuscode:200,message:"successful"})

     

  })

})







app.listen(5000,()=>(console.log("server started")))
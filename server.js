const express = require('express')
const server = express()

//config o servidor mostrar arquivos estáticos

server.use(express.static("public"));

//Habilitar body do form
server.use(express.urlencoded({extended:true}))

//config conexao DB
const Pool =require('pg').Pool
const db = new Pool({
    user:'postgres',
    password:'123456',
    host:'localhost',
    port: 5432,
    database:'doe'
})


//Configurando template engine
//O nunjucks vai usar o express
const nunjucks = require('nunjucks')
nunjucks.configure("./",{
    express: server,
    noCache: true
})


//List de doadores :array



server.get("/",(req,res)=>{
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro de banco de dados")
   
        const donors = result.rows
        return res.render("index.html", { donors})
    })
})


server.post("/",(req,res)=>{
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || blood == "" || email== ""){
        return res.send("todos os Campos são obrigatorios")
    }



    //coloca valores no DB
    
    const query ='INSERT INTO donors ("name","email","blood") VALUES($1,$2,$3)'
    
    const values =[name,email,blood]

     db.query(query,values, function(err){
        //fluxo de erro 
        if(err) returnres.send("erro no banco de dados")

        //fluxo ideal 
        return res.redirect("/")

     })


})



server.listen(3000, ()=>{
    console.log("iniciei o servidor")
})
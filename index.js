// import dataservice file from service folder

const dataservice = require('./service/dataservice')

// import jsonwebtoken

const jwt = require('jsonwebtoken')

// import express
const express = require('express')
const { json } = require('express')

// create app
const app = express()

// to convert json datas
app.use(express.json())


// middleware for varify the token

const jwtmiddleware = (req,res,next)=>{
    console.log("router specific middleware........");
    try{
        const token = req.headers['access-token']
        const data = jwt.verify(token,"secretkey123")
        console.log(data);
        next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"please login"
        })
    }

}



// request 

// register

app.post('/register',(req,res)=>{
    
    const result = dataservice.register(req.body.acno, req.body.username, req.body.psw)

    res.status(result.statusCode).json(result)
})


// login

app.post('/login',(req,res)=>{
    
    const result = dataservice.login(req.body.acno, req.body.psw)

    res.status(result.statusCode).json(result)
})

// deposit

app.post('/deposit',jwtmiddleware,(req,res)=>{
    
    const result = dataservice.deposit(req.body.acno, req.body.psw, req.body.amount)

    res.status(result.statusCode).json(result)
})

// withdraw

app.post('/withdraw',jwtmiddleware,(req,res)=>{
    
    const result = dataservice.withdraw(req.body.acno, req.body.psw, req.body.amount)

    res.status(result.statusCode).json(result)
})

// transaction history

app.post('/transaction',jwtmiddleware,(req,res)=>{
    
    const result = dataservice.getTransaction(req.body.acno)

    res.status(result.statusCode).json(result)
})

// delete


// // GET

// app.get('/',(req,res)=>{
//     res.send('GET METHOD CHECKING......................')
// })

// // POST

// app.post('/',(req,res)=>{
//     res.send('POST METHOD CHECKING......................')
// })


// // PUT

// app.put('/',(req,res)=>{
//     res.send('PUT METHOD CHECKING......................')
// })


// // PATCH

// app.patch('/',(req,res)=>{
//     res.send('PATCH METHOD CHECKING......................')
// })


// // DELETE

// app.delete('/',(req,res)=>{
//     res.send('DELETE METHOD CHECKING......................')
// })





// set port
app.listen(3000,()=>{
    console.log('server started at port number 3000');
})
// import jsonwebtoken
const jwt = require('jsonwebtoken')

  userDetails = {
    1000:{acno:1000,username:'anu',password:123,balance:0,transaction:[]},
    1001:{acno:1001,username:'amal',password:123,balance:0,transaction:[]},
    1002:{acno:1002,username:'arun',password:123,balance:0,transaction:[]},
    1003:{acno:1003,username:'megha',password:123,balance:0,transaction:[]},
    1004:{acno:1004,username:'anoop',password:123,balance:0,transaction:[]}
  }

// register

register=(acno,username,psw)=>{

    if (acno in userDetails) {
      return {
        statusCode:401,
        status:false,
        message:"user already exist"
      }
    } else {
      userDetails[acno]={acno,username,password:psw,balance:0,transaction:[]}
      console.log(userDetails);
      return {
        statusCode:200,
        status:true,
        message:"Registration Success"
      }
    }
  }

  // login

  login=(acno,psw)=>{


    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        const token = jwt.sign({currentAcno:acno},'secretkey123')
        return {
          statusCode:200,
          status:true,
          message:"Login Success",
          token
        }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:"Inccorrect Password"
        }
      }
    } else {
      return {
        statusCode:401,
        status:false,
        message:"Inccorect account number"
      }
    }
    
  }

  // deposit

  deposit=(acno,password,amount)=>{

    var amnt = parseInt(amount)

    if (acno in userDetails) {

      if (password==userDetails[acno]['password']) {
        userDetails[acno]['balance'] += amnt
        userDetails[acno]['transaction'].push({type:'CREDIT',amount:amnt})

        return {
          statusCode:200,
          status:true,
          message:userDetails[acno]['balance']
        }
      } else {
        return {
          statusCode:401,
          status:false,
          message:"Inccorrect Password"
        }
      }
      
    } else {
      return {
        statusCode:401,
        status:false,
        message:"Inccorect account number"
      }
    }
  }

  // withdraw

  withdraw=(acno,password,amount)=>{

    var amnt = parseInt(amount)

    if (acno in userDetails) {

      if (password==userDetails[acno]['password']) {
          if (userDetails[acno]['balance'] >= amnt) {
            userDetails[acno]['balance'] -= amnt
            userDetails[acno]['transaction'].push({type:'DEBIT',amount:amnt})

            return {
              statusCode:200,
              status:true,
              message:userDetails[acno]['balance']
            }
          } else {
            return {
              statusCode:401,
              status:false,
              message:"Inssuficient Balance"
            }
            
          }
      } else {
        return {
          statusCode:401,
          status:false,
          message:"Inccorrect Password"
        }
      }
      
    } else {
      return {
        statusCode:401,
        status:false,
        message:"Inccorect account number"
      }
    }
  }

  // transaction

  getTransaction=(acno)=>{
    if(acno in userDetails){
    return {
      statusCode:200,
      status:true,
      message:userDetails[acno]['transaction']
    }
   } 
   else{
    return {
      statusCode:401,
      status:false,
      message:"Inccorect account number"
    }
   }
  }

module.exports = {
    register,login,deposit,withdraw,getTransaction
}
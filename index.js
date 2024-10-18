const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

function calcartTotal(newItemPrice, cartTotal){

  return newItemPrice + cartTotal

}

function discount(isMember,cartTotal){
  let finalPrice

  if(isMember){
        finalPrice = cartTotal - ((10/100)*cartTotal)
        return finalPrice
  }else{
    finalPrice=cartTotal
    return finalPrice
  }


}

function tax (cartTotal){
    let finalPrice
    finalPrice=cartTotal*0.05
    return finalPrice

}

app.get('/cart-total',(req,res)=>{
  console.log(req.query); 
let newItemPrice = parseFloat(req.query.newItemPrice)
let cartTotal = parseFloat(req.query.cartTotal)

res.send(calcartTotal(newItemPrice,cartTotal).toString())
})

app.get('/membership-discount',(req,res)=>{
let isMember = req.query.isMember==='true'
let cartTotal = parseFloat(req.query.cartTotal)
res.send(discount(isMember,cartTotal).toString())
})

app.get('/calculate-tax',(req,res)=>{
let cartTotal=parseFloat(req.query.cartTotal)
res.send(tax(cartTotal).toString())
})


function calShipping(shippingMethod,distance){

  let totalDays

  if(shippingMethod==='express'){
      totalDays=distance/100
      return totalDays

  }else{
    totalDays=distance/50
    return totalDays

  }


}

app.get('/estimate-delivery',(req,res)=>{
let shippingMethod=req.query.shippingMethod
let distance = parseFloat(req.query.distance)
res.send(calShipping(shippingMethod,distance).toString())
})

function cost(weight,distance){
  return weight*distance*0.1
}



app.get('/shipping-cost', (req,res)=>{
  let weight=parseFloat(req.query.weight)
  let distance = parseFloat(req.query.distance)
  res.send(cost(weight,distance).toString())

})

function points(purchaseAmount){
  return purchaseAmount*2
}

app.get('/loyalty-points',(req,res)=>{
    let purchaseAmount=parseFloat(req.query.purchaseAmount)
    res.send(points(purchaseAmount).toString())

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

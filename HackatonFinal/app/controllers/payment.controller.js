const db = require("../models");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const request = require("request")
const Culqi = require("culqi-node")
const config = require("../config/auth.config");
const dotenv = require("dotenv");
const culqi = new Culqi({
    privateKey: process.env.privateKey,
    pciCompliant: true,
    publicKey: process.env.publicKey,
});
const User = db.user;
const Role = db.role;
const Product = db.product
const Payment = db.payment

exports.createToken = async (req, res) => {
    let body = req.body 
    let finalprice = 0;

    for (let i = 0; i < body.products.length; i++) {
        finalprice += body.products[i].price;
        console.log(finalprice)
        
    }

        const token = await culqi.tokens.createToken({
            card_number: body.cardNum,
            cvv: body.cvv,
            expiration_month: body.expirationM,
            expiration_year: body.expirationY,
            email: body.email,
        })
            console.log(token)
            console.log("Processing...")
            setTimeout(() => {
                //try {

                    const payment = new Payment({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: token.email,
                        currency: body.currency,
                        price: finalprice,
                        dateProcessed: new Date(),
                        bought: body.products
                    });
                    payment.save((err) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }}
                    )

                    console.log("Operacion completa!")
                    res.send(payment)

                    /* const charge = culqi.charges.createCharge({
                        amount: finalprice * 100,
                        currency_code: 'PEN',
                        email: token.email,
                        installments: product.installments,
                        description: product.description,
                        source_id: token.id,
            
                    }).then(respuesta => {
                        console.log(respuesta);
                        res.send({res:"recibido", respuesta});
                    }) */
                //} catch (err) {
                    //console.log(err)
                //};
              }, "2000");
            
        
    
};
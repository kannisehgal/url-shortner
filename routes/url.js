const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Url =require("../models/Url")

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/',( req, res) => {
    res.render('home', {msg : ''})
})

router.get('/:url',( req, res) => {
    const currentUrl = req.params.url;
    // res.json({currentUrl})

    if(currentUrl == 'home'){
        res.render('home', {msg : ''})
    } else {
        Url
            .find()
            .sort({date : -1})
            .then((urls) => {
                // res.json({url})
                for(let i=0; i<urls.length; i++){
                    if(urls[i].url == currentUrl){
                        res.status(307).redirect(urls[i].address)
                    }
                }

                res.render('home', {msg : 'website is not registered with it'})
                
            })
    }
})

router.post('/add', urlencodedParser, (req, res) => {

    const address = req.body.address;
    const url = req.body.url
    
    // res.json({address, url})

    const newUrl = new Url({
        url : url,
        address : address
    })

    newUrl 
        .save()
        .then(() => res.render('home', {msg : 'Added'}))
        .catch((err) => res.render('home', {msg : 'Not Added'}))
})

module.exports = router;






const express = require('express')
const router = express.Router()
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const User = mongoose.model('users')

router.get('/profile',(req,res) => {
    var usuariologado = new User(req.user)
    res.render("logged/profile",usuariologado)   
})

router.post('/profile',(req,res) => {
    var usuariologado = new User(req.user)
    var a = {
        palavra: req.body.palavra,
        idioma: req.body.idioma,
        palavraTraduzida: req.body.palavraTraduzida,
        idiomaTraducao: req.body.idiomaTraducao
    }
    usuariologado.cards.push(a)
    usuariologado.save()
    res.redirect('back')
})


module.exports = router
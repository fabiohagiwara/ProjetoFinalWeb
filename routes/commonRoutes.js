const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users')
const bcrypt = require("bcryptjs")
const passport = require('passport')

router.get('/',(req,res) => {
    res.render('principal/home')
})

router.get('/login',(req,res) => {
    res.render("principal/login")
})

router.post('/login',(req,res,next) => {
    passport.authenticate("local", {
        successRedirect: "u/profile",
        failureRedirect: "/login",
    })(req,res,next)
})

router.get('/signup',(req,res) => {
    res.render("principal/signup")
})

router.post('/signup',(req,res) => {
    var erros = []
    if(req.body.signupPassword != req.body.signupPassword2)
        erros.push({texto: 'Senhas incompatíveis!'})

    if(erros.length>0)
        res.render("principal/signup",{erros: erros})
    else
    {
        User.findOne({email: req.body.signupEmail}).then((user) => {
            if(user){
                req.flash("error_msg","Esse email ja esta cadastrado!")
                res.redirect("/signup")
            }
            else{
                  const newUser = new User({
                    nome: req.body.signupUsername,
                    senha:req.body.signupPassword,
                    email: req.body.signupEmail,
                })
                bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(newUser.senha,salt,(erro,hash) => {
                        if(erro){
                            req.flash("error_msg","Houve um erro no cadastro do usuário")
                        }
                        newUser.senha = hash
                        newUser.save().then(() => {
                            req.flash("sucess_msg","Usuario cadastrado com sucesso")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error_msg","Erro ao cadastrar usuário")
                            res.redirect("/signup")
                        })
                    })
                })
            }
        }).catch((err)=>{
            res.flash("error_msg","Houve um erro interno")
            res.redirect("principal/home")
        })
    }       
})

router.get('/sla',(req,res) => {
    
    console.log(loggedUser)
})

module.exports = router
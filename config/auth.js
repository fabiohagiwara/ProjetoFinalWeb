const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
require('../models/User')
const User = mongoose.model('users')


module.exports = function(passport){
   
    passport.use(new localStrategy({usernameField: 'loginUsername', passwordField: 'loginPassword'},(email,senha,done) => {
        User.findOne({email: email}).then((user) => {
            if(!user){

                return done(null,false,{message: "Esse email não está cadastrado"})
            }
            
            bcrypt.compare(senha,user.senha,(erro,batem) => {
                if(batem){
                    return done(null,user)
                }
                else{
                    return done(null,false,{message: "Senha incorreta!"})
                }
            })
        })
    }))

    passport.serializeUser((user,done) => {
        done(null,user.id)
    })

    passport.deserializeUser((id,done) => {
        User.findById(id,(err,user) => {
            done(err,user)
        })
    })

}
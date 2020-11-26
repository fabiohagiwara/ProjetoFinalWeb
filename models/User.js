const mongoose = require('mongoose')
const cardSchema = require('./Card')
const Schema = mongoose.Schema;

const User = new Schema({
    nome: {
        type: String,
        require: true
    },
    senha: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cards:[
            {
                palavra :{
                    type: String,
                    required: true
                },
                idioma:{
                        type: String,
                        required: true
                },
                palavraTraduzida: {
                        type:String,
                        required:true
                },
                idiomaTraducao: {
                    type: String,
                    required: true
                }
            }
        ]       
})

mongoose.model('users', User)
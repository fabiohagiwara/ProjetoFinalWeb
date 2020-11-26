//Loading modules
    const express = require('express')
    const exphbs = require('express-handlebars')
    const bodyParser = require('body-parser')
    const mongoose = require('mongoose')
    const common = require('./routes/commonRoutes')
    const logged = require('./routes/loggedRoutes')
    const path = require('path')
    const session = require('express-session')
    const flash = require('connect-flash')
    const passport = require('passport')
    require('./config/auth')(passport)
//Constants    
    const app = express()

//BodyParser config
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

//Handlebars confi
    app.engine('handlebars', exphbs({defaultLayout: 'main',
                                    runtimeOptions: {
                                        allowProtoPropertiesByDefault: true,
                                        allowProtoMethodsByDefault: true,
                                        },
                                    })
            )
    app.set('view engine','handlebars')
    app.use(flash())
// Session config
    app.use(session({
        secret:"educardssecret",
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge: 1000 * 60 * 15,
        }
    }))
    app.use(passport.initialize())
    app.use(passport.session())
  
//Routes
    app.use('/',common) 
    app.use('/u',authenticationMiddleware,logged)


//Static
    app.use(express.static(path.join(__dirname,'public')))


    app.use((req,res,next) =>{
        res.locals.success_msg = req.flash("sucess_msg")
        res.locals.error_msg = req.flash("error_msg")  
        res.locals.error = req.flash("error")
        next()
    })

// Mongoose config
    mongoose.Promise = global.Promise;

    mongoose.connect("mongodb://localhost/educards",{useNewUrlParser: true})
    mongoose.connection
        .once('open', () => console.log('Connected to EduCards!'))
        .on('error', error => {
            console.log('Your error',error)
        })

//Misc
    const PORT = 8080
    app.listen(8080,() => {
        console.log("Server is running! on port "+PORT)
    })

    function authenticationMiddleware(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login?fail=true');
    }


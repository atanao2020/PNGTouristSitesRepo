const express      = require('express'),
      app          = express(), 
      port         = 2020,
      cors         = require('cors'),
      multer       = require('multer'),
      upload       = multer(),
      mongoose = require('mongoose'),
      Site = require('./models/SitesSchema')

//================================================== Connection to MongooseDB
mongoose.connect('mongodb+srv://atanao:dontinon@cluster0.enweg.mongodb.net/PNGTouristSitesDB?retryWrites=true&w=majority', 
{useNewUrlParser:true,useUnifiedTopology:true},
    function(err,database){
        if(err){
           throw err
        }
        console.log("connection made to database")
   }
)

//=================================================== Middlewears
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(upload.array())
app.use(express.json())


//=================================================== Root route
app.get('/', function(req, res) {
    console.log('Root route working..')
    res.send('hello world')
})


//===================================================== Create and posting new tourist sites to the database
app.post('/sites', function(req, res) {
    console.log("Site POST route hit")
    console.log(req.body)
    var province = req.body.province
    var city = req.body.city
    var place = req.body.place
    var image = req.body.image

    
    Site.create({

        province: province,
        city:city,
        place: place,
        image: image

    })
    .then(function(site){
        console.log('Site Saved')
        console.log(site)
        res.send(site)
    })
    .catch(function(err){
        console.log(err)
    })
})


//===================================================== Retrieving tourist sites from the database
app.get('/sites', function(req, res) {     
     Site.find({})         
     .then(function(sites) {             
         console.log(sites)             
         res.send(sites)         
     })         
     .catch(function(err) {             
            console.log(err)             
            res.send(err)         
     }) 
})

app.listen(port, () => {   
    console.log(`Example app listening at http://localhost:${port}`) 
})
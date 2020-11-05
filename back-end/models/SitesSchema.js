const mongoose = require('mongoose')
const SitesSchema = new mongoose.Schema({
    province:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})

const Sites = mongoose.model("Sites", SitesSchema)
module.exports = Sites
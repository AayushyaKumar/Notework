const mongoose = require('mongoose')

const {Schema} = mongoose

const promptSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'noteUser', required: true },
    heading:{type:String,required:true},
    prompt:{

        type:String,
        required:true,
        createdAt: { type: Date, default: Date.now }
    },
    summary:{
        type: String,
        required:true
    },
    summaryUrl:{
       type:String,
       set: (url) => url.startsWith("http://") ? url.replace("http://", "https://") : url

       
    },
    genre:{
        type:String,required:true
    },

    title:{
        type:String
    },

    createdAt: { type: Date, default: Date.now },
    thumbnail:{type: String, }

})

const notePrompt = mongoose.model('notePrompt',promptSchema)
module.exports= notePrompt
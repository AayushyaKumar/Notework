const AppError= require("../Error/AppError")
const  {YoutubeTranscript} = require( 'youtube-transcript');
let transcript = ""
async function extract_transcript(videoId){
 
    const value = await  YoutubeTranscript.fetchTranscript(videoId)
     if(!value) throw new AppError('Transcription of the video not found', 404);
      transcript = " "
   for (let i = 0; i < value.length; i++) {
             
      transcript += " " + value[i]["text"]

     }
   return new Promise((resolve) => {
      setTimeout(() => resolve(transcript,1000));

    });
  
 }

        


      
   
module.exports = {extract_transcript}


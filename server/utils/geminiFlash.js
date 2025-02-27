require("dotenv").config()
const {GoogleGenerativeAI} = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
async function geminiflash(transcribe,prompt){
    try{
     const finalPrompt= prompt+" \n" +transcribe
     const IntialPrompt=`Give this a suitable title omitting all **, **, inverted commas or any other notation just simple heading in 2-5 words . The text is given below: \n ${transcribe}`
     
    console.log(finalPrompt)
    const title = await model.generateContent(IntialPrompt)
    const result =  await model.generateContent(finalPrompt)
    // topic = topic.response.text()
    const heading = title.response.text()
    const text= result.response.text()
    return new Promise((resolve) => {
        resolve({text,heading})
      });
    }catch(e){
       console.log(e)
    }
}

module.exports =  {geminiflash}






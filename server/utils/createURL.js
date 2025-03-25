import "dotenv/config";
import fs from "fs";
// const path = require("path") ;

import { createClient } from "@supabase/supabase-js" ;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ;
const supabaseKey =  process.env.NEXT_PRIVATE_SUPABASE_KEY ;
const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadToSupabase(filepath,filename) {
  try {

    const fileContent = fs.readFileSync(filepath);
    const { data, error } = await supabase.storage
      .from("pdf") // Bucket name
      .upload(filename, fileContent, {
        contentType: "application/pdf",
      });
    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }
    
    const { data:url } = supabase.storage.from("pdf").getPublicUrl(filename);
    fs.unlinkSync(filepath)
    return new Promise((resolve) => {
      resolve(url);
    });
  } catch (error) {
    console.log(error);
    
  }
}

export { uploadToSupabase };
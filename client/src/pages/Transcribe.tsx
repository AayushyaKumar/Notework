import { useEffect, useRef, useState } from "react";
import Createpdf from "../components/Transcribe/Createpdf";
import Previous from "../components/Transcribe/Previous";
import { useAuthContext } from "../hooks/useAuth";
import { AuthProvider } from "../context/auth";
import  TextGenerate  from "../components/Transcribe/text-generate-effect"; 
import { SkeletonWave, TypingAnimation,LoadingSkeleton} from "../components/Transcribe/SkeletonEffect";
import { ArrowRight } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Transcribe() {
  const { logout,setIsNew } = useAuthContext();
  const [id, setId] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string>('');
  const [isDisable, setIsDisable] = useState(false);
  // const navigate=useNavigate()
   const promptRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    useEffect(() => {
      const scrollToSection = () => {
        const hash = location.hash;
      if (hash === "#prompt" && promptRef.current) {
          promptRef.current.scrollIntoView({ behavior: "smooth" });
        }
      };
  
      scrollToSection();
    }, [location]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsDisable(true)
      const regex = /\.be\/([^?]+)/;
     console.log(input)
       let label=''
       if(!input.match(regex) ){
         label = input.split("=")[1];

       }else 
       {
        label=input.split('/').pop()?.split('?')[0]  || ''
       }

      setId(label);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}ai/summary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ input }),
      });
      const parsedResponse = await response.json();
      
      if(response.status===401){

  logout()
  throw new Error('Unauthorized');
} 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        
        setOutput(parsedResponse.data.summary);
        sessionStorage.setItem("id", parsedResponse.data.id);
        localStorage.setItem("newactivity", `${!isDisable}`);
        setIsDisable(false);
        setIsNew(true)
      
    } catch{
      setIsDisable(false);
      setOutput("Oops, Something went wrong, try with another video")
    }
  };
  return (
    <AuthProvider>
      <div id="prompt" ref={promptRef}>
      <div className={`flex flex-col gap-4 dark:bg-colorGradient2  min-h-full justify-center items-center `}>
        <div className="flex flex-col items-center gap-2 mt-4 p-6 ">
          <h1 className="text-3xl font-bold dark:text-white ">
            Youtube Videos Summarizer{" "}
          </h1>
          
          <h2 className="text-gray-600 dark:text-gray-400 text-xl font-semibold">
            Too long to undertsand the vast video , summarize it here{" "}
          </h2>
        </div>
        <div className="border-2 border-gray-300 box-border rounded-lg mx-auto w-11/12 sm:w-2/3 py-12">
          <h2 className=" flex justify-center text-xl font-bold dark:text-white">
            Youtube URL
            
          </h2>
          <form action="" className=" p-3 flex justify-center gap-4 max-w-3xl mx-auto" onSubmit={handleSubmit}
              >
            <input
              type='url'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="font-bold text-xl dark:text-white rounded-xl  w-10/12 custom:ml-10 ml-2 h-12 border-2 text-black dark:bg-colorGradient1 border-gray-300 focus:outline-none pl-3 "
              pattern="https?://(www\.)?(youtube\.com|youtu\.be)/.*" 
              required
disabled={isDisable}
            />
            <button
              className="dark:bg-colorGradient1 
                 bg-colorGradient1  
                hover:bg-colorGradient3 text-white   rounded-lg  font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px] max-[630px]:min-w-[44px] max-[630px]:px-3"
              disabled={isDisable}

            >
              <span className="hidden max-[630px]:block">
              <ArrowRight className="w-5 h-5" />
            </span>
            <span className="block max-[630px]:hidden">
              Submit
            </span>
            </button>
          </form>
          
        </div>
        </div>
     <div className="flex flex-col justify-center gap-8 md:gap-16">
  {(isDisable) ?
  <>
    
   <div className="">
    <LoadingSkeleton />
   <TypingAnimation/>
   <SkeletonWave/>
      </div > 
      </>
   
   : 
  output &&
  <img
                  src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                  alt="thumbnail image"
                  className="rounded-lg  sm:w-4/6 w-11/12 h-92 mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-12"
                /> 
              }

          <div>
          { 
 
 
     }
            {output && (
              <div className=" flex-row mx-auto justify-center     rounded-lg">
                
                <div className="flex flex-col justify-center items-center gap-4 ">
                  <div className="dark:text-white border-2 border-gray-300   rounded-lg sm:w-4/6 w-11/12 p-2 md:pr-4 md:pl-4 whitespace-pre-wrap " 
      style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }} >
                  
                  <TextGenerate text={output} speed={40} delay={2} 
                  />                  </div>
                {isDisable? <br/>:  <Createpdf />}
                </div>
              </div>
            )}
          </div>
        </div>

        <Previous />
      </div>
    </AuthProvider>
  );
}

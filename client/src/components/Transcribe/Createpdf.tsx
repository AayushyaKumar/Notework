import { useState } from "react";
import { useFileDownload } from "../../hooks/useDownload";
import { useAuthContext } from "../../hooks/useAuth";
import axios from "axios";
function Createpdf() {
  const [url, setUrl] = useState<string | undefined>();
  const [isDisable, setIsDisable] = useState(false);
  const { setIsNew,logout} = useAuthContext();
  const downloadFile = useFileDownload()
  const id = sessionStorage.getItem("id");
  const pdf = async () => {
    try {
      setIsDisable(true);
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}ai/createPdf/${id}`,
        {},
        { withCredentials: true }
      );
      
      if (!data)       throw new Error();
      if(data.status===401){
        logout()
        throw new Error('Unauthorized');
      }
  

      setUrl(data.data);
      setIsNew(true);
      
    } catch {
      console.log("Oops! Something went wrong");
    }finally{
      setIsDisable(false);
    }
  };

  return (
    <div className="py-2">
      {url ? (
        <button
          className="bg-black text-white dark:bg-darkViolet dark:hover:bg-lightViolet w-60 rounded-lg p-2 h-auto"
          onClick={() => downloadFile(url)}
        >
          Download here
         </button>
      ) : (
        <button
          className="font-bold text-white bg-red-500 rounded-lg px-6 py-4 border-b-4  border-red-800 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={pdf}
          disabled={isDisable}
        >
          <div className="flex flex-row gap-2">Create Pdf</div>
        </button>
      )}
    </div>
  );
}

export default Createpdf;

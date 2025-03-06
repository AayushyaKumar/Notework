import { useState } from "react";
import { useFileDownload } from "../../hooks/useDownload";
import { useAuthContext } from "../../hooks/useAuth";
function Createpdf() {
  const [url, setUrl] = useState<string | undefined>();
  const downloadFile = useFileDownload();
   const {setIsNew}=useAuthContext()
  const id = sessionStorage.getItem("id");
  const pdf = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}ai/createPdf/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data) {
        setUrl(data.data);
        setIsNew(true) 
      }
      throw new Error();
    } catch  {
      console.log("Oops! Something went wrong");
    }
  };

  

  return (
    <div className="py-2">
      {url ? (
        <button className="bg-black text-white dark:bg-darkViolet dark:hover:bg-lightViolet w-60 rounded-lg p-2 h-auto" onClick={()=> downloadFile(url)}>
          Download here
        </button>
      ) : (
        <button className="font-bold text-white bg-red-500 rounded-lg px-6 py-4 border-b-4  border-red-800 hover:bg-red-600" onClick={pdf} disabled={url? true: false}>
          <div className="flex flex-row gap-2"  >
            Create Pdf
        
          </div>
        </button>
      )}
    </div>
  );
}

export default Createpdf;

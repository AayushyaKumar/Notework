import { useState } from "react";
// import { useFileDownload } from "../../hooks/useDownload";
import { useAuthContext } from "../../hooks/useAuth";
import axios from "axios";
function Createpdf() {
  const [url, setUrl] = useState<string | undefined>();
  // const downloadFile = useFileDownload();
  const { setIsNew,activity } = useAuthContext();
  const id = sessionStorage.getItem("id");
  const pdf = async () => {
    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}ai/createPdf/${id}`,
        { withCredentials: true }
      );
      
      // const blob = await data.blob();
      if (!data)       throw new Error();

  

      setUrl(data.data);
      setIsNew(true);
      
    } catch {
      console.log("Oops! Something went wrong");
    }
  };

  return (
    <div className="py-2">
      {url ? (
        // <button
        //   className="bg-black text-white dark:bg-darkViolet dark:hover:bg-lightViolet w-60 rounded-lg p-2 h-auto"
        //   onClick={() => downloadFile(url)}
        // >
        <a href={url} className="bg-black text-white dark:bg-darkViolet dark:hover:bg-lightViolet w-60 rounded-lg p-2 h-auto" download={activity?.heading[activity?.heading.length-1]}>
          Download here
          </a>
      ) : (
        <button
          className="font-bold text-white bg-red-500 rounded-lg px-6 py-4 border-b-4  border-red-800 hover:bg-red-600"
          onClick={pdf}
          disabled={url ? true : false}
        >
          <div className="flex flex-row gap-2">Create Pdf</div>
        </button>
      )}
    </div>
  );
}

export default Createpdf;

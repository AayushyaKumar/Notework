import { useState } from "react";
// import { useAuthContext } from "../hooks/useAuth";
function Createpdf() {
  const [url, setUrl] = useState<string | undefined>();
  // const {summaryInfo} = useAuthContext()
  const id = sessionStorage.getItem("id");
  const pdf = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}ai/createPdf/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data) setUrl(data.data);
      throw new Error();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="py-2">
      {url ? (
        <button className="bg-black text-white dark:bg-darkViolet dark:hover:bg-lightViolet w-60 rounded-lg p-2 h-auto">
          <a href={url} target="_blank">Download here</a>
        </button>
      ) : (
        <button className="font-bold text-white bg-red-500 rounded-lg px-6 py-4 border-b-4  border-red-800 hover:bg-red-600" onClick={pdf} disabled={url? true: false}>
          <div className="flex flex-row gap-2"  >
            Create{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.6rem"
              height="1.5em"
              viewBox="0 0 15 15"
            >
              <path
                fill="white"
                d="M2.5 6.5V6H2v.5zm4 0V6H6v.5zm0 4H6v.5h.5zm7-7h.5v-.207l-.146-.147zm-3-3l.354-.354L10.707 0H10.5zM2.5 7h1V6h-1zm.5 4V8.5H2V11zm0-2.5v-2H2v2zm.5-.5h-1v1h1zm.5-.5a.5.5 0 0 1-.5.5v1A1.5 1.5 0 0 0 5 7.5zM3.5 7a.5.5 0 0 1 .5.5h1A1.5 1.5 0 0 0 3.5 6zM6 6.5v4h1v-4zm.5 4.5h1v-1h-1zM9 9.5v-2H8v2zM7.5 6h-1v1h1zM9 7.5A1.5 1.5 0 0 0 7.5 6v1a.5.5 0 0 1 .5.5zM7.5 11A1.5 1.5 0 0 0 9 9.5H8a.5.5 0 0 1-.5.5zM10 6v5h1V6zm.5 1H13V6h-2.5zm0 2H12V8h-1.5zM2 5V1.5H1V5zm11-1.5V5h1V3.5zM2.5 1h8V0h-8zm7.646-.146l3 3l.708-.708l-3-3zM2 1.5a.5.5 0 0 1 .5-.5V0A1.5 1.5 0 0 0 1 1.5zM1 12v1.5h1V12zm1.5 3h10v-1h-10zM14 13.5V12h-1v1.5zM12.5 15a1.5 1.5 0 0 0 1.5-1.5h-1a.5.5 0 0 1-.5.5zM1 13.5A1.5 1.5 0 0 0 2.5 15v-1a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>{" "}
        </button>
      )}
    </div>
  );
}

export default Createpdf;

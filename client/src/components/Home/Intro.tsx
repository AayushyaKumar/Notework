
import { TypewriterEffect } from "../ui/typewriter-effect";
function Intro() {
  const words = [
    {
      text: "Watch",
    },
    {
      text: "It",
    },
    // {
    //   text: "apps",
    // },
    {
      text: "Note",
      className: "text-blue-500 dark:text-blue-600",

    },
    {
      text: "It.",
      className: "text-blue-500 dark:text-blue-600",
    },
  ];
  return (
    <div className="lg:flex lg:flex-row gap-32 py-12 px-8 ">
    <img src="../../../public/images/Intro.jpg" className="rounded-2xl lg:w-1/2 lg:h-1/3 w-11/12" alt="Intro Image" />
   <center className=" lg:flex items-center py-4 mt-4"><TypewriterEffect words={words}  /> 
   </center>
   </div>
  )
}

export default Intro
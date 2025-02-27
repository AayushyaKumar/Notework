
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
    <div className="md:flex md:flex-row md:items-center  gap-32 py-12 px-8 ">
      <div className="lg:w-3/5  md:w-1/2  w-full aspect-[4/3] relative">
    <img src="https://res.cloudinary.com/dmuigsle3/image/upload/v1740502450/ggdmdahp3moynis14ccj.jpg" loading="lazy" className="rounded-2xl w-full h-full object-cover" alt="Intro Image" />
    </div>
   <center className=" lg:flex items-center py-4 mt-4  lg:w-2/5  "><TypewriterEffect words={words}  /> 
   </center>
   </div>
  )
}

export default Intro
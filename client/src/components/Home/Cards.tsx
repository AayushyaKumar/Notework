import Centre from "./Centre"
import Intro from "./Intro"
import Section from "./Sections";
import { FocusCards } from "../ui/focus-cards";

interface Cards{
  title:string,
  src:string,
  // button:string
}

function Cards() {

  const cards:Cards[]=[
    {  title:"Explore",
       src:"https://res.cloudinary.com/dmuigsle3/image/upload/v1740502197/yepbwnnxtkwzgqazodbw.jpg"
    // button:"Get Started"
    },
    {
      title:"Transcribe",
      src:"https://res.cloudinary.com/dmuigsle3/image/upload/v1740502290/k3pswtdnfukd764vrhjv.jpg",
      // button:"Transcribe"
    },
    {
      title:"Dashboard",
      src:"https://res.cloudinary.com/dmuigsle3/image/upload/v1740502052/dk2qho29gxgtwvagta5t.jpg",
      // button:"Personalized Reports"
    }
    
  ]
  

  return (
    
    <div className=" dark:bg-colorGradient2 ">
    <Intro/>
    <Centre/>


<FocusCards cards={cards} />;

<Section/>
</div>
  )
}

export default Cards
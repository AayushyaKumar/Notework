import Navbar from "../components/Home/Navbar"
import { ThemeProvider } from "../context/Theme"
import '../App.css'

//  import Cards from "../components/Cards"
function Home() {
  return (
  <ThemeProvider>
    
      <div className="">
        <Navbar />
    </div>
    </ThemeProvider>
  )
}

export default Home
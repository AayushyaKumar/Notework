import Resources from "../components/Dashboard/Resources"
import { ThemeProvider } from "../context/Theme";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {UserStats} from "../components/Dashboard/RecentActivity"
import BarChartComponent from "../components/Dashboard/BarChartComponent";

const Dashboard: React.FC = () => {
  const analysisRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    const scrollToSection = () => {
      const hash = location.hash;
      if (hash === "#resources" && analysisRef.current) {
        analysisRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#charts" && chartsRef.current) {
        chartsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToSection();
  }, [location]);
  return (
    <ThemeProvider>
    <div className="flex flex-col gap-12 pl-6  dark:bg-colorGradient2 justify-center items-center  ">
  <div className="py-2 mt-8"> 
  <UserStats/>
  </div>  
      <div ref={analysisRef} id="analysis">
<Resources /></div>
<div ref={chartsRef} id="charts" className="w-full">
        <BarChartComponent />
    </div>  
      </div>
    </ThemeProvider>
 
  );
};

export default Dashboard;

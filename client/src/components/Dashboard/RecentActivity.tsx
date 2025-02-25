import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { FileText, Star, Pen } from "lucide-react"
import { useAuthContext } from "../../hooks/useAuth";

interface useractivity {
  url:string[],
  genre:string[],
  heading:string[]
}
export function UserStats() {
    const [mostFrequent, setMostFrequent] = useState<{ element: string; count: number } | null>(null);
    const {activity}=useAuthContext()
    const [pdfs,setPdfs]=useState(0)
    const [summary,setSummary] = useState(0)
    useEffect(() => {


        // const storedArray = sessionStorage.getItem("activity")
        const stringsArray:useractivity= activity?activity: {url:[],genre:[],heading:[]}
     
        if (!stringsArray.url) stringsArray.url = [];
        if (!stringsArray.heading) stringsArray.heading = [];
        if (!stringsArray.genre) stringsArray.genre = [];        
        if(stringsArray.url.length)  {     
            setPdfs(stringsArray.url.length)

        }
        if(stringsArray.heading.length){
          setSummary(stringsArray.heading.length)
        }

        const findMostFrequentElement = (arr: string[]): { element: string; count: number } | null => {
          if (arr.length === 0) return null;
    
          const frequencyMap: Record<string, number> = {};
    
          arr.forEach((item) => {
            frequencyMap[item] = (frequencyMap[item] || 0) + 1;
          });
    
          let maxElement = "";
          let maxCount = 0;
    
          for (const [key, value] of Object.entries(frequencyMap)) {
            if (value > maxCount) {
              maxCount = value;
              maxElement = key;
            }
          }
    
          return { element: maxElement, count: maxCount };
        };
    if(stringsArray.genre.length>0){
        const result = findMostFrequentElement(stringsArray.genre);
        setMostFrequent(result);
    }
    }, []);

  return (
    <div>

      <h1 className="pl-2 ml-4 dark:text-white text-2xl font-bold">Overview</h1>
      
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-0.5 gap-8 ml-4 mt-8">
      
      <Card  className="dark:bg-colorGradient1 dark:border-none w-10/12">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold dark:text-white">Your Summaries</CardTitle>
          <Pen className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-white">{summary}</div>
          {/* <p className="text-xs text-muted-foreground dark:text-gray-300">+4 this week</p> */}
        </CardContent>
      </Card>
      <Card className="dark:bg-colorGradient1 dark:border-none w-10/12">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold dark:text-white ">Total Pdfs</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-white">{pdfs}</div>
          {/* <p className="text-xs text-muted-foreground dark:text-gray-300">-30 sec from last week</p> */}
        </CardContent>
      </Card>
      <Card className="dark:bg-colorGradient1 dark:border-none w-10/12">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold dark:text-white">Favorite Category</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground dark:text-gray-300" />
        </CardHeader>
        <CardContent>
       <div className="sm:text-2xl text-lg font-bold dark:text-white ">{ mostFrequent ?mostFrequent.element: "Nothing "}</div>
           <p className="text-xs text-muted-foreground dark:text-gray-300">Based on your summaries</p>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}


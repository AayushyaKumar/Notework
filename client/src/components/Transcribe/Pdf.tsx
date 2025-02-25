import axios from 'axios'
interface Heading{
    heading: string,
    index: number,
    onPdfGenerated:(state:number,value:boolean)=>void
}
import { useAuthContext } from '../../hooks/useAuth'
import {  useState } from 'react'
function Pdf({heading,index,onPdfGenerated}:Heading) {
    const [isDisable,setIsDisable]=useState(false)
    const {activity,setIsNew}=useAuthContext()
    const {logout}=useAuthContext()
    console.log(activity?.heading[index])
    const handleSubmit= async()=>{

        setIsDisable(true)
        try{
        const response= await axios.post('http://localhost:4000/ai/makePdf',
       { heading } ,
       { withCredentials: true,  } )
        //  const activityJSON= sessionStorage.getItem('activity')
        //  if(!activityJSON ) throw new Error
         
        
        //  const Activity= JSON.parse(activityJSON)

        //  Activity.url[index]= response.data.data.url
        //  const updatedActivityJSON = JSON.stringify(Activity);
        //  sessionStorage.setItem('activity', updatedActivityJSON);
   
        if(response.status===401){
            logout()
            throw new Error('Unauthorized');
        }
        if(!response) return new Error('No response')
        
      
        const info=response.data.url
      
            onPdfGenerated(index,info)
      
        
       setIsNew(true) 
        

        }catch(error){
            
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    logout()
                } else {
                    console.error('Error status:', error.response?.status, error.response?.data);
                }
            } else {
                 console.error('Unexpected error:', error);
            }
        }finally{
            setIsDisable(false)

        }
      }
  return (
    <div>
            <button className="font-bold sm:ml-0 ml-4 sm:my-0  my-1 text-white flex gap-1 px-2 py-1.5 bg-gray-800 hover:bg-black dark:bg-colorGradient3 dark:text-white dark:hover:bg-hoverColor  rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={isDisable}>
          
            Create
           <p>Pdf</p> 
          
        </button> 
    
</div>  
  )
}

export default Pdf
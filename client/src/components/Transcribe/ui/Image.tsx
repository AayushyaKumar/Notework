interface CardProps{
    src: string,
    title?:string
    alt:string
    className:string
}

export default function Image({src,title}:CardProps){
    
        return (
          <img 
            src={src} 
            alt={title}
          />
        );
      
}
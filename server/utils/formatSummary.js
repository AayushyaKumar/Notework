function parseFormattedText(rawText) {

  const lines = rawText.split('\n');
  const formattedContent = [];

  
  lines.forEach((line,index) => {

    // Check for bold text (enclosed in ** or ***)
    const boldMatches = line.match(/\*\*\*(.*?)\*\*\*|\*\*(.*?)\*\*/g);
    // const bulletHeading= line.match(/^\* \*\*(.*?)\*\*/g) ;
    const bullet= line.match(/\* \*\*.*?\*\*/g)
    if (bullet) {


      formattedContent.push({
        type: 'bullet',
        content: bullet[0].trim().replace(/\* \*\*.*?\*\*/g, 'o ')
      });
     
    
    }
   
    if (boldMatches ) {
      let processedLine = line;
      boldMatches.forEach(match => {
        const content = match.replace(/\*\*\*|\*\*/g, '');
        formattedContent.push({
          type: 'bold',
          content: content
        });
        // Mark the bold text for later processing
        processedLine = processedLine.replace(match,' ');
      });
      line = processedLine;
      
    }
 
 
    
    // Check for bullet points

      
    
    
    // Check for headers (# Header)
    if (line.trim().match(/^#{1,6}\s+/)) {
      const headerMatch = line.trim().match(/^(#{1,6})\s+(.+)$/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        formattedContent.push({
          type: 'header',
          content: headerMatch[2],
          level: level
        });
        return;
      }
    }
  
    // Normal text
    if (line.trim() !== '' && !(/\s*\*\s*/.test(line))) {
      
      formattedContent.push({
        type: 'normal',
        content: line
      });
    }
    if(/\s*\*\s*/.test(line)){
      formattedContent.push({
        type: 'normal',
        content: line.replace(/\s*\*\s*/, ' ')
      });
    }
const regex='^\s*$'
    if(lines[index].match(regex)){
      formattedContent.push({
        type: 'space',
      
      });
    }
  });

  return {
    text: rawText,
    formatting: formattedContent
  };
}

export { parseFormattedText };
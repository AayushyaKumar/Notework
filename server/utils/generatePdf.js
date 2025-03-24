import fs from 'fs' ;
import path from 'path';
import PDFDocument from 'pdfkit' ;
import { fileURLToPath } from 'url';
import { parseFormattedText } from './formatSummary.js';
// Generate PDF and save to filesystem with unique name
async function generatePDF(content, filename,fontOptions) {
  return new Promise((resolve, reject) => {
    try {
     
      const parsedContent = parseFormattedText(content);
      const __file = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__file);  
      const filePath = path.join(__dirname, '..', 'temp', filename);    
      fs.mkdirSync(path.join(__dirname, '..','temp'), { recursive: true });

      const doc = new PDFDocument({
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        },
        autoFirstPage: true,
        ...fontOptions
      });
      
      
      doc.font('Helvetica');
      
    
      const defaultFontSize = fontOptions.fontSize || 12;
      doc.fontSize(defaultFontSize);
     
      let pageNumber = 0;
      doc.on('pageAdded', () => {
        pageNumber++;
        
        const currentPage = doc.page;
       
        doc.save();
   
        doc.fontSize(8)
          .text(
            `Page ${pageNumber}`,
            0,
            currentPage.height - 50,
            { align: 'center', width: currentPage.width }
          );
      
        doc.restore();
      });
      const writeStream = fs.createWriteStream(filePath);
   
      writeStream.on('finish', () => {
        resolve(filePath);
      });
      
      writeStream.on('error', (err) => {
        reject(err);
      });
      
      doc.pipe(writeStream);
      
      // Add content to PDF
      // doc.text(content);
      
    
      parsedContent.formatting.forEach(item => {
        // Handle line breaks between items, but not before the first item
        console.log(item)
       if(item.type==='space'){
          doc.moveDown(0.6);
          doc.x = doc.page.margins.left;
          console.log('space')
       }
       
       const textOptions = {
        align: 'justify',
        continued: false
      };

        switch (item.type) {
          case 'bullet':
            doc.text('• ', { continued: true })
              
            break;

          case 'bold':
            doc.font('Helvetica-Bold')
              .text(item.content, { continued: true })
              .font('Helvetica');
            break;
 
          case 'normal':
            doc.text(item.content,textOptions);
            break;
        }
      });
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export { generatePDF };
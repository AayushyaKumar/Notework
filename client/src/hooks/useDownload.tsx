// hooks/useFileDownload.js
export const useFileDownload = () => {
    const downloadFile = (url: string| undefined) => {
     
      const getFileName = (url: string) => {
        const urlParts = url.split('/');
        const fileNameFromUrl = urlParts[urlParts.length - 1];
        return fileNameFromUrl && fileNameFromUrl.toLowerCase().endsWith('.pdf')
          ? fileNameFromUrl
          : 'document.pdf';
      };
      const link = document.createElement('a');

      if(!url) return

      link.href = url;
      link.setAttribute('download', getFileName(url));
      link.setAttribute('target', '_blank');
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    };
  
    return downloadFile;
  };
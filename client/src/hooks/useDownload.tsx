// hooks/useFileDownload.js
export const useFileDownload = () => {
    const downloadFile = async (url: string| undefined) => {
      if(!url) return
      const getFileName = (url: string) => {
        const urlParts = url.split('/');
        const fileNameFromUrl = urlParts[urlParts.length - 1];
        return fileNameFromUrl && fileNameFromUrl.toLowerCase().endsWith('.pdf')
          ? fileNameFromUrl
          : 'document.pdf';
      };
      const link = document.createElement('a');

     

      link.href = url;
      link.setAttribute('download', getFileName(url));
      link.setAttribute('target', '_blank');
      
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);

    };
  
    return downloadFile;
  };
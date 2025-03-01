// hooks/useFileDownload.js
export const useFileDownload = () => {
    const downloadFile = (url: string| undefined, filename = '') => {
      const link = document.createElement('a');
      console.log(url)
      if(!url) return
      link.href = url;
      link.setAttribute('download', filename || '');
      link.setAttribute('target', '_blank');
      
      document.body.appendChild(link);
      link.click();
      
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
    };
  
    return downloadFile;
  };
export const removeUrlParams = (url: string, paramsToKeep: string[] = []): string => {
    const urlObject = new URL(url);
    
    urlObject.searchParams.forEach((value, key) => {
        if (!paramsToKeep.includes(key)) {
          urlObject.searchParams.delete(key);
        }
      });
  
    return urlObject.toString();
  };
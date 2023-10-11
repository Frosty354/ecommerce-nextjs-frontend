const formatDate=(d:Date)=>{
    const utcDate = new Date(d);
    const gmt530Date = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
     
    };
    //@ts-ignore
    return gmt530Date.toLocaleString('en-US', { ...options, timeZone: 'Asia/Kolkata' });

   
}
export default formatDate;
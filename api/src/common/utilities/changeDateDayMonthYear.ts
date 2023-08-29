export default function changeDateToDayMonthYear (userDate:string):false|string {
    // Expecting Date as "05 Sept 2022" Otherwise Throw error
    try{
      let d = new Date(userDate);
      let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
      let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
      let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
      
      let splittedDate = `${da} ${mo}, ${ye}`;
      if(isNaN(Date.parse(splittedDate))){
          return userDate;
      }else{
          return splittedDate;
      }
    }catch(error){
        return userDate.split(/[-\/]/).reverse().join("-");
    }
    
}
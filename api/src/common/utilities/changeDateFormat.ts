export default function checkCpdDateFormat (userDate:string):false|string {
    // Expecting Date as "2021-10-25 or 2021/10/25" Otherwise Throw error
    try{
        let splittedDate = userDate.split(/[-\/]/).reverse().join("-")
        if(isNaN(Date.parse(splittedDate))){
            return false;
        }else{
            return splittedDate;
        }
    }catch(error){
        return false;
    }
    
}
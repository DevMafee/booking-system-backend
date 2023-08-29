import { log } from "console";

export default function checkCpdDateFormat (userDate:string):false|string {
    // Expecting Date as "2021-10-25 or 2021/10/25" Otherwise Throw error
    try{
        const year = new Date(userDate).getFullYear();
        const month = new Date(userDate).getMonth()+1;
        const day = new Date(userDate).getDate();
        let dateFormated = `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day}`;
        
        if(isNaN(Date.parse(dateFormated))){
            return false;
        }else{
            return dateFormated;
        }
    }catch(error){
        return false;
    }
    
}
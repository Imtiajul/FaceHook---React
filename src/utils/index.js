export const getDateDifferenceFromNow = (fromDate) => {
   let difference = new Date().getTime() - new Date(fromDate).getTime();

   difference = difference / 1000;
   let dayDifference = Math.round(difference / (3600*24));
   difference -= dayDifference * (3600*24);
   let hourDifference = Math.round(difference / 3600);
    difference -= hourDifference *3600;
    let minutesDifference = Math.round(difference / 60);
    difference -= minutesDifference * 60;

    let message;

    if(dayDifference > 0) {
      message = `${dayDifference} day`
    }

    if(hourDifference > 0) {
      message = message ?  ` ${message} ${hourDifference} hours` : `${hourDifference} hours`
    }

    if(minutesDifference > 0 ) {
      message = message ? `${message} ${minutesDifference} minutes` : `${minutesDifference} minutes`
    }
     if(difference > 0) {
      message = message ? `${message} ${Math.round(difference)} seconds` : `${Math.round(difference)} seconds`
     }

     return message;
}

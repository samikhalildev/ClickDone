var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const getCurrentDate = () => {
    let date = new Date()

    let year = date.getFullYear();
    var month = months[date.getMonth()].substring(0, 3);
    let day = date.getDate();
    let weekDay = days[date.getDay()].substring(0, 3);
    
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var AMPM = hours >= 12 ? 'pm' : 'am';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;

    var emoji;

    if ((AMPM === 'am' && hours >= 6 && hours <= 11) || (AMPM === 'pm' && hours === 12 || hours <= 5))
        emoji = `🌞`;

    else if ((AMPM === 'pm' && hours >= 6 && hours <= 11) || (AMPM === 'am' && hours >= 0 && hours <= 5))
        emoji = `🌚`
    
    return `${weekDay}, ${day} ${month} ${year} at ${hours}:${minutes} ${AMPM} ${emoji}`;
}

export default getCurrentDate;


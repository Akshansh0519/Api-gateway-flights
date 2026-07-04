function compareTime(time1, time2) {
    const date1 = new Date(time1);
    const date2 = new Date(time2);
    return date1.getTime() > date2.getTime();
}   

module.exports = {
    compareTime
}
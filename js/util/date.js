/**
 * @description: 获取idate所在月或者当前月的第一天
 * @param [idate] 所需月份
 */
function getCurrentMonthFirst (idate) {
  let date = idate ? new Date(idate) : new Date();
  date.setDate(1);
  return date;
}
/**
 * @description: 获取idate所在月或者当前月的最后一天
 * @param [idate] 所需月份
 */
function getCurrentMonthLast (idate) {
  let date = idate ? new Date(idate) : new Date();
  let currentMonth = date.getMonth();
  let nextMonth = ++currentMonth;
  let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  let oneDay = 1000 * 60 * 60 * 24;
  return new Date(nextMonthFirstDay - oneDay);
}

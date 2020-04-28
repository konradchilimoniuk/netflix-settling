export const DateString = (date) => {
    return date.getFullYear()
    + "-" + (date.getMonth() > 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1))
    + "-" + date.getDate();
}

export const MonthDifference = (d1, d2, includeIncompleteMonth) => {
    return ((d2.getFullYear() - d1.getFullYear()) * 12)
      + (d2.getMonth() - d1.getMonth())
      + (d2.getDate() >= d1.getDate() && includeIncompleteMonth ? 1 : 0);
}
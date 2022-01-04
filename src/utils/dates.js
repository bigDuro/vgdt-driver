import Moment from 'moment';

const getConfig = () => {
  Moment.updateLocale('en', {
    week: {
      dow : 3, // Wednesday is the first day of the week.
    }
  });
  return Moment
}

export const getMomentWeeks = (data, key) => {
  const moment = getConfig()
  return data.reduce((acc, date) => {
    // create a composed key: 'year-week'
    const weekVal = `${moment(date[key]).week()}`;
    const wkUpdateVal = weekVal.length === 2 ? weekVal : `0${weekVal}`
    const year = weekVal === '1' && moment(date[key]).month() === 11 ? moment(date[key]).year() + 1 : moment(date[key]).year();
    const yearWeek = `${year}-${wkUpdateVal}`;

    // add this key as a property to the result object
    if (!acc[yearWeek]) {
      acc[yearWeek] = [];
    }

    // push the current date that belongs to the year-week calculated befor
    acc[yearWeek].push(date);

    return acc;
  }, {});
}


export const getMomentWeek = (date) => {
  const moment = getConfig()
  const yearWeek = `${moment(date).year()}-${moment(date).week()}`;
  return yearWeek;
}




export const getDateRangeOfWeek = (weekNo, y) => {
    var d1, numOfdaysPastSinceLastMonday, rangeIsFrom, rangeIsTo;
    // Returns the ISO week of the date.
    Date.prototype.getWeek = function() {
      const date = new Date(this.getTime());
      date.setHours(0, 0, 0, 0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
      // January 4 is always in week 1.
      const week1 = new Date(date.getFullYear(), 0, 1);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    d1 = new Date(y);
    numOfdaysPastSinceLastMonday = d1.getDay() - 2;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    d1.setDate(d1.getDate() + (7 * (weekNo - d1.getWeek())));
    rangeIsFrom = (d1.getMonth() + 1) + "/" + d1.getDate() + "/" + y;
    d1.setDate(d1.getDate() + 6);
    rangeIsTo = (d1.getMonth() + 1) + "/" + d1.getDate() + "/" + y;
    return rangeIsFrom + " - " + rangeIsTo;
};

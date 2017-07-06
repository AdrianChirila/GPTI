function mapMonth(monthNumber: number) {
  switch (monthNumber) {
    case 6:
      return 'Iulie'
  }
}

function mapDay(dayNumber: number) {
  switch (dayNumber) {
    case 1:
      return 'Luni';
    case 2:
      return 'Marti';
    case 3:
      return 'Miercuri';
    case 4:
      return 'Joi';
    case 5:
      return 'Vineri';
  }
}

export function displayDate(date: any) {
  let newDate: Date = new Date(date);
  console.log('XXXX DATE XXX', date);
  console.log('XXXX DATE XXX', newDate.getDate());
  // let newDate: String = new Date(date).toLocaleTimeString([], {month: 'long', day: '2-digit', hour: '2-digit', minute:'2-digit'});
  return mapDay(newDate.getDay()) + " " + newDate.getDate() + " " + mapMonth(newDate.getMonth()) + " " + newDate.getHours() + ":" + newDate.getMinutes()
}

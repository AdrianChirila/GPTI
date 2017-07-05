function eraseTimeZone(date: any) {
  return new Date(date).toLocaleTimeString([], {month: 'long', day: '2-digit', hour: '2-digit', minute:'2-digit'});
}

const dateFormat = (date) => {
  date = new Date(date);
  const year = adapt(date.getFullYear());
  const month = adapt(date.getMonth() + 1);
  const day = adapt(date.getDate());
  const hours = adapt(date.getHours());
  const minutes = adapt(date.getMinutes());
  const seconds = adapt(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
const adapt = (number) => {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}
export default dateFormat;
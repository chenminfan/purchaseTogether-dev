export const dataValue = (value) => {
  const DATE = new Date(value.toString().length === 13 ? value : value * 1000)
  let date: string | number = DATE.getDate(); //15
  let month: string | number = (DATE.getMonth() + 1)  //6
  let year: string | number = DATE.getFullYear();  //2016
  let hours: string | number = DATE.getHours();  //2016
  let minutes: string | number = DATE.getMinutes();  //2016
  let seconds: string | number = DATE.getSeconds();  //2016
  if (month < 2) {
    month = '0' + month
  }
  if (date < 2) {
    date = '0' + date
  }
  if (hours.toString().length < 2) {
    hours = '0' + hours
  }
  if (minutes.toString().length < 2) {
    minutes = '0' + minutes
  }
  if (seconds.toString().length < 2) {
    seconds = '0' + seconds
  }
  if (value.toString().length === 13) {
    return [year, month, date,].join('/')
  } else {
    return [year, month, date,].join('/') + " " + [hours, minutes, seconds].join(':')
  }

}

export const telValue = (value) => {
  let tel = value;
  return tel.substring(0, 3) + tel.substring(0, 3).padStart(tel.toString().length - 3, '＊')
}

export const nameValue = (value) => {
  let name = value;
  return name.substring(0, 1) + '＊＊' + name.substring((name.length / 2) + 1)
}
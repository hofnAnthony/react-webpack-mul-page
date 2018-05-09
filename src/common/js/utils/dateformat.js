/**
 * 时间格式化
 * @param {str} format eg:yyyy-MM-dd hh:mm:ss
 */
export const dateFormat = (date, format) => {
  var dateProp = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S+': date.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in dateProp) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? dateProp[k] : ('00' + dateProp[k]).substr(('' + dateProp[k]).length)
      )
    }
  }
  return format
}

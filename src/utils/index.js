/**
 * 判断是否为空
 * @param {*} value 需要判断的值
 * @return {boolean}
 */
export const isNull = (value) => {
  return value === '' || value === undefined || value === null
}

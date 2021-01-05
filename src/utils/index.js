export const convertUrlToHttps = (url) => {
  const urlArr = url.split(':')
  urlArr[0] = 'https'
  return urlArr.join(':')
}
function getMinMax(str) {
  let arr = str.split(' ').filter(item => +item).sort((a,b) => a-b);;
  let result = {
      min: +arr.shift(),
      max: +arr.pop(),
  }
  return result;
}
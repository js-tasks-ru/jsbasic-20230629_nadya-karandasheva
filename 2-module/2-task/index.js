function isEmpty(obj) {
  for(const key in obj){
    if( obj[key] || obj[key] === undefined){
      return false;
    }
  }
  return true;
}

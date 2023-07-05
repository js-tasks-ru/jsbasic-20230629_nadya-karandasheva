function truncate(str, maxlength) {
  let endOfStr = "…";
  
  if(str.length <= maxlength){
    return str;
  }
  return str.slice(0, maxlength-1) + endOfStr;
}

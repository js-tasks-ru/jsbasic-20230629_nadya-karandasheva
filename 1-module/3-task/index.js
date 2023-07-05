function ucFirst(str) {

  if(str.length >0){
    let firsSymbol = str[0].toUpperCase();

    return firsSymbol + str.slice(1);
  }

  return str;
}

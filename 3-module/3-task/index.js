function camelize(str) {

  if(str == '' ){ return str};

  let arrOfStr = str.split('-');
    
  let result = [arrOfStr[0]];

  arrOfStr.forEach((element, index) => {
    if(index == 0) return;
    let upperLetter = element[0].toUpperCase();
    
    result.push(upperLetter + element.slice(1));
  });

  return result.join('');

}
function sumSalary(salaries) {

  let result = 0;

  for( const key in salaries ){

    if(salaries[key] === NaN 
      || salaries[key] === -Infinity 
      || salaries[key] === Infinity 
      || !Number.isInteger(salaries[key]) ) {
      continue;
      } else {
        result = result + salaries[key];
      }

  }

  return result;
}

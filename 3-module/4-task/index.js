function showSalary(users, age) {
  let result = "";
  users.filter(user =>user.age <= age)
  .map(user => user.name +", "+ user.balance)
  .forEach((element,index,arr)=>{
      if(index == arr.length-1){
        result = result + element;
      }else {
          result = result + element + '\n';
      }
  });
  
  return result;
}

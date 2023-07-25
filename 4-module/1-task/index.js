function makeFriendsList(friends) {
  let list = document.createElement('ul');

  friends.forEach(element => {
    let item = `<li>${element.firstName} ${element.lastName}</li>`
    list.insertAdjacentHTML('beforeend',item);
  });

  return list;
}

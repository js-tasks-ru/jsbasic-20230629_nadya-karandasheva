function toggleText() {
  let toggleBtn = document.querySelector('.toggle-text-button');
  let text = document.getElementById('text');

  toggleBtn.addEventListener('click', () => {
    if(text.hasAttribute('hidden')){
      text.removeAttribute('hidden','');
    } else {
      text.setAttribute('hidden','');
    }
  })
}

const { ipcRenderer } = require('electron');

const btnElement = document.querySelector('.btn-add-music');

function handleClick(event) {
  if (event.target === btnElement) {
    ipcRenderer.send('addMusic', 'from index window');
  }
}

ipcRenderer.on('reply', (event, data) => {
  console.log(data);
});

document.body.addEventListener('click', handleClick);
window.onunload = () => {
  document.body.removeEventListener('click', handleClick);
}

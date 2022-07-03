import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const signout = document.getElementById('signout');
  const username = document.getElementById('username');

  chrome.storage.sync.get('username', ({ username: name }) => {
    name && username && (username.innerText = name);
  });

  signout?.addEventListener('click', (event: MouseEvent): void => {
    chrome.storage.sync.remove('username');
    chrome.runtime.sendMessage(
      {
        type: 'SIGN OUT',
      },
      (_) => _
    );
    const popup = 'signin.html';
    chrome.action.setPopup({ popup });
    window.location.href = popup;
  });
});

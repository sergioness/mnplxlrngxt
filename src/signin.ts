'use strict';

import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signInForm');
  const signin = document.getElementById('signin');
  const username = document.getElementById('username') as HTMLInputElement;
  const password = document.getElementById('password') as HTMLInputElement;
  const pswd = 'password';

  signin?.addEventListener('click', (event: MouseEvent): void => {
    password.value = password.value === pswd ? password.value : '';
  });
  form?.addEventListener(
    'submit',
    async (event: SubmitEvent): Promise<void> => {
      event.preventDefault();
      chrome.storage.sync.set({ username: username.value });
      const popup = 'welcome.html';
      chrome.action.setPopup({ popup });
      window.location.href = popup;
      chrome.runtime.sendMessage({ type: 'SIGN IN' }, (_) => _);
    }
  );
});

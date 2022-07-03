let time: any;
const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
const messageHandlers = new Map([
  ['SIGN IN', resume],
  ['SIGN OUT', pause],
  ['ACTIVE', resume],
  ['IDLE', pause],
]);

chrome.storage.sync.get('username', ({ username }) => {
  username && chrome.runtime.sendMessage({ type: 'SIGN IN' }, (_) => _);
});

chrome.runtime.onMessage.addListener(
  ({ type, payload }, sender, sendResponse) => {
    messageHandlers.get(type)?.call(global);
    sendResponse({});
    return true;
  }
);

function onTimeout() {
  chrome.runtime.sendMessage({ type: 'IDLE' }, (_) => _);
}

function resetTimer() {
  clearTimeout(time);
  time = setTimeout(onTimeout, 5000);
}

function resume(): void {
  events.forEach((name) => document.addEventListener(name, resetTimer, true));
  resetTimer();
}

function pause(): void {
  events.forEach((name) =>
    document.removeEventListener(name, resetTimer, true)
  );
}

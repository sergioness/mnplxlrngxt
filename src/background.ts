chrome.runtime.onInstalled.addListener(() => {
  const log = (...msg: any[]): void => console.log('[background]', ...msg);

  log('installed');

  type Handler = (
    message: any,
    sender: chrome.runtime.MessageSender | undefined,
    sendResponse: (response?: any) => void
  ) => any;

  const handlers = new Map<string, Handler>([
    ['SIGN IN', forwardToContent],
    ['SIGN OUT', forwardToContent],
    ['ACTIVE', forwardToContent],
    ['IDLE', forwardToContent],
    ['LEAVE', onLeave],
  ]);

  chrome.storage.sync.get('username', ({ username }) => {
    username && chrome.action.setPopup({ popup: 'welcome.html' });
  });

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    return handlers.get(msg.type)?.call(null, msg, sender, sendResponse);
  });

  function forwardToContent(
    message: any,
    sender: chrome.runtime.MessageSender | undefined,
    sendResponse: (response?: any) => void
  ): any {
    log(message.type);
    chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
      chrome.tabs.sendMessage(id as number, message, sendResponse);
    });
    return true;
  }

  function onLeave(
    message: any,
    sender: chrome.runtime.MessageSender | undefined,
    sendResponse: (response?: any) => void
  ): any {
    const { type, url } = message;
    log(type);
    chrome.tabs.create({ url });
    return true;
  }
});

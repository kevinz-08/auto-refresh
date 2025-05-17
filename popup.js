document.getElementById('start').addEventListener('click', async () => {
  const interval = parseInt(document.getElementById('interval').value, 10) * 1000;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (ms) => {
      if (window._refreshInterval) clearInterval(window._refreshInterval);
      window._refreshInterval = setInterval(() => location.reload(), ms);
    },
    args: [interval]
  });
});

document.getElementById('stop').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      if (window._refreshInterval) {
        clearInterval(window._refreshInterval);
        delete window._refreshInterval;
      }
    }
  });
});
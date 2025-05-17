document.getElementById('start').addEventListener('click', async () => {
    const interval = parseInt (document.getElementById('interval').value) * 1000;
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        func: (ms) => {
            window.autoRefreshInterval = setInterval()
        },
        args: [interval]
    });
});

document.getElementById('stop').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: { tabId: tad.id},
        func: () => {
            clearInterval(window.autoRefreshInterval);
        }
    });
});
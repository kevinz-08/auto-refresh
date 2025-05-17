// Service Worker para la extensión
chrome.runtime.onInstalled.addListener(function() {
    console.log('Auto Reload Extension instalada');
});

// Limpiar intervalos cuando se cierra una pestaña
chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    chrome.storage.local.remove([`autoReload_${tabId}`]);
});
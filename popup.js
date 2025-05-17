document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const secondsInput = document.getElementById('seconds');
    const statusDiv = document.getElementById('status');
    
    // Obtener el estado actual
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const tabId = tabs[0].id;
        
        // Verificar si ya está activo el auto-reload
        chrome.storage.local.get([`autoReload_${tabId}`], function(result) {
            if (result[`autoReload_${tabId}`]) {
                statusDiv.textContent = 'Activo';
                statusDiv.style.color = 'green';
            }
        });
    });
    
    startBtn.addEventListener('click', function() {
        const seconds = parseInt(secondsInput.value) || 5;
        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tabId = tabs[0].id;
            
            // Enviar mensaje al content script
            chrome.tabs.sendMessage(tabId, {
                action: 'startAutoReload',
                seconds: seconds
            });
            
            // Guardar estado
            chrome.storage.local.set({[`autoReload_${tabId}`]: seconds});
            
            statusDiv.textContent = `Activo (${seconds}s)`;
            statusDiv.style.color = 'green';
        });
    });
    
    stopBtn.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tabId = tabs[0].id;
            
            // Enviar mensaje al content script
            chrome.tabs.sendMessage(tabId, {
                action: 'stopAutoReload'
            });
            
            // Limpiar estado
            chrome.storage.local.remove([`autoReload_${tabId}`]);
            
            statusDiv.textContent = 'Inactivo';
            statusDiv.style.color = '#666';
        });
    });
});
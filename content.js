let autoReloadInterval = null;

// Escuchar mensajes desde el popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'startAutoReload') {
        startAutoReload(request.seconds);
        sendResponse({status: 'started'});
    } else if (request.action === 'stopAutoReload') {
        stopAutoReload();
        sendResponse({status: 'stopped'});
    }
});

function startAutoReload(seconds) {
    // Limpiar intervalo anterior si existe
    if (autoReloadInterval) {
        clearInterval(autoReloadInterval);
    }
    
    console.log(`Auto-reload iniciado: cada ${seconds} segundos`);
    
    autoReloadInterval = setInterval(function() {
        console.log('Recargando página automáticamente...');
        location.reload();
    }, seconds * 1000);
}

function stopAutoReload() {
    if (autoReloadInterval) {
        clearInterval(autoReloadInterval);
        autoReloadInterval = null;
        console.log('Auto-reload detenido');
    }
}

// Recuperar estado al cargar la página
chrome.storage.local.get([`autoReload_${chrome.runtime.id}`], function(result) {
    const key = Object.keys(result)[0];
    if (key && result[key]) {
        startAutoReload(result[key]);
    }
});
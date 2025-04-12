// var url = window.location.href;
// var swLocation = '/sw.js';


// if (navigator.serviceWorker) {
//     if (url.includes('localhost')) {
//         swLocation = '/sw.js'
//     }
//     navigator.serviceWorker.register(swLocation);
// }


// Detectar cambios de conexión
function isOnline() {
    if (navigator.onLine) {
        // tenemos conexión
        // console.log('online');
        var isonline = mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'Ok'
        });
        isonline.show();

    } else {
        // no tenemos conexión
        // console.log('offline');
        var isonline = mdtoast('Offline', {
            interaction: true,
            actionText: 'Ok',
            interactionTimeout: 5000,
            type: 'warning'
        });
        isonline.show();
    }
}

window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

isOnline();
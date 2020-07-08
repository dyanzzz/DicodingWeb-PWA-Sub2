// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    /*window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function() {
                console.log("Register ServiceWorker success");
            })
            .catch(function() {
                console.log("Register ServiceWorker failed");
            });
    });*/
    registerServiceWorker();
    requestPermission();
} else {
    console.log("ServiceWorker not support in this browser.");
}


// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker
        .register('./service-worker.js')
        .then(function (registration) {
            console.log('Register ServiceWorker success.');
            return registration;
        }).catch(function (err) {
            console.error('Register ServiceWorker failed: ', err);
        });
}

// Request fitur Notification API
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Notification feature not permitted.");
                return;
            } else if (result === "default") {
                console.error("The user closes the permission request dialog box.");
                return;
            }
        
            //navigator.serviceWorker.getRegistration().then(function(reg) {
                //reg.showNotification('Notifikasi diijinkan!');
                //console.log('Notifikasi diijinkan!');
            //});
            //add code to subscribe to push messages from FCM
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BHRceoyOmhhR4ffa4l71VOR8dnfsjDMPJ3aHtf8mbipSR_jdXoi0WC95TZfFPOR3WNz4p8slrQ4DIjq0RS4IEVE")

                    }).then(function(subscribe) {
                        console.log('Successfully subscribed with endpoint: ', subscribe.endpoint);
                        console.log('Successfully subscribed with p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Successfully subscribed with auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Unable to subscribe ', e.message);
                    });
                });
            }

        });
    }else{
        console.error("The browser does not support notifications.");
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

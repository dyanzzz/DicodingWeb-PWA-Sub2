const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHRceoyOmhhR4ffa4l71VOR8dnfsjDMPJ3aHtf8mbipSR_jdXoi0WC95TZfFPOR3WNz4p8slrQ4DIjq0RS4IEVE",
    "privateKey": "mv8fnMO8RwSjik5FgaarPm3vUKeH5SrbnGCXkcYHPhs"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cm4NG7aXYA8:APA91bFMR5v3cJqMIWT-C2sTEc2ReH9Wj6Vs5wY4CZl6bz-1NRAUSyD7BFdbAdyxXDXmKD9PKnqXF9e5RCuum1IrDO7jFHaBgBYQyMa6sjXiqRWOOYrBnAwDiCg4z4r0aJ5qVUcbAOFh",
    "keys": {
        "p256dh": "BOU7j4NXCR2REwLXNciwYgiiZ1HfuKPrNdAPGwGioAbpQ2g64CPAS94EqfU0B+BfcfJwcV7+31fa/75aNP27axQ=",
        "auth": "BYd3BO/GgMf6e4JkM7nVjA=="
    }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '489407451958',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

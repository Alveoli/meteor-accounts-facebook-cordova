// https://github.com/Wizcorp/phonegap-facebook-plugin#get-status
CFB.getLoginStatus = function (callback) {
    console.log('getLoginStatus inside');

    var onError = function (message) {
        console.log('onError: ' + JSON.stringify(message, null, '\t'));

        callback(new Error(message.errorMessage), null);
    };
    var onSuccess = function (res) {
        console.log('onSuccess: ' + JSON.stringify(res, null, '\t'));

        callback(null, res);
    };
    facebookConnectPlugin.getLoginStatus(onSuccess, onError);
};

// https://github.com/Wizcorp/phonegap-facebook-plugin#login
CFB.loginCodova = function (callback) {
    console.log('loginCodova inside');
    var onError = function (message) {
        console.log('onError: ' + JSON.stringify(message, null, '\t'));
        callback(new Error(message.errorMessage), null);
    };
    var onSuccess = function (res) {
        console.log('onSuccess: ' + JSON.stringify(res, null, '\t'));
        callback(null, res);
    };
    facebookConnectPlugin.login(CFB.getPermissions(), onSuccess, onError);
};

// https://github.com/Wizcorp/phonegap-facebook-plugin#show-a-dialog
CFB.shareFeed = function (options, callback) {
    options.method = "feed";
    var onError = function (message) {
        callback(new Error(message.errorMessage), null);
    };
    var onSuccess = function (res) {
        callback(null, res);
    };
    facebookConnectPlugin.showDialog(options, onSuccess, onError);
};
CFB.share = function (options, callback) {
    options.method = "share";
    var onError = function (message) {
        callback(new Error(message.errorMessage), null);
    };
    var onSuccess = function (res) {
        callback(null, res);
    };
    facebookConnectPlugin.showDialog(options, onSuccess, onError);
};

/**
 Meteor.startup(function () {
    Meteor.setTimeout(function () {

        CFB.shareFeed({
            picture:'https://www.google.co.jp/logos/doodles/2014/doodle-4-google-2014-japan-winner-5109465267306496.2-hp.png',
            name:'Test Post',
            message:'First photo post',    
            caption: 'Testing using phonegap plugin',
            description: 'Posting photo using phonegap facebook plugin'
        }, function (err, res) {
            console.log(err);
            console.log(res);
        });
        CFB.share({
            href: 'https://developers.facebook.com/docs/'
        }, function (err, res) {
            console.log(err);
            console.log(res);
        });

        facebookConnectPlugin.showDialog({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object:'https://developers.facebook.com/docs/',
            })
        }, function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    }, 2000);
});
 */
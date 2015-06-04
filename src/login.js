Accounts.oauth.registerService('facebook');
Meteor.loginWithFacebook = function(options, callback) {
    console.log('Meteor.loginWithFacebook');
    // support a callback without options
    if (! callback && typeof options === "function") {
        callback = options;
        options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);

    var fbLoginSuccess = function (data) {
        console.log('fbLoginSuccess');
        data.cordova = true;
        Accounts.callLoginMethod({
            methodArguments: [data],
            userCallback: callback
        });
    }

    if (Meteor.isCordova) {
        console.log('isCordova');
        CFB.getLoginStatus(function (error, response) {
            console.log('getLoginStatus');
            if(error) {
                callback(error, null);
                return;
            }
            if (response.status != "connected") {
                console.log('connected');
                CFB.loginCodova(function (err, res) {
                    console.log('loginCodova');
                    if(err) {
                        console.log('err');
                        console.log('err: '+err);
                        callback(err, null);
                        return;
                    }
                    console.log('loginCodova 2');
                    fbLoginSuccess(res);
                });
            }
            else {
                console.log('else connected');
                fbLoginSuccess(response);
            }
        });
    } else {
        console.log('else isCordova');
        Facebook.requestCredential(options, credentialRequestCompleteCallback);
    }
};

//https://github.com/meteor/meteor/blob/47b022841b40f5ca37adccc778ade373559519e5/packages/accounts-ui-unstyled/login_buttons_single.js
// XXX from http://epeli.github.com/underscore.string/lib/underscore.string.js
var capitalize = function(str){
    str = str == null ? '' : String(str);
    return str.charAt(0).toUpperCase() + str.slice(1);
};
var on = false;
var login = function (cb) {
    console.log('');
    if(on)
        return;
    on = true;
    var serviceName = 'facebook';
    var callback = function (err) {
        on = false;
        if (!err) {
            cb();
        } else if (err instanceof Accounts.LoginCancelledError) {
            cb(new Error('Login is cancelled.'));
        } else if (err instanceof ServiceConfiguration.ConfigError) {
            cb(new Error('ConfigureServiceError: Some fuses just blow on our end. Dispatching monkey to fix!'));
        } else {
            cb(new Error(err.message || err.errorMessage || err.reason || "Unknown error"));
        }
    };
    // XXX Service providers should be able to specify their
    // `Meteor.loginWithX` method name.
    var loginWithService = Meteor["loginWith" +
        (serviceName === 'meteor-developer' ?
            'MeteorDeveloperAccount' :
            capitalize(serviceName))];

    var options = {}; // use default scope unless specified
    if (Accounts.ui._options.requestPermissions[serviceName])
        options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
    if (Accounts.ui._options.requestOfflineToken[serviceName])
        options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
    loginWithService(options, callback);
}
CFB.login = login;
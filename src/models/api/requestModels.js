﻿var LoginRequest = function (login) {
    this.folderId = login.folderId;
    this.organizationId = login.organizationId;
    this.name = login.name ? login.name.encryptedString : null;
    this.uri = login.uri ? login.uri.encryptedString : null;
    this.username = login.username ? login.username.encryptedString : null;
    this.password = login.password ? login.password.encryptedString : null;
    this.notes = login.notes ? login.notes.encryptedString : null;
    this.favorite = login.favorite;
};

var FolderRequest = function (folder) {
    this.name = folder.name ? folder.name.encryptedString : null;
};

var TokenRequest = function (email, masterPasswordHash, provider, token, remember, device) {
    this.email = email;
    this.masterPasswordHash = masterPasswordHash;
    this.token = token;
    this.provider = provider;
    this.remember = remember || remember !== false;
    this.device = null;
    if (device) {
        this.device = device;
    }

    this.toIdentityToken = function () {
        var obj = {
            grant_type: 'password',
            username: this.email,
            password: this.masterPasswordHash,
            scope: 'api offline_access',
            client_id: 'browser'
        };

        if (this.device) {
            obj.deviceType = this.device.type;
            obj.deviceIdentifier = this.device.identifier;
            obj.deviceName = this.device.name;
            obj.devicePushToken = this.device.pushToken;
        }

        if (this.token && this.provider != null && (typeof this.provider !== 'undefined')) {
            obj.twoFactorToken = this.token;
            obj.twoFactorProvider = this.provider;
            obj.twoFactorRemember = this.remember ? '1' : '0';
        }

        return obj;
    };
};

var RegisterRequest = function (email, masterPasswordHash, masterPasswordHint, key) {
    this.name = null;
    this.email = email;
    this.masterPasswordHash = masterPasswordHash;
    this.masterPasswordHint = masterPasswordHint ? masterPasswordHint : null;
    this.key = key;
};

var PasswordHintRequest = function (email) {
    this.email = email;
};

var TwoFactorEmailRequest = function (email, masterPasswordHash) {
    this.email = email;
    this.masterPasswordHash = masterPasswordHash;
};

var DeviceTokenRequest = function () {
    this.pushToken = null;
};

var DeviceRequest = function (appId, utilsService) {
    this.type = utilsService.getDeviceType();
    this.name = utilsService.getBrowser();
    this.identifier = appId;
    this.pushToken = null;
};

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  KaipullaCore: () => KaipullaCore,
  createUpstashProvider: () => import_database.createUpstashProvider,
  initDatabase: () => import_database.initDatabase
});
module.exports = __toCommonJS(src_exports);

// src/authentication/index.ts
var import_http_errors = __toESM(require("http-errors"));
var import_lodash = require("lodash");

// src/authentication/encryption.ts
var import_bcrypt = __toESM(require("bcrypt"));
var import_crypto_js = require("crypto-js");
var import_crypto = require("crypto");
var getHashString = (accessKey, secret_key) => {
  return (0, import_crypto.createHmac)("sha512", secret_key).update(accessKey).digest("hex");
};
var decrypt = (cipherText, secret_key) => {
  let bytes = import_crypto_js.AES.decrypt(cipherText, secret_key);
  const data = JSON.parse(bytes.toString(import_crypto_js.enc.Utf8));
  return data;
};

// src/authentication/index.ts
var Auth = class {
  constructor(kaipullaCoreOptions) {
    this.kaipullaCoreOptions = kaipullaCoreOptions;
  }
  getBearerTokenFromHeader(request) {
    if (request.headers && request.headers.authorization) {
      const splitedAuthorization = request.headers.authorization.split(/\s+/);
      if (splitedAuthorization[0].toLowerCase() !== "bearer" || splitedAuthorization.length !== 2) {
        return null;
      }
      return splitedAuthorization[1];
    } else {
      throw new import_http_errors.default.Forbidden("Bearer token not found | Forbidden Access");
    }
  }
  async authenticate(request) {
    return new Promise(async (resolve) => {
      const bearerToken = this.getBearerTokenFromHeader(request);
      if (!bearerToken) {
        return { authenticated: false };
      }
      const hashedBearerToken = getHashString(bearerToken, this.kaipullaCoreOptions.encryption_key);
      const encryptedProfile = await this.kaipullaCoreOptions.db.getOne({ model: "secure-profiles" /* SecureProfile */, id: hashedBearerToken });
      if (encryptedProfile == null ? void 0 : encryptedProfile.data) {
        const decryptedDataString = decrypt(encryptedProfile.data, this.kaipullaCoreOptions.encryption_key);
        const profile = JSON.parse(decryptedDataString);
        const now = new Date();
        if (!(0, import_lodash.isNil)(encryptedProfile.expiresAt)) {
          const expirationDate = new Date(encryptedProfile.expiresAt);
          if (expirationDate < now) {
            resolve({ authenticated: false, profile: null, error: import_http_errors.default.Unauthorized("Token Expired") });
          }
        }
        await this.kaipullaCoreOptions.db.update({ model: "secure-profiles" /* SecureProfile */, id: hashedBearerToken, values: { lastUsedAt: now } });
        resolve({ authenticated: true, profile });
      } else {
        resolve({ authenticated: false, profile: null });
      }
    });
  }
};

// src/kaipulla.core.ts
var KaipullaCore = class {
  constructor(kaipullaCoreOptions) {
    this.kaipullaCoreOptions = kaipullaCoreOptions;
    this.auth = this._initAuth(kaipullaCoreOptions);
  }
  _initAuth(kaipullCoreOptions) {
    return new Auth(kaipullCoreOptions);
  }
};

// src/index.ts
var import_database = require("@helluwa/database");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KaipullaCore,
  createUpstashProvider,
  initDatabase
});

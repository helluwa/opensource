// src/authentication/index.ts
import HttpError from "http-errors";
import { isNil } from "lodash";

// src/authentication/encryption.ts
import bcrypt from "bcrypt";
import { AES, enc } from "crypto-js";
import { createHmac } from "crypto";
var getHashString = (accessKey, secret_key) => {
  return createHmac("sha512", secret_key).update(accessKey).digest("hex");
};
var decrypt = (cipherText, secret_key) => {
  let bytes = AES.decrypt(cipherText, secret_key);
  const data = JSON.parse(bytes.toString(enc.Utf8));
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
      throw new HttpError.Forbidden("Bearer token not found | Forbidden Access");
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
        if (!isNil(encryptedProfile.expiresAt)) {
          const expirationDate = new Date(encryptedProfile.expiresAt);
          if (expirationDate < now) {
            resolve({ authenticated: false, profile: null, error: HttpError.Unauthorized("Token Expired") });
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
import { initDatabase, createUpstashProvider } from "@helluwa/database";
export {
  KaipullaCore,
  createUpstashProvider,
  initDatabase
};

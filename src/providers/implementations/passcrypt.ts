import { injectable } from "inversify";
import crypto from "crypto";

import { PasswordProvider } from "../password";

@injectable()
export class PasscryptProvider implements PasswordProvider {
  encrypt(password: string): string {
    const _ukey = crypto.randomBytes(10);
    const encodedFingerprint = Buffer.from(
      JSON.stringify({ _ukey, typ: "PASSCRYPT" })
    ).toString("base64url");

    const hash = crypto
      .createHmac("sha256", encodedFingerprint)
      .update(password)
      .digest("base64url");

    return `${encodedFingerprint}.${hash}`;
  }

  verify(input: string, passcryptHash: string): boolean {
    const [fingerprint, hash] = passcryptHash.split(".");

    const hashResult = crypto
      .createHmac("sha256", fingerprint)
      .update(input)
      .digest("base64url");

    if (hashResult !== hash) return false;

    return true;
  }
}

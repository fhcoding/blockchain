import {
  Cipher,
  createCipheriv,
  generateKeyPair,
  generateKeyPairSync,
  randomFill,
  randomFillSync,
  randomUUID,
} from "crypto";

export class Client {
  private _privateKey!: string;
  private _publicKey!: string;
  private _signer!: Cipher;

  constructor() {
    const algorithm = "aes-256-cbc";
    const rand = randomUUID();
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 1024,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: algorithm,
        passphrase: rand,
      },
    });
    this._privateKey = privateKey;
    this._publicKey = publicKey;
    const hexPrivate = this.toHex(this._privateKey);
    this._signer = createCipheriv(
      algorithm,
      hexPrivate.slice(0, 32),
      randomFillSync(new Uint8Array(16))
    );
  }

  get identity(): string {
    return this.toHex(this._publicKey);
  }

  private toHex(key: string): string {
    if (!key) return "";
    return Buffer.from(key, "utf-8").toString("hex");
  }
}

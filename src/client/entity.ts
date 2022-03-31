import {
  Cipher,
  createCipheriv,
  generateKeyPairSync,
  randomFillSync,
  randomUUID,
} from "crypto";

export class Client {
  private _privateKey!: string;
  private _publicKey!: string;
  public signer!: Cipher;
  public static clients: { _publicKey: string }[] = [];
  private static clientsMap: any = {};

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
    this.signer = createCipheriv(
      algorithm,
      hexPrivate.slice(0, 32),
      randomFillSync(new Uint8Array(16))
    );
    this._save();
  }

  get identity(): string {
    return this.toHex(this._publicKey);
  }

  private _save() {
    Client.clients.push({ _publicKey: this._publicKey });
    Client.clientsMap[this.identity] = this;
  }

  private toHex(key: string): string {
    if (!key) return "";
    return Buffer.from(key, "utf-8").toString("hex");
  }

  public static find(publicKey: string) {
    return publicKey ? this.clientsMap[publicKey] : null;
  }
}

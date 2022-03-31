import { Client } from "../client/entity";

export class Transaction {
  public sender: Client;
  public recipient: string;
  public value: number;
  public time: Date;
  public static transactions: {
    sender: string;
    recipient: string;
    value: number;
    time: Date;
  }[] = [];
  public static transactionsMap: any = {};

  constructor(sender: Client, recipient: string, value: number) {
    this.sender = sender;
    this.recipient = recipient;
    this.value = value;
    this.time = new Date();
    this._save();
  }

  get data(): { sender: string; recipient: string; value: number; time: Date } {
    const { sender, ...d } = this;
    return { sender: sender.identity, ...d };
  }

  private _save() {
    Transaction.transactions.push(this.data);
    Transaction.transactionsMap[this.sign()] = this;
  }

  sign() {
    const data = JSON.stringify(this.data);
    const { signer } = this.sender;
    signer.update(data, "utf8", "hex");
    return signer.final("hex");
  }
}

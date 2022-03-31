import { Transaction } from "../transaction/entity";

export class Block {
  public verifiedTransactions: Transaction[];
  public previousBlock: string | null;
  public nonce: string | null;
  public static blocks: Block[] = [];
  public static blocksMap: any = {};
  public static lastBlockHash: string = "";

  constructor(previousBlock = null, transactions = [], nonce = null) {
    const self = Block;
    if (self.blocks.length && !previousBlock && !nonce) {
      throw new Error(
        "Only first block should has empty nonce and empty previous block hash"
      );
    }
    this.verifiedTransactions = transactions;
    this.nonce = nonce;
    this.previousBlock = previousBlock;
  }
}

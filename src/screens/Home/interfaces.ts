export interface Legislator {
  id: string;
  name: string;
  opposed: Number;
  supported: Number;
}

export interface Bill {
  id: string;
  title: string;
  sponsor_id: string;
  opposed: Number;
  supported: Number;
  vote?: Vote;
  sponsor?: Legislator;
}

export interface Vote {
  id: string;
  bill_id: string;
}

export interface VoteResult {
  id: string;
  legislator_id: string;
  vote_id: string;
  vote_type: "1" | "2";
}

export type Counter = {
  [key: string]: number;
};

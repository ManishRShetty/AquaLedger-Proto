export type CatchData = {
  species: string;
  location: string;
  date: string;
  method: string;
};

export type CatchResult = CatchData & {
  id: string;
  score: number;
  rationale: string;
};

import { Character } from "./character";

export interface CharacterResponse {
  info: ResponseInfo;
  results: Character[];
}

interface ResponseInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

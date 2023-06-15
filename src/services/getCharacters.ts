import { CharacterResponse } from "../interfaces/characterResponse";

const baseURL = "https://rickandmortyapi.com/api/character";

export default function getCharacters(
  page: number
): Promise<CharacterResponse> {
  return fetch(`${baseURL}/?page=${page}`).then((res) => res.json());
}

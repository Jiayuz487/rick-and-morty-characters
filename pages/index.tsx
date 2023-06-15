import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { Character } from "../src/interfaces/character";
import { CharacterResponse } from "../src/interfaces/characterResponse";
import useQuery from "../src/hooks/useQuery";
import getCharacters from "../src/services/getCharacters";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [characters, setCharacters] = useState<Character[]>([]);

  const [data, error, isLoading, isError] = useQuery<CharacterResponse, Error>(
    [page],
    () => getCharacters(page)
  );

  function onPageChange(event: React.ChangeEvent<unknown>, page: number) {
    setPage(page);
  }

  useEffect(() => {
    if (data) {
      setCount(data.info.pages);
      setCharacters(data.results);
    }
  }, [data]);

  return (
    <Container maxWidth="md">
      <Typography align="center" variant="h6" sx={{ m: 2 }}>
        Rick and Morty Characters
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        spacing={{ xs: 2, md: 4 }}
      >
        {characters.map((character) => {
          return (
            <Grid item key={character.id}>
              <Card sx={{ maxWidth: 250 }}>
                <img src={character.image}></img>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {character.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="center" sx={{ m: 1 }}>
        <Pagination
          color="primary"
          count={count}
          onChange={onPageChange}
        ></Pagination>
      </Box>
    </Container>
  );
}

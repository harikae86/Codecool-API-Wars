import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// MUI imports
import { withStyles, useTheme, makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ButtonGroup, Grid, Typography } from "@mui/material";
import CustomModal from "./components/CustomModal";
import { TableContainer } from "@material-ui/core";
import TableComponent from "./components/TableComponent";

const Home = (props) => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);

  const fetchNext = () => {
    fetch(planets.next)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
        setPage(page + 1);
      });
  };

  const fetchPrev = () => {
    fetch(planets.previous)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data);
        setPage(page - 1);
      });
  };

  return (
    <div>
      <Box sx={{ my: 2, mx: "auto", textAlign: "center" }}>
        <Typography variant="h2"> Star Wars Universe Planets</Typography>
      </Box>
      <ButtonGroup
        variant="contained"
        aria-label="text button group"
        color="secondary"
        sx={{ my: 4 }}
      >
        <Button sx={{ px: 5 }} onClick={fetchPrev} disabled={page === 1}>
          Prev
        </Button>
        <Button onClick={fetchNext} sx={{ px: 5, py: 2 }}>
          Next
        </Button>
      </ButtonGroup>
      <TableComponent planets={planets} setPlanets={setPlanets} page={page} />
    </div>
  );
};

export default Home;

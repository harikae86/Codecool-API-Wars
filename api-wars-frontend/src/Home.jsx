import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableComponent from "./components/TableComponent";
import Typography from "@mui/material/Typography";

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
    <div style={{ width: "100%", paddingTop: "7rem" }}>
      <Box sx={{ my: 2, mx: "auto", width: "70%", textAlign: "center" }}>
        <Typography variant="h3" style={{ pt: 3 }}>
          Star Wars Universe Planets
        </Typography>
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

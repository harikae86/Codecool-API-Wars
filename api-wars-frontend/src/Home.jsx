import React from "react";
import { useEffect } from "react";
import { useState } from "react";

// MUI imports
import { withStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ButtonGroup, Grid, Typography } from "@mui/material";

import CustomModal from "./CustomModal";

const styles = (theme) => ({
  root: {
    display: "flex",
    marginTop: theme.spacing.unit * 3,
    overflowX: "hidden",
  },
  table: {
    minWidth: 340,
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
});

const Home = (props) => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const { classes } = props;

  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPlanets(data);
      });
    // eslint-disable-next-line
  }, []);

  //formátum átalakítás
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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

  // const style = {
  //   color: props.theme.palette.primary.light,
  // };

  return (
    <div>
      <Typography variant="h3" sx={{ ml: 4 }}>
        {" "}
        Star Wars Universe Planets
      </Typography>
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        color="secondary"
        sx={{ mt: 3, mb: 3 }}
      >
        <Button sx={{ pr: 4, pl: 4 }} onClick={fetchPrev} disabled={page === 1}>
          Prev
        </Button>
        <Button onClick={fetchNext} sx={{ pr: 4, pl: 4 }}>
          Next
        </Button>
      </ButtonGroup>
      <Paper className={classes.root} xs={12}>
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          {/* <TableContainer
          component={Paper}
          className="container"
          color="white"
          sx={{ mx: "auto", maxWidth: 1000, p: 1, m: 1 }}
        > */}
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableCell}>Name</TableCell>
                <TableCell className={classes.tableCell}>Diameter</TableCell>
                <TableCell className={classes.tableCell}>Climate</TableCell>
                <TableCell className={classes.tableCell}>Terrain</TableCell>
                <TableCell className={classes.tableCell}>
                  Surface Water Percentage
                </TableCell>
                <TableCell className={classes.tableCell}>Population</TableCell>
                <TableCell className={classes.tableCell}>Residents</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {planets.results?.map((planet) => (
                <TableRow
                  component="th"
                  scope="row"
                  className={classes.TableCell}
                  key={planet.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableCell}
                  >
                    {planet.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{`${numberWithCommas(
                    planet.diameter
                  )} km`}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {planet.climate}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {planet.terrain}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {planet.surface_water === "unknown"
                      ? planet.surface_water
                      : `${planet.surface_water}%`}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {planet.population === "unknown"
                      ? planet.population
                      : `${numberWithCommas(planet.population)} people`}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <CustomModal planet={planet} theme={props.theme} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </TableContainer> */}
        </Grid>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(Home);

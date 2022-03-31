import { useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { withStyles } from "@material-ui/core/styles";
import CustomModal from "./CustomModal";

const styles = (theme) => ({
  root: {
    display: "grid",
    marginTop: theme.spacing(3),
    overflowX: "hidden",
  },
  table: {
    minWidth: 340,
  },
  tableHead: {
    fontWeight: "bold",
  },
  tableCell: {
    paddingRight: 4,
    paddingLeft: 5,
  },
});

const TableComponent = (props) => {
  const { planets, setPlanets, page } = props;
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

  return (
    <Grid
      item
      xs={12}
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Table
        className={classes.table}
        style={{ backgroundColor: "#4e4e4e" }}
        aria-label="simple table"
        component={Table}
      >
        <TableHead className={classes.tableHead}>
          <TableRow>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Name
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Diameter
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Climate
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Terrain
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Surface Water Percentage
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Population
            </TableCell>
            <TableCell
              className={classes.tableCell}
              style={{ color: "#fff", fontWeight: "bold" }}
            >
              Residents
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planets.results?.map((planet) => (
            <TableRow
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
                scope="row"
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >
                {planet.name}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >{`${numberWithCommas(planet.diameter)} km`}</TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >
                {planet.climate}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >
                {planet.terrain}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >
                {planet.surface_water === "unknown"
                  ? planet.surface_water
                  : `${planet.surface_water}%`}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >
                {planet.population === "unknown"
                  ? planet.population
                  : `${numberWithCommas(planet.population)} people`}
              </TableCell>
              <TableCell
                className={classes.tableCell}
                style={{ color: "#fff" }}
              >
                <CustomModal planet={planet} theme={props.theme} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
};

export default withStyles(styles)(TableComponent);

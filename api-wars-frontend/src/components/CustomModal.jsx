import React, { useEffect } from "react";
import { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import Grid from "@mui/material/Grid";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { withStyles, useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: theme.palette.primary.dark,
      borderBottom: "1px solid white",
    },
  },
}));

const CustomModal = (props) => {
  const { planet } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [residents, setResidents] = useState([]);

  const fetchResidents = (planet) => {
    planet?.residents.map(async (resident) => {
      const response = await fetch(resident);
      const resJson = await response.json();
      setResidents((residents) => [...residents, resJson]);
    });
  };

  useEffect(() => {
    fetchResidents(planet);
  }, [planet]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    display: "grid",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxWidth: "75%",
    maxHeight: "90%",
    bgcolor: "#ffab00",
    color: "#262626",
    border: "2px solid #000",
    boxShadow: 10,
    overflowX: "hidden",
    p: 4,
    my: 2,
    mx: "auto",
    textAlign: "center",
  };

  return (
    <>
      {planet.residents.length > 0 ? (
        <Button sx={{ flexGrow: 1 }} variant="contained" onClick={handleOpen}>
          {planet.residents.length === 1
            ? `${planet.residents.length} resident`
            : `${planet.residents.length} residents`}
        </Button>
      ) : (
        "No known residents"
      )}
      <Modal open={open} onClose={handleClose}>
        <Grid
          item
          xs={12}
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={style}>
            <Typography
              variant="h4"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Residents on planet {planet.name}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Mass</TableCell>
                    <TableCell>Hair color</TableCell>
                    <TableCell>Skin color</TableCell>
                    <TableCell>Eye color</TableCell>
                    <TableCell>Birth year</TableCell>
                    <TableCell>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {residents?.map((resident, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{resident.name}</TableCell>
                        <TableCell>{resident.height}</TableCell>
                        <TableCell>{resident.mass}</TableCell>
                        <TableCell>{resident.hair_color}</TableCell>
                        <TableCell>{resident.skin_color}</TableCell>
                        <TableCell>{resident.eye_color}</TableCell>
                        <TableCell>{resident.birth_year}</TableCell>
                        <TableCell>{resident.gender}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Modal>
    </>
  );
};

export default CustomModal;

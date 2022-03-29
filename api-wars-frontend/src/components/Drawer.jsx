// React imports
import { useState } from "react";
import { Link } from "react-router-dom";
// MUI imports
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2rem",
  },
  icon: {
    color: "red",
  },
  background: {
    paper: "#4e4e4e",
  },
}));

const DrawerComponent = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link className={classes.link} to="/">
                Home
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link className={classes.link} to="/register">
                Registration
              </Link>
            </ListItemText>
          </ListItem>
          {!props.user?.userName && (
            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link className={classes.link} to="/login">
                  Login
                </Link>
              </ListItemText>
            </ListItem>
          )}
          {props.user?.userName && (
            <>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Typography className={classes.link}>
                    Hello, {props.user?.userName}
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Link
                    className={classes.link}
                    to="/"
                    onClick={() =>
                      fetch("/logout")
                        .then((res) => res.json())
                        .then((data) => props.logOut())
                        .catch((error) => console.log(error))
                    }
                  >
                    Logout
                  </Link>
                </ListItemText>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon className={classes.icon} />
      </IconButton>
    </>
  );
};

export default DrawerComponent;

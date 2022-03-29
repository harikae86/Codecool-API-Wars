import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import App from "../App";

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

const Menu = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.navlinks}>
      <Link to="/" className={classes.link}>
        Home
      </Link>
      <Link to="/register" className={classes.link}>
        Registration
      </Link>
      {!props.user?.userName && (
        <Link to="/login" className={classes.link}>
          Login
        </Link>
      )}
      {props.user?.userName && (
        <>
          {/* TODO Profile page */}
          <Link to="/profile" className={classes.link}>
            Hello, {props.user?.userName}
          </Link>

          <Link
            to="/"
            onClick={() =>
              fetch("/logout")
                .then((res) => res.json())
                .then((data) => props.logOut())
                .catch((error) => console.log(error))
            }
            className={classes.link}
          >
            Logout
          </Link>
        </>
      )}
    </div>
  );
};

export default Menu;

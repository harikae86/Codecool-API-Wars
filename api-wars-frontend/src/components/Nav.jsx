import DrawerComponent from "./Drawer";
import Menu from "./Menu";
import { useTheme, useMediaQuery } from "@material-ui/core";

const Nav = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <DrawerComponent user={props.user} logOut={props.logOut} />
  ) : (
    <div>
      <Menu user={props.user} logOut={props.logOut} />
    </div>
  );
};

export default Nav;

import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Nav from "./components/Nav";
import "./index.css";

// mui
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffab00",
      light: "#fff",
      dark: "#cfd8dc",
      text: {
        primary: "#262626",
      },
    },
    secondary: {
      main: "#424242",
    },
    warning: {
      main: "#b71c1c",
    },
    background: {
      paper: "#4e4e4e",
    },
    text: {
      primary: "#262626",
      secondary: "#4e4e4e",
    },
  },
  typography: {
    fontFamily: "Quicksand",
    h1: {
      fontFamily: "IBM Plex Mono",
    },
    h2: {
      fontFamily: "Droid Serif",
    },
    h3: {
      fontFamily: "IBM Plex Mono",
    },
    h4: {
      fontFamily: "IBM Plex Mono",
    },
    h5: {
      fontFamily: "IBM Plex Mono",
    },
    h6: {
      fontFamily: "IBM Plex Mono",
    },
    button: {
      fontFamily: "Bungee",
    },
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

function App() {
  const [user, setUser] = useState("");

  const handleSignUpOnSuccess = () => {
    console.log("sikeres regisztráció");
  };
  const handleSignInOnSuccess = () => {
    console.log("done it");
  };

  const addUser = (user) => {
    setUser(user);
  };

  const logOut = () => {
    setUser();
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Nav user={user} logOut={logOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Register onSuccess={handleSignUpOnSuccess} theme={theme} />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                onSuccess={handleSignInOnSuccess}
                addUser={addUser}
                theme={theme}
              />
            }
          />
        </Routes>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;

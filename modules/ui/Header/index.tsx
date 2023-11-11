import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import navList from "@modules/ui/Header/consts/navbar.const";
import Link from "next/link";
import { NavLink } from "./elements";
import { useAppDispatch } from "@core/hooks/redux";
import { logout } from "@modules/auth/reducer/actions";
import { getIsAuth } from "@modules/Auth/reducer/selectors";
import { useSelector } from "react-redux";

export const Header = () => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const visibleItemMenu = isAuth ? "auth" : "";

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ width: "100px" }}
          >
            LOGO
          </Typography>
          <Grid container justifyContent="space-between">
            <Grid sx={{ display: "flex" }} item>
              {navList.map(({ link, title, visible }) => {
                return (
                  (visible.includes(visibleItemMenu) ||
                    visible.includes("all")) && (
                    <Link href={link} key={title}>
                      <NavLink>{title}</NavLink>
                    </Link>
                  )
                );
              })}
            </Grid>
            <Grid item>
              {isAuth ? (
                <Button
                  onClick={handleLogout}
                  sx={{ color: "white", textTransform: "none" }}
                >
                  Выйти
                </Button>
              ) : (
                <Link href={"/auth/login"}>
                  <NavLink>Вход</NavLink>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

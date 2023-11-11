import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import Layout from "@modules/ui/Layout";
import { Login } from "./ui/Login";

const page: { [key: string]: "Авторицация" | "Регистрация" } = {
  login: "Авторицация",
  registration: "Регистрация",
};

export const AuthContainer = () => {
  const {
    query: { slug },
  } = useRouter();

  const title = page[slug as string] || "Авторицация";

  return (
    <Layout title={title}>
      <Typography variant="h4" component="div" gutterBottom>
        {title}
      </Typography>
      {slug === "login" && <Login />}
    </Layout>
  );
};

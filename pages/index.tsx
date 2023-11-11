import type { NextPage } from "next";
import Layout from "@modules/ui/Layout";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Layout title="Главная">
      <Typography variant="h4" component="div" gutterBottom>
        Магазин курсов
      </Typography>
      <Typography component="div" gutterBottom>
        Перейдите в раздел курсов
      </Typography>
    </Layout>
  );
};

export default Home;

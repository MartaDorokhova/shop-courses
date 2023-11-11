import Layout from "@modules/ui/Layout";
import { Typography } from "@mui/material";
import ProfilehApi from "./api/ProfileApi";
// import { Form } from "./Form";

export const ProfileContainer = () => {
  return (
    <Layout title="Редактирование личных данных">
      <Typography variant="h4" component="div" gutterBottom>
        Редактирование Личных данных
      </Typography>
      {/* <Form /> */}
    </Layout>
  );
};

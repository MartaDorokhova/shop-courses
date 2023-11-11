import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid, Link } from "@mui/material";
import { ICourse } from "@modules/Courses/modules/interfaces";
import LinkComponent from "next/link";

interface ICardCourses {
  course: ICourse;
  authUserId: string;
}

export const CardCourses: FC<ICardCourses> = ({ course, authUserId }) => {
  return (
    <Card key={course._id} sx={{ maxWidth: 345, marginTop: "16px" }}>
      <CardMedia
        component="img"
        height="100%"
        image={course.img}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course.title}
        </Typography>
        <Typography variant="h5" component="div" color="text.secondary">
          {course.price}
        </Typography>
      </CardContent>

      <Grid container sx={{ padding: "16px" }} justifyContent="space-between">
        <LinkComponent href={`/courses/${course._id}`}>
          <Link component="button" sx={{ fontSize: "16px" }} underline="none">
            Открыть
          </Link>
        </LinkComponent>
        {authUserId === course.userId && (
          <>
            <LinkComponent href={`/courses/${course._id}/edit`}>
              <Link
                component="button"
                sx={{ fontSize: "16px" }}
                underline="none"
              >
                Редактировать
              </Link>
            </LinkComponent>
            <Button variant="contained">Купить</Button>
          </>
        )}
      </Grid>
    </Card>
  );
};

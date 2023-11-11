import { FC } from "react";
import { ICourse } from "@modules/Courses/modules/interfaces";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface ICardSingleCourse {
  course: ICourse;
}

const CardSingleCourse: FC<ICardSingleCourse> = ({ course }) => {
  return (
    <Box sx={{ marginTop: "40px" }}>
      <Card sx={{ minWidth: "100%" }}>
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
      </Card>
    </Box>
  );
};

export default CardSingleCourse;

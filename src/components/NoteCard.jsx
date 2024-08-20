import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import { DeleteOutlined } from "@mui/icons-material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

const useStyles = makeStyles({
  test: {
    border: (note) => {
      if (note.category == "work") return "1px solid red";
    },
  },
});
function NoteCard({ note, handleDelete }) {
  const classes = useStyles(note);
  return (
    <Card className={classes.test}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor:
                note.category === "todos"
                  ? green[400]
                  : note.category === "work"
                  ? red[400]
                  : note.category === "personal"
                  ? blue[400]
                  : "gray",
            }}
            className={classes.avatar}
          >
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        title={note.title}
        subheader={note.category}
        action={
          <IconButton onClick={(e) => handleDelete(note.id)}>
            <DeleteOutlined />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoteCard;

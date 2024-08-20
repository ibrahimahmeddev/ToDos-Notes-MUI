import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1111: 3,
  1024: 2,
  700: 1,
  500: 1,
};

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(async () => {
    const res = await fetch("http://localhost:8000/notes");
    const data = await res.json();
    setNotes(data);
  }, []);

  const handleDelete = async (id) => {
    await fetch("http://localhost:8000/notes/" + id, { method: "DELETE" });

    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <Container sx={{ marginTop: 3 }}>
      {/* <Grid container>
        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} md={4} sm={6} lg={3}>
          <Paper>1</Paper>
        </Grid>
      </Grid> */}

      <Masonry
        container
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={4} sm={6} lg={3}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Masonry>
    </Container>
  );
}

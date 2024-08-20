import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
// import { styled } from "@mui/system";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const textFieldStyles = {
  marginBottom: "20px",
  marginTop: "20px",
  display: "block",
};

// const CustomTextField = styled(TextField)({
//   marginBottom: "20px",
//   marginTop: "20px",
//   display: "block",
// });

export default function Create() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);
    if (!title && !details) {
      setTitleError(true);
      setDetailsError(true);
      return;
    }
    if (!title) return setTitleError(true);
    if (!details) return setDetailsError(true);
    const res = await fetch("http://localhost:8000/notes", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ title, details, category }),
    }).then(() => history.push("/"));
  };

  return (
    <Container fixed>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
        sx={{ marginTop: 2 }}
      >
        Create New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {/* <CustomTextField
          fullWidth
          label="Note Title"
          variant="outlined"
          color="secondary"
          required
        /> */}
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          fullWidth
          label="Note Title"
          variant="outlined"
          sx={textFieldStyles}
          color="secondary"
          required
          error={titleError}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          fullWidth
          label="Details"
          multiline
          rows={4}
          variant="outlined"
          sx={textFieldStyles}
          color="secondary"
          required
          error={detailsError}
        />
        <FormControl sx={textFieldStyles}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="money"
              control={<Radio color="secondary" />}
              label="Money"
            />
            <FormControlLabel
              value="todos"
              control={<Radio color="secondary" />}
              label="Todos"
            />
            <FormControlLabel
              value="reminders"
              control={<Radio color="secondary" />}
              label="Reminders"
            />
            <FormControlLabel
              value="work"
              control={<Radio color="secondary" />}
              label="Work"
            />
          </RadioGroup>
        </FormControl>

        <Button
          // sx={{
          //   borderRadius: 50,
          //   backgroundColor: "blue",
          //   color: "#fff",
          //   "&:hover": {
          //     backgroundColor: "purple",
          //     fontSize: 30,
          //     transition: "all 1.2s",
          //   },
          // }}

          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
          size="medium"
          endIcon={<KeyboardArrowRightIcon sx={{ color: "#f4f4f4" }} />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

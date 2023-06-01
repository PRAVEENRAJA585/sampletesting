import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    margin: "auto",
  },
  media: {
    height: 140,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none", // hide the input tag
  },
}));

const PreviewImage = () => {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRevert = () => {
    setImage(null);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={image || "http://www.kyrostechnologies.com/wp-content/uploads/2022/11/Kyros-Logo_v2.png"}
              title="Preview Image"
            />
            <CardContent>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={handleUpload}
              />
              <label htmlFor="contained-button-file" disableTypography>
                <Button variant="contained" color="primary" component="span" className={classes.button}>
                  Upload
                </Button>
              </label>
              <Button variant="contained" color="secondary" onClick={handleRevert} className={classes.button}>
                Revert
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewImage;

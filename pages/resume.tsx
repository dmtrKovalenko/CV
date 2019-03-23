import * as React from 'react';
import { Typography, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Photo from "../assets/Photo.jpg";

interface ResumeProps {
}

const useStyles = makeStyles({
  container: {
    padding: 32,
    background: 'white',
    color: 'black',
    margin: '0 auto',
    minHeight: '100vh',
    width: "21cm"
  },
  avatar: {
    width: 180,
    height: 180
  }
})

const Resume: React.FunctionComponent<ResumeProps> = () => {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={4}>
          <Avatar alt="My photo" src={Photo} className={styles.avatar} />
        </Grid>
        <Grid item xs={7} alignItems="center">
          <Typography variant="h4" color="inherit" gutterBottom> Dmitriy Kovalenko </Typography>
          <Typography variant="h6" color="inherit"> JavScript engineer </Typography>
        </Grid>
      </Grid>
    </div>
  )
};

export default Resume;
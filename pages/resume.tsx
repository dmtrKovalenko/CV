import * as React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface ResumeProps {
}

const useStyles = makeStyles({
  container: {
    padding: 32,
    background: 'white',
    color: 'black',
    minHeight: '100vh'
  }
})

const Resume: React.FunctionComponent<ResumeProps> = () => {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <Typography variant="h2" align="center" color="inherit" gutterBottom> Dmitriy Kovalenko </Typography>
      <Typography variant="h6" align="center" color="inherit"> JavScript engineer </Typography>
    </div>
  )
};

export default Resume;
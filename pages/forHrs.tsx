import * as React from "react";
import { Page } from "../src/_shared/Page";
import { Typography, Grid } from "@material-ui/core";
import { ChipArray } from "../src/_shared/ChipArray";
import { styled, makeStyles } from "@material-ui/styles";

import WebIcon from "@material-ui/icons/Web";
import CodeIcon from "@material-ui/icons/Code";
import ToolsIcon from "@material-ui/icons/Settings";
import CloudIcon from "@material-ui/icons/CloudQueue";
import PhoneIcon from "@material-ui/icons/DeveloperMode";
import TestingIcon from "@material-ui/icons/Cached";
import {
  languages,
  frontend,
  backend,
  mobile,
  tools,
  testing
} from "../content/skills.json";

const GridItem = styled(Grid)({ marginBottom: 32 });

const iconSize = 60;
const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 64
  },
  icon: {
    fontSize: iconSize,
    color: theme.palette.primary.light,
    marginLeft: `calc(50% - ${iconSize / 2}px)`
  }
}));

const forHrs: React.FunctionComponent<{}> = () => {
  const styles = useStyles();

  return (
    <Page>
      <Typography
        className={styles.title}
        variant="h2"
        align="center"
        gutterBottom
      >
        Tech skills
      </Typography>

      <Grid container justify="center">
        <GridItem item container xs={12} justify="center" direction="column">
          <CodeIcon className={styles.icon} />
          <Typography variant="h5" align="center" gutterBottom>
            Languages
          </Typography>

          <ChipArray items={languages} />
        </GridItem>

        <GridItem item xs={12} sm={4}>
          <WebIcon className={styles.icon} />
          <Typography variant="h5" align="center" gutterBottom>
            Front-End
          </Typography>

          <ChipArray items={frontend} />
        </GridItem>

        <GridItem item xs={12} sm={4}>
          <CloudIcon className={styles.icon} />
          <Typography variant="h5" align="center" gutterBottom>
            Back-End
          </Typography>

          <ChipArray items={backend} />
        </GridItem>

        <GridItem item xs={12} sm={4}>
          <PhoneIcon className={styles.icon} />
          <Typography variant="h5" align="center" gutterBottom>
            Mobile
          </Typography>

          <ChipArray items={mobile} />
        </GridItem>

        <GridItem item xs={12} sm={4}>
          <TestingIcon className={styles.icon} />
          <Typography variant="h5" align="center" gutterBottom>
            Testing
          </Typography>

          <ChipArray items={testing} />
        </GridItem>

        <GridItem item xs={12} sm={4}>
          <ToolsIcon className={styles.icon} />
          <Typography variant="h5" align="center" gutterBottom>
            Tools
          </Typography>

          <ChipArray items={tools} />
        </GridItem>
      </Grid>
    </Page>
  );
};

export default forHrs;

import * as React from "react";
import Head from "next/head";
import WebIcon from "@material-ui/icons/Web";
import CodeIcon from "@material-ui/icons/Code";
import ToolsIcon from "@material-ui/icons/Settings";
import CloudIcon from "@material-ui/icons/CloudQueue";
import PhoneIcon from "@material-ui/icons/DeveloperMode";
import TestingIcon from "@material-ui/icons/Cached";
import skills from "../content/skills.json";
import { Page } from "../src/_shared/Page";
import { GridSize } from "@material-ui/core/Grid";
import { ChipArray } from "../src/_shared/ChipArray";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Typography, Grid } from "@material-ui/core";
import { styled, makeStyles } from "@material-ui/styles";
import { ResumePreview } from "../src/sections/resume/ResumePreview";

const GridItem = styled(Grid)({ marginBottom: 32 });

const iconSize = 60;
const useStyles = makeStyles(theme => ({
  title: {
    marginBottom: 64
  },
  subTitle: {
    marginTop: 64,
    marginBottom: 32
  },
  icon: {
    fontSize: iconSize,
    color: theme.palette.primary.light,
    marginLeft: `calc(50% - ${iconSize / 2}px)`
  }
}));

type SkillSetProps = {
  skill: keyof typeof skills;
  Icon: React.ComponentType<SvgIconProps>;
  GridProps?: Partial<Record<Breakpoint, boolean | GridSize>>
}

const SkillSet: React.FC<SkillSetProps> = ({ skill, Icon, GridProps }) => {
  const styles = useStyles()

  return ( 
    <GridItem item xs={12} sm={4} {...GridProps}>
      <Icon className={styles.icon} />
      <Typography variant="h5" align="center" gutterBottom>
        {skill}
      </Typography>

      <ChipArray items={skills[skill]} />
    </GridItem>
  )
}

const forHrs: React.FC = () => {
  const styles = useStyles();

  return (
    <Page>
      <Head>
        <title> Dmitriy Kovalenko - Skills </title>
      </Head>

      <Typography
        className={styles.title}
        variant="h2"
        align="center"
        gutterBottom
      >
        Tech skills
      </Typography>

      <Grid container justify="center">
        <SkillSet skill="Languages" Icon={CodeIcon} GridProps={{ sm: 12 }} />
        <SkillSet skill="Front-end" Icon={WebIcon} />
        <SkillSet skill="Back-end" Icon={CloudIcon} />
        <SkillSet skill="Mobile" Icon={PhoneIcon} />
        <SkillSet skill="Testing" Icon={TestingIcon} />
        <SkillSet skill="Tools" Icon={ToolsIcon} />
      </Grid>

      <Typography
        gutterBottom
        variant="h2"
        align="center"
        className={styles.subTitle}
      >
        Resume
      </Typography>

      <ResumePreview />
    </Page>
  );
};

export default forHrs;

import * as React from "react";
import Head from "next/head";
import WebIcon from "@material-ui/icons/Web";
import CodeIcon from "@material-ui/icons/Code";
import ToolsIcon from "@material-ui/icons/Settings";
import CloudIcon from "@material-ui/icons/CloudQueue";
import PhoneIcon from "@material-ui/icons/DeveloperMode";
import TestingIcon from "@material-ui/icons/Cached";
import skills from "../content/skills.json";
import { Page, BoldTypography } from "../components/_shared/Common";
import { GridSize } from "@material-ui/core/Grid";
import { ChipArray } from "../components/_shared/ChipArray";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { Typography, Grid, Theme, styled, makeStyles } from "@material-ui/core";
import { ResumePreview } from "../components/ResumePreview";

const GridItem = styled(Grid)({ marginBottom: 32 });

const iconSize = 60;
const useStyles = makeStyles<Theme>(theme => ({
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
  GridProps?: Partial<Record<Breakpoint, boolean | GridSize>>;
};

const SkillSet: React.FC<SkillSetProps> = ({ skill, Icon, GridProps }) => {
  const styles = useStyles();

  return (
    <GridItem item xs={12} sm={4} {...GridProps}>
      <Icon className={styles.icon} />
      <Typography
        variant="h5"
        align="center"
        gutterBottom
      >
        {skill}
      </Typography>

      <ChipArray items={skills[skill]} />
    </GridItem>
  );
};

const forHrs: React.FC = () => {
  const styles = useStyles();

  return (
    <Page>
      <Head>
        <title> Dmitriy Kovalenko - Skills </title>
      </Head>

      <BoldTypography
        className={styles.title}
        variant="h2"
        align="center"
        gutterBottom
      >
        Tech skills
      </BoldTypography>

      <Grid container justify="center">
        <SkillSet skill="Languages" Icon={CodeIcon} GridProps={{ sm: 12 }} />
        <SkillSet skill="Front-end" Icon={WebIcon} />
        <SkillSet skill="Back-end" Icon={CloudIcon} />
        <SkillSet skill="Mobile" Icon={PhoneIcon} />
        <SkillSet skill="Testing" Icon={TestingIcon} />
        <SkillSet skill="Tools" Icon={ToolsIcon} />
      </Grid>

      <BoldTypography
        gutterBottom
        variant="h2"
        align="center"
        className={styles.subTitle}
      >
        Resume
      </BoldTypography>

      <ResumePreview />
    </Page>
  );
};

export default forHrs;

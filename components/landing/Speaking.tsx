import * as React from "react";
import talks from "../../content/talks.json";
import { Typography } from "@material-ui/core";
import { Page, PageTitle } from "../../components/_shared/Common";

interface SpeakingProps {}

export const Speaking: React.FC<SpeakingProps> = ({}) => {
  return (
    <Page>
      <PageTitle>Talks</PageTitle>

      {talks.map(talk => (
        <div>
          <Typography variant="h4">{talk.title}</Typography>
        </div>
      ))}
    </Page>
  );
};

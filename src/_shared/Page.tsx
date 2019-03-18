import { styled } from "@material-ui/styles";
import { Theme } from "@material-ui/core";

export const Page = styled('div')((theme: { theme: Theme }) => ({
  padding: 70,
  [theme.theme.breakpoints.down('sm')]: {
    padding: 32
  }
}))


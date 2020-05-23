import { Typography, styled } from "@material-ui/core";

export const NoDecorationLink = styled("a")({ textDecoration: "none" });

export const NoDecorationColorLink = styled("a")({
  color: "unset",
  textDecoration: "none",
});

export const Title = styled(Typography)({ marginTop: 32 });

export const BoldTypography = styled(Typography)({ fontWeight: "bold" });

export const SecondaryTypography = styled(Typography)({
  fontWeight: "bold",
  fontFamily: "Nunito,-apple-system,BlinkMacSystemFont,sans-serif",
});

export const PageTitle = styled(Typography)({
  marginTop: 90,
  paddingBottom: 70,
});

PageTitle.defaultProps = {
  variant: "h2",
  align: "center",
  gutterBottom: true,
};

export const PageTitleNoPadding = styled(PageTitle)({
  paddingBottom: 0,
});

export const Page = styled("div")(({ theme }) => ({
  padding: 70,
  paddingTop: 8,
  [theme.breakpoints.down("sm")]: {
    padding: 32,
    paddingTop: 0,
  },
}));

export const PageNoPadding = styled(Page)({ padding: 0 });

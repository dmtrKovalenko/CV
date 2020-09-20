import {
  Typography,
  styled,
  TypographyProps,
  makeStyles,
} from "@material-ui/core";

export const NoDecorationLink = styled("a")({ textDecoration: "none" });

export const NoDecorationColorLink = styled("a")({
  color: "unset",
  textDecoration: "none",
});

export const Title = styled(Typography)({ marginTop: 32 });

const useBoldTypographyStyles = makeStyles({
  root: { fontWeight: "bold" },
});

export function BoldTypography<T extends React.ElementType>(
  props: TypographyProps<T>
) {
  const classes = useBoldTypographyStyles();

  return <Typography classes={classes} {...props} />;
}

export const PageTitle = styled(Typography)({
  marginTop: 90,
  marginBottom: "4rem",
  fontWeight: "bold",
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

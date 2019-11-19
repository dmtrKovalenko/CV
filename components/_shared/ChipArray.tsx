import * as React from "react";
import { Chip,styled, Grid } from "@material-ui/core";

const PrimaryChip = styled(Chip)({
  marginLeft: 8,
  marginRight: 8,
  marginBottom: 16
});

PrimaryChip.defaultProps = {
  color: "primary",
  variant: "outlined",
  onClick: () => {}
};

const ChipContainer = styled(Grid)({ marginTop: 16 })

type ChipArrayProps = {
  items: string[];
};

export const ChipArray: React.FC<ChipArrayProps> = ({ items }) => {
  return (
    <ChipContainer container justify="center">
      {items.map(label => (
        <PrimaryChip key={label} label={label} />
      ))}
    </ChipContainer>
  );
};

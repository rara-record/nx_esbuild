import { style } from "@vanilla-extract/css";
import { vars } from "@repo/themes";

export const blockStyle = style({
  width: "100px",
  height: "100px",
  color: `${vars.colors.$scale.gray[100]}`,
});

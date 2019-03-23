import yellow from "@material-ui/core/colors/yellow";
import { SheetsRegistry } from "jss";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { ThemeProviderProps } from "@material-ui/styles/ThemeProvider";
import { createGenerateClassName } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: yellow
  }
});

export interface PageContext extends ThemeProviderProps<Theme> {
  generateClassName: any;
  sheetsManager: Map<string, string>;
  sheetsRegistry: SheetsRegistry;
}

export default function(): PageContext {
  return {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
    children: undefined
  };
}

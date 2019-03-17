import { SheetsRegistry, GenerateClassName } from "jss";
import {
  createMuiTheme,
} from "@material-ui/core/styles";
import yellow from "@material-ui/core/colors/yellow";
import { ThemeProviderProps } from "@material-ui/styles/ThemeProvider";
import { createGenerateClassName } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: yellow
  }
});

export interface PageContext extends ThemeProviderProps {
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
    children: undefined,
  };
}
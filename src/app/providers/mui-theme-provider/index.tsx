import { Colors } from "@/app/constants";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { PropsWithChildren, useMemo } from "react";
import { ReactComponent as CheckedIcon } from "@/app/assets/icons/checkbox-checked.svg";
import { ReactComponent as UnCheckedIcon } from "@/app/assets/icons/checkbox-unchecked.svg";
import { ReactComponent as RadionCheckedIcon } from "@/app/assets/icons/radio_checked.svg";
import { ReactComponent as RadionUnCheckedIcon } from "@/app/assets/icons/radio_unchecked.svg";
import { ReactComponent as ChevronDown } from "@/app/assets/icons/down-chevron.svg";

const MuiThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "ibm-plex-sans, sans-serif",
          htmlFontSize: 14,
          body1: {
            fontSize: "1rem",
          },
          body2: {
            fontSize: "0.86rem",
          },
          h2: {
            fontSize: "1.86rem",
            fontWeight: 600,
          },
          h3: {
            fontSize: "1.28rem",
            fontWeight: 600,
          },
          h4: {
            fontSize: "1.21rem",
            fontWeight: 600,
          },
          subtitle1: {
            fontSize: "1.21rem",
            fontWeight: 400,
            color: Colors.TEXT_SECONDARY,
          },
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1240,
            xl: 1536,
          },
        },
        palette: {
          primary: {
            main: Colors.TURQUOISE,
          },
          secondary: {
            main: Colors.SECONDARY,
          },
          text: {
            primary: Colors.TEXT_DARK,
            secondary: Colors.TEXT_SECONDARY,
          },
          divider: Colors.BORDER,
          error: {
            main: Colors.ERROR,
          },
        },
        components: {
          MuiContainer: {
            defaultProps: {
              disableGutters: true,
            },
            styleOverrides: {
              maxWidthLg: {
                paddingLeft: "6px",
                paddingRight: "6px",
              },
            },
          },
          MuiTypography: {
            defaultProps: {
              color: "textPrimary",
            },
          },
          MuiTextField: {
            defaultProps: {
              variant: "outlined",
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                "&.Mui-disabled": {
                  backgroundColor: Colors.LIGHT_TURQUOISE,
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: "8px",
                backgroundColor: Colors.TEXT_WHITE,
              },
              notchedOutline: {
                borderColor: Colors.BORDER,
              },
              multiline: {
                padding: "10px 0",
              },
              input: {
                padding: "10px 14px",
                height: "20px",
                "&::placeholder": {
                  color: Colors.TEXT_SECONDARY,
                  opacity: 1,
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              outlined: {
                "&:not(.MuiInputLabel-shrink)": {
                  transform: "translate(14px, 10px) scale(1)",
                },
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                color: Colors.TEXT_DARK,
                fontWeight: 500,
                fontSize: "0.9rem",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "flex-end",
                marginBottom: "4px",
              },
              asterisk: {
                color: Colors.ERROR,
                marginRight: "2px",
              },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: {
                marginRight: 0,
                marginLeft: 0,
                font: "0.86rem",
                fontWeight: 500,
              },
            },
          },
          MuiCheckbox: {
            defaultProps: {
              checkedIcon: <CheckedIcon />,
              icon: <UnCheckedIcon />,
            },
          },
          MuiButton: {
            defaultProps: {
              variant: "contained",
              disableRipple: true,
            },
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "8px",
                boxShadow: "none",
                padding: "10px 32px",
                border: "none",
                fontSize: "1rem",
                height: "40px",
                lineHeight: "1",
                color: Colors.DARK,
                fontWeight: 600,
              },
              containedSecondary: {
                backgroundColor: Colors.LIGHT_BLUE,
                "&:hover": {
                  backgroundColor: Colors.LIGHT_BLUE,
                },
              },
            },
          },
          MuiAutocomplete: {
            defaultProps: {
              popupIcon: <ChevronDown />,
              getOptionLabel: (option) => {
                if (typeof option === "object" && "name" in option) {
                  return option.name;
                }
                if (typeof option === "object" && "label" in option) {
                  return option.label;
                }

                if (typeof option === "string") {
                  return option;
                }
                return "";
              },
            },
            styleOverrides: {
              inputRoot: {
                paddingTop: "2.5px",
                paddingBottom: "2.5px",
              },
              popupIndicator: {
                height: "24px",
                width: "24px",
              },
              endAdornment: {
                top: "calc(50% - 12px)",
              },
            },
          },
          MuiTooltip: {
            defaultProps: {
              placement: "top",
              disableInteractive: true,
            },
            styleOverrides: {
              tooltip: {
                fontSize: "0.86rem",
                color: Colors.TEXT_DARK,
                background: Colors.TURQUOISE,
              },
              arrow: {
                color: Colors.TURQUOISE,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: "8px",
              },
            },
          },
          MuiRadio: {
            defaultProps: {
              icon: <RadionUnCheckedIcon />,
              checkedIcon: <RadionCheckedIcon />,
            },
          },
          MuiFormControlLabel: {
            styleOverrides: {
              label: {
                fontWeight: 600,
                fontSize: "1rem",
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                color: Colors.TEXT_SECONDARY,
                fontWeight: 600,
                textTransform: "none",
                padding: "20px 30px",
                " &.Mui-selected": {
                  color: Colors.TEXT_DARK,
                },
              },
            },
          },
          MuiFormControl: {
            defaultProps: {
              fullWidth: true,
            },
          },
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { MuiThemeProvider };

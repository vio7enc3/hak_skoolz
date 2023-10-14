import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export default () => {
  dayjs.extend(customParseFormat);

  if (import.meta.env.DEV) {
    //@ts-ignore
    window.dayjs = dayjs;
  }
};

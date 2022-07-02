import moment from "moment-timezone";
const zone = process.env.VUE_APP_ZONE
const timezone = process.env.VUE_APP_TIMEZONE
const dtf = new Intl.DateTimeFormat(zone)

export const formatPEDate = (date) => {
  return dtf.format(date)
};

export const momentDate = (formatStr) => {
  return moment().tz(timezone).format(formatStr)
}

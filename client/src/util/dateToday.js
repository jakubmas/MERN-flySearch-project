export default function dateToday() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const dateFormated = `${today.getFullYear()}-${
    month.length <= 1 ? "0" + month : month
  }-${day.toString().length <= 1 ? "0" + day : day}`;
  return dateFormated;
}

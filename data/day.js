import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"; //Default Export

const today = dayjs();

const oneDay = today.add(1,'days');
const threeDays = today.add(3,'days');
const oneWeek = today.add(7,'days');

console.log(oneDay);
console.log(threeDays);
console.log(threeDays);
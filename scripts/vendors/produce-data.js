function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function randomBar(date, lastClose) {
    const open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    const close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
    return {
        t: date.valueOf(),
        y: close
    };
}

const dateFormat = 'MMMM DD YYYY';
let date = moment('April 01 2017', dateFormat);
const data = [randomBar(date, 30)];
while (data.length < 60) {
    date = date.clone().add(1, 'd');
    if (date.isoWeekday() <= 5) {
        data.push(randomBar(date, data[data.length - 1].y));
    }
}

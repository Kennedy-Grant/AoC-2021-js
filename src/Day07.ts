import fs from 'fs';
import _, { isNumber } from 'lodash';

const main = () => {
    const positions = fs.readFileSync("./data/input07.txt", "utf-8").split(',').map(Number);
    let ceiling = 0;
    positions.forEach(value => {
        if (value > ceiling) {
            return ceiling = value; // 1855
        }
    })
    const points = Array.from(Array(ceiling + 1).keys()); // create array 0-1855
    const distance = points.map((value, index) => {
        return positions.map(position => {
            const triangle = Math.abs(position - value)
            return triangle * (triangle + 1) / 2;
        }).reduce((sum, currentValue) => {
            return sum + currentValue
        }, 0)
    }).sort((a,b) => a-b)
    console.log(distance[0]);
};

main();
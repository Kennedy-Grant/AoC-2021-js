import fs from 'fs';
import _, { isNumber } from 'lodash';

const main = () => {
    let fish = fs.readFileSync("./data/input06.txt", "utf-8").split(',').map(Number);
    Array.from({ length: 50 }).forEach(() => {
        const newFish = [];
        fish = fish.map(value => {
            if (value > 0) {
                return value - 1
            } else {
                newFish.push(8)
                return 6
            }  
        })
        fish.push(...newFish)
    });
    console.log(fish.length);
}

main();

const newMain = () => {
    const fishPopulation = (amount: number, nextDay: number) => {
        return {
            population: amount,
            nextDay: nextDay
        }
    };
    const zero = fishPopulation(0, 0),
    one = fishPopulation(0, 0),
    two= fishPopulation(0, 0),
    three= fishPopulation(0, 0),
    four = fishPopulation(0, 0),
    five = fishPopulation(0, 0),
    six = fishPopulation(0, 0),
    seven = fishPopulation(0, 0),
    eight = fishPopulation(0, 0);
    let fish = fs.readFileSync("./data/input06.txt", "utf-8").split(',').map(Number).map(value => {
        value === 0 ? zero.population += 1:
        value === 1 ? one.population += 1:
        value === 2 ? two.population += 1:
        value === 3 ? three.population += 1:
        value === 4 ? four.population += 1:
        value === 5 ? five.population += 1:
        value === 6 ? six.population += 1:
        value === 7 ? seven.population += 1:
        eight.population += 1
    })

        for (let i = 0; i < 256; i++) {
            eight.nextDay = zero.population,
            seven.nextDay = eight.population,
            six.nextDay = seven.population + zero.population,
            five.nextDay = six.population,
            four.nextDay = five.population,
            three.nextDay = four.population,
            two.nextDay = three.population,
            one.nextDay = two.population,
            zero.nextDay = one.population,
            [zero, one, two, three, four, five, six, seven, eight].forEach((value) => {
                value.population = value.nextDay;
            })
        }

    console.log(zero.population + one.population + two.population + three.population + four.population + five.population + six.population + seven.population + eight.population);
};

newMain();
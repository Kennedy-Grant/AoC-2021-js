import fs from 'fs';
import _ from 'lodash';

const main = () => {
    const data = fs.readFileSync("./data/input05.txt", "utf-8").split('\n')
    .map(value => {
        const [[x1,y1], [x2,y2]] = value.split(' -> ').map(value => {
            return value.split(',').map(val => parseInt(val));
        })
        return {x1, y1, x2, y2}
    });
    const dangerZones = data.map(({ x1, x2, y1, y2 }) => {
        if (x1 === x2) {
            return Array.from({ length: Math.abs(y1 - y2) + 1 }).map((_, index) => {
                return { x: x1, y: index + Math.min(y1, y2) };
            })
        }
        if (y1 === y2) {
            return Array.from({ length: Math.abs(x1 - x2) + 1 }).map((_, index) => {
                return { x: index + Math.min(x1, x2), y: y1,  };
            })
        }
        return Array.from({ length: Math.abs(x1 - x2) + 1}).map((_, index) => {
            return { x: x1 > x2 ? x1 - index : x1 + index, y: y1 > y2 ? y1 - index : y1 + index};
        })
    }).reduce((previousValue: Array<{ x: number, y: number }>, line) => {
        previousValue.push(...line);
        return previousValue;
    }, [] as Array<{ x: number; y: number; }>).reduce((previousValue: Array<{point: {x: number, y: number }, visited: number }>, point) => {
        const matchingPoint = previousValue.find(space => space.point.x === point.x && space.point.y === point.y)
        if (matchingPoint) {
            matchingPoint.visited += 1;
        } else {
            previousValue.push({point, visited: 1});
        }
        return previousValue;
    }, []).filter(value => {
        return value.visited >= 2;
    }).length;
    console.log(dangerZones);
}

main();
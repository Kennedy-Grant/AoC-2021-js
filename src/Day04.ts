import fs from 'fs';
import _ from 'lodash';

const main = () => {
    let winningCards: Array<Array<Array<{ visited: boolean; value: string; }>>> = [];
    let sum = 0;
    let winningCall;
    const data = fs.readFileSync("./data/input04.txt", "utf-8").split('\n');
    const calls = data[0].split(',')
    let cards = _.chunk(
        data.slice(1)
            .filter(line => line !== "")
            .map(line => line.split(' ')
                .filter(line => line !== "")
                .map(value => ({
                    value,
                    visited: false
                }))
            ), 
    5);

    calls.some(call => {
        cards.forEach(card => {
            card.forEach(row => {
                row.forEach(space => {
                    if (call === space.value) {
                        space.visited = true;
                    }
                })
            })
            
        })
        cards.forEach(card => {
            if (winningCards.some(wCard => wCard === card)) {
                return;
            }

            card.forEach(row => {
                const win = row.every(space => {
                    return space.visited
                })
                if (win) {
                    if (!winningCards.some(wCard => card === wCard)) {
                        winningCards.push(card);
                    }
                    console.log(winningCards.length);
                    winningCall = call;
                }
            });
            for (let rowIndex = 0; rowIndex < card.length; rowIndex++) {
                const column = [];
                for (let columnIndex = 0; columnIndex < card[rowIndex].length; columnIndex++) {
                    column.push(card[columnIndex][rowIndex]);
                }
                const win = column.every(space => {
                    return space.visited
                })
                if (win) {
                    if (!winningCards.some(wCard => card === wCard)) {
                        winningCards.push(card);
                    }
                    console.log(winningCards.length);
                    winningCall = call;
                    return;
                }
            }
        });

        if (winningCards.length === 100) {
            return true;
        }
    })
    winningCards[99].forEach(row => {
        row.forEach(space => {
            if (!space.visited) {
                sum += parseInt(space.value);
            }
        })
    })

    console.log(sum * winningCall);
}

main();




/* Making a quadruple for loop
    1st: iterate over all calls
        2nd: iterate over all cards
            3rd: iterate over all horizontal lines
                4th: iterate over each space in the lines
                    if they're the same as the call, set space.visited = true
        2nd: iterate over all cards
            3rd: iterate over all vertical lines
                4th: for each, check if all elements are visited = true
                    if so, then you've found a winning card, return it
*/
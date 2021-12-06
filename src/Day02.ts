import fs from "fs";

const main = async () => {
  const data = fs.readFileSync("./data/input02.txt", "utf-8");
  let position = 0;
  let depth = 0;
  let aim = 0;
  data.split('\n').map((value) => {
      const [ command, distance ] = value.split(' ')
      return {command, distance: Number(distance)}    
  }).forEach(({ command, distance }) => {
    if (command === 'forward') {
        position += distance 
        depth += aim * distance;
    } else if (command === 'down') {
        aim += distance;
    } else {
        aim -= distance
    }
  })
  console.log(position * depth);
};

main();
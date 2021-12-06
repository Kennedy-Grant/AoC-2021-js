import fs from "fs";

const main = async () => {
  const data = fs.readFileSync("./data/input.txt", "utf-8");
  let depthIncrease = 0;
  const list = data.split('\n').map(val => {
    return Number(val)
  });
  list.forEach((val, i) => {
    if (i > 0) {
      if (val > list[i-1]) {
        depthIncrease += 1;
      }
    };    
  })
  console.log(depthIncrease);
};

main();

const mainTwo = async () => {
  const data = fs.readFileSync("./data/input.txt", "utf-8");
  let depthIncrease = 0;
  const list: Array<number> = data.split('\n').map(val => {
    return Number(val)
  }).map((val, i, arr) => {
    if (i + 2 >= arr.length) {
      return -1
    }
    return val + arr[i+1] + arr[i+2];
  }).filter(val => val !== -1)
  list.forEach((val, i) => {
    if (i > 0) {
      if (val > list[i-1]) {
        depthIncrease += 1;
      }
    };    
  })
  console.log(depthIncrease);
};

mainTwo();
import fs from "fs";

const gammaRays = (arr: Array<number>) => 
  parseInt(
    arr.map(score => score < 500 ? '0' : '1')
      .join(''),
    2
  )

const main = async () => {
  const data = fs.readFileSync("./data/input03.txt", "utf-8");
  let gamma: Array<any> = Array.from({ length: 12 }).map(() => 0);
  let epsilon: Array<any> = Array.from({ length: 12 }).map(() => 0);
  data.split('\n').map((value) =>
    value.split('')
  ).forEach((value) =>
    value.forEach((bit, index) => {
      if (bit === '1') {
        gamma[index] += 1;
      } else if (bit === '0') {
        epsilon[index] += 1;
      }
    }));

    const gammaSolut = gammaRays(gamma);
    const epsilonSolut = gammaRays(epsilon);
  console.log(gammaSolut, epsilonSolut, gammaSolut * epsilonSolut);
};

main();

const oLevels = (arr: Array<number>) => 
parseInt(
  arr.map(score => score < 500 ? '0' : '1')
    .join(''),
  2
);

main();

const data = fs.readFileSync("./data/input03.txt", "utf-8");

const dataArray = data.split('\n').map((value) => value.split(''));

const findFilteredValue = (value: Array<Array<string>>, index: number = 0, findDominant: boolean = true) => {
  const dominantValue = Math.ceil(value.length / 2);
  const dominantBit = value.filter((line) => {
    return line[index] === '1';  
  }).length >= dominantValue ? '1' : '0';
  const filteredValue = value.filter((line) => {
    return findDominant ?
      line[index] === dominantBit
      : line[index] !== dominantBit; 
  })
  if (filteredValue.length === 1) {
    return parseInt(filteredValue[0].join(''), 2)
  } else {
    return findFilteredValue(filteredValue, index + 1, findDominant);
  }
};


const result = findFilteredValue(dataArray, 0, true) * findFilteredValue(dataArray, 0, false);

console.log("Q2 result: ", result);
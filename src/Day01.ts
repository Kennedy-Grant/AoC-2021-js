import fs from "fs";

const main = async () => {
  const data = fs.readFileSync("./data/input.txt", "utf-8");
  console.log(data);
};

main();
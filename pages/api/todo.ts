import fs from "fs";

export default (req, res) => {
  const todo = fs.readFileSync("./pages/api/todoTest", "utf-8");
  setTimeout(() => {
    res.statusCode = 200;
    res.json({ todo: todo });
  }, 500);
};

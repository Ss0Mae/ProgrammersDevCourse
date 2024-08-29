var figlet = require("figlet");

figlet("SeongMin!!", function (err, data) {
    //익명의 함수를 쓰는 이유 = 이 함수를 쓸 일이 다른 데는 없어서
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
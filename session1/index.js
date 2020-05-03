function xyz() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Am asteptat 3 secunde");
    }, 3000);
  });
}
xyz().then(ceva => {
  // console.log(ceva);
});

for (let index = 0; index < 5; index++) {
  setTimeout(() => {
    // console.log(index);
  }, index * 1000);
}

const Log = require("./module.js");

// Log.log("ceva");

const axios = require("axios");

const fun = async () => {
  try {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(res.data);
  } catch (e) {
    console.error("Error!");
  }
};

// fun();

// x=5
// let x = 6
// console.log(x)

const func = async () => {
  try {
    let x1 = axios.get("https://dog.ceo/api/breeds/image/random");
    let x2 = axios.get("https://dog.ceo/api/breeds/image/random");
    let x3 = axios.get("https://dog.ceo/api/breeds/image/random");

    let res = await Promise.all([x1, x2, x3]);

    res = res.map(item => {
      return item.data;
    });

    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

// func();

const race = async () => {
  try {
    let x1 = axios.get("https://dog.ceo/api/breeds/image/random");
    let x2 = axios.get("https://dog.ceo/api/breeds/image/random");
    let x3 = axios.get("https://dog.ceo/api/breeds/image/random");

    const x4 = Promise.resolve("Nu s-au terminat suficient de repede");

    const response = await Promise.race([x1, x2, x3, x4]);

    console.log(response);
  } catch (error) {}
};

race();

const { resolve } = require('path');

require('colors');

const showMenu = () => {
  return new Promise((resolve) => {
    console.log('================================'.green);
    console.log('       Select an option'.green);
    console.log('================================\n'.green);

    console.log(`${'1.'.green} Create task`.green);
    console.log(`${'2.'.green} List tasks`.green);
    console.log(`${'3.'.green} List completed tasks`.green);
    console.log(`${'4.'.green} List pending tasks`.green);
    console.log(`${'5.'.green} Complete task(s)`.green);
    console.log(`${'6.'.green} Delete task`.green);
    console.log(`${'0.'.green} Exit\n`.green);

    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`Select an option: `, (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise((resolve) => {
    const readLine = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`Press ${'ENTER'.green} to continue`, (opt) => {
      readLine.close();
      resolve();
    });
  });
};


module.exports = {
  showMenu,
  pause,
};

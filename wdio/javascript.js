// ((obj) => {
//     console.log(obj);
// })("Man")

const printFunc = async (ele='default', timeout = 1000) => {
    setTimeout(
        () => {
            console.log(ele);
        }, timeout
    )
}

const printFunc2 = async (ele = 'default', timeout = 1000) => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(ele);
        resolve();
      }, timeout);
    });
  };
  

// await printFunc("Hello", 3000)
// await printFunc()

await printFunc2("Hello", 3000)
await printFunc2()



module.exports = {
  "checkDuplicateInArray": ( arr ) => {
    let object = {};
    let result = [];

    arr.forEach(function (item) {
      if(!object[item])
        object[item] = 0;
      object[item] += 1;
    })

    for (let prop in object) {
      if(object[prop] >= 2) {
        result.push(prop);
      }
    }

    return result;
  }

};

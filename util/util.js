const fs = require("fs");

exports.getFormattedDate = date => {
  return ('0' + date.getDate()).slice(-2)
    + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '/' + date.getFullYear();
}

exports.mergeSort = (array) => {
  const sortedArr = [...array];
  if (sortedArr.length < 2) return array;
  const midPoint = Math.floor(sortedArr.length / 2);
  const leftArr = sortedArr.slice(0, midPoint);
  const rightArr = sortedArr.slice(midPoint);
  return this.merge(this.mergeSort(leftArr), this.mergeSort(rightArr));
}

exports.merge = (leftArr, rightArr) => {
  const result = [];
  while (leftArr.length && rightArr.length) {
    if (leftArr[0] <= rightArr[0]) {
      result.push(leftArr.shift());
    } else {
      result.push(rightArr.shift());
    }
  }
  return result.concat(leftArr, rightArr);
}

exports.reversArr = (array) => {
  const tmpArr = [...array];
  const result = [];
  while (tmpArr.length) {
    result.push(tmpArr.pop());
  }
  return result;
}

exports.filterRiddle = async (filter , riddles) => {
  try {
    
  let result = [];
  if (filter === 'likes') {
    const likeArr = riddles.map(riddle => {
      return riddle.likes
    })
    const sortedLike = this.mergeSort(likeArr);
    const reversedLike = this.reversArr(sortedLike);
    
    while (riddles.length > 1) {
      for (let i = 0; i < reversedLike.length; i++) {
        for (let j = 0; j < riddles.length; j++) {
          if (reversedLike[i] === riddles[j].likes) {
            result.push(...riddles.splice(j, 1));
          }
        }
      }
    }
  } else if (filter === 'oldest') {
    result = riddles;
  } else {
    result =  this.reversArr(riddles);
  }
  return result;
  } catch (err) {
    console.log(err)
    
  }
}

exports.getRandomBgImg = () => {
  const bgiImgFolder = __dirname + "/../public/img/riddle_background";
  const imgFiles = fs.readdirSync(bgiImgFolder);
  let bgImgFile = '/img/riddle_background/default.png';
  if (imgFiles && imgFiles.length !== 1) {
    bgImgFile =
      "/img/riddle_background/" +
      imgFiles[Math.floor(Math.random() * Math.floor(imgFiles.length))];
  }
  return bgImgFile;
}
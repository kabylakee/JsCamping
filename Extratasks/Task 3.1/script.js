let searchMaxSum = (arr) => {
let maxSum = 0;
  for (let i = 0; i < arr.length; i++) {
    let tempSum = 0;
    for (let j = i; j < arr.length; j++) {
      tempSum += arr[j];
      maxSum = Math.max(maxSum, tempSum);
    }
  }
  return maxSum;
};

console.log(searchMaxSum([-2, 1, -3, 4, -1, 2, 1, -5, 4])); 
console.log(searchMaxSum([5, 7, -10, 20, 30, -2, -1, 0, 3]));
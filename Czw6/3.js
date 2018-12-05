const binarySearch = (target, arr) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;

        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
};


console.log(binarySearch(6, [-1, 0, 4, 5, 6 , 9]));
console.log("==================================================");
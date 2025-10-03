const arr = [5, 2, 9, 1, 5, 6];

console.log("-----insertionSort-----");
function insertionSort(arr: number[]) {
    let a = [...arr];
    console.log(a);
    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;
        while (j >= 0 && a[j] > key) {
            console.log(`${a} i=${i} j=${j}`);
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
    return a;
}

console.log(insertionSort(arr));
console.log("\n");
console.log("-----bubbleSort-----");
function bubbleSort(arr: number[]): number[] {
    let a = [...arr];
    let n = a.length;
    console.log(a);
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }  
            console.log(`${a} i=${i} j=${j}`);
        }
    }
    return a;
}

console.log(bubbleSort(arr));

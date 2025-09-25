import { totalNQueens } from "./lessons/lessons-51-to-60";

// console.log(multiply("99", "99"));

const arr = [5, 2, 9, 1, 5, 6];

function insertionSort(arr: number[]) {
    let a = [...arr]; // copy to avoid mutation
    for (let i = 1; i < a.length; i++) {
        console.log(a);
        let key = a[i];
        let j = i - 1;

        // shift larger elements to the right
        while (j >= 0 && a[j] > key) {
            console.log( a[j + 1],  a[j]);
            a[j + 1] = a[j];  
            j--;
        }
        a[j + 1] = key;
    }
    return a;
}

console.log(insertionSort(arr));

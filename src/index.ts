import { longestPalindrome, regularExpressionMatching } from "./lessons/lessons-1-to-10";
import { generateParenthesis, mergeTwoLists, removeDuplicates, reverseKGroup } from "./lessons/lessons-21-to-30";
import { ListNode } from "./models/node-list.model";
import { buildList, listToArray } from "./utills/jest.utils";


// console.log(reverseKGroup(buildList([1, 2, 3, 4, 5]), 1));
const nums = [0,0,1,1,1,2,2,3,3,4];
removeDuplicates(nums);
console.log(nums);
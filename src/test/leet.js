/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    let result = false
    let tempI = x
    let reverseI = 0;

    while (tempI > 0) {
        const digit = tempI % 10
        tempI = Math.trunc(tempI / 10)

        if(reverseI == 0)
            reverseI = reverseI+digit
        else
            reverseI = reverseI * 10 + digit
    } 
    return reverseI === x
};

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let tempI = x
    let reverseI = 0;

    while (tempI !== 0) {
        const digit = tempI % 10
        tempI = Math.trunc(tempI / 10)

        if(reverseI == 0)
            reverseI = reverseI+digit
        else
            reverseI = reverseI * 10 + digit
    } 
    return reverseI
}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let sum = []
    if(nums) {
        let result = []
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if(nums[i] + nums[j] == target) {
                    result.push(i)
                    result.push(j)
                    break
                }
            }
            if(result.length > 1)
                break
        }
        return result
    }
}
function allPermutations (items) {
    // allPermutations () : return a list of all possible permutations
    // credits: https://stackoverflow.com/questions/9960908/permutations-in-javascript
     
      let results = [];
      function permute (arr, memo) {
        var cur, memo = memo || [];
        for (let i = 0; i < arr.length; i++) {
          cur = arr.splice(i, 1);
          if (arr.length === 0) {
            results.push(memo.concat(cur));
          }
          permute(arr.slice(), memo.concat(cur));
          arr.splice(i, 0, cur[0]);
        }
        return results;
      }
      permute(items);
      return results;
    }
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    let result = ""
    let matcher = []

    //compile array of matches
    for (let i = 0; i < t.length; i++) {
        let matched = []
        for(let ii = 0; ii < s.length; ii++) {
            if( s[ii] == t[i])
                matched.push(ii)
        }
        matcher.push(matched)
    }
    const getAllCombinations = input => {
        let all = []
        for (let i = 0; i < t.length -1; i++) {
            let combination = []
            for (let j = 0; j < input[i].length; i++) {
                combination.push(input[i][j])
                all.push(combination)
            }
        }
    }
    //find the smallest window
    if(matcher) {
        //initialization
        let begin = matcher[0][0]
        let end = matcher[t.length -1][0]

        // let window = []
        for(let i = 0; i < t.length; i++) {


            // if(matcher[i][i]) {
            //     if(!window[i]) {
            //         window[i] = matcher[i][i]
            //     }
            //     else {
            //         if (window[i] > matcher[i][i]) // get the largest index of matched characters
            //             window[i] = matcher[i][i]
            //     }
            // }
        }
    }
    
    console.log(matcher)
    return result
    
}
console.log(minWindow( "ADOBECODEBANC", "ABC" ))
// console.log(reverse(-123))
// console.log(`-121 is palindrome: ${isPalindrome(-121)}`)
// console.log(`121 is palindrome: ${isPalindrome(121)}`)
// console.log(`1212121 is palindrome: ${isPalindrome(1212121)}`)
// console.log(`1239321 is palindrome: ${isPalindrome(1239321)}`)
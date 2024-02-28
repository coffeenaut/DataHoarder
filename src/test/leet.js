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
/** Creates array containing a subarray of matchable characters that stores position 
 * 
 * s = cabbad
 * t = ab
 * (a) [1, 4]
 * (b) [2, 3]
 * (d) [5]
 * 
 * (start) = 3
 * (end) = 5
 * min = diff of start - end 
 * get possibilities and find the lowest value minWindow
 * 
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
/** aba abba aabaa ababa */
const validStringPalindrome = (s) => {
    const pString = s
    let valid = false;
    let e = s.length - 1
    for (let i = 0; i  <= e; i++) {
        if( pString[i] == pString[e]){
            //check if iteration found middle
            //even
            if(pString.length % 2 == 0) {
                if( i + 1 == e) {
                    valid = true
                    break
                }
            }
            //odd 
            else{
                if( pString.length == 1)
                    valid = true
                else if(i+1 == e - 1) {
                    valid = true
                    break
                }
            }
        }
        else
            break
        e--; //continue
    }
    return valid
    
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let validateString = s
    let long = 0
    let b = 0
    let f = 0
    let lPalindrome = null
    for (let e = validateString.length; e > -1; e-- ) {
        let t = 0
        let current = ""
        for (let i = 0; (i + e - 1) < validateString.length; i++) {
            if(validStringPalindrome(s.substring(i, e + i))) {
                b = i
                f = e + i
                if(t < f-b) {
                    t = f - b
                    current = s.substring(b, f)
                    break
                }
            }

        }
        if(long == 0 && t > 0) {
            long = t
            lPalindrome = current
        }
        else if ( long < t) {
            long = t
            lPalindrome = current
            break
        }
    }
    return lPalindrome
}
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const symbols = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    let roman = 0
    for(let i = s.length - 1; i > -1; i--) {
        let current = symbols[s[i]]
        if(i-1 > -1) {
            const prev = symbols[s[i-1]]
            if(prev < current) {
                current = current - prev
                i--
            }       
        }
        roman = current + roman
    }
    return roman
};
var IntToRoman = function(num) {
    const symbols = {
        1: 'I',
        5: 'V',
        10: 'X',
        50: 'L',
        100: 'C',
        500: 'D',
        1000: 'M'
    }
    let current = num
    let digit = 1
    let roman = ''
    for(let i = 0; i < 4; i++) {
        if( current > 0) {
            let c = current % 10
            if ( c < 4 || (c > 4 && c < 9)) {
                let a = ''
                let b = ''
                let over5 = false
                if (c > 4) {
                    a = symbols[5 * digit]
                    c = c % 5
                    over5 = true
                }
                for (let j = 0; j < c; j++) {
                    b = symbols[1 * digit] + b
                }
                if(over5) 
                    roman = a + b + roman
                else 
                    roman = b+a + roman
            }
            else if (c === 4)
                roman = symbols[1 * digit] + symbols[5 * digit] + roman
            else if (c=== 9) 
                roman = symbols[1 * digit] + symbols[10 * digit] + roman
            current = Math.trunc(current / 10)
            digit = digit * 10
        }
        
    }
    return roman
};
console.log(IntToRoman(99))
console.log(IntToRoman(7))
console.log(IntToRoman(729))
// console.log(romanToInt('MCMXCIV'))
// console.log(romanToInt('XII'))
// console.log(romanToInt('XLII'))
// console.log(romanToInt('LVIII'))
// console.log(minWindow( "ADOBECODEBANC", "ABC" ))
// console.log(validStringPalindrome("haah"))
// console.log(longestPalindrome("abghbab"))
// console.log(longestPalindrome("wsaash"))
// console.log(longestPalindrome("ghoohooqq"))
// console.log(reverse(-123))
// console.log(`-121 is palindrome: ${isPalindrome(-121)}`)
// console.log(`121 is palindrome: ${isPalindrome(121)}`)
// console.log(`1212121 is palindrome: ${isPalindrome(1212121)}`)
// console.log(`1239321 is palindrome: ${isPalindrome(1239321)}`)
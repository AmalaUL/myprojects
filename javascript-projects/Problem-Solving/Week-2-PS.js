//1. Remove Duplicates from Array Without Using Set

function removeDuplicates(arr) {
    let seen = {};
    const uniqueArray = [];
    for (let num of arr) {
        if (!(num in seen)) {
            uniqueArray.push(num);
            seen[num] = true;
        }
    }
    return uniqueArray;

}

console.log(removeDuplicates([1, 2, 5, 2, 3, 4, 4, 5]));//[1, 2, 3, 4, 5]

//2. Find the First Non-Repeating Character in a String
function findNonRepeatingCharacter(str) {
    const strArr = str.replace(/\s/g, '').split('');

    const countObj = {}

    for (let char of strArr) {
        countObj[char] = (countObj[char] || 0) + 1;
    }

    for (let char of strArr) {
        if (countObj[char] === 1) {
            return char;
        }
    }
}

console.log(findNonRepeatingCharacter('swiss'));//w

//3. Chunk an Array into Smaller Arrays of Given Size
function chunkArray(arr, size) {
    let chunk = [];

    for (let i = 0; i < arr.length; i += size) {
        chunk.push(arr.slice(i, i + size));
    }
    return chunk;

}

console.log(chunkArray([1, 2, 3, 4, 5], 2));//[[1,2],[3,4],[5]]


//4.Flatten a Nested Array Without Using .flat()
function flattenArrayWithoutFlat(arr) {
    if (!Array.isArray(arr)) return [arr];

    let flatArray = [];
    for (let ele of arr) {
        if (Array.isArray(ele)) {
            flatArray.push(...flattenArrayWithoutFlat(ele));
        } else {
            flatArray.push(ele);
        }
    }
    return flatArray;

}

console.log(flattenArrayWithoutFlat([1, [2, [3, 4], 5]]));//[1, 2, 3, 4, 5]


//5 :Check if Two Strings are One Edit Away
function oneEditAwayStr(str1, str2) {
    if (Math.abs(str1.length - str2.length) > 1) return false;

    const s1 = str1.length < str2.length ? str1 : str2;
    const s2 = str1.length < str2.length ? str2 : str1;

    let i = 0;
    let j = 0;
    let foundDifference = false;

    while (i < s1.length && j < s2.length) {

        // console.log(s1[i]);
        // console.log(s2[j]);
        if (s1[i] !== s2[j]) {
            if (foundDifference) return false;
            foundDifference = true;

            if (s1.length === s2.length) {
                i++;
            }
        } else {
            i++;
        }
        j++;
    }
    return true;
}

console.log(oneEditAwayStr("pale", "ple"));//true
console.log(oneEditAwayStr("pales", "pale"));//true
console.log(oneEditAwayStr("pale", "bale"));//true
console.log(oneEditAwayStr("pale", "bake"));//false


//6. Group Words That Are Anagrams
function groupAnagramWords(arr) {
    let map = new Map();
    for (let ele of arr) {
        let sortedEle = ele.split('').sort().join('');
        if (!map.has(sortedEle)) {
            map.set(sortedEle, [])
        }
        map.get(sortedEle).push(ele)

    }
    return Array.from(map.values());


}

console.log(groupAnagramWords(["eat", "tea", "tan", "ate", "nat", "bat"]));//[["eat","tea","ate"],["tan","nat"],["bat"]]

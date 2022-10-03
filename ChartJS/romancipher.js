// David M 1930097 7/26/2021
// global vars
const cipherBook = [];
var constructor = 0;
constructor = constructBook();

// encrypt function
function caesarEn() {
    var key = document.getElementById("rightKey").value;
    var plainText = document.getElementById("userText").value;
    plainText = plainText.toUpperCase();
    var cipherText = "";
    var length = plainText.length;
    var i = 0;
    var temp = 0;
    while (i < length) {
        if (plainText.charCodeAt(i) >= 65 && plainText.charCodeAt(i) <= 90) {
            temp = ((plainText.charCodeAt(i) - 65) + parseInt(key)) % 26; // letter to decimal & reducing range to 0-25
            cipherText += String.fromCharCode(temp+65); // concatenate encrypted letter to string & return normal range
        } else {
            cipherText += plainText[i]; // if char isn't a letter a-z, then store the plain text char as cipher text
        }
        i++;
    }
    document.getElementById("outputText").innerHTML = cipherText;
    document.getElementById("leftKey").value = Math.abs(parseInt(key) - 26); // calculate and display left shift value
}

// decrypt function
function caesarDe() {
    var key = document.getElementById("rightKey").value;
    var plainText = document.getElementById("userText").value;
    plainText = plainText.toUpperCase();
    var cipherText = "";
    var length = plainText.length;
    key = Math.abs(parseInt(key) - 26); // convert right shift key into left shift key
    document.getElementById("leftKey").value = key; // display left shift value
    var i = 0;
    var temp = 0;
    while (i < length) {
        if (plainText.charCodeAt(i) >= 65 && plainText.charCodeAt(i) <= 90) {
            temp = ((plainText.charCodeAt(i) - 65) + parseInt(key)) % 26; // letter to decimal & reducing range to 0-25
            cipherText += String.fromCharCode(temp+65); // concatenate encrypted letter to string & return normal range
        } else {
            cipherText += plainText[i]; // if char isn't a letter a-z, then store the plain text char as cipher text
        }
        i++;
    }
    document.getElementById("outputText").innerHTML = cipherText;
}

function clearText() {
    document.getElementById("outputText").innerHTML = "";
    document.getElementById("userText").value = '';
    document.getElementById("rightKey").value = '';
    document.getElementById("leftKey").value = '';
    updateChart();
}

function freqAttack() {
    // main function to call everything
    const userCipher = document.getElementById("userText").value;
    
    if (constructor != 1){
        constructor = constructBook(); // create array of objects
    } else {
        for (let m = 0; m < 26; m++){ // reset cipherBook object array
            cipherBook[m].cipherText = "";
            cipherBook[m].letterFreq = [];
            cipherBook[m].avgFreq = [];
            cipherBook[m].shift = 0;
            cipherBook[m].score = 0;
            cipherBook[m].charLength = 0;
        }
    }

    var i = 0;
    while (i < 26) {
    cipherBook[i].cipherText = generateStrings(userCipher,i); // generate all possible strings
    cipherBook[i].shift = i; // assign key to object
    cipherBook[i].letterFreq = calcLetterFreq(cipherBook[i].cipherText); // count letter frequencies
    cipherBook[i].avgFreq = calcAvgFreq(cipherBook[i].letterFreq,i); // count average frequencies
    i++;
    }
    cipherBook.sort(function(a, b){return a.score - b.score}); // sort cipherBook object
    
    displayResults();
    updateChart();
}

function constructBook() {
    var i = 0;
    while (i < 26){
        cipherBook.push({cipherText: "",letterFreq: [],avgFreq: [],shift: 0,score: 0,charLength: 0});
        i++;
    }
    return 1;
}

function displayResults(){
    document.getElementById("results").innerHTML = cipherBook[0].cipherText + "<br>Index of Coincidence score: " + 
    cipherBook[0].score + "<br>left shift key: " + cipherBook[0].shift;
}

function generateStrings(string, key) {
    string = string.toUpperCase();
    var cipherText = "";
    var i = 0;
    var temp = 0;
    var count = 0;
    while (i < string.length) {
        if (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90) {
            temp = ((string.charCodeAt(i) - 65) + parseInt(key)) % 26; // letter to decimal & reducing range to 0-25
            cipherText += String.fromCharCode(temp+65); // concatenate encrypted letter to string & return normal range
            count++;
        } else {
            cipherText += string[i]; // if char isn't a letter a-z, then store the plain text char as cipher text
        }
        i++;
    }
    cipherBook[key].charLength = count;
    return cipherText;
}

function calcLetterFreq(string) {
    const letterFreq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var i = 0;
    while (i < string.length) {
        if (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90) {
            switch (string.charCodeAt(i)) {
                case 65: letterFreq[0] += 1; break;
                case 66: letterFreq[1] += 1; break;
                case 67: letterFreq[2] += 1; break;
                case 68: letterFreq[3] += 1; break;
                case 69: letterFreq[4] += 1; break;
                case 70: letterFreq[5] += 1; break;
                case 71: letterFreq[6] += 1; break;
                case 72: letterFreq[7] += 1; break;
                case 73: letterFreq[8] += 1; break;
                case 74: letterFreq[9] += 1; break;
                case 75: letterFreq[10] += 1; break;
                case 76: letterFreq[11] += 1; break;
                case 77: letterFreq[12] += 1; break;
                case 78: letterFreq[13] += 1; break;
                case 79: letterFreq[14] += 1; break;
                case 80: letterFreq[15] += 1; break;
                case 81: letterFreq[16] += 1; break;
                case 82: letterFreq[17] += 1; break;
                case 83: letterFreq[18] += 1; break;
                case 84: letterFreq[19] += 1; break;
                case 85: letterFreq[20] += 1; break;
                case 86: letterFreq[21] += 1; break;
                case 87: letterFreq[22] += 1; break;
                case 88: letterFreq[23] += 1; break;
                case 89: letterFreq[24] += 1; break;
                case 90: letterFreq[25] += 1; break;
                default: alert("Error in calcLetterFreq()"); break;
            }
        }
        i++;
    }
    return letterFreq;
}

function calcAvgFreq(array, index) {
    const engFreq = [8120,1490,2710,4320,12020,2300,2030,5920,7310,100,690,3980,2610,6950,7680,1820,110,6020,6280,9100,
        2880,1110,2090,170,2110,70];
    const avgFreq = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var i = 0;
    while (i < 26) {
        avgFreq[i] = (array[i]*1000)/cipherBook[index].charLength;
        avgFreq[i] -= engFreq[i];
        avgFreq[i] = (avgFreq[i]*avgFreq[i])/engFreq[i];
        avgFreq[i] = Math.abs(avgFreq[i]);
        i++;
    }
    i = 0;
    while (i < 26) {
        cipherBook[index].score += avgFreq[i];
        i++;
    }
    return avgFreq;
}

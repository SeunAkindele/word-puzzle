/************* Puzzle Game *************/

// Game processor
const brain = (() => {
  
    /*
        This block of code processes the data structure of the game application
    */
    const obj = {
        // An array of the words to be shuffled for the player
        // Level 1 
        wor:['church', 'office', 'home', 'school', 'back', 'cook', 'block', 'black', 'table', 'card'],
        // Level 2
        word:['biscuit', 'octopus', 'hanger', 'shuffle', 'abnormal', 'beach', 'capacity', 'cartoon', 'calendar', 'thriller'],
        // Level 3 
        words: ['calibre', 'association', 'revelation', 'catastrophe', 'abasement', 'accessible', 'application', 'parable', 'participate', 'premier'],
        // An array to copy the real word
        copy: [],
        // An array to copy the index for the chosen word
        index: [],
        // An array to get the copied word as an array
        arr: [],
        // An array that consist of the shuffled array
        shuffled: [],
        // An array to accept the input of the user
        input: [],
        // A variable to store the current score of the player
        score: 0,
        // A variable to store the failed attempts
        attempts: 0
    };

    // Object to store all arrays
    const arr = {
        words: obj['words'],
        word: obj['word'],
        wor: obj['wor'],
        index: obj['index'],
        copy: obj['copy'],
        arr: obj['arr'],
        shuffled: obj['shuffled'],
        input: obj['input']
    }

    // To get length of arrays
    const arrLength = (arr) => arr.length;

    // A function to push
    const push = (arr, value) => arr.push(value);   

    // A function to pop
    const pop = (arr) => arr.pop();

    // A function to shift
    const shift = (arr) => arr.shift();
    
    // A function that choses which word array to shuffle
    const chooseArr = (arr, index, copy) => {
        const blindPick = Math.floor(Math.random() * arrLength(arr));
        // Pushes the chosen word into the copyCat array
        push(copy, arr[blindPick]);
        // Pushes the index of the chosen word into the index array
        push(index, blindPick);
    };

    /*
        A function to copy a word randomly from the any of the word arrays and turn it into an array of letters
    */
    const copy = () => {
        if(arrLength(arr.wor) === 0 && arrLength(arr.word) === 0){
            chooseArr(arr.words, arr.index, arr.copy);
        } else if(arrLength(arr.wor) === 0) {
            chooseArr(arr.word, arr.index, arr.copy);
        } else {
            chooseArr(arr.wor, arr.index, arr.copy);
        } 
    };

    
    /*
        A function that splices the words array
    */

    const splice = (arr, index) => arr.splice(index, 1);
    
    /*
        Make a choice for the above function
    */

    const spliceWordsArr = (index) => {
        if(arrLength(arr.wor) === 0 && arrLength(arr.word) === 0){
            splice(arr.words, index);
        } else if(arrLength(arr.wor) === 0) {
            splice(arr.word, index);
        } else {
            splice(arr.wor, index);
        }
    };

    /*
        Turning the copied word into array
    */
    const wordArr = () => {
        const split = arr.copy[0].split("");

        for(const cur of split) {
            push(arr.arr, cur);
            push(arr.shuffled, cur);
        }
    };


    const addScore = () => {
        let add = 1, score;
        score = obj.score + add;
        obj.score = score;

        return score;
    };

    const failedAttempts = () => {
        let add = 1, attempts;
        attempts = obj.attempts + add;
        obj.attempts = attempts;

        return `Failed attempts ${attempts}`;
    };

    const subScore = () => {
        let add = -1, score;
        score = obj.score + add;
        obj.score = score;

        return score;
    };
    /*
        Shuffling the wordArr
    */
    const shuffleArr = () => {
        let newPos, tempPos;
        for(let i = arrLength(arr.shuffled) - 1; i > 0; i--) {
            newPos = Math.floor(Math.random() * i);
            tempPos = arr.shuffled[i];
            arr.shuffled[i] = arr.shuffled[newPos];
            arr.shuffled[newPos] = tempPos;
        }

        return arr.shuffled;
    };


    // Calculates the array length and level of game
    const getArrLength = (level, arr) => {
        if(arrLength(arr) > 1){
            return level + ' ' + arrLength(arr) + ' words';
        }else if(arrLength(arr) === 1) {
            return level + ' ' + arrLength(arr) + ' word';
        }else {
            return '';
        }
    };

    return {
        // Returns the copy function
        getCopy: () => copy(),

        // Returns the new converted array
        getWordArr: () => wordArr(),

        // Returns the shuffled array
        getShuffleArr: () => shuffleArr(),

        // Gets user's input
        getInput:() => arr.input,

        // Get the array 
        getArr:() => arr.arr, 

        // add inputs to the input array
        addInput: (input) => {
            push(arr.input, input);
            return input;
        },

        // Checks if spelling is correct
        checkInput: () => {
            let i, el, result;

            i = arrLength(arr.input) - 1;

            if(arr.input[i] === arr.arr[i]) {
                for(let cur of arr.shuffled){
                    if(arr.input[i] === cur){
                        el = arr.shuffled.indexOf(cur);
                        splice(arr.shuffled, el);
                        result = cur;
                        break;
                    }
                }
                return result;
            } else {
                // reomves wrong letter that is not correct
                pop(arr.input);
                return '';
            }
        },

        // Gets the add score method
        getAddScore: () => addScore(),

        // Gets the subtract score method
        getSubScore: () => subScore(),

        // Gets the failed attempts method
        getFailedAttempts: () => failedAttempts(),

        // Gets the current score
        getScore:() => {
            return{
                score: obj.score
            }
        },

        // Gets the index of the current word
        getIndex:() => arr.index[0],
        
        // Gets the length of the word and level of the game
        getWordsArrLength:() => {
            if(arrLength(arr.wor) === 0 && arrLength(arr.word) === 0){
                return getArrLength('Level 3 ------', arr.words);
            } else if(arrLength(arr.wor) === 0) {
                return getArrLength('Level 2 ------', arr.word);
            } else {
                return getArrLength('Level 1 ------', arr.wor);
            }
        },

        // Splices the index array
        getspliceWordArr:(index) => spliceWordsArr(index),

        // Shifts the index array
        shiftIndex:() => shift(arr.index),

        // Clears the copy, input and arr arrays
        clearArr:() => {
            arr.input.length = 0;
            arr.copy.length = 0;
            arr.arr.length = 0;
        },

        // Clears the shuffled array
        clearShuffle:() => {
            arr.shuffled.length = 0;
        },

        // Get the input length
        getInputLength:() => {
            return {
                length: arrLength(arr.input)
            }
        },
        
        // Checks if the all arrays have been exhausted
        gameOver:() => {
           return {
               length: arrLength(arr.words)
           }
        },

        //data structure tester
        testing: {
            copy: arr.copy,
            index: arr.index,
            words: arr.words,
            word: arr.word,
            wor: arr.wor,
            arr: arr.arr,
            shuffled: arr.shuffled,
            input: arr.input
        }
        
    }

})();


// Game interface
const interface = (() => {
    // An object to hold all the dom strings
    const domStrings = {
        btn: '.screen-btn',
        empty: '.screen__empty',
        puzzle: '.screen__puzzle',
        field: '.screen__field',
        score: '.screen-score',
        winner: '.winner',
        fair: '.fair',
        wordNumber: '.word-number',
        refresh: '.refresh',
        textStart: '.text-start',
        textRefresh: '.text-refresh',
        attempts: '.attempts'
    };

    // Changes text content as required
    const  textContent = (item, style) => document.querySelector(style).textContent = item;

    // Changes display styles as required
    const display = (block, none) => {
        for(const cur of block) {
            document.querySelector(cur).style.display = 'block';
        }
        for(const cur of none) {
            document.querySelector(cur).style.display = 'none';
        }
    };

    // Changes background color and font color as required
    const backgroundColor = (bgColor, color, item) => {
        document.querySelector(item).style.backgroundColor = bgColor;
        document.querySelector(item).style.color = color;
    };

    // Delete the required element
    const delElement = (el) => {
        document.querySelector(el).innerHTML = ""; 
    };

    return {
        // Return all dom strings
        getDoms: () => domStrings,

        // inserts the shuffled letters into the DOM
        displayShuffle: (arr) => {
            let html, newhtml, puzzle, count = 0;

            puzzle = document.querySelector(domStrings.puzzle);
            html = '<div style="margin-bottom:10px;" id="%id%" class="puzzle__text">%letter%</div>';

            for(const cur of arr) {
                count++;
                newhtml = html.replace('%letter%', cur);
                newhtml = newhtml.replace('%id%', cur+'-'+count);
                puzzle.insertAdjacentHTML('beforeend', newhtml);
            }
        },

        // inserts user's input into the DOM
        displayInput: (cur) => {
            let html, newhtml;
            
            field = document.querySelector(domStrings.field);
            html = '<div style="margin-bottom:10px;" id="%id%" class="field__text">%letter%</div>';

            newhtml = html.replace('%letter%', cur);
            newhtml = newhtml.replace('%id%', cur);
            field.insertAdjacentHTML('beforeend', newhtml);
        },

        // removes the successfully picked letter from the puzzle
        deleteShuffle: (id) => id.remove(),

        // clears required div children
        getDelElement: (el) => delElement(el),

        // styles the failed attempts
        failedAttempts: (id) => {
            id.style.backgroundColor = 'pink';
            id.style.color = 'red';
            backgroundColor('pink', 'red', domStrings.score);
        },
        
        // Gets the background color and color styling method
        getBackgroundColor: (bgColor, color, item) => backgroundColor(bgColor, color, item),

        // Gets the text content changing method
        getTextContent: (item, style) => textContent(item, style),

        // Gets the display method
        getDisplay: (block, none) => display(block, none),

    }
    
    
})();


// Game controller
const ctrl = ((mind, face) => {
    // Getting all the dom strings
    const doms = face.getDoms();
    /*
        This block of code activates the eventlisteners
    */
    const eventListeners = () => {
        // Starts the puzzle
        document.querySelector(doms.btn).addEventListener('click', startPuzzle);
        // Accepts users inputs
        document.querySelector(doms.puzzle).addEventListener('click', acceptInput);
    };

    /*
        This block of code deals with the events that happen when the puzzle starts
    */
    const startPuzzle = () => {

        let shuffle;

        let inputLength = mind.getInputLength();

        if(inputLength.length === 0) {
            mind.shiftIndex();
            mind.clearArr();
            mind.clearShuffle();
            face.getDelElement(doms.field);
            face.getDelElement(doms.puzzle);
            mind.getCopy();        
            mind.getWordArr();
            shuffle = mind.getShuffleArr();
            
            face.displayShuffle(shuffle);
            face.getDisplay([doms.puzzle], []);
            face.getBackgroundColor('#eee', '#777', doms.score);
        }
    };

    // Happens if input is correct
    const ifCorrect = (id, input) => {
        face.deleteShuffle(id);
        face.getDisplay([doms.field], [doms.empty]);
        face.displayInput(input);
        face.getBackgroundColor('#eee', '#777', doms.score);
        face.getDisplay([], [doms.btn, doms.textStart]);
    };

    // Happens after each word is spelt correctly
    const afterEachWord = () => {
        mind.getAddScore();
        score = mind.getScore();
        face.getTextContent(score.score, doms.score);
        face.getDisplay([], [doms.puzzle]);
        face.getBackgroundColor('greenyellow', 'white', doms.score);

        //arrays will be cleared
        index = mind.getIndex();
        mind.getspliceWordArr(index);
        mind.shiftIndex();
        mind.clearArr();
        face.getDelElement(doms.field);
        face.getDisplay([doms.empty], [doms.field]);
        face.getDisplay([doms.btn, doms.textStart], []);
    };

    const won = () => {
        // Checks if the game is won perfectly
        if(length.length === 0 && score.score === 30) {
            // console.log("Winner");
            face.getDisplay([doms.winner], []);
            face.getDisplay([], [doms.btn, doms.textStart]);
            face.getDisplay([doms.refresh, doms.textRefresh], []);
        
        // Checks if the game is won fairly
        } else if(length.length === 0 && score.score < 30) {
            // console.log("Fair");
            face.getDisplay([doms.fair], []);
            face.getDisplay([], [doms.btn, doms.textStart]);
            face.getDisplay([doms.refresh, doms.textRefresh], []);
        }
    };

    const ifNotCorrect = (id) => {
        if(mind.getInput().length == 0){
            // Happens only if the first letter for each trial is incorrect
            face.getDisplay([doms.empty], [doms.field]);
        }

        // subtract score if failed
        mind.getSubScore();
        score = mind.getScore();
        face.getTextContent(score.score,doms.score);
        //styles the failed attempts
        face.failedAttempts(id);
        //adds failed attempts
        const attempt = mind.getFailedAttempts();
        face.getTextContent(attempt,doms.attempts);
    };
    
    // This block of code deals with the events that happen when user enters input

    const acceptInput = (event) => {
  
        let input, check;

        // Checks if the user has finished spelling the word correctly and moves to the next word
        face.getDisplay([doms.field], [doms.empty]);
        // Applies the display styles as required

        // gets the id of the clicked element
        const elementId = event.target.id;
        // gets the letter that was clicked
        const text = document.getElementById(elementId).innerText;
        // gets the id of the clicked element
        const id = document.getElementById(elementId);
        // adds a letter to the input array
        input = mind.addInput(text);
        // Stores input validation
        check = mind.checkInput();
        
        
        if(check !== '') {
            // happens if input is correct
            ifCorrect(id, input);

            // Happens if word was spelt correctly
            if(mind.getInput().length - 1 === mind.getArr().length - 1) {
                // happens at the end of each spelt word
                afterEachWord();

                // Stores the length of the last level words array
                length = mind.gameOver();
                
                // Checks if the game is won perfectly or fairly
                won();

                // Gets the number of remaining words in puzzle game
                const gWaL = mind.getWordsArrLength();

                // Displays it on the UI
                face.getTextContent(gWaL, doms.wordNumber);
            }
     
        }else if(check === '') {
            // happens if input is incorrect
            ifNotCorrect(id);
        }
    }

    return {
        // A public function to initialise the game
        init: () => {
            // console.log('Puzzle game is initialised');

            eventListeners();

            // Gets the amount of words in the puzzle on game start
            let wordLength = mind.getWordsArrLength();

            // Displays the amount of word length on game start
            face.getTextContent(wordLength, doms.wordNumber);
        } 
    }
})(brain, interface);

// Game is initilised
ctrl.init();
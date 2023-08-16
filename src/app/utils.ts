export const splitWords = (allWords: string[], typedWords: string[]) => {
    let correctlyTyped: string[] = [];
    let notTyped: string[] = [];

    let first: boolean = true;

    for (const allWordsKey in allWords) {
        const textWord = allWords[allWordsKey];
        const typedWord = typedWords[allWordsKey];

        if (!typedWord) {
            if (!first) {
                notTyped.push(textWord);
            }
            first = false;
        }
    }
    return notTyped
}

export const getNextWord = (allWords: string[], typedWords: string[]) => {

    let first: boolean = false;
    let index: number = 0;
    for (const allWordsKey in allWords) {
        const textWord = allWords[allWordsKey];
        const typedWord = typedWords[allWordsKey];

        if (!typedWord) {
            index = parseInt(allWordsKey)
            first = true;
            break;
        }
    }

    return index
}

export const arraysEqual = (a: string[], b: string[]) => {
    return a.toString() === b.toString();
};
"use client";

import {DetailedHTMLProps, FormHTMLAttributes, useEffect, useRef, useState} from "react";
import {useTypingStore} from "@/stores/TypeStore";
import {getNextWord} from "@/app/utils";

export const TextInput = () => {

    const [backgroundColor, setBackgroundColor] = useState<string>("bg-white");
    const { text, typed, input, setInput, addTyped, getCurrentWord } = useTypingStore((state) => state);

    const onKeypress = (e: any) => {
        if (e.key === " ") {
            const splitWord = input.split(" ")[0]
            const {index: nextIndex, value: nextWord} = getCurrentWord();
            if (nextWord === splitWord) {
                addTyped(splitWord);
                setInput("");
            }
        }
    }
    const wordChange = (e: any) => {
        let v = "";
        const splitValue = e.target.value.split(" ")[0];
        const {index: nextIndex, value: nextWord} = getCurrentWord();
        if (e.target.value.endsWith(" ") && splitValue === nextWord)
            v = splitValue
        else
            v = e.target.value
        setInput(v);
    }

    const submitWord = (e: any) => {
        e.preventDefault();
        // console.log(word);
    }

    useEffect(() => {
        const nextWord = text[getNextWord(text, typed)];

        if (nextWord.startsWith(input))
            setBackgroundColor("bg-white")
        else {
            if (nextWord.endsWith(" "))
                setBackgroundColor("bg-white")
            else
                setBackgroundColor("bg-red-200")
        }

    }, [input])

    return (
        <div>
            <form onSubmit={submitWord}>
                <input
                    type="text"
                    name="word-input"
                    id="word-input"
                    value={input}
                    onChange={wordChange}
                    onKeyUp={onKeypress}
                    className={`${backgroundColor} block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                />
            </form>

        </div>
    );
};

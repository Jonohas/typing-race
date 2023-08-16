"use client";

import {useTypingStore} from "@/stores/TypeStore";
import {useEffect, useState} from "react";
import {splitWords} from "@/app/utils";

enum CharacterType {
    Missing = 0,
    Correct = 1,
    Incorrect = 2
}

const colors: string[] = ["bg-white", "bg-green-200", "bg-red-200"]

const CurrentText = () => {

    const { input, getCurrentWord, getDone } = useTypingStore((state) => state);
    const {value: currentWord} = getCurrentWord();

    const [characters, setCharacters] = useState<number[]>([])

    useEffect(() => {
        const wordChar = currentWord.split("");
        const inputChar = input.split("");


        setCharacters(wordChar.map((char, index) => {
            if (inputChar[index]) {
                if (inputChar[index] === char)
                    return 1
                else
                    return 2
            } else {
                return 0
            }
        }))


    }, [input])

    useEffect(() => {
        const wordChar = currentWord.split("");
        setCharacters(wordChar.map((char) => 0))
    }, [currentWord]);

    return <>
        {!getDone() && characters.map((value, index) => {
            let color = "";
            if (value === CharacterType.Correct)
                color = colors[CharacterType.Correct]
            else if (value === CharacterType.Incorrect)
                color = colors[CharacterType.Incorrect]
            else
                color = colors[CharacterType.Missing]
            return (<span key={index} className={`${color}`}>{currentWord.split("")[index]}</span>)
        })}
    </>
}


export const Text = () => {

    const { text, typed, input, getCurrentWord, done, getDone } = useTypingStore((state) => state);

    const [notTyped, setNotType]= useState<string[]>([]);

    useEffect(() => {
        setNotType(splitWords(text, typed));
    }, [typed])



    return (
        <div className={"pb-10"}>
            {typed.map((item, index) => (
                <span key={index} className={"bg-green-200"}>
                    {index !== 0 ? " " : ""}
                    {item}
                </span>
            ))}
            <span className={"bg-green-200"}>
                {getDone() ? "" : " "}
            </span>
            <CurrentText />
            {" "}
            {notTyped.map((item, index) =>  (
                <span key={index}>
                    {index !== 0 ? " " : ""}
                    {item}
                </span>
            ))}
            {getDone() ? "Done." : "Not done."}
        </div>
    );
};

import { create } from 'zustand'
import {arraysEqual, getNextWord} from "@/app/utils";


interface TypingState {
    typed: string[];
    input: string;
    text: string[];
    done: boolean;
}

interface TypingAction {
    setText: (text: string[]) => void,
    addTyped: (word: string) => void,
    getCurrentWord: () => {index: number, value: string},
    setInput: (value: string) => void,
    getDone: () => boolean
}

export const useTypingStore = create<TypingState & TypingAction>()((set,getState) => ({
    typed: [],
    input: "",
    clear: false,
    done: false,
    text: ["In", "a", "world", "dominated", "by", "technology,", "the", "power", "of", "touch-typing", "has", "become", "more", "valuable", "than", "ever", "before."],
    setText: (text) => {
        set((state) => ({
            text: text,
        }));
    },
    addTyped: (word) => {
        const st = getState()
        console.log(arraysEqual(st.text, st.typed))
        console.table(st.text);
        console.table(st.typed)
        set((state) => ({
            typed: [...state.typed, word],
            done: arraysEqual(state.text, state.typed)
        }));
    },
    getCurrentWord: () => {
        const state = getState();
        const currentIndex = getNextWord(state.text, state.typed);
        const current = state.text[currentIndex];

        return {index: currentIndex, value: current}
    },
    setInput: (value) => {
        set((state) => ({
            input: value,
            clear: false
        }));
    },
    getDone: () => {
        const st = getState()
        return arraysEqual(st.text, st.typed);
    }
}))
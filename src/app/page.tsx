import Image from 'next/image'
import {Text} from "@/app/(components)/Text";
import {TextInput} from "@/app/(components)/Input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
        <Text />
        <TextInput />
    </main>
  )
}

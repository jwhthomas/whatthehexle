import Row from '@/components/row';
import { useEffect } from 'react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function Home(){

  // useEffect(() => {
  //   window.addEventListener("e")
  // })

  return (
    <div className="w-screen min-h-screen bg-slate-200">
      <div className="flex items-center justify-center h-32 w-full">
        <h1 className={`text-5xl ${roboto.className}`}>What The Hexle?</h1>
      </div>

      <div className="flex w-full justify-center">
        <div className="bg-slate-400 p-10 rounded">
          <Row rowNum={0} />
          <Row rowNum={1} />
        </div>
      </div>
    </div>
  )
}
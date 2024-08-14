'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Squirrel from '@/public/squirrel-lol.png'

export default function Home() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function getData() {
      const response = await fetch('/api/message') //ohne route
      const data = await response.json()
      setMessage(data.message)
    }
    getData()
  }, [])
  const [jokes, setJokes] = useState([])
  const [inputValue, setInputValue] = useState('')
  const initialJokes = [
    {
      id: 1,
      content:
        'What did the shark say, when he ate the clownfish? This tastes a little funny.',
      highlight: ' a little funny.',
    },
    {
      id: 1,
      content:
        'What is an astronaut`s favorite part on a computer? The space bar.',
      highlight: ' The space bar.',
    },
    {
      id: 1,
      content:
        'Why did the hipster burn his mouth? He drank the coffee before it was cool.',
      highlight: ' before it was cool.',
    },
  ]

  function handleSubmit(event) {
    event.preventDefault()
    setJokes([...jokes, inputValue])
  }

  function printJokes(jokes) {
    {
      initialJokes.map((joke) => (
        <blockquote
          key={joke.id}
          className="font-semilight margin:10px text-center text-2xl italic text-slate-900 text-white"
        >
          {joke.content}
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
            <span className=" relative text-white">a chuckle</span>
          </span>
          ...
        </blockquote>
      ))
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 bg-gray-900 p-24 text-white">
      <h1>Nextjs joke list</h1>
      <h2>{message}</h2>
      <blockquote className="font-semilight margin:10px text-center text-2xl italic text-slate-900 text-white">
        The Notebook for{' '}
        <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
          <span className=" relative text-white">a chuckle</span>
        </span>
        ...
      </blockquote>
      {/*Image*/}
      <Image
        src={Squirrel}
        width={500}
        height={500}
        alt="Squirrel laughing in front of laptop"
      />
      {/* Jokes */}
      {/* {initialJokes.map((joke) => (
        <p key={joke.id}>{joke.content}</p>
      ))} */}
      {initialJokes.map((joke) => (
        <blockquote
          key={joke.id}
          className="font-semilight margin:10px text-center text-2xl italic text-slate-900 text-white"
        >
          {joke.content}
          <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-pink-500">
            <span className=" relative text-white">{joke.highlight}</span>
          </span>
        </blockquote>
      ))}
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="newJoke">Insert your joke:</label>
        <input
          class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
          type="text"
          id="newJoke"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        ></input>
        <button type="submit" onClick={handleSubmit}>
          Add to the list of jokes
        </button>
      </form>
      {/* Preview */}
      Type something:
      <p class=" w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none">
        {inputValue}
      </p>
    </main>
  )
}

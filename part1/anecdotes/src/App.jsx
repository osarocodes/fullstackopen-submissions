import { useState, useMemo } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const handleRandomSelector = () => {
    const randomNumber = (Math.random()  * 8)
    const randomIndex = Math.floor(randomNumber)
    setSelected(randomIndex);
  }
  
  const handleVoteCount = () => {
    setVoteCount(votes => {
      const copy = [...votes]
      copy[selected] += 1
      return copy
    })
  }

const maxVotes = Math.max(...voteCount);
const mostVotedIndex = voteCount.findIndex(v => v === maxVotes);
const mostVotedAnecdote = anecdotes[mostVotedIndex];

  return (
    <>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {voteCount[selected]} votes</p>
      <Button onClick={handleVoteCount} text="vote"/>
      <Button onClick={handleRandomSelector} text="next anecdotes"/>
      
      {voteCount.some(votes => votes > 0) && (
      <div>
        <h2>Most Voted Anecdote</h2>
        <p>{mostVotedAnecdote}</p>
        <p>has {maxVotes} votes</p>
      </div>
      )}
    </>
      )
}

export default App
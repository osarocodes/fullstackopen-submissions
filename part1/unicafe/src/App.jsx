import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = (props) => {
  
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {

  return (
    <>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.total}/>
      <StatisticLine text="Average" value={props.averageScore}/>
      <StatisticLine text="positive" value={`${props.positivePercentage} %`}/>

    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodFeedback = () => {
    setGood(g => g + 1)
    setTotal(total + 1)
  }
  const handleNeutralFeedback = () => {
    setNeutral(n => n + 1)
    setTotal(total + 1)
  }
  const handleBadFeedback = () => {
    setBad(b => b + 1)
    setTotal(total + 1)
  }
  const averageScore = (good - bad) / total
  const positivePercentage = (good / total) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodFeedback} text="Good"/>
      <Button onClick={handleNeutralFeedback} text="Neutral"/>
      <Button onClick={handleBadFeedback} text='Bad'/>
      <h1>Statistics</h1>
      {total > 0 
      ? 
      <table>
        <tbody>
            <Statistics 
              good={good} 
              bad={bad} 
              neutral={neutral} 
              total={total} 
              averageScore={averageScore} 
              positivePercentage={positivePercentage}
            />
        </tbody>
      </table>
      :
      "No feedback given"}
    </div>
  )
}

export default App
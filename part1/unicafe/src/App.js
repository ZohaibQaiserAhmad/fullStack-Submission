import React, { useState } from 'react'

//Button Component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

//StatisticLine component
const StatisticLine = (props) => {
  const { text, value } = props;
  return (
    <tr>
      <th>{text} </th>
      <th>{value} </th>
    </tr>
  );
}


//statistics component
const Statistics = (props) => {

  const { good, neutral, bad } = props;

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <tbody>
        <tr>
          <th>Statistics</th>
        </tr>
        <tr>
          <th>No Feedback given</th>
        </tr>
      </tbody>
    )
  }
  else {
    return (
      <tbody>
        <tr>
          <th>Statistics</th>
        </tr>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine text="average" value={(good - bad) / (good + bad + neutral)} />
        <StatisticLine text="positive" value={(good) / (good + bad + neutral) * 100 + "%"} />
      </tbody>
    );
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <table>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </table>


    </div>
  )
}

export default App
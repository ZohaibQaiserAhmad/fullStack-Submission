import React, { useState } from 'react'

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
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>

      <table>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </table>


    </div>
  )
}

export default App
import React, { useState } from 'react'

//find maxIndex of points to display ancedote with most votes
function maxIndex(points) {

  //points is already prepopulated (no need to check if length is 0)

  //use start as a reference
  var max = points[0];
  var maxIndex = 0;

  //itterate through points and find max
  for (var i = 1; i < points.length; i++) {

    //keep comparing values and find the next max
    if (points[i] > max) {
      maxIndex = i;
      max = points[i];
    }
  }

  //returning max Index found
  return maxIndex;
}

const App = () => {

  const handleVotes = () => {

    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);

  }

  const randomGenerator = () => {
    let anecdotes_length = anecdotes.length - 1;
    let random = Math.random() * (anecdotes_length);
    random = Math.round(random);

    setSelected(random);
  }

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0]);

  return (
    <div>
      <h1>Anecdote of the day </h1>
      {anecdotes[selected]} <br /> has {points[selected]} votes
      <br />
      <button onClick={() => handleVotes()}>vote</button>
      <button onClick={() => randomGenerator()}>next anecodote</button>

      <h1>Anecdote with most votes </h1>
      {anecdotes[maxIndex(points)]} has {points[maxIndex(points)]} votes

    </div>
  )
}

export default App
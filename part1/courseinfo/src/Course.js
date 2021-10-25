import React from 'react'

//for secure key id
import { nanoid } from 'nanoid'


const Part = (props) => {
    return (
        <p>{props.part} {props.exercise}</p>
    )
}

const Header = (props) => {
    return (
        <h1>{props.name}</h1>
    );
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => {
                return <Part part={part.name} exercise={part.exercises} key={nanoid()} />
            })}
        </>
    );
}

const Total = (props) => {
    const { parts } = props;

    let initialValue = 0;
    return (
        <>
            <p>Number of exercises {parts.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.exercises;
            }, initialValue)}</p>
        </>
    );
}


const Course = (props) => {

    const { course } = props;
    const name = course.name;
    const parts = course.parts;

    return (
        <>
            <Header name={name} />
            <Content parts={parts} />
            <Total parts={parts} />

        </>
    );
}

export default Course
import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Counter = ({count, id, setCount, resetCounter,incrementCounter}) => (
  <div className={styles.counter}>
    <div className={styles.count}>{count}</div>
    <div 
    onClick={()=>incrementCounter(id)} 
    className={styles.button}>
      +
    </div>
    <div
      onClick={()=>resetCounter(id)}
      className={`${styles.button} ${styles.resetButton}`}
    >
      Reset
    </div>
  </div>
)

export default function Home() {
  const [countersData, setCountersData] = useState([]);
  const [id, setId] = useState(0)

  const generateId = () =>{
    setId(id+1)
    return id
  }

  const updateCounter = (id, updateFunction) =>{
    const updatedCounters = countersData.map(data=>{
      if(data.id !== id)
        return data
      return{...data, count: updateFunction(data.count)}
    })
    setCountersData(updatedCounters)
  }
  
  const resetCounter = (id) =>  updateCounter(id, (count) => 0)
  const incrementCounter = (id) => updateCounter(id, (count)=>count+1)

  const addCounter = () =>{
    setCountersData([...countersData,{
      count:0,
      id: generateId()
    }])
  }

  const resetAllCounters =() =>{
    const counters = countersData.map(data=>{
      return{...data, count:0}
    })
    setCountersData(counters)
  }

  return <div className={styles.container}>

    <div
      className={styles.button}
      onClick={addCounter}
    >
      Add Counter
    </div>
    <div 
    className={styles.button}
    onClick={resetAllCounters}
    >
      Reset All Counters
    </div>
    <div className={styles.counterContainer}>
    {countersData.map(data=>{
      console.log(data)
      return(
        <Counter
        {...data}
        resetCounter={resetCounter}
        incrementCounter={incrementCounter}
      />
      )
    })}
  </div>
    
  </div>;
}

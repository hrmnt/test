import React, { useCallback, useEffect, useRef, useState } from 'react';

import logo from './logo.svg';
import './App.css';
import { parseMap } from "./utils/Parser"
import { Container, Grid, Table, TableCell, TableContainer, TableRow } from '@mui/material';


function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [connected, setConnected] = useState<boolean>(false)
  const [status, setStatus] = useState("")
  const [data, setData] = useState<{ key: number; value: number; }[][]>([])

  // useEffect(() => {
  //   if (!isPaused) {
  //     console.log("FUCK")

  //     return
  //   }


  //   return () => ws?.close(); // кода меняется isPaused - соединение закрывается
  // }, [ws, isPaused]);



  // const sendHelp = () => {

  //   ws?.send("help");
  // }
  // const startLevel = (index: number) => {
  //   ws?.send(`new ${index}`);
  //   ws?.send("map");
  // }

  // const handleOpen = (x: number, y: number) => {
  //   ws?.send(`open ${y} ${x}`)
  // }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {[1, 2, 3, 4].map((index) => {
            return (
              <button>{index}</button>
            )
          })}
        </div>
        <div className='d-flex'>
          {
            data.map((c1, c1index) => {
              return <div className='row'>{c1.map((c2, c2index) => {
                return <div className='table-cell' />
              })}</div>
            })
          }
        </div>
      </header>
    </div>
  );
}

export default App;

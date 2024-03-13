"use client";
import { useDAppConnectorStore } from "@/lib/services/store/Zustand";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [x, setX] = useState('still nothing yet');
    const [y, setY] = useState('Joli mina');

    const d = useDAppConnectorStore(state => state.dAppConnector)

    const updateDapp = useDAppConnectorStore(state => state.update)
  
  const handleClick = () => {
    setX(y);
    updateDapp(y)
  };

  
  return (
    <>
    <Link href="/test2">Test 2</Link>
    <div>
        <h2>Daopp is: {d}</h2>
      <h1>{x}</h1>
      <input 
        type="text" 
        onChange={(e) => setY(e.target.value)}
      />      
    </div>
    <div>
    <button onClick={handleClick}>Change Title</button>
    </div>
    </>
    
  );
  }
  
"use client";
import { connect, init, disconnect, newConnector } from "@/lib/services/wallet-connect-config/connection";
import { hedera_signAndExecuteQuery, hedera_signAndExecuteTransaction } from "@/lib/services/wallet-connect-config/json_rpc_abstractions";
import { useEffect, useState } from "react";

export default function Page() {
  const accountID1="0.0.1477"
  const accountID2="0.0.3539162"
  const [dAppConnector,setDAppConnector]=useState(newConnector());
  const [m3,setM3]=useState("Still nothing here")
  const [m4,setM4]=useState("Still nothing here")
  
  useEffect(()=>{
    const f= async ()=>{
      let x=dAppConnector
      await init(x)
      setDAppConnector(x)
    }
    f()
  },[])
  const clickHandler1=async ()=>{
    try {
      console.log("We try to connect");   
      let x=dAppConnector   
      let r=await connect(x)
      console.log(r)      
      setDAppConnector(x)      
    } catch (error) {
      console.error("Failed to open connector")
      console.error(error);      
    }
  }

  const clickHandler2=async ()=>{
    try {
      console.log("We try to disconnect");   
      let x=dAppConnector   
     await disconnect(x)
      console.log("Disconnected succefully")
      setDAppConnector(x)      
    } catch (error) {
      console.error("Failed to disconnect")
      console.error(error);      
    }
  }

  const clickHandler3=async ()=>{
    try {
      console.log("We try to exec q");   
      let x=dAppConnector   
      setM3(JSON.stringify(await hedera_signAndExecuteQuery(dAppConnector,accountID2)))
      setDAppConnector(x)      
    } catch (error) {
      console.error("Failed to exec q") 
      console.error(error);
        
    }
  }

  const clickHandler4=async ()=>{
    try {
      console.log("We try to exec tx");   
      let x=dAppConnector   
      setM4(JSON.stringify(await hedera_signAndExecuteTransaction(dAppConnector,accountID1,accountID2)))
      setDAppConnector(x)      
    } catch (error) {
      console.error("Failed to exec tx")   
      console.error(error);
    }
  }
  return (
    <>
    {
      dAppConnector.isInitializing?<h1>We are initializing</h1>:<></>
    }
    <br /><br />
    <div className="mainContainer">
    <button onClick={clickHandler1}>Connect wallet</button>
    </div>

    <br /><br />
    <div className="mainContainer">
    <button onClick={clickHandler2}>Disconnect wallet</button>
    </div>
    <br /><br />

     <h2>Sign and exec query</h2>
    <div className="mainContainer">
      <span>{m3}</span>
    </div>
    <div className="mainContainer">
    <button onClick={clickHandler3}>Sign and exec query</button>
    </div>
    <br /><br />
    <h2>Sign and exec tx</h2>
    <div className="mainContainer">
      <span>{m4}</span>
    </div>
    <div className="mainContainer">
    <button onClick={clickHandler4}>Sign and exec tx</button>
    </div> 
    </>
  );
}

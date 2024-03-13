"use client";
import { connect, init, disconnect, newConnector } from "@/lib/services/wallet-connect-config/connection";
import { getNodeAccountId } from "@/lib/services/wallet-connect-config/helpers";
import { hedera_executeTransaction, hedera_signAndExecuteQuery, hedera_signAndExecuteTransaction, hedera_signTransaction } from "@/lib/services/wallet-connect-config/json_rpc_abstractions";
import { base64StringToSignatureMap, signerSignaturesToSignatureMap, transactionBodyToBase64String, transactionToTransactionBody } from "@hashgraph/hedera-wallet-connect";
import { Hbar, TransactionId, TransferTransaction } from "@hashgraph/sdk";
import { useEffect, useState } from "react";

export default function Page() {
  const accountID1 = "0.0.3608076"
  const accountID2 = "0.0.3671301"
  const msAccountID = "0.0.3692477"
  const [dAppConnector, setDAppConnector] = useState(newConnector());
  const [m3, setM3] = useState("Still nothing here")
  const [m4, setM4] = useState("Still nothing here")
  const [txBody, setTxBody] = useState<any>(null)
  const [sms, setSMs] = useState<any[]>([])
  // @ts-ignore
  const [bb, setBb] = useState<any>(transactionBodyToBase64String(transactionToTransactionBody(new TransferTransaction()
  .setTransactionId(TransactionId.generate(msAccountID))
    .setMaxTransactionFee(new Hbar(2))
    .addHbarTransfer(msAccountID, new Hbar(-1))
    .addHbarTransfer(accountID2, new Hbar(+1)), getNodeAccountId()),)
  )
  
  const mergeSigMaps=():any=>{
    let signatureMaps = sms.map(x=>base64StringToSignatureMap(x))
    let gSignatureMap = signatureMaps.shift()    
    signatureMaps.forEach(x=>gSignatureMap!.sigPair.push(x.sigPair[0]))
    
    return gSignatureMap
  }
  

  useEffect(() => {
    const f = async () => {
      let x = dAppConnector
      await init(x)
      setDAppConnector(x)
    }
    f()
  }, [])
  const clickHandler1 = async () => {
    try {
      console.log("We try to connect");
      let x = dAppConnector
      let r = await connect(x)
      console.log(r)
      setDAppConnector(x)
    } catch (error) {
      console.error("Failed to open connector")
      console.error(error);
    }
  }

  const clickHandler2 = async () => {
    try {
      console.log("We try to disconnect");
      let x = dAppConnector
      await disconnect(x)
      console.log("Disconnected succefully")
      setDAppConnector(x)
    } catch (error) {
      console.error("Failed to disconnect")
      console.error(error);
    }
  }

  const clickHandler3 = async () => {
    try {
      console.log("We try to exec tx");
      let x = dAppConnector
      console.log("The list of sm: ",sms);
      
      const y = await hedera_executeTransaction(x,bb,mergeSigMaps())
      console.log(y);      
      setDAppConnector(x)
    } catch (error) {
      console.error("Failed to exec tx")
      console.error(error);

    }
  }

  const clickHandler4 = async () => {
    try {
      console.log("We try to sign tx");
      let x = dAppConnector
      let txres = await hedera_signTransaction(x, msAccountID,
        bb
      )
      // setTxBody(txres.params.transactionBody)
      setBb(txres.params.transactionBody)
      setSMs([...sms,txres.signatureMap])
      console.log("txres", txres);
      
      setDAppConnector(x)
    } catch (error) {
      console.error("Failed to exec tx")
      console.error(error);
    }
  }
  return (
    <>
      <h1>Experiments DApp</h1>
      {
        dAppConnector.isInitializing ? <h1>We are initializing</h1> : <></>
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

      <h2>Exec Tx</h2>
      <div className="mainContainer">
        <span>{m3}</span>
      </div>
      <div className="mainContainer">
        <button onClick={clickHandler3}>Exec tx button</button>
      </div>
      <br /><br />
      <h2>Sign tx</h2>
      <div className="mainContainer">
        <span>{m4}</span>
      </div>
      <div className="mainContainer">
        <button onClick={clickHandler4}>Sign tx button</button>
      </div>
    </>
  );
}

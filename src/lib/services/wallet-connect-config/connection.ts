import { DAppConnector, HederaChainId, HederaJsonRpcMethod, HederaSessionEvent } from "@hashgraph/hedera-wallet-connect";
import { getDAppConnector, getDAppMetadata, getDAppProjectId, storeDAppConnector } from "./helpers";
import { LedgerId } from "@hashgraph/sdk";


export function newConnector() {
  const projectId = getDAppProjectId();
  const metadata = getDAppMetadata();

  let dAppConnector = new DAppConnector(
    metadata,
    LedgerId.TESTNET,
    projectId,
    Object.values(HederaJsonRpcMethod),
    [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
    [HederaChainId.Testnet]
  );

  return dAppConnector;
}

export async function init(dAppConnector:DAppConnector) {  
  await dAppConnector!.init({ logger: "error" });  
}

export async function connect(dAppConnector:DAppConnector) {  
  await dAppConnector!.openModal();  
  console.log("Connected to wallet!");  
}

export async function disconnect(dAppConnector:DAppConnector) {  
  dAppConnector!.disconnectAll()  
  console.log("disconnected from wallet!");
}

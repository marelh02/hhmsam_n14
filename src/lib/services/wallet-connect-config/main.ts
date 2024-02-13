import { SignClientTypes } from "@walletconnect/types";
import { LedgerId } from "@hashgraph/sdk";

import {
  HederaSessionEvent,
  HederaJsonRpcMethod,
  DAppConnector,
  HederaChainId,
} from "@hashgraph/hedera-wallet-connect";

import { getDAppMetadata, getDAppProjectId } from "./helpers";

export function newConnector() {
  const projectId = getDAppProjectId();
  const metadata: SignClientTypes.Metadata = getDAppMetadata();

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

export async function init(dAppConnector: DAppConnector) {
  await dAppConnector.init({ logger: "error" });
}

export async function connect(dAppConnector: DAppConnector) {
  await dAppConnector!.openModal();

  return "Connected to wallet!";
}

export async function disconnect(dAppConnector: DAppConnector) {
  dAppConnector!.disconnectAll();
}

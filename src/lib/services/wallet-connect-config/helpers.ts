import { SignClientTypes } from "@walletconnect/types";
import { AccountId, LedgerId } from "@hashgraph/sdk";
import {
  HederaSessionEvent,
  HederaJsonRpcMethod,
  DAppConnector,
  HederaChainId
} from "@hashgraph/hedera-wallet-connect";

// ︵‿︵‿୨ Connector storage services ୧‿︵‿︵

export function storeDAppConnector(dAppConnector: DAppConnector): void{
  storeObject(localStorageDAppConnectorKey,dAppConnector)
}

export function getDAppConnector(): DAppConnector {
  const x= retrieveObject<DAppConnector>(localStorageDAppConnectorKey)
  if(x!=null) return x;

  const projectId = getDAppProjectId();
  const metadata: SignClientTypes.Metadata = getDAppMetadata();

  let dAppConnector = new DAppConnector(
    metadata,
    LedgerId.TESTNET,
    projectId,
    Object.values(HederaJsonRpcMethod),
    [HederaSessionEvent.ChainChanged, HederaSessionEvent.AccountsChanged],
    [HederaChainId.Testnet,HederaChainId.Mainnet],
  );
  return dAppConnector;

}

// ︵‿︵‿୨ Session data services ୧‿︵‿︵

export function isUserConnected(){
  return getDAppConnector()?.signers?.length>0;
}

export function getMyAccountId(dAppConnector:DAppConnector){
  return dAppConnector?.signers[0].getAccountId().toString()
}

// ︵‿︵‿୨ DApp Metadata services ୧‿︵‿︵

export function getDAppMetadata(){
    return {
        name: getDAppName(),
        description: getDAppDescription(),
        url: getDAppUrl(),
        icons: getDAppIcons()
    }
}

export function getDAppProjectId(): string {
    return process.env.NEXT_PUBLIC_PROJECT_ID || '';
  }

export function getDAppName(): string {
    return process.env.DAPP_NAME || '';
  }
  
  export function getDAppDescription(): string {
    return process.env.DAPP_DESCRIPTION || '';
  }
  
  export function getDAppUrl(): string {
    return process.env.DAPP_URL || '';
  }
  
  export function getDAppIcons(): string[] {
    return ["https://cdn-icons-png.flaticon.com/512/5987/5987861.png"];
  }

// ︵‿︵‿୨ local storage related ୧‿︵‿︵

const localStorageDAppConnectorKey=`${process.env.NEXT_PUBLIC_PROJECT_ID}_dAppConnector`;

  /**
 * Stores an object in localStorage under a given key.
 * @param key The key under which to store the object.
 * @param obj The object to store.
 */
function storeObject(key: string, obj: any): void {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Only objects can be stored in localStorage.');
  }
  localStorage.setItem(key, JSON.stringify(obj));
}

/**
 * Retrieves an object from localStorage under a given key.
 * @param key The key under which the object is stored.
 * @returns The retrieved object, or null if not found.
 */
function retrieveObject<T>(key: string): T | null {
  const storedString = localStorage.getItem(key);
  if (!storedString) {
    return null;
  }
  try {
    return JSON.parse(storedString) as T;
  } catch (error) {
    console.error('Error parsing object from localStorage:', error);
    return null;
  }
}
  // ︵‿︵‿୨★୧‿︵‿︵
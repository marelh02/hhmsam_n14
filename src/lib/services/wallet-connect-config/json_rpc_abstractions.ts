// import { DAppConnector, SignAndExecuteQueryParams, queryToBase64String } from "@hashgraph/hedera-wallet-connect"
// import { AccountInfo, AccountInfoQuery, Query } from "@hashgraph/sdk"
import { Buffer } from 'buffer';
// https://docs.walletconnect.com/2.0/api/sign/dapp-usage
import { SignClientTypes } from '@walletconnect/types';
import {
	Transaction,
	TransferTransaction,
	Hbar,
	TransactionId,
	AccountInfoQuery,
	AccountId,
	Timestamp,
	LedgerId,
	PublicKey,
	AccountInfo,
	Query,
	AccountBalanceQuery,
	AccountBalance,
	AccountCreateTransaction,
	TransactionReceipt,
	KeyList,
	AccountUpdateTransaction,
} from '@hashgraph/sdk';
import { proto } from '@hashgraph/proto';
import {
	HederaSessionEvent,
	HederaJsonRpcMethod,
	transactionToBase64String,
	transactionToTransactionBody,
	transactionBodyToBase64String,
	base64StringToSignatureMap,
	queryToBase64String,
	ExecuteTransactionParams,
	SignMessageParams,
	SignAndExecuteQueryParams,
	SignAndExecuteTransactionParams,
	SignTransactionParams,
	DAppConnector,
	HederaChainId,
	verifyMessageSignature,
} from '@hashgraph/hedera-wallet-connect';

// ︵‿︵‿୨ JSON RPC Methods, KEEP OUT!!! ୧‿︵‿︵

export async function hedera_getNodeAddresses(dAppConnector: DAppConnector) {
	return await dAppConnector!.getNodeAddresses();
}

export async function hedera_executeTransaction(dAppConnector: DAppConnector) {
	// const bodyBytes = Buffer.from(getState('execute-transaction-body'), 'base64')
	// const sigMap = base64StringToSignatureMap(getState('execute-transaction-signature-map'))
	// const bytes = proto.Transaction.encode({ bodyBytes, sigMap }).finish()
	// const transactionList = transactionToBase64String(Transaction.fromBytes(bytes))
	// const params: ExecuteTransactionParams = { transactionList }
	// return await dAppConnector!.executeTransaction(params)
}

// 3. hedera_signMessage
export async function hedera_signMessage(dAppConnector: DAppConnector) {
	// const message = getState('sign-message')
	// const params: SignMessageParams = {
	//   signerAccountId: 'hedera:testnet:' + getState('sign-message-from'),
	//   message,
	// }
	// const { signatureMap } = await dAppConnector!.signMessage(params)
	// const accountPublicKey = PublicKey.fromString(getState('public-key'))
	// const verified = verifyMessageSignature(message, signatureMap, accountPublicKey)
	// document.getElementById('sign-message-result')!.innerHTML =
	//   `Message signed - ${verified}: ${message}`
	// return signatureMap
}

// 4. SignAndExecuteQuery
export async function hedera_signAndExecuteQuery(
	dAppConnector: DAppConnector,
	accountId: string
) {
	const query = new AccountBalanceQuery().setAccountId(accountId);
	const params: SignAndExecuteQueryParams = {
		signerAccountId: 'hedera:testnet:' + accountId,
		// @ts-ignore
		query: queryToBase64String(query),
	};
	console.log('just before sending query');
	// @ts-ignore
	const { response } = await dAppConnector!.signAndExecuteQuery(params);
	const bytes = Buffer.from(response, 'base64');
	const accountInfo = AccountBalance.fromBytes(bytes);
	console.log(accountInfo);
	return accountInfo.hbars;
}

// 5. hedera_signAndExecuteTransaction
export async function hedera_signAndExecuteTransaction(
	dAppConnector: DAppConnector,
	sender: string,
	receiver: string
) {
	// const transaction = new TransferTransaction()
	// .setTransactionId(TransactionId.generate(sender))
	//   .addHbarTransfer(sender, new Hbar(-1))
	//   .addHbarTransfer(receiver, new Hbar(+1))

	// ︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨ @jules: account creation tx ୧︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿
	const walletConnect: any;
	const initialKey = await walletConnect.getCurrentUserKey();

	//Create the transaction
	const transaction = await new AccountCreateTransaction()
		.setKey(PublicKey.fromString(initialKey))
		.setInitialBalance(new Hbar(1))
		.freezeWithSigner(await walletConnect.getSigner());

	//Sign the transaction with the client operator private key and submit to a Hedera network
	const txResponse: TransactionReceipt = await walletConnect.executeTransaction(
		transaction
	);

	console.log(
		`The new single key account ID is: ${txResponse.accountId?.toString()}`
	);

	const newMsAccountId: string | undefined = txResponse.accountId?.toString();

	if (newMsAccountId === undefined) {
		throw new Error('Could not get new multisig account ID');
	}

	// ︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨ @jules: change of key ୧︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿
	/*
	const keyList: PublicKey[] = [];
	const threshold = 2;

	const multisigPubKeyList = new KeyList(keyList);

	if (threshold > 0 && threshold <= keyList.length) {
		multisigPubKeyList.setThreshold(threshold);
	}

	const nodeId: AccountId[] = [new AccountId(3)];

	const makeMultisigTx = await new AccountUpdateTransaction()
		//.setNodeAccountIds(nodeId)
		.setAccountId(newMsAccountId)
		.setKey(multisigPubKeyList)
		.freezeWithSigner(await walletConnect.getSigner());

	walletConnect.signTransaction(makeMultisigTx);
  */

	// ︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿

	const params: SignAndExecuteTransactionParams = {
		// @ts-ignore
		transactionList: transactionToBase64String(transaction),
		signerAccountId: 'hedera:testnet:' + sender,
	};

	const ret = await dAppConnector!.signAndExecuteTransaction(params);
	console.log(ret);
	return ret;
}

// 6. hedera_signTransaction
export async function hedera_signTransaction(dAppConnector: DAppConnector) {
	// const transaction = new TransferTransaction()
	//   .setTransactionId(TransactionId.generate(getState('sign-from')))
	//   .setMaxTransactionFee(new Hbar(1))
	//   .addHbarTransfer(getState('sign-from'), new Hbar(-getState('sign-amount')))
	//   .addHbarTransfer(getState('sign-to'), new Hbar(+getState('sign-amount')))
	// const params: SignTransactionParams = {
	//   signerAccountId: 'hedera:testnet:' + getState('sign-from'),
	//   transactionBody: transactionBodyToBase64String(
	//     // must specify a node account id for the transaction body
	//     transactionToTransactionBody(transaction, AccountId.fromString('0.0.3')),
	//   ),
}

//   const { signatureMap } = await dAppConnector!.signTransaction(params)
//   document.getElementById('sign-transaction-result')!.innerText = JSON.stringify(
//     { params, signatureMap },
//     null,
//     2,
//   )
//   console.log({ params, signatureMap })
// }

// /*
//  * Error handling simulation
//  */
// export async function simulateGossipNodeError(dAppConnector: DAppConnector) {
//   const sender = sender || getState('send-from')
//   const recepient = receiver || getState('send-to')

//   const transaction = new TransferTransaction()
//     .setNodeAccountIds([new AccountId(999)]) // this is invalid node id
//     .setTransactionId(TransactionId.generate(sender))
//     .addHbarTransfer(sender, new Hbar(-5))
//     .addHbarTransfer(recepient, new Hbar(+5))

//   const params: SignAndExecuteTransactionParams = {
//     transactionList: transactionToBase64String(transaction),
//     signerAccountId: 'hedera:testnet:' + sender,
//   }

//   return await dAppConnector!.signAndExecuteTransaction(params)
// }

// document.getElementById('error-gossip-node')!.onsubmit = (e: SubmitEvent) =>
// showErrorOrSuccess(simulateGossipNodeError, e)

// export async function simulateTransactionExpiredError(dAppConnector: DAppConnector) {
//   const sender = 'hedera:testnet:' + (sender || getState('send-from'))
//   const recepient = receiver || getState('send-to')

//   const transaction = new TransferTransaction()
//     // set valid start to 15 seconds ago
//     .setTransactionId(
//       TransactionId.withValidStart(
//         AccountId.fromString(sender),
//         Timestamp.fromDate(Date.now() - 15000),
//       ),
//     )
//     // 15 seconds is a minimum valid duration otherwise there's an INVALID_TRANSACTION_DURATION error
//     .setTransactionValidDuration(15)
//     .addHbarTransfer(sender, new Hbar(-5))
//     .addHbarTransfer(recepient, new Hbar(+5))

//   const params: SignAndExecuteTransactionParams = {
//     transaction: transactionToBase64String(transaction),
//     signerAccountId: sender,
//   }

//   return await dAppConnector!.signAndExecuteTransaction(params)
// }

// document.getElementById('error-transaction-expired')!.onsubmit = (e: SubmitEvent) =>
// showErrorOrSuccess(simulateTransactionExpiredError, e)

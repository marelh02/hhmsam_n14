// ︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿୨ @jules: account creation tx ୧︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿︵‿
// pk from waco (hashconnect)? pk already associated?
// const walletConnect: any;
// const initialKey = await walletConnect.getCurrentUserKey();

// //Create the transaction
// const transaction = await new AccountCreateTransaction()
// 	.setKey(PublicKey.fromString(initialKey))
// 	.setInitialBalance(new Hbar(1))
// 	.freezeWithSigner(await walletConnect.getSigner());

// //Sign the transaction with the client operator private key and submit to a Hedera network
// const txResponse: TransactionReceipt = await walletConnect.executeTransaction(
// 	transaction
// );

// console.log(
// 	`The new single key account ID is: ${txResponse.accountId?.toString()}`
// );

// const newMsAccountId: string | undefined = txResponse.accountId?.toString();

// if (newMsAccountId === undefined) {
// 	throw new Error('Could not get new multisig account ID');
// }
import { Chain, Transport, Account, Client, RpcSchema, PublicActions, WalletActions, PublicClient, Hex } from 'viem';
import { baseSepolia } from 'viem/chains';

type SignerWallet<chain extends Chain = Chain, transport extends Transport = Transport, account extends Account = Account> = Client<transport, chain, account, RpcSchema, PublicActions<transport, chain, account> & WalletActions<chain, account>>;
type ConnectedClient<transport extends Transport = Transport, chain extends Chain | undefined = Chain, account extends Account | undefined = undefined> = PublicClient<transport, chain, account>;
/**
 * Creates a public client configured for the Base Sepolia testnet
 *
 * @returns A public client instance connected to Base Sepolia
 */
declare function createClientSepolia(): ConnectedClient<Transport, typeof baseSepolia, undefined>;
/**
 * Creates a wallet client configured for the Base Sepolia testnet with a private key
 *
 * @param privateKey - The private key to use for signing transactions
 * @returns A wallet client instance connected to Base Sepolia with the provided private key
 */
declare function createSignerSepolia(privateKey: Hex): SignerWallet<typeof baseSepolia>;
/**
 * Checks if a wallet is a signer wallet
 *
 * @param wallet - The wallet to check
 * @returns True if the wallet is a signer wallet, false otherwise
 */
declare function isSignerWallet<TChain extends Chain = Chain, TTransport extends Transport = Transport, TAccount extends Account = Account>(wallet: SignerWallet<TChain, TTransport, TAccount> | Account): wallet is SignerWallet<TChain, TTransport, TAccount>;
/**
 * Checks if a wallet is an account
 *
 * @param wallet - The wallet to check
 * @returns True if the wallet is an account, false otherwise
 */
declare function isAccount(wallet: SignerWallet | Account): wallet is Account;

export { type ConnectedClient as C, type SignerWallet as S, createSignerSepolia as a, isSignerWallet as b, createClientSepolia as c, isAccount as i };

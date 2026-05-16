import {
  Contract,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  nativeToScVal,
  Address,
  xdr,
  SorobanRpc,
  Account,
} from '@stellar/stellar-sdk';

interface BuildSwapParams {
  caller: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOutMin: string;
  routerContractId: string;
  path: string[];
}

export async function buildSwapTransaction(params: BuildSwapParams): Promise<{ xdr: string }> {
  const {
    caller,
    amountIn,
    amountOutMin,
    routerContractId,
    path,
  } = params;

  const rpcUrl = process.env.NEXT_PUBLIC_STELLAR_RPC_URL ?? 'https://soroban-testnet.stellar.org';
  const networkPassphrase =
    process.env.NEXT_PUBLIC_STELLAR_NETWORK === 'mainnet'
      ? Networks.PUBLIC
      : Networks.TESTNET;

  const rpc = new SorobanRpc.Server(rpcUrl);
  const accountData = await rpc.getAccount(caller);
  const account = new Account(caller, accountData.sequence);

  const contract = new Contract(routerContractId);
  const deadline = Math.floor(Date.now() / 1000) + 300; // 5 min

  const pathScVal = xdr.ScVal.scvVec(
    path.map((addr) => new Address(addr).toScVal()),
  );

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      contract.call(
        'swap_exact_tokens_for_tokens',
        new Address(caller).toScVal(),
        nativeToScVal(BigInt(amountIn), { type: 'i128' }),
        nativeToScVal(BigInt(amountOutMin), { type: 'i128' }),
        pathScVal,
        new Address(caller).toScVal(),
        nativeToScVal(BigInt(deadline), { type: 'u64' }),
      ),
    )
    .setTimeout(300)
    .build();

  const prepared = await rpc.prepareTransaction(tx);
  return { xdr: prepared.toXDR() };
}

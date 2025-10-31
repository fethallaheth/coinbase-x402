import { z } from 'zod';

declare const NetworkSchema: z.ZodEnum<["base-sepolia", "base"]>;
type Network = z.infer<typeof NetworkSchema>;
declare const SupportedEVMNetworks: Network[];
declare const EvmNetworkToChainId: Map<"base-sepolia" | "base", number>;
declare const ChainIdToNetwork: Record<number, Network>;

export { ChainIdToNetwork as C, EvmNetworkToChainId as E, NetworkSchema as N, SupportedEVMNetworks as S, type Network as a };

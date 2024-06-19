import { Address, OpenedContract } from "ton-core";
import { Contract } from "ton-core/dist/contract/Contract";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { useAsyncInitialize } from "./useAsyncInitialize";

export function useContract<ContractType extends Contract>(
  createContract: (address: Address) => ContractType,
  address: string
) {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const contractInstance = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = createContract(Address.parse(address));

    return client.open(contract) as OpenedContract<ContractType>;
  }, [client]);

  return { sender, contractInstance };
}

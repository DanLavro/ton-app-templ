import { TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/blockchain/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import { Address } from "ton";

import { useCounterContract } from "./hooks/contracts/useCounterContract";

function App() {
  const { connected, wallet } = useTonConnect();
  const { network } = useTonConnect();
  const { value, address, add } = useCounterContract();

  return (
    <div>
      <button>
        {network
          ? network === CHAIN.MAINNET
            ? "Mainnet"
            : "Testnet"
          : "Not connected"}
      </button>
      <TonConnectButton />

      <div>
        <p>{connected ? "Connected" : "Not connected"}</p>
        <p>
          {wallet ? Address.parse(wallet as string).toString() : "No wallet"}
        </p>
      </div>

      <div>
        <p>Counter: {value}</p>
        <p>Address: {address}</p>
        <button onClick={add}>Increment</button>
      </div>
    </div>
  );
}

export default App;

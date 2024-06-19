// import { Add, Counter } from "../../../build/Counter/tact_Counter";
// counter.tact
// import "@stdlib/deploy";
//
// message Add {
//     queryId: Int as uint64;
//     amount: Int as uint32;
// }
//
// contract Counter with Deployable {
//     id: Int as uint32;
//     counter: Int as uint32;
//
//     init(id: Int) {
//         self.id = id;
//         self.counter = 0;
//     }
//
//     receive(msg: Add) {
//         self.counter += msg.amount;
//     }
//
//     get fun counter(): Int {
//         return self.counter;
//     }
//
//     get fun id(): Int {
//         return self.id;
//     }
// }

import { Address } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { toNano } from "ton";
import { useContract } from "../blockchain/useContract";

const CONTRACT_ADDRESS = "";

const createCounter = (address: Address): Counter => {
    return Reflect.construct(Counter, [address]) as Counter;
};

export function useCounterContract() {
    const { sender, contractInstance: counterContract } = useContract(
        createCounter,
        CONTRACT_ADDRESS
    );

    const { data, isFetching } = useQuery(
        ["counter"],
        async () => {
            if (!counterContract) return null;
            return (await counterContract.getCounter()).toString();
        },
        { refetchInterval: 3000 }
    );

    const add = () => {
        const message: Add = {
            $$type: "Add",
            queryId: 0n,
            amount: 1n,
        };

        console.log("Sending message to counter contract");

        if (counterContract) {
            counterContract.send(sender, { value: toNano("0.05") }, message);
        }
    };

    return {
        value: isFetching ? null : data,
        address: counterContract?.address.toString(),
        add,
    };
}

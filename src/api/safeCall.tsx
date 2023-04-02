import {rdfStore} from "../rdf/store";

const timeout_time: number = 5000
const check_time: number = 100
export async function safeCall<T>(fun: () => T): Promise<T> {
    let result = await checkStore()
    if(result) {
        return fun()
    } else {
        throw new Error("Could not load RDF data. Timeout Reached.")
    }
}

async function checkStore(): Promise<boolean> {
    let start_time: number = new Date().getTime()
    if (rdfStore.statements.length !== 0) {
        return true
    } else if (new Date().getTime() > start_time + timeout_time) {
        return false
    } else {
        await new Promise(resolve => setTimeout(resolve, check_time));
        return checkStore();
    }
}

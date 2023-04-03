import {Store} from "rdflib";
const $RDF = require("rdflib");

const _rdfStore: Store = $RDF.graph();
const timeout_time: number = 5000
const check_time: number = 100
export class RDFStore {
    public static initialize(): void {
        $.get('/schema/vocabolangelo.ttl', function (data) {
            $RDF.parse(data, _rdfStore, "http://www.vocabolangelo.org/")
        })
    }

    public static get store(): Store {
        return _rdfStore
    }

    static async checkStore(): Promise<boolean> {
        let start_time: number = new Date().getTime()
        if (_rdfStore.statements.length !== 0) {
            return true
        } else if (new Date().getTime() > start_time + timeout_time) {
            return false
        } else {
            await new Promise(resolve => setTimeout(resolve, check_time));
            return RDFStore.checkStore();
        }
    }

    static async safeCall<T>(fun: (rdfStore: Store) => T): Promise<T> {
        let result = await RDFStore.checkStore()
        if(result) {
            return fun(_rdfStore)
        } else {
            throw new Error("Could not load RDF data. Timeout Reached.")
        }
    }

}

RDFStore.initialize()




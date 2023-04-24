import {Store} from "rdflib";
import $ from "jquery"
import {vocang} from "./prefixes";
const $RDF = require("rdflib");

const _rdfStore: Store = $RDF.graph();
const timeout_time: number = 5000
const check_time: number = 100

const INFERRED_TTL_LOCATION = `/schema/vocabolangelo-merged.ttl`
const TTL_LOCATION = `/schema/vocabolangelo.ttl`
export class RDFStore {

    public static initialize(): void {
        RDFStore.retrieveTTL(INFERRED_TTL_LOCATION, () => {
            console.log(`WARNING: Inferred TTL file could not be found at location: ${INFERRED_TTL_LOCATION}`)
            console.log(`WARNING: Trying to retrieve TTL file at location: ${TTL_LOCATION} as a drawback...`)
            RDFStore.retrieveTTL(TTL_LOCATION, () =>
                Error("RDF data could not be found")
            )
        })
    }

    private static retrieveTTL(ttl : string, failCallback: () => void): void {
        $.get(ttl)
            .done(function (data) {
                $RDF.parse(data, _rdfStore, vocang.uri)
            })
            .fail( () => failCallback())
            .catch(() => failCallback())
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





export enum StringCheckStrategy {
    Blank = "BLANK",
    Fail = "FAIL",
    Undefined = "UNDEFINED"
}

export function mapStringFromRDF(str: string | undefined | null, strategy: StringCheckStrategy): string | undefined {
    if(str !== undefined && str !== null) {
        return str
    }
    if(strategy === StringCheckStrategy.Blank) {
        return ""
    } else if (strategy === StringCheckStrategy.Fail) {
        throw Error("Forbidden string value.")
    } else if (strategy === StringCheckStrategy.Undefined) {
        return undefined
    }
    throw Error("RDF string processing failed miserably.")
}


export enum StringCheckStrategy {
    Blank = "BLANK",
    Fail = "FAIL"
}

export function mapFromRDF(str: string | undefined | null, strategy: StringCheckStrategy): string {
    if(str !== undefined && str !== null) {
        return str
    }
    if(strategy === StringCheckStrategy.Blank) {
        return ""
    } else if (strategy === StringCheckStrategy.Fail) {
        throw Error("Forbidden string value.")
    }
    throw Error("RDF string processing failed miserably.")
}

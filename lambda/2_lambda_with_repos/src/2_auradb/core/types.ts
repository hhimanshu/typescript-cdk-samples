export type DbProps = {
    uri: string,
    user: string,
    password: string
}

export type SearchProps = DbProps & {
    searchTerm: string
}

export type NetworkQueryProps = DbProps & {
    query: string
}
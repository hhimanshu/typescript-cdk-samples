import {SearchProps} from "./types";
import {executeQuery} from "./utils";

export const search = async ({uri, user, password, searchTerm}: SearchProps) => {
    const query = `
    // todo: search on index, and return by score
    MATCH (f: Food)
    WHERE f.description =~ '(?i).*${searchTerm}.*' 
    RETURN f.fdc_id as fdcId, f.description as foodName 
    LIMIT 5`

    return await executeQuery({uri, user, password, query})
}
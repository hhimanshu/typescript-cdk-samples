import {DbProps} from "./types";
import {executeQuery} from "./utils";

export const countRecords = async ({uri, user, password}: DbProps) => {
    const query = `MATCH (n) RETURN count(n)`;
    return executeQuery({uri, user, password, query})
}

import {NetworkQueryProps} from "./types";
import neo4j, {Driver, Session} from "neo4j-driver";

export const executeQuery = async ({uri, user, password, query}: NetworkQueryProps) => {
    const driver: Driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session: Session = driver.session({database: "neo4j"});

    try {
        const readResult = await session.executeRead(tx => tx.run(query))
        console.log(`Aura DB result: ${JSON.stringify(readResult.records, null, 2)}`)
        return readResult.records
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
        return error
    } finally {
        await session.close();
    }
}
import neo4j, {Driver, Session} from "neo4j-driver"

type Props = {
    uri: string,
    user: string,
    password: string
}
export const main = async ({uri, user, password}: Props) => {
    const driver: Driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
    const session: Session = driver.session({database: "neo4j"});

    const query = `MATCH (n) RETURN count(n)`;

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
import neo4j, {Driver, Session} from "neo4j-driver"

export const main = async () => {
    const uri = 'neo4j+s://45e.databases.neo4j.io';
    const user = 'neo4j';
    const password = 'xcvffgresatsOoW8gABzKKGsgbF7CZ4Ma29Ywpawedrf456fsd3_A';
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
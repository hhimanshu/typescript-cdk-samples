// @ts-ignore
import {faker} from "@faker-js/faker";

export const main = (): string => {
    return faker.name.fullName();
}
import knex, { Knex } from "knex";
import {development} from "../../knexfile"

const connection:Knex = knex(development)
export default connection;
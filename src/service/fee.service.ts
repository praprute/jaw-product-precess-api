import config from "config";
import { Query } from "../utils/connect";
import { Connection } from "mysql";
import dotenv from "dotenv";
import resp from "../utils/response";

dotenv.config();

const DB = config.get<any>("database");

export const insertLaborPricePerBuilding = async (
  connection: Connection,
  input: {
    building_id: number;
    price: number;
  }
) => {
  try {
    const { building_id, price } = input;
    const sql = `INSERT INTO ${DB}.labor_price_per_building ( building, price ) 
    values ( ${building_id},  ${price} );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const insertLaborPriceFerment = async (
  connection: Connection,
  input: {
    price: number;
  }
) => {
  try {
    const { price } = input;
    const sql = `INSERT INTO ${DB}.labor_price_ferment ( price ) 
    values ( ${price} );`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const updateLaborPricePerBuilding = async (
  connection: Connection,
  input: {
    id_price: number;
    price: number;
  }
) => {
  try {
    const { id_price, price } = input;
    const sql = `UPDATE ${DB}.labor_price_per_building SET price = ${price}  where idlabor_price_per_building = ${id_price} ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const updateLaborPriceFerment = async (
  connection: Connection,
  input: {
    id_price: number;
    price: number;
  }
) => {
  try {
    const { id_price, price } = input;
    const sql = `UPDATE ${DB}.labor_price_ferment SET price = ${price}  where idlabor_price_ferment = ${id_price} ;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getAllLaborPricePerBuilding = async (connection: Connection) => {
  try {
    const sql = `SELECT * FROM ${DB}.labor_price_per_building inner join (select idbuilding, name from ${DB}.building) BuildingTable on labor_price_per_building.building = BuildingTable.idbuilding;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getAllLaborPricePerBuildingByBuilding = async (
  connection: Connection,
  input: {
    id_building: number;
  }
) => {
  try {
    const { id_building } = input;
    const sql = `SELECT * FROM ${DB}.labor_price_per_building where building=${id_building};`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};

export const getAllLaborPriceFerment = async (connection: Connection) => {
  try {
    const sql = `SELECT * FROM ${DB}.labor_price_ferment;`;
    const result = await Query(connection, sql);
    return resp(true, result);
  } catch (e: any) {
    throw new Error(`bad insert : ${e}`);
  }
};
// UPDATE ${DB}.fishsauce_receipt SET stock = stock-${new_stock} WHERE idfishsauce_receipt = ${idreceipt};

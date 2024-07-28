import QueryString from "qs";
import Product from "../models/product.model";
import { FilterQuery } from "mongoose";

export function buildCriteria(
  query: QueryString.ParsedQs
): FilterQuery<typeof Product> {
  const criteria: FilterQuery<typeof Product> = {};

  if (query.name) {
    criteria.name = { $regex: query.name, $options: "i" };
  }
  return criteria;
}

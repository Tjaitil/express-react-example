import { TableInputType } from "../TableInputs";

export type TableColumnTemplateType<T> = Record<keyof T, TableInputType>;

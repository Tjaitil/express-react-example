import { ExcludedProperties } from "../types/ExcludedPropertiesType";

export const isExcludedProperty = <T extends {}>(key: keyof T, excludedProperties: ExcludedProperties<T>) =>
    excludedProperties !== undefined && excludedProperties.includes(key);

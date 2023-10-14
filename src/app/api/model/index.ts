export interface DefaultDictResponse<T = string> {
  name: T;
  unique: number;
}

export interface AffiliatedItem {
  index: number;
  name: string;
  tin: string;
  type: string;
  unique: number;
}

export interface Region {
  name: string;
  regionId: number;
  unique: number;
}

export interface District {
  unique: number;
  name: string;
  regionId: number;
  districtCode: number;
  districtId: string;
}

export type GetAffiliatedResponse = Partial<{
  capitalShare: number;
  legalEntityName: string;
  legalEntityTIN: string;
  reason: string;
  typeName: string;
  unique: number;
  type: number;
  affiliateName: string;
  affiliateTIN: string;
  relation: string;
}>;

export interface BeneficiaryItem {
  index: number;
  name: string;
  owner: number;
  percent: string;
  tin: string;
  unique: number;
}

export interface EmployeeItem {
  index: number;
  name: string;
  phone: string;
  unique: number;
  pinfl?: string;
  permissions: string;
}

export interface RequestItem {
  index: number;
  individual: string;
  legalEntity: string;
  pinfl: string;
  status: string;
  unique: number;
}

export type Unit = DefaultDictResponse<string>;
export interface Good {
  unique: number;
  name: string;
  index: number;
  category: number;
}

export type SourceOfFinance = DefaultDictResponse<string>;

export type DeliveryTypes = DefaultDictResponse<string>;

export interface SchedulesToCreate {
  month: number;
  year: number;
  productCode: string;
  financeSource: number;
  quantity: number;
  price: number;
  unitValue: number;
  regionId: number;
  districtId: string;
  address: string;
  expensesUnitCode?: string;
}

export interface ArrayOfSchedules {
  unique: number;
  id: string;
  month: number;
  goods: string;
  quantity: number;
  unitName: string;
  financeSource: string;
  createdAt: string;
  price: number;
  status: string;
  index: number;
  balance: number;
  expensesUnit: number;
  legalEntity: string;
}

export interface Schedule {
  address: string;
  districtId: string;
  expensesUnitCode: string;
  expensesUnitName: string;
  financeSource: number;
  id: string;
  legalEntityName: string;
  legalEntityPhone: string;
  legalEntityTIN: string;
  legalEntityUnique: number;
  month: number;
  price: number;
  productCode: string;
  productName: string;
  quantity: number;
  regionId: number;
  unique: number;
  unitName: string;
  unitValue: string;
  year: number;
}

export interface Invitation {
  unique: number;
  legalEntity: string;
  phone: string;
  pinfl: string;
  status: string;
  index: number;
}

export interface PlanScheduleProduct {
  balance: number;
  categoryName: string;
  categoryUnique: number;
  deliveryTypeName: string;
  deliveryTypeUnique: number;
  expensesUnitCode: string;
  expensesUnitName: string;
  financeSourceName: string;
  financeSourceUnique: number;
  id: string;
  index: number;
  month: number;
  price: number;
  productCode: string;
  productName: string;
  quantity: number;
  unique: number;
  unitName: string;
  unitValue: number;
}

export interface AllPermissions {
  tag?: string;
  name: string;
}

export type Country = DefaultDictResponse<string>;

export interface FullName {
  fullName: string;
  success: boolean;
}

export interface PhisRequest {
  index: number;
  individual: string;
  legalEntity: string;
  pinfl: string;
  status: string;
  unique: number;
}

export type CriteriaValueType = 'binary' | 'textual' | 'numeric';

export interface AllCategories {
  unique: number;
  name: string;
  index: number;
}

export interface MinFinProduct {
  code: string;
  name: string;
}

export interface MinFinProductInfo {
  code: string;
  parentCode: string;
  categoryCode: string;
  categoryNameUz: string;
  categoryNameOz: string;
  categoryNameRu: string;
  categoryName: string;
  nameUz: string;
  nameOz: string;
  nameRu: string;
  name: string;
  uid: number;
  type: 'Good' | 'Work' | 'Service';
  measureUnit?: MeasureUnit;
  properties: MeasureUnit[];
}

export interface MeasureUnit {
  propNumb: number;
  isRequired: 0 | 1;
  nameOz: string;
  nameUz: string;
  nameRu: string;
  name: string;
  values: MeasureValue[];
  code: string;
  dateClose?: string;
  dateOpen?: string;
  uid: string;
}

export interface MeasureValue {
  nameOz: string;
  nameUz: string;
  nameRu: string;
  name: string;
  valNumb: number;
  dateClose?: string;
  dateOpen?: string;
  uid: string;
}

export type SpecialCondition = DefaultDictResponse<string>;

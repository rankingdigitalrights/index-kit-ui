import type { Service, ServiceFormModel } from './Service';

export type CompanyType = 'telecom' | 'internet';

export class Company {
  public id: string;
  public label: {
    current: string;
    altFilename: string | null;
    legacy: Array<string>;
  };
  public type: CompanyType;
  public groupLabel: string;
  public hasOpCom: boolean;
  public opComLabel: string | null;
  public tabPrevYearsOutcome: string | null;
  public services: Array<Service>;

  constructor(params: {
    id: string;
    name: string;
    group: string;
    type: CompanyType;
    operationCompany: string | null;
  }) {
    this.id = params.id;
    this.label = {
      current: params.name,
      altFilename: null,
      legacy: [],
    };
    this.groupLabel = params.name;
    this.type = params.type;
    if (params.operationCompany) {
      this.hasOpCom = true;
      this.opComLabel = params.operationCompany;
    } else {
      this.hasOpCom = false;
      this.opComLabel = null;
    }
    this.tabPrevYearsOutcome = null;
    this.services = [];
  }

  public addService(service: Service) {
    this.services.push(service);
  }

  public removeService(service: Service) {
    const index = this.services.indexOf(service);
    if (index > -1) {
      this.services.splice(index, 1);
    }
  }
}

interface CompanyTypeObject {
  value: CompanyType;
  label: string;
}

export const companyTypeArray: Array<CompanyTypeObject> = [
  { value: 'telecom', label: 'Telecom company' },
  { value: 'internet', label: 'Internet platform' },
];

export type CompanyFormModel = {
  id: string;
  name: string;
  group: string;
  type: CompanyType;
  operationCompany: string;
  services: ServiceFormModel[];
};

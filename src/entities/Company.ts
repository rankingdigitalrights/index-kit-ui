import type { Service } from './Service';

export class Company {
  public id: string;
  public label: {
    current: string;
    altFilename: string | null;
    legacy: Array<string>;
  };
  public type: 'telecom' | 'internet';
  public groupLabel: string;
  public hasOpCom: boolean;
  public opComLabel: string | null;
  public tabPrevYearsOutcome: string | null;
  public services: Array<Service>;

  constructor(params: {
    id: string;
    name: string;
    group: string;
    type: 'telecom' | 'internet';
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
}

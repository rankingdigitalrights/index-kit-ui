import type { ServiceType } from "./ServiceType";

export class Service {
  public id: string;
  public type: ServiceType;
  public subtype: "prepaid" | "postpaid" | null;
  public label: {
    current: string;
    legacy: Array<string>;
  };

  constructor(params: {
    id: string;
    name: string;
    type: ServiceType;
    subtype: "prepaid" | "postpaid" | null;
  }) {
    this.id = params.id;
    this.label = {
      current: params.name,
      legacy: [],
    };
    this.type = params.type;
    this.subtype = params.subtype;
  }
}

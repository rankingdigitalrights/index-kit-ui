export class Service {
  public id: string;
  public type: ServiceType;
  public subtype: 'prepaid' | 'postpaid' | null;
  public label: {
    current: string;
    legacy: Array<string>;
  };

  constructor(params: {
    id: string;
    name: string;
    type: ServiceType;
    subtype: ServiceSubtype;
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

export type ServiceType =
  | 'mobile'
  | 'broadband'
  | 'eCommerce'
  | 'pda'
  | 'mobileEcosystem'
  | 'messagingVoip'
  | 'cloud'
  | 'search'
  | 'socialNetworkBlogs'
  | 'photoVideo'
  | 'email'
  | 'other';

export type ServiceSubtype = null | 'prepaid' | 'postpaid';

type ServiceTypeObject = {
  value: ServiceType;
  label: string;
};

type ServiceSubtypeObject = {
  value: ServiceSubtype;
  label: string;
};

export const serviceTypeArray: ServiceTypeObject[] = [
  { value: 'mobile', label: 'Prepaid and postpaid mobile' },
  { value: 'broadband', label: 'Fixed-line broadband' },
  { value: 'cloud', label: 'Cloud service' },
  { value: 'eCommerce', label: 'eCommerce' },
  { value: 'email', label: 'Email' },
  { value: 'messagingVoip', label: 'Messaging & VoIP' },
  { value: 'mobileEcosystem', label: 'Mobile ecosystem' },
  { value: 'pda', label: 'Personal digital assistant ecosystem' },
  { value: 'photoVideo', label: 'Video & photo sharing' },
  { value: 'search', label: 'Search engine' },
  { value: 'socialNetworkBlogs', label: 'Social networking & blog' },
  { value: 'other', label: 'Other type of service' },
];

export const serviceSubtypeArray: ServiceSubtypeObject[] = [
  { value: null, label: 'No subtype' },
  { value: 'prepaid', label: 'Prepaid Service' },
  { value: 'postpaid', label: 'Postpaid Service' },
];

export type ServiceFormModel = {
  id: string;
  name: string;
  type: ServiceType;
  subtype: ServiceSubtype;
};

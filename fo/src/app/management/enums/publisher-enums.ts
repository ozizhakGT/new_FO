interface UserStructre {
  id: number,
  type: string
}

export const userTypeStructure: UserStructre[] = [
  {id: 0, type: 'Admin'},
  {id: 1, type: 'Simple User'},
  {id: 2, type: 'Advanced User'},
];

export const userStatusStructure: UserStructre[] = [
  {id: 0, type: 'Pending Verification'},
  {id: 1, type: 'Active'},
  {id: 2, type: 'Deactivated'},
  {id: 3, type: 'Suspend'},
];
export const userStatusArray = [
  'Pending Verification',
  'Active',
  'Deactivated',
  'Suspend'
];
export const paymentsMethodsStructure: UserStructre[] = [
  {id: 1, type: 'Paypal'},
  {id: 2, type: 'Bank Account'},
  {id: 3, type: 'Payoneer'},
  {id: 4, type: 'Bitcoin'},
  {id: 5, type: 'Monero'},
  {id: 6, type: 'Paxum'},
];
  export const paymentMethodArray: string[] = [
     null,
    'Paypal',
    'Bank Account',
    'Payonner',
    'Bitcoin',
    'Monero',
    'Paxum'
  ];

export const paymentsPeriodStructure: string[] = [
  'net 0',
  'net 15',
  'net 30',
  'weekly',
  'bi weekly',
  'makolet',
];

export class GeneralDetails {
  id: number;
  mode: number;
  username: string;
  login_timestamp: string;
  country: string;
  owner: string;
  constructor(id: number, mode: number, username: string, login_timestamp: string, country: string, owner: string) {
    this.id = id;
    this.mode = mode;
    this.username = username;
    this.login_timestamp = login_timestamp;
    this.country = country;
    this.owner = owner;
  }
}

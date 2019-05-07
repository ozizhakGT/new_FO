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

export const paymentsMethodsStructure: UserStructre[] = [
  {id: 1, type: 'Paypal'},
  {id: 2, type: 'Bank Account'},
  {id: 3, type: 'Payoneer'},
  {id: 4, type: 'Bitcoin'},
  {id: 5, type: 'Monero'},
  {id: 6, type: 'Paxum'},
]

export const paymentsPeriodStructure: string[] = [
  'net 0',
  'net 15',
  'net 30',
  'weekly',
  'bi weekly',
  'makolet',
];

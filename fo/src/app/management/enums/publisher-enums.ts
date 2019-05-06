interface UserStructre {
  id: number,
  type: string
}

export const userTypeArray: UserStructre[] = [
  {id: 0, type: 'Admin'},
  {id: 1, type: 'Simple User'},
  {id: 2, type: 'Advanced User'},
];

export const userStatusArray: UserStructre[] = [
  {id: 0, type: 'Pending Verification'},
  {id: 1, type: 'Active'},
  {id: 2, type: 'Deactivated'},
  {id: 3, type: 'Suspend'},
];

export const paymentsMethodsArray: UserStructre[] = [
  {id: 1, type: 'Paypal'},
  {id: 2, type: 'Bank Account'},
  {id: 3, type: 'Payoneer'},
  {id: 4, type: 'Bitcoin'},
  {id: 5, type: 'Monero'},
  {id: 6, type: 'Paxum'},
]

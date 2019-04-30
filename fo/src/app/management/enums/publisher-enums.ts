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

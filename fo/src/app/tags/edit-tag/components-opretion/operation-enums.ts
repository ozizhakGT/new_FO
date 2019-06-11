export const SelectOptions = [
  // {id: null, boolean: null, name: 'No Coshen'},
  {id: 0 , boolean: false, name: 'Disable'},
  {id: 1, boolean: true,  name: 'Enable'}
];
export const Activity = [
  {id: 1, name: 'Direct (Default)'},
  {id: 2, name: 'Injection'},
  {id: 3, name: 'Network'},
  {id: 4, name: 'RTB Network'},
  {id: 5, name: 'Media Buying'},
  {id: 6, name: 'Lidar Tags'},
  ];
export const StorageMode = [
  {id: 1, name: 'Session Storage'},
  {id: 2, name: 'Refresh Storage'},
  {id: 3, name: 'Local Storage'},
];

export const TimeUnits = [
  {id: null, name: '', calculate: null},
  {id: 1, name: 'Days', calculate: 86400000},
  {id: 2, name: 'Hours', calculate: 3600000},
  {id: 3, name: 'Minutes', calculate: 60000},
  {id: 4, name: 'Seconds', calculate: 1000}
];

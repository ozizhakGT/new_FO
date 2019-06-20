export const SelectLayer = {
  publisher: {enable: true, name: 'publisher', prop: 'publisherSettings', color: '#e5e5ff'},
  admin: {enable: false, name: 'admin', prop: 'usedSettings', color: 'pink'},
};
export const SelectOptions = [
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
export const WorkHours = [
  {id: 0, hour: '00:00'},
  {id: 1, hour: '01:00'},
  {id: 2, hour: '02:00'},
  {id: 3, hour: '03:00'},
  {id: 4, hour: '04:00'},
  {id: 5, hour: '05:00'},
  {id: 6, hour: '06:00'},
  {id: 7, hour: '07:00'},
  {id: 8, hour: '08:00'},
  {id: 9, hour: '09:00'},
  {id: 10, hour: '10:00'},
  {id: 11, hour: '11:00'},
  {id: 12, hour: '12:00'},
  {id: 13, hour: '13:00'},
  {id: 14, hour: '14:00'},
  {id: 15, hour: '15:00'},
  {id: 16, hour: '16:00'},
  {id: 17, hour: '17:00'},
  {id: 18, hour: '18:00'},
  {id: 19, hour: '19:00'},
  {id: 20, hour: '20:00'},
  {id: 21, hour: '21:00'},
  {id: 22, hour: '22:00'},
  {id: 23, hour: '23:00'},
];
export const AdBlockTraffic = [
  {id: -1, name: 'None AdBlock Traffic'},
  {id: 0, name: 'All Traffic'},
  {id: 1, name: 'ONLY AdBlock Traffic'},
];
export const CapType = [
  {id: 1, name: 'Before Product Invoke'},
  {id: 2, name: 'On Product Opened'}
];

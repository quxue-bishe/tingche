import axios from 'axios';
// import { UserState } from '@/store/modules/user/types';

export function parkList() {
  return axios.get<any>('/carparkAdmin/selectListByCondition');
}

export function deletePack() {
  return axios.get<any>('/carparkAdmin/delete');
}

// 通道
export function cfCheckPointGet(data: any) {
  return axios.get('/internetOfThingsAdmin/cfCheckPoint/getListByQuery', data);
}
export function cfCheckPointAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCheckPoint/add', data);
}
export function cfCheckPointUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfCheckPoint/update', data);
}
export function cfCheckPointDelete(data: any) {
  return axios.delete('/internetOfThingsAdmin/cfCheckPoint/delete', data);
}

export function cfDeviceGet(data: any) {
  return axios.get('/internetOfThingsAdmin/cfDevice/getListByQuery', data);
}

export function cfDeviceAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfDevice/add', data);
}
export function cfDeviceUpdate(data: any) {
  return axios.put('/internetOfThingsAdmin/cfDevice/update', data);
}
export function cfDeviceDelete(data: any) {
  return axios.delete('/internetOfThingsAdmin/cfDevice/delete', data);
}
export function bindThirdPartyCloudPlatforms(data: any) {
  return axios.post('/internetOfThingsAdmin/cfDevice/bindThirdPartyCloudPlatforms', data);
}
export function getRemoteConnection(data: any) {
  return axios.get('/internetOfThingsAdmin/cfDevice/getRemoteConnection', data);
}

// 收费规则
export function chargingRuleGet(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/getChargingRulesListByQuery',
    data
  );
}

export function chargingRuleAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addChargingRules', data);
}
export function chargingRuleUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateChargingRules',
    data
  );
}
export function chargingRuleDelete(data: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteChargingRules',
    data
  );
}

// 车辆类型
export function getCarTypeListByQuery(data: any) {
  return axios.get(
    '/internetOfThingsAdmin/cfCarPark/getCarTypeListByQuery',
    data
  );
}
export function carTypeAdd(data: any) {
  return axios.post('/internetOfThingsAdmin/cfCarPark/addCarType', data);
}
export function carTypeDelete(data: any) {
  return axios.delete(
    '/internetOfThingsAdmin/cfCarPark/deleteCarType',
    data
  );
}
export function carTypeUpdate(data: any) {
  return axios.put(
    '/internetOfThingsAdmin/cfCarPark/updateCarType',
    data
  );
}
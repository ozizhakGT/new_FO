import {Injectable} from '@angular/core';
import {ApiService} from "../core/serviecs/api.service";
import {UtilsService} from "../core/serviecs/utils.service";

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tag;

  constructor(private apiService: ApiService, private utilsService: UtilsService) {
  }
  async getUser(userId) {
    if (userId) {
      return this.apiService.UserDetailRequests('get', userId).toPromise();
    } else {
      return 'No User'
    }
  }
  getTagGeneralDetails(generalDetails) {
    return this.getUser(generalDetails['publisher_id']).then(async publisherDetails => {
      if (publisherDetails['message'].results.length > 0) {
        await Promise.all([
          this.getUser(publisherDetails['message'].results[0].account_manager_id),
          this.apiService.sitesDetails('get', generalDetails['site_id']).toPromise()
        ]).then(res => {
          console.log(res)
          generalDetails['owner'] = typeof res[0] !== 'string' ? res[0]['message'].results[0].username : 'No Owner';
          generalDetails['site_name'] = res[1]['message'].results[0].name;
        })
      } else {
        generalDetails['noPublisher'] = true;
        this.utilsService.messageNotification(`Note: This Publisher is Deleted!`, null , 'info')
      }
    });
  }

  getSearchTags(query) {
    return this.apiService.getTags(query);
  }

  getTag(tagId) {
    return this.apiService.getTag(tagId);
  }

  onGetTagToService(tag) {
    this.tag = tag;
  }

  getTagToOperation() {
    return this.tag;
  }

  getStorageMode(type, modes?: {}, tag?) {
    if (type !== 'save') {
      if (modes['session']) {
        return 1;
      }
      else if (modes['refresh']) {
        return 2;
      }
      else {
        return 3;
      }
    } else {
      switch (tag['storageMode']) {
        case 1:
          tag['session_storage'] = true;
          tag['refresh_storage'] = false;
          break;
        case 2:
          tag['session_storage'] = false;
          tag['refresh_storage'] = true;
          break;
        default:
          tag['session_storage'] = false;
          tag['refresh_storage'] = false;
      }
      delete tag['storageMode'];
    }
  }

  getServingMethodsProduct(productName) {
    const servingMethodsArray = [];
    const enums = JSON.parse(sessionStorage.getItem('enums'));
    const servingMethods = enums.find(item => item._id === 'serving_methods')['options'];
    const productServingMethodsIds = enums.find(item => item._id === 'placement_serving_methods')['options'].find(product => product.name === productName)['options'];
    for (let val of productServingMethodsIds) {
      servingMethodsArray.push(servingMethods[val]);
    }
    return servingMethodsArray;
  }

  /*
  * divide will take field value before view and detect time unit and divide by the time unit
  * divide-milli by millisecond and only divide by seconds
  * multiple will take field value before view and detect time unit and multiple by the time unit
  * multiple-milli by millisecond and only multiple by seconds
  * */
  getTimeUnit(type, currentTime, timeUnits, form?, fieldProp?, unitField?) {
    let timeHolder;
    let id;
    if (type.includes('divide')) {
      for (let i = 0; i < timeUnits.length; i++) {
        timeHolder = (type === 'divide-milli') ? currentTime / timeUnits[i].calculate : (currentTime / timeUnits[i].calculate) * 1000;
        if (timeHolder % 1 === 0) {
          id = timeUnits[i].id;
          return [timeHolder, id]
        }
      }
    }
    if (type.includes('multiple')) {
      form[fieldProp] = (type === 'multiple-mili') ? form[fieldProp] * timeUnits[form[unitField]].calculate :
        (form[fieldProp] * timeUnits[form[unitField]].calculate) / 1000;
    }
    delete form[unitField];
  }

  getAdditionalTag(type, tagsObj) {
    if (type === 'load') {
      if (tagsObj) {
        let array = [];
        try {
          Object.entries(tagsObj).forEach((tag) => {
            array.push({id: tag[0], boolean: tag[1]});
          })
        } catch (e) {
          this.utilsService.messageNotification(`Was some Error with Additional Tags Section, please report to Developer!`, null , 'failed')
          console.error(e);
        }
        return array;
      }
    } else {
      const obj = {};
      for (let key of tagsObj) {
        obj[key['id']] = key['boolean']
      }
      return obj
    }
  }

  onAddAdditionalTag(additionalTagsObj, newTag) {
    additionalTagsObj.push(newTag);
  }

  getLabelColor(operationId) {
    switch (operationId) {
      case 2:
        return '#8383ff';
    }
  }
}


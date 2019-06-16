import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../tag.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Activity, AdBlockTraffic, CapType, SelectOptions, StorageMode, TimeUnits, WorkHours} from '../operation-enums';


@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {
  selectOptions = SelectOptions;
  activitySelection = Activity;
  storageModeSelection = StorageMode;
  timeUnitsSelection = TimeUnits;
  workHoursSelection = WorkHours;
  adblockTrafficSelection = AdBlockTraffic;
  capTypeSelection = CapType;
  additionalTags: any[] | {} = [];
  servingMethodsSelection = this.tagService.getServingMethodsProduct('Pop');
  tag;
  tagForm: FormGroup;
  adminTagForm: FormGroup;
  adminMode = false;
  constructor(private tagService: TagService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.tagId) {
            this.tag = this.tagService.getTagToOperation();
            this.tagForm = this.tagFormInit(this.tag);
        }
      });
  }

  tagFormInit(tag) {
     return new FormGroup({
      name: new FormControl(tag.name),
      show_parent_tag: new FormControl(tag.show_parent_tag || null),
      parent_tag: new FormControl(tag.parent_tag || null),
      activity: new FormControl(tag.activity),
      s2s_without_enchantment: new FormControl(tag.s2s_without_enchantment || null),
      storageMode: new FormControl(this.tagService.getStorageMode('null',{session: tag['session_storage'], refresh: tag['refresh_storage']}), [Validators.required]),
      serving_method_id: new FormControl(tag.serving_method_id, [Validators.required]),
      cpa_minimum_winning_percent: new FormControl(tag.cpa_minimum_winning_percent, [Validators.required, Validators.min(0), Validators.max(100)]),
      cap: new FormControl(tag.cap, [Validators.required, Validators.min(0)]),
      cap_per_url: new FormControl(tag.cap_per_url, [Validators.required, Validators.min(0)]),
      interval: new FormControl(this.tagService.getTimeUnit('divide-milli', tag.interval, this.timeUnitsSelection)[0], [Validators.required, Validators.min(0)]),
      interval_TimeUnit: new FormControl(this.tagService.getTimeUnit('divide-milli', tag.interval, this.timeUnitsSelection)[1]),
      cap_reset_seconds: new FormControl(this.tagService.getTimeUnit('divide', tag.cap_reset_seconds, this.timeUnitsSelection)[0], [Validators.required, Validators.min(0)]),
      cap_reset_seconds_TimeUnit: new FormControl(this.tagService.getTimeUnit('divide', tag.cap_reset_seconds, this.timeUnitsSelection)[1]),
      work_hours: new FormControl(tag.work_hours),
      block: new FormControl(tag.block),
      adblock_traffic_only: new FormControl(tag.adblock_traffic_only),
      cap_type: new FormControl(tag.cap_type),
      show_in_ss: new FormControl(tag.show_in_ss),
      additional_tags: new FormControl(tag.additional_tags || null),
    });
    this.additionalTags = this.tagService.getAdditionalTag('load', tag.additional_tags);
  }
  prapareForm(form) {
    this.tagService.getStorageMode('save', null, form);
    this.tagService.getTimeUnit('multiple-mili', null, this.timeUnitsSelection, form, 'interval', 'interval_TimeUnit');
    this.tagService.getTimeUnit('multiple', null, this.timeUnitsSelection, form, 'cap_reset_seconds', 'cap_reset_seconds_TimeUnit');
    form['additional_tags'] = this.tagService.getAdditionalTag('save', this.additionalTags);
  }

  addNewAdditionalTag(newTag) {
    this.tagService.onAddAdditionalTag(this.additionalTags, newTag);
  }

  showAdminPropeties() {
    this.adminMode = !this.adminMode;
    if (!this.adminTagForm) {
      this.adminTagForm = this.tagFormInit(this.tag.usedSettings);
    }
  }

  onDelete(arr, i) {
    arr.splice(i, 1);
  }

  onSaveTag(form, adminForm) {
    const adminProperties = {}
    if (adminForm && Object.keys(adminForm.value).length > 0) {
      adminProperties = {...adminForm.value}
      this.prapareForm(adminProperties)
      form.value['usedSettings'] = {...adminProperties};
    }
    console.log(form.value);
    const finalTag = {...this.tag, ...form.value}
    this.prapareForm(finalTag);
    console.log(finalTag);
  }
}

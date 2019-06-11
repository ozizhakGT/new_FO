import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../tag.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Activity, SelectOptions, StorageMode, TimeUnits} from '../operation-enums';


@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {
  selectOptions = SelectOptions;
  activitySelection = Activity;
  storageModeSelection = StorageMode;
  timeUnits = TimeUnits;
  servingMethodsSelection = this.tagService.getServingMethodsProduct('Pop');
  tag;
  tagForm: FormGroup;
  constructor(private tagService: TagService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.tagId) {
            this.tag = this.tagService.getTagToOperation();
            this.tagFormInit(this.tag);
        }
      });
  }

  tagFormInit(tag) {
    this.tagForm = new FormGroup({
      name: new FormControl(tag.name),
      show_parent_tag: new FormControl(tag.show_parent_tag || null),
      parent_tag: new FormControl(tag.parent_tag || null),
      activity: new FormControl(tag.activity),
      s2s_without_enchantment: new FormControl(tag.s2s_without_enchantment || null),
      storageMode: new FormControl(this.tagService.getStorageMode('null',{session: tag['session_storage'], refresh: tag['refresg_storage']}), [Validators.required]),
      serving_method_id: new FormControl(tag.serving_method_id, [Validators.required]),
      cpa_minimum_winning_percent: new FormControl(tag.cpa_minimum_winning_percent, [Validators.required, Validators.min(0), Validators.max(100)]),
      cap: new FormControl(tag.cap, [Validators.required, Validators.min(0)]),
      cap_per_url: new FormControl(tag.cap_per_url, [Validators.required, Validators.min(0)]),
      interval: new FormControl(this.tagService.getTimeUnit('divide-milli', tag.interval, this.timeUnits)[0], [Validators.required, Validators.min(0)]),
      interval_TimeUnit: new FormControl(this.tagService.getTimeUnit('divide-milli', tag.interval, this.timeUnits)[1]),
      cap_reset_seconds: new FormControl(this.tagService.getTimeUnit('divide', tag.cap_reset_seconds, this.timeUnits)[0], [Validators.required, Validators.min(0)]),
      cap_reset_seconds_TimeUnit: new FormControl(this.tagService.getTimeUnit('divide', tag.cap_reset_seconds, this.timeUnits)[1]),
    });
  }
  prapareForm(form) {
    this.tagService.getStorageMode('save', null, form.value);
    this.tagService.getTimeUnit('multiple-mili', null, this.timeUnits, form.value, 'interval', 'interval_TimeUnit');
    this.tagService.getTimeUnit('multiple', null, this.timeUnits, form.value, 'cap_reset_seconds', 'cap_reset_seconds_TimeUnit');

  }
  onSaveTag(form) {
    this.prapareForm(form);
    const finalTag = {...this.tag, ...form.value};
    console.log(finalTag);
  }

}

import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../tag.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  Activity,
  AdBlockTraffic,
  CapType,
  SelectLayer,
  SelectOptions,
  StorageMode,
  TimeUnits,
  WorkHours
} from '../operation-enums';


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
  servingMethodsSelection = this.tagService.getServingMethodsProduct('Pop');
  tag;
  tagForm: FormGroup;
  currentLayerOption = SelectLayer['publisher'];
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

    this.tagService.layerSelection.subscribe((layer: {}) => {
        this.tag = this.tagService.getTagToOperation();
        this.tagForm = (layer['enable'] && layer['prop'] !== 'publisherSettings') ? this.tagFormInit(this.tag[layer['prop']]) : this.tagFormInit(this.tag);
        this.currentLayerOption = {...this.currentLayerOption, ...layer};
    })
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
      additional_tags_generator: new FormControl(this.tagService.onGenerateAdditionalTag('load', tag.additional_tags) || null),
      additional_tags: new FormControl(tag.additional_tags || null),
    });
  }
}

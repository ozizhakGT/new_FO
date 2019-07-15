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
  disableInputs =  false;
  currentLayerOption = SelectLayer['publisher'];

  constructor(private tagService: TagService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.tagId) {
          this.tag = this.tagService.getTagToOperation();
          this.tagForm = this.tagFormInit(this.tag);
        }
      });

    this.tagService.layerSelection.subscribe((layer: {}) => {
          console.log(layer);
    //   let tagHolder;
    //   this.tag = this.tagService.getTagToOperation();
    //   if (layer['enable'] && layer['id'] >= 2) {
    //     if (layer['id'] > 2) {
    //       tagHolder = this.tagFormInit(this.tag)
    //     } else {
    //       tagHolder = this.tagFormInit(this.tag[layer['prop']]);
    //     }
    //   } else {
    //     tagHolder = this.tagFormInit(this.tag)
    //   }
    //   this.tagForm = tagHolder;
      this.tagForm = this.tagFormInit(layer[1]);
      this.currentLayerOption = {...this.currentLayerOption, ...layer[0]};
    })
  }

  tagFormInit(tag) {
    return new FormGroup({
      name: new FormControl({value: tag.name, disabled: this.disableInputs}),
      show_parent_tag: new FormControl({value: tag.show_parent_tag || null, disabled: this.disableInputs}),
      parent_tag: new FormControl({value: tag.parent_tag || null, disabled: this.disableInputs}),
      activity: new FormControl(tag.activity),
      s2s_without_enchantment: new FormControl(tag.s2s_without_enchantment || null),
      storageMode: new FormControl(this.tagService.getStorageMode('null', {session: tag['session_storage'], refresh: tag['refresh_storage']}), [Validators.required]),
      serving_method_id: new FormControl(tag.serving_method_id, [Validators.required]),
      cpa_minimum_winning_percent: new FormControl({value: tag.cpa_minimum_winning_percent, disabled: this.disableInputs}, [Validators.required, Validators.min(0), Validators.max(100)]),
      cap: new FormControl({value: tag.cap, disabled: this.disableInputs}, [Validators.required, Validators.min(0)]),
      cap_per_url: new FormControl({value: tag.cap_per_url, disabled: this.disableInputs}, [Validators.required, Validators.min(0)]),
      interval: new FormControl({value: this.tagService.getTimeUnit('divide-milli', tag.interval, this.timeUnitsSelection)[0], disabled: this.disableInputs}, [Validators.required, Validators.min(0)]),
      interval_TimeUnit: new FormControl({value: this.tagService.getTimeUnit('divide-milli', tag.interval, this.timeUnitsSelection)[1], disabled: this.disableInputs}),
      cap_reset_seconds: new FormControl({value: this.tagService.getTimeUnit('divide', tag.cap_reset_seconds, this.timeUnitsSelection)[0], disabled: this.disableInputs}, [Validators.required, Validators.min(0)]),
      cap_reset_seconds_TimeUnit: new FormControl({value: this.tagService.getTimeUnit('divide', tag.cap_reset_seconds, this.timeUnitsSelection)[1], disabled: this.disableInputs}),
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

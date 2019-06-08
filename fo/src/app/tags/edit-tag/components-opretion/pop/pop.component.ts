import {Component, OnInit} from '@angular/core';
import {TagService} from '../../../tag.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Activity, SelectOptions, StorageMode} from '../operation-enums';


@Component({
  selector: 'app-pop',
  templateUrl: './pop.component.html',
  styleUrls: ['./pop.component.css']
})
export class PopComponent implements OnInit {
  selectOptions = SelectOptions;
  activitySelection = Activity;
  storageModeSelection = StorageMode;
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
      storageMode: new FormControl(this.tagService.getStorageMode('null',{session: tag['session_storage'], refresh: tag['refresg_storage']})),
    });
  }

  onSaveTag(form) {
    this.tagService.getStorageMode('save', null, form.value)
    const finalTag = {...this.tag, ...form.value};
    console.log(finalTag);
  }

}

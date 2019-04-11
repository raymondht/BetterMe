import {Component, Input, OnInit, Output} from '@angular/core';
import {FeedbackService} from '../../main/feedback/feedback.service';
declare var $: any;

@Component({
  selector: 'app-attribute-slider',
  templateUrl: './attribute-slider.component.html',
  styleUrls: ['./attribute-slider.component.css']
})

export class AttributeSliderComponent implements OnInit {
  @Input() leftLabel: string;
  @Input() rightLabel: string;
  constructor(private feedbackServ: FeedbackService) { }

  ngOnInit() {}

  onValueChanged(event) {
    const value = event.target.value;
    console.log('slider: ', value);
    const attribute =
      value >= 50 ?
        {targetName: this.rightLabel.toLowerCase(), targetValue: value, nonTargetName: this.leftLabel.toLowerCase(), nonTargetValue: 100 - value}
        : {targetName: this.leftLabel.toLowerCase(), targetValue: 100 - value,  nonTargetName: this.rightLabel.toLowerCase(), nonTargetValue: value};
    this.feedbackServ.onAttributeValueChange.next(attribute);
  }

}

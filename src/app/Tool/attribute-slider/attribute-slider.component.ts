import {Component, Input, OnInit, Output} from '@angular/core';
import {FeedbackService} from '../../feedback/feedback.service';
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
    const attribute =
      value > 0 ?
        {targetName: this.rightLabel.toLowerCase(), targetValue: value, nonTargetName: this.leftLabel.toLowerCase(), nonTargetValue: 0}
        : {targetName: this.leftLabel.toLowerCase(), targetValue: Math.abs(value),  nonTargetName: this.rightLabel.toLowerCase(), nonTargetValue: 0};
    this.feedbackServ.onAttributeValueChange.next(attribute);
  }

}

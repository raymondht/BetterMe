import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit, OnChanges {
  @Input() role;
  @Input() attributeData;
  // Radar
  demoradarChartLabels: string[];

  demoradarChartData: any;
  radarChartType =  'radar';
  ngOnInit() {
    if (this.role === 'student') {
      this.demoradarChartLabels = ['contributor', 'leader', 'independent', 'teamPlayer', 'listener',
                                    'talker', 'set', 'flexibility', 'calm', 'energetic' ];
      this.demoradarChartData = [ {data: this.attributeData, label: 'Personal Trait'}] ;
      // console.log('attributes', this.attributeData);
    }
  }
  ngOnChanges() {
    this.demoradarChartData = [ {data: this.attributeData, label: 'Personal Trait'}] ;
    // console.log('attributes', this.attributeData);
  }

  // events
  public chartClicked(e: any ): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

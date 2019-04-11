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
      this.demoradarChartLabels = ['Realistic', 'Independent', 'Listener', 'Dedicated', 'Calm',
                                    'Optimistic', 'Team Player', 'Speaker', 'Flexible', 'Energetic' ];
      this.demoradarChartData = [ {data: this.attributeData, label: 'This month'}
      ] ;
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

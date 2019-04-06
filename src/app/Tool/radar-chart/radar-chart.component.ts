import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {
  @Input() role;
  @Input() attributeData;
  // Radar
  demoradarChartLabels: string[];

  demoradarChartData: any;
  radarChartType: string = 'radar';
  ngOnInit() {
    if (this.role === 'student') {
      this.demoradarChartLabels = ['contributor', 'leader', 'independent', 'teamPlayer', 'listener',
                                    'talker', 'set', 'flexibility', 'calm', 'energetic' ];
      this.demoradarChartData =[{data: this.attributeData, label: 'Personal Trait'}] ;
      console.log(this.attributeData);
    }

  }

  // events
  public chartClicked(e: any ): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}

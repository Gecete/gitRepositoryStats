import { Component, OnInit, Input } from '@angular/core';
import {GoogleCharts} from 'google-charts';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.sass']
})
export class PieComponent implements OnInit {
  @Input('repos') repos: any;
  public parsed:any
  constructor() { }

  ngOnInit() {
   this.parseData(this.repos)
  }




parseData(array){ 

  let occurences = { };
  for (let i = 0; i < array.length; i++) {
      if (typeof occurences[array[i].language] == "undefined") {
          occurences[array[i].language] = 1;
      } else {
          occurences[array[i].language]++;
      }
  }
  let string1=JSON.stringify(occurences)
  this.parsed = string1.substring(1,string1.length-1).split(',');
  console.log(this.parsed)
  
  GoogleCharts.load(res=>{
    this.drawChart(this.parsed)
  })
  
};



drawChart(pars) {

   // Standard google charts functionality is available as GoogleCharts.api after load
  
let ar=[['Language', 'Number of repositories']]
pars.forEach(element => {
  element=element.replace(/['"]+/g, '')
  element=element.split(':')
  if(element[0]=='null'){
    element[0]='Unknown';
  }
  element[1]=parseInt(element[1])  
  ar.push(element)
});

const data = GoogleCharts.api.visualization.arrayToDataTable(ar);
   const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart'));
   pie_1_chart.draw(data);
}
}
import { Component } from '@angular/core';
import * as d3 from "d3"
import * as topojson from "topojson";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'D3Maps';
  ngAfterContentInit() {
    var height = 600;
    var width = 900, centered;

    var projection = d3.geoAlbersUsa();
    var path = d3.geoPath().projection(projection);

    var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
 
    var g = svg.append("g");

    d3.json('./assets/us.json').then(function (us:any) {
      console.log("usa", us);

      var map = svg.append('g') //.attr('class', 'boundary');
      var usa = map.selectAll('path')
               .data(topojson.feature(us, us.objects.states).features);

      usa.enter()
              .append('path')
              .attr('d', path) 
        .attr('fill', 'rgb(153, 255, 162)')
        .attr('stroke','red');


      d3.json('./assets/newstorelocations.json').then(function (locations:any) {
        console.log('stores', locations);

         svg.selectAll('circle')
                  .data(locations)
                  .enter()
                  .append('circle')
                  .attr('cx', function (d: any) {return projection([d.lon, d.lat])[0]})
                  .attr('cy', function (d: any) {console.log('d',d);return projection([d.lon, d.lat])[1]})
                  .attr('r', 4)
                 .on("mouseover", function(b){
                     console.log("b", b)
                     d3.select(this).style("fill", "red").append('text')
                     .text("hi");
                 })
                 .on("mouseout", function(){d3.select(this).style("fill", "blue");
                 });
      });
    });
  }
}

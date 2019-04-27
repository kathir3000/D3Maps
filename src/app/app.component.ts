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
    
    var div = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var g = svg.append("g");

    d3.json('./assets/us.json').then(function (us: any) {
      console.log("usa", us);

      var map = svg.append('g') //.attr('class', 'boundary');
      var usa = map.selectAll('path')
        .data(topojson.feature(us, us.objects.states).features);

      usa.enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'rgb(153, 255, 162)')
        .attr('stroke', 'red');


      d3.json('./assets/storeData.json').then(function (locations: any) {
        console.log('stores', locations);
        console.log("marker", svg.selectAll('marker'));
        /* svg.selectAll('circle')
                 .data(locations)
                 .enter()
                 .append('circle')
                 .attr('cx', function (d: any) {return projection([d.lon, d.lat])[0]})
                 .attr('cy', function (d: any) {return projection([d.lon, d.lat])[1]})
                 .attr('r', 4) */

        /* 
         .append('image')
          .attr("xlink:href", "http://bl.ocks.org/emeeks/raw/f8c0220c54ec8347ea95/52493465ea684056c44ea85f799230af568e2a60/icon_2330.png")
          .attr("height", 20).attr("width", 20)
          .attr('fill', 'red')
          .attr('x', function (d: any) { return projection([d.lon, d.lat])[0] })
          .attr('y', function (d: any) { return projection([d.lon, d.lat])[1] }) */


        svg.selectAll('marker')
          .data(locations)
          .enter()
          .append('text')
          // .attr('text-anchor', 'middle')
          // .attr('dominant-baseline', 'central')
          .attr('style','font-family:"Font Awesome 5 Free"')
          .attr('font-weight', '900')
          .attr('fill','brown')
          .text('\uf3c5')
          .attr('x', function (d: any) { return projection([d.loc.lon, d.loc.lat])[0] })
          .attr('y', function (d: any) { return projection([d.loc.lon, d.loc.lat])[1] })
          .on("mouseover", function (b:any) {
            console.log("b", b)
            console.log(d3.event.pageX, d3.event.pageY);
            
            d3.select(this).style("fill", "blue");
            div.transition()
              .duration(200)
              .style("opacity", .9);
            div.text(b.name)
              .attr("class","tooltip")
              .style("left", (d3.event.pageX + 10) + "px")
              .style("top", (d3.event.pageY -25) + "px");   
            
          })
          .on("mouseout", function () {
            d3.select(this).style("fill", "brown");
            div.transition()
              .duration(500)
              .style("opacity", 0); 
          });
      });
    });
  }
}

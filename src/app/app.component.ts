import { Component } from '@angular/core';
import * as d3 from "d3"
import {topology, feature} from 'topojson';

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

        var projection = d3.geo.albersUsa();
        var path = d3.geo.path().projection(projection);

        var svg = d3.select("#map")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

        var g = svg.append("g");

        d3.json('us.json', function(us) {
            console.log("usa", us);

            var map = svg.append('g').attr('class', 'boundary');
            usa = map.selectAll('path')
                     .data(topojson.feature(us, us.objects.states).features);

            usa.enter()
                    .append('path')
                    .attr('d', path)
                    .attr('fill', 'gray');


        d3.json('newstorelocations.json', function (locations){
            console.log('stores', locations);

           svg.selectAll('circle')
                    .data(locations)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d) {return projection([d.lon, d.lat])[0]})
                    .attr('cy', function(d) {return projection([d.lon, d.lat])[1]})
                    .attr('r', 4)
                   .on("mouseover", function(b){
                       console.log("binish", b)
                       d3.select(this).style("fill", "red").append('text')
                       .text("hi");
                   })
                   .on("mouseout", function(){d3.select(this).style("fill", "blue");
                   });



        });
        });


    }
}

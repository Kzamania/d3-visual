//import * as d3 from 'd3'; 
//import d3Tip from "d3-tip";


//const t = svg.transition().duration(750)
//let width = 800
//let height = 400
//const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
const MARGIN = 80
let maxTextLength = 100
const angleDegrees = -45
const angleRadians = angleDegrees * (Math.PI / 180)
const padding = 100

let domainValue = [0,1000,10000,20000,250000,500000,1000000,25000000,5000000,75000000,10000000,25000000,50000000,100000000];

// Set tooltips

/*var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Population: </strong><span class='details'>" + format(d.population) +"</span>";
            })
*/
var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
           
var color = d3.scaleThreshold()
    .domain([10000,100000,500000,1000000,5000000,10000000,50000000,100000000,500000000,1500000000])
    .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);



var path = d3.geoPath();

var svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

var projection = d3.geoMercator()
                   .scale(130)
                  .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);


//svg.call(tip);


/*
d3.csv("https://mjlobo.github.io/teaching/infovis/data/trajets.csv").then(function(trajet) {
    d3.csv("https://mjlobo.github.io/teaching/infovis/data/retards.csv").then(function(retard){
        
        d3.csv("https://mjlobo.github.io/teaching/infovis/data/emissions.csv").
    then(function (emission) {
    d3.csv("https://mjlobo.github.io/teaching/infovis/data/aeroports.csv").then(function (aeroport) { 
    
        dataLoaded(trajet,retard,emission,aeroport)
        
        })
    })
 })
})*/


//chargement des données 
d3.csv("https://raw.githubusercontent.com/Kzamania/d3-visual/master/datasets/meat-production-tonnes.csv").then( function (meat) {
    d3.json("https://raw.githubusercontent.com/jdamiani27/Data-Visualization-and-D3/master/lesson4/world_countries.json").then (function(countries){
        //meetPerYear(meat);
        ready(countries,meat);
    })
//Entity,Code,Year,total  
//console.log(data);
})

d3.csv("https://raw.githubusercontent.com/Kzamania/d3-visual/master/datasets/meat-supply-per-person.csv").then (function (datata) {
    //console.log(data);
})


var years = d3.range(1961,2015,1);

function ready(data, meat) {
    let totalMeatPerYear = {};
    var year = 1961;
    var consomation = 0;
    console.log(year);
    //var id = {};
    /*let meatPerYear = d3.nest()
    .key(function(d) { return d.Code; })
    .key(function(d) { return d.Year})
    .entries(meat);*/

    /*let meatPerYear = d3.nest()
    .key(function(d) { return d.Year; })
    .key(function(d) { return d.Code})
    //.key (d => {return d.total})
    .entries(meat)*/

    let meatPerYear = d3.groups( meat,
        d => d.Code,
        //d => d.Year,
        );

    
    //meatPerYear[0][1] = année
    /* 
        d[0] = code
        d[1] =  array
        d[1][0] = data array
        d[1][0][0] = code 
        d[1][0][1][0] = total array
        d[1][0][1][0][0] = total 
    */
    
    //meatPerYear.forEach(d => console.log(d));
    //meatPerYear.forEach(d => totalMeatPerYear[d.key] = d);
    meatPerYear.forEach(d => {
        totalMeatPerYear[d[0]] = d
    });
    //meatPerYear.forEach(function (d) { id[d.values[0].values[0].Code] = d.values[0].values[0] });
    //console.log(totalMeatPerYear['ATM'] != undefined )
    //[1].find(d => d.Year == year).total );
    //meatPerYear.forEach(function (d) { year[d.values[0].values[0].Code] = d.values[0].values[0] });

    //meatPerYear.forEach(function (d) {d.find } );
    //meatPerYear.forEach(function (d) {console.log(d.values[0].values[0]) } );
    //console.log(meatPerYear);
    //meat.forEach(function(d) { totalMeatPerYear[d.code] = +d.population; });
    //console.log(totalMeatPerYear);
    //data.features.forEach(function(d) { d.population = totalMeatPerYear[d.id][1].find(d => d.Year == year).total });
    //console.log(data.features);
    //data.features.forEach(d => console.log(d.id));

    //récuperer le minimum / maximum de chaque pays .
    var min, max = 0;
    //totalMeatPerYear.forEach(d => console.log(d));
    //interpolateOrRd / schemeOrRd
    //var hue = d3.scaleSequential(d3.interpolateOrRd).domain([0,1000,10000,20000,250000,500000,1000000,25000000,5000000,75000000,10000000,25000000,50000000,100000000]);
    //var hue = d3.scaleSequential(d3.interpolateOrRd).domain([0,1000,25000000,5000000,75000000,10000000,25000000,50000000,100000000]);
    //var hue = d3.scaleSequential(d3.interpolateOrRd).domain([0,1000,10000,100000000]); 
    //var hue = d3.scaleOrdinal(d3.schemeOrRd[9]).domain([0,1000,500000,1000000,25000000,5000000,75000000,10000000,25000000,50000000,100000000]);
    //console.log([10]);

    colorhue = d3.schemeOrRd[9];
    //console.log(colorhue);
    //var totalDomain = [0,1000,10000,20000,250000,500000,1000000,2500000,5000000,7500000,10000000,25000000,50000000,100000000]; 
    var domain = [0,1000,10000,20000,250000,500000,1000000,2500000,5000000,7500000,10000000,25000000,50000000,100000000];
    var rangeHue = ["#eeeeee","#ffffcc","#ffeda0","#fed976","#feb24c","#fd8d3c","#fc4e2a","#f03423","#e31a1c","#d00d21","#bd0026","#9f0026","#800026"]
    var hue = d3.scaleLinear(d3.interpolateOrRd).domain(domain)
      .range(rangeHue)
      //+ d3.schemeOrRd[9]

    //normalized = (x-1000)/(100000000-1000)));


  //map
    svg.append("g")
        .attr("class", "countries")
      .selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", path)
        //.style("fill", function(d) { return color(50000000); })
        .style("fill", function(d) { 
            return updateValue(d)}
        )
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .style("opacity",0.8)
        // tooltips
         /* .style("stroke","white")
          .style('stroke-width', 0.3)
          .on('mouseover',function(d){
            tip.show(d);
  
            d3.select(this)
              .style("opacity", 1)
              .style("stroke","white")
              .style("stroke-width",3);
          })
          .on('mouseout', function(d){
            tip.hide(d);
  
            d3.select(this)
              .style("opacity", 0.8)
              .style("stroke","white")
              .style("stroke-width",0.3);
          });
  */

 //timeslide
    svg.append("path")
        .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
         // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
        .attr("class", "names")
        .attr("d", path);

        d3.select("#timeslide").on("input", function() {
            console.log(consomation);
            update(+this.value);
            consomation=0;
        });
        
    var legend = d3.select("#legend")
    .append("svg")
    .attr("width", width)

    var format = d3.format("~s");
    var formatedDomain = domain.map(d => format(d) )
    console.log(formatedDomain)

// Create the scale
    var x = d3.scaleLinear()
        .domain(formatedDomain)         // This is what is written on the Axis: from 0 to 100
        .range(rangeHue);       // This is where the axis is placed: from 100px to 800px



// Draw the axis
    legend
        .append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");

    var legendLinear = d3.legendColor()
        .shapeWidth(50)
        .cells(domain)
        .labels(formatedDomain)
        .orient('horizontal')
        .scale(hue);
      
    legend.select(".legendLinear")
        .call(legendLinear);
    
    function color(value){
        if (value != 0)
            return hue(value)
        else 
            return "#eeeeee";
    }

    document.getElementById("total").innerHTML = format(consomation) ;

    function updateValue(d) {
        var total = 0
        //console.log("id = " + d.id)
        if (totalMeatPerYear[d.id] != undefined) {
            if (totalMeatPerYear[d.id][1].find(d => d.Year == year) != undefined) {
                total = totalMeatPerYear[d.id][1].find(d => d.Year == year).total
                consomation = consomation + Number(total);
                
                //console.log("total = "+ total + "  hue = "+ hue(total));
            }
        }
        else
            total = 0
        
        return color(total);
        
    }

        function update(value) {
            document.getElementById("range").innerHTML=years[value];
            
            
            year = years[value];
            d3.selectAll("path")
                .style("fill", updateValue);
            document.getElementById("total").innerHTML = format(consomation) ;
            console.log('update ' + consomation)
        };
        
        
}
  
function normalise(total) {
    return (total - 0) / (100000000 - 0)
}


















































 /*   
co2PerYear = d3.nest()
  .key(function(d) { return d.annee; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.CO2; }); })
  .entries(emissions);
    
console.log(co2PerYear)
*/
/*co2PerYearPerAirport = d3.nest()
  .key(function(d) {return d.APT})
  .key(function(d) { return d.annee;})
  .rollup(function(v) { return d3.sum(v, function(d) { return d.CO2; }); })
  .entries(emissions);
  */
  

                      
                     
/*co2PerYear = d3.nest()
  .key(function(d) { return d.annee; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.CO2; }); })
  .entries(emissions);

co2PerYearPerAirport = d3.nest()
  .key(function(d) {return d.APT})
  .key(function(d) { return d.annee;})
  .rollup(function(v) { return d3.sum(v, function(d) { return d.CO2; }); })
  .entries(emissions);

retardPerYear = d3.nest()
    .key(function(d) {return d.annee;})
    .rollup(function(v) {d3.mean(v, function(d) {return d.RETARD_A;});})
    .entries(retards);
    */

//console.log(co2PerYear);
/*
function dataLoaded(data) {
    let co2perCountry = data
    let max2000 = d3.max(co2perCountry, d => d["2000"])
    //because we will animate from one bar chart to the other, our axis will go up to the maximum values considering the three years
    let maxValue = d3.max([d3.max(co2perCountry, d => d["2013"]), d3.max(co2perCountry, d => d["1990"]), max2000])
    const yscale = d3.scaleLinear().domain([0, maxValue]).range([height-MARGIN, MARGIN])

    //the xscale uses the scaleBand() function to assign to each categorial value of d.Pays a numerival value
    const xscale = d3.scaleBand()
        .rangeRound([0, width-MARGIN])
        .padding(0.1)

    xscale.domain([...co2perCountry].map((d) => d.Pays))

    // We now create both axis. We use the transform functions to translate them to the correct position
    const xaxis = d3.axisBottom().scale(xscale)
    const xaxis_container = svg.append("g")
        .attr("class", "xAxis")
        .attr("transform", `translate(${MARGIN}, ${height-MARGIN})`)
        .call(xaxis)

    svg.selectAll(".xAxis text") 
    .style("text-anchor", "end")
    .attr("transform", function(d) {
    return `translate(-10, 5)rotate(${angleDegrees})`
    })

    const yaxis = d3.axisLeft().scale(yscale)
    const yaxis_container = svg.append("g")
    .attr("class", "yaxis")
    .attr("transform", `translate(${MARGIN}, 0)`)
    .call(yaxis)



    let year = 1990
    //we create the same visualization than before, using the 1990 data
    const bars =  svg.selectAll(".bar")
        .data(co2perCountry)
        .join(
        enter => enter.append("rect")
        //.attr("y", yscale(0))
        .attr("class", "bar")
        .attr("fill-opacity", 0.5)
        .attr("y", (d)=>yscale(d[year+""]))
        .attr("x", (d) => xscale(d.Pays))
        .attr("width", () => xscale.bandwidth())
        .attr("height", (d)=>height-yscale(d[year+""])-MARGIN) // calculate new height relative to top
        //.attr("height", 0) 
        .attr("transform", `translate(${MARGIN}, 0)`)
        .attr("fill", "red")
        .call(enter => enter.transition(t)
                .attr("y", (d)=>yscale(d[year+""]))
                .attr("height", (d)=>height-yscale(d[year+""])-MARGIN) 
            )
        )


    let currentYearIndex = 0
    const years = [1990,2000,2013]
    
    let interval = null
    const startAnimation = ()=> {
        interval = setInterval(updateYear, 2500)
    }
    //we define a function that will update the year data using a transition. We do not actually update the data but change the height and y attributes, using a different year
    const updateYear = ()=>{
    currentYearIndex++
    let year = years[currentYearIndex]
    if (currentYearIndex<years.length) {
        bars
        .transition()
        .duration(2000)
        .attr("y", (d)=>yscale(d[year+""]))
        .attr("height", (d)=>height-yscale(d[year+""])-MARGIN)
    }
    else {
        clearInterval(interval)
    }
    
    }

    //this function will be called when pressing the play button. setInterval will call the updateYear function every 2500 ms (2.5 seconds)
    

    d3.select("#play").on("click", function () {
    startAnimation()
    })

    svg
    .append("text")
    .attr("y", 0)
    .attr("x",0)
    .text("CO2 emissions")
    .attr("transform", `translate(${MARGIN/2},${height-2*MARGIN}) rotate(-90)`)
}*/

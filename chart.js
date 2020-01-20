
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
      
      // Initialise a X axis:
      var x = d3.scaleLinear().range([0,width]);
      var xAxis = d3.axisBottom().scale(x);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class","myXaxis")
           // text label for the x axis
           svg.append("text")             
           .attr("transform",
               "translate(" + (width/2) + " ," + 
                               (height + margin.top + 20) + ")")
           .style("text-anchor", "middle")
           .text("GDP");
       // text label for the x axis
       svg.append("text")             
       .attr("transform",
           "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
       .style("text-anchor", "middle")
       .text("GDP");
      
      // Initialize an Y axis
      var y = d3.scaleLinear().range([height, 0]);
      var yAxis = d3.axisLeft().scale(y);
      svg.append("g")
        .attr("class","myYaxis")
      // text label for the y axis
      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("kilograms per year (Meat consumption)");   
      


//chargement des données 

d3.csv("https://raw.githubusercontent.com/Kzamania/d3-visual/master/datasets/meat-consumption-vs-gdp-per-capita.csv").then (function (data) {
    ready(data)
})

var years = d3.range(1990,2014,1);

function ready(data){
    var totalMeatPerYear = {};
    var listCountry = [];
    var listContinent = []
    
    let meatPerYear = d3.groups( data,
        d => d.Code,
        );

    meatPerYear.forEach(d => {       
        if(d[0] == "" ){
            let test = d3.groups(d[1],
                d=> d.Entity);
            test.forEach( d =>{
                listContinent[d[0]] = d[1];
            });           
        } else {
            totalMeatPerYear[d[0]] = d
            listCountry.push(new Object({
                code : d[0],
                entity : d[1][0].Entity,
            }))
        }
    });
   
    

    // console.log("listContinent");
    // console.log(listContinent);
    // console.log("listCountry");
    // console.log(listCountry);

    // console.log(listCountry[0]);
    update("USA",totalMeatPerYear)
    //console.log(totalMeatPerYear);
     
    //console.log(usa);
    // console.log("button");
    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(listCountry)
      .enter()
    	.append('option')
      .text(function (d) { return d.entity; }) // text showed in the menu
      .attr("value", function (d) { return d.code; }) // corresponding value returned by the button

    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // console.log(selectedOption);
        // run the updateChart function with this selected option
        
        update(selectedOption,totalMeatPerYear)
    })

    //graph(usa)

   
    
}


// Now I can use this dataset:
function update(code,totalMeatPerYear) {
    var format = d3.format("~s");
    var domain = [0,100000]

    let dataCountry = [];
    totalMeatPerYear[code][1].forEach( data => {
        //console.log(data)
        if (years.includes(Number(data.Year))) {
            dataCountry.push(data);
        }
    }
    );
    // Create the X axis:
    x.domain([d3.min(dataCountry, function(d) { return +d.GDP; }), d3.max(dataCountry, function(d) { return +d.GDP; })]);

    // create the Y axis
    y.domain([d3.min(dataCountry, function(d) { return +d.Meat; }), d3.max(dataCountry, function(d) { return +d.Meat; })]);
    
    svg.selectAll(".myYaxis")
        .transition()
        .duration(3000)
        .call(yAxis);

    svg.selectAll(".myXaxis").transition()
      .duration(3000)
      .call(xAxis)

      // Create a update selection: bind to the new data
    var u = svg.selectAll(".lineTest")
        .data([dataCountry], function(d){ return d })

            // Updata the line
    u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
        .x(function(d) { return x(d.GDP); })
        .y(function(d) { return y(d.Meat); }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
/*
    // Add X axis 
    var x = d3.scaleLinear()
        .domain([d3.min(dataCountry, function(d) { return +d.GDP; }), d3.max(dataCountry, function(d) { return +d.GDP; })])
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));*/

   
/*
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([d3.min(dataCountry, function(d) { return +d.Meat; }), d3.max(dataCountry, function(d) { return +d.Meat; })])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));
        */

    /*
    // Add the line
    svg.append("path")
      .datum(dataCountry)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.GDP) })
        .y(function(d) { return y(d.Meat) })
        )
*/
}


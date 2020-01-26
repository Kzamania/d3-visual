
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 60},
    width = 760  - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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
    //update("USA",totalMeatPerYear)
    //console.log(totalMeatPerYear);
     
    //console.log(usa);
    // console.log("button");
    // add the options to the button
    d3.select("#selectButton1")
      .selectAll('myOptions')
     	.data(listCountry)
      .enter()
    	.append('option')
      .text(function (d) { return d.entity; }) // text showed in the menu
      .attr("value", function (d) { return d.code; }) // corresponding value returned by the button

    d3.select("#selectButton1").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // console.log(selectedOption);
        // run the updateChart function with this selected option
        
        update(selectedOption,totalMeatPerYear)
    })

    d3.select("#selectButton2")
      .selectAll('myOptions')
     	.data(listCountry)
      .enter()
    	.append('option')
      .text(function (d) { return d.entity; }) // text showed in the menu
      .attr("value", function (d) { return d.code; }) // corresponding value returned by the button

      d3.select("#selectButton2").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // console.log(selectedOption);
        // run the updateChart function with this selected option
        
        update2(selectedOption,totalMeatPerYear)
    })
    //graph(usa)

   
    
}

var domain1 = [];
var domain2 = [];

function updateAxis(){
  var test = domain1.concat(domain2);
  //domain2.forEach(d => {console.log("connard = "+d)})
  /*test.forEach(
    d => {console.log(d);}
  )*/
  x.domain(
    [d3.min(test, function(d) { return +d.GDP;})
      ,
      d3.max(test, function(d) {return +d.GDP;} )
    ]
  )
  y.domain(
    [d3.min(test, function(d) { return +d.Meat;})
      ,
      d3.max(test, function(d) {return +d.Meat;} )
    ]
  )
  svg.selectAll(".myYaxis")
    .transition()
    .duration(3000)
    .call(yAxis);

  svg.selectAll(".myXaxis").transition()
  .duration(3000)
  .call(xAxis)

  //svg.selectAll(".lineTest").remove()
  //svg.selectAll(".lineTest2").remove();
  connard();
  connard2();

}


function connard(){
  

      // Create a update selection: bind to the new data
    var u = svg.selectAll("#id")
        .data([domain1], function(d){ return d })

    document.getElementById("line1").innerHTML = domain1[0].Entity;
    document.getElementById("line1").style.color= "steelblue";
    // Update the line
    u
    .enter()
    .append("path")
    .attr("class",".lineTest")
    .attr("id","id")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
        .x(function(d) {  return x(d.GDP); })
        .y(function(d) {  return y(d.Meat); }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
}

function connard2(){
    // Create a update selection: bind to the new data
    var u = svg.selectAll("#id2")
    .data([domain2], function(d){ return d })


    document.getElementById("line2").innerHTML = domain2[0].Entity;
    document.getElementById("line2").style.color= "green";
  // Update the line
  u
  .enter()
  .append("path")
  .attr("class",".lineTest2")
  .attr("id","id2")
  .merge(u)
  .transition()
  .duration(3000)
  .attr("d", d3.line()
    .x(function(d) {  return x(d.GDP); })
    .y(function(d) {  return y(d.Meat); }))
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2.5)
}
// Now I can use this dataset:
function update(code,totalMeatPerYear) {
    var format = d3.format("~s");


    let dataCountry = [];
    totalMeatPerYear[code][1].forEach( data => {
        //console.log(data)
        if (years.includes(Number(data.Year) )) {
            dataCountry.push(data);            
        }
    }
    );
    domain1 = dataCountry ;
    // Create the X axis:
    //x.domain([d3.min(dataCountry, function(d) { return +d.GDP; }), d3.max(dataCountry, function(d) { return +d.GDP; })]);

    // create the Y axis
    //y.domain([d3.min(dataCountry, function(d) { return +d.Meat; }), d3.max(dataCountry, function(d) { return +d.Meat; })]);
    updateAxis();
    /*svg.selectAll(".myYaxis")
        .transition()
        .duration(3000)
        .call(yAxis);

    svg.selectAll(".myXaxis").transition()
      .duration(3000)
      .call(xAxis)

      // Create a update selection: bind to the new data
    var u = svg.selectAll(".lineTest")
        .data([dataCountry], function(d){ return d })

    // Update the line
    u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3.line()
        .x(function(d) { console.log("year = " + d.Year + "gdp = " + d.GDP); return x(d.GDP); })
        .y(function(d) { console.log("Meat = " + d.Meat); return y(d.Meat); }))
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2.5)
*/

    /*var bisect = d3.bisector(function(d) { return d.GDP; }).left;
    // Create the circle that travels along the curve of chart
    var focus = svg
    .append('g')
    .append('circle')
    .style("fill", "none")
    .attr("stroke", "black")
    .attr('r', 8.5)
    .style("opacity", 0)

    // Create the text that travels along the curve of chart
    var focusText = svg
    .append('g')
    .append('text')
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svg
    .append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);

    
        // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
        
      focus.style("opacity", 1)
        focusText.style("opacity",1)
      
    }

  function mousemove() {
    // recover coordinate we need
    var x0 = x.invert(d3.mouse(this)[0]);
    //console.log("x0= " + x0)
    var i = bisect(dataCountry, x0, 1) ;
    //console.log("i= "+i)
    selectedData = dataCountry[i]
    //console.log(selectedData);
    focus
      .attr("cx", x(selectedData.GDP))
      .attr("cy", y(selectedData.Meat))
    focusText
      //.html("GDP:" + format(selectedData.GDP) + "  -  " + "Kilo per year: " + format(selectedData.Meat) + " \nyear:" + selectedData.Year)
      .html("year:" + selectedData.Year)
      .attr("x", x(selectedData.GDP)+15)
      .attr("y", y(selectedData.Meat))

    }

  function mouseout() {
    focus.style("opacity", 0)
    focusText.style("opacity", 0)
  }*/
}


function update2(code,totalMeatPerYear) {
  var format = d3.format("~s");

  let dataCountry = [];
  totalMeatPerYear[code][1].forEach( data => {
      //console.log(data)
      if (years.includes(Number(data.Year))) {
          dataCountry.push(data);
      }
  }
  );
  domain2 = dataCountry;
  // Create the X axis:
  //x.domain([d3.min(dataCountry, function(d) { return +d.GDP; }), d3.max(dataCountry, function(d) { return +d.GDP; })]);

  // create the Y axis
  //y.domain([d3.min(dataCountry, function(d) { return +d.Meat; }), d3.max(dataCountry, function(d) { return +d.Meat; })]);
  updateAxis();

  /*svg.selectAll(".myYaxis")
      .transition()
      .duration(3000)
      .call(yAxis);

  svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis)

    // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest2")
      .data([dataCountry], function(d){ return d })

  // Update the line
  u
  .enter()
  .append("path")
  .attr("class","lineTest2")
  .merge(u)
  .transition()
  .duration(3000)
  .attr("d", d3.line()
      .x(function(d) { return x(d.GDP); })
      .y(function(d) { return y(d.Meat); }))
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-width", 2.5)
*/

  /*var bisect = d3.bisector(function(d) { return d.GDP; }).left;
  // Create the circle that travels along the curve of chart
  var focus = svg
  .append('g')
  .append('circle')
  .style("fill", "none")
  .attr("stroke", "black")
  .attr('r', 8.5)
  .style("opacity", 0)

  // Create the text that travels along the curve of chart
  var focusText = svg
  .append('g')
  .append('text')
  .style("opacity", 0)
  .attr("text-anchor", "left")
  .attr("alignment-baseline", "middle")

  // Create a rect on top of the svg area: this rectangle recovers mouse position
  svg
  .append('rect')
  .style("fill", "none")
  .style("pointer-events", "all")
  .attr('width', width)
  .attr('height', height)
  .on('mouseover', mouseover)
  .on('mousemove', mousemove)
  .on('mouseout', mouseout);

  
      // What happens when the mouse move -> show the annotations at the right positions.
  function mouseover() {
      
    focus.style("opacity", 1)
      focusText.style("opacity",1)
    
  }

function mousemove() {
  // recover coordinate we need
  var x0 = x.invert(d3.mouse(this)[0]);
  console.log(x0)
  var i = bisect(dataCountry, x0, 1);
  console.log(i)
  //console.log(dataCountry);
  selectedData = dataCountry[i]
  //console.log(selectedData);
  focus
    .attr("cx", x(selectedData.GDP))
    .attr("cy", y(selectedData.Meat))
  focusText
    //.html("GDP:" + format(selectedData.GDP) + "  -  " + "Kilo per year: " + format(selectedData.Meat) + " \nyear:" + selectedData.Year)
    .html("year:" + selectedData.Year)
    .attr("x", x(selectedData.GDP)+15)
    .attr("y", y(selectedData.Meat))

  }

function mouseout() {
  focus.style("opacity", 0)
  focusText.style("opacity", 0)
}*/
}



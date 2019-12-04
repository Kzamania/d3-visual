
let width = 800
let height = 400
const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

const MARGIN = 80
let maxTextLength = 100
const angleDegrees = -45
const angleRadians = angleDegrees * (Math.PI / 180)
const padding = 100
const t = svg.transition().duration(750)


d3.csv("https://mjlobo.github.io/teaching/infovis/data/trajets.csv").then(function(trajet) {
    d3.csv("https://mjlobo.github.io/teaching/infovis/data/retards.csv").then(function(retard){
        
        d3.csv("https://mjlobo.github.io/teaching/infovis/data/emissions.csv").
    then(function (emission) {
    d3.csv("https://mjlobo.github.io/teaching/infovis/data/aeroports.csv").then(function (aeroport) { 
    
        dataLoaded(trajet,retard,emission,aeroport)
        
        })
    })
 })
})





/*function dataLoaded(...args){
    args.forEach(function(d){
        console.log(d);
        d.forEach(function(d){
            d.ANMOIS = d3.timeParse("%Y%m")(d.ANMOIS)
            d.annee = new Date(+d.annee,0)
            //console.log(d);
        })
        
    })
}*/

function dataLoaded(trajets,retards,emissions,aeroports){
    
    trajets.forEach(function(d){
            d.ANMOIS = d3.timeParse("%Y%m")(d.ANMOIS)
            d.annee = new Date(+d.annee,0)
            //console.log(d);
        })
    
    console.log(trajets);
    
    retards.forEach(function(d){
            d.ANMOIS = d3.timeParse("%Y%m")(d.ANMOIS)
            d.annee = new Date(+d.annee,0)
            //console.log(d);
        })

    console.log(retards);
    emissions.forEach(function(d){
            d.ANMOIS = d3.timeParse("%Y%m")(d.ANMOIS)
            d.annee = new Date(+d.annee,0)
            //console.log(d);
        })

    console.log(emissions);
    
    aeroports.forEach(function(d){
            d.ANMOIS = d3.timeParse("%Y%m")(d.ANMOIS)
            d.annee = new Date(+d.annee,0)
            //console.log(d);
        })
    console.log(aeroports);
    

    
co2PerYear = d3.nest()
  .key(function(d) { return d.annee; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.CO2; }); })
  .entries(emissions);
    
console.log(co2PerYear)
/*co2PerYearPerAirport = d3.nest()
  .key(function(d) {return d.APT})
  .key(function(d) { return d.annee;})
  .rollup(function(v) { return d3.sum(v, function(d) { return d.CO2; }); })
  .entries(emissions);
  */
  
}
                      
                     
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

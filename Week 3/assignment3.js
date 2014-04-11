// Retrieve data stored in local storage
var data = JSON.parse(localStorage.getItem(‘assignment')).events;

var padding = 20;
var width = 1000 - padding;
var height = 500 - padding;

// Initialise dynamic scales
var xScale = d3.scale
  .ordinal()
  .domain(d3.range(data.length))
  .rangeRoundBands([padding, width], 0.05);

// Find max data value
var maxData = 0;
for (var i = data.length - 1; i >= 0; i--) {
  if (data[i].rating > maxData) {
    maxData = data[i].rating;
} };
var yScale = d3.scale
  .linear()
  .domain([0, maxData])
  .range([height, 0]);

// Create svg
var svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', function(d, i) {
    return xScale(i);
  })
  .attr('y', function(d) {
    return yScale(d.rating) + padding / 2;
  })
  .attr('width', xScale.rangeBand())
  .attr('height', function(d) {
    return height - yScale(d.rating);
  })
  .attr('fill', function(d) {
    if (d.ficticious) {
      return "green"
    } else {
      return "red";
    }
});
// Add labels with the names to the bars
svg.selectAll("text")
  .data(data)
  .enter()
  .append("text")
  // 'Switch' x and y due to the rotate(270) transformation
  .attr('y', function(d, i) {
    return xScale(i) + (xScale.rangeBand() / 2);
  })
  .attr('x', function(d) {
    return -1 * (height - padding / 2);
  })
  .attr("transform", "rotate(270)")
  .text(function(d) {
    return d.name;
  });

// Add axis
svg.append('g')
  .attr("transform", "translate(" + padding + ", " + padding / 2 + ")")
  .call(d3.svg.axis()
        .orient('left')
        .scale(yScale)
        .ticks(5)
);
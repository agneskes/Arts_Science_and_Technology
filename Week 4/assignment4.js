// Dimensions of the svg.
var width = 960,
    height = 500;

// Group of 10 distinct colours, will return a colour based on a number.
var colour = d3.scale.category10();

// Create arrays to hold the nodes and links.
var nodes = [];
var links = [];

// Initiate the force graph.
var force = d3.layout.force()
  .nodes(nodes)
  .links(links)
  .charge(-120)
  .linkDistance(30)
  .size([width, height])
  .on("tick", tick);

// Create the svg element and inject it into the DOM.
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

// Create the svg elements for the links and nodes.
var node = svg.selectAll(".node"),
    link = svg.selectAll(".link");

// Get data from firebase.
var FB = new Firebase('https://crackling-fire-7613.firebaseio.com/data');
var data = {};
FB.on('value', function(snapshot) {
  data = snapshot.val();
  addElements(data);
});

// Add new nodes and links to the graph.
function addElements(newData) {
  // Add the nodes.
  newData.nodes.forEach(function (newNode) {
    
    // Skip nodes that already exist.
    var exists = false;
    nodes.forEach(function (oldNode) {
      if (oldNode.id == newNode.id) {
        exists = true;
  };
    })
    if (!exists) {
      nodes.push(newNode);
    }; 
  });
  
  // Add the links.
  newData.links.forEach(function (link, index) {
    var newLink = {source: nodes[newData.links[index].source.id], target:
        nodes[newData.links[index].target.id]};
    // Skip links that already exist.
    var exists = false;
    links.forEach(function (oldLink) {
      if (oldLink.source.id == newLink.source.id && oldLink.target.id ==
          newLink.target.id) {
        exists = true;
      };
    })
    if (!exists) {
      links.push(newLink);
    };
});
  // Update the graph.
  updateGraph();
}

// Update and reanimate the graph.
function updateGraph() {
  link = link.data(force.links(), function (d) { return d.source.id + "-" + d.
      target.id; });
  link.enter().insert("line", ".node").style("stroke", "#000");
  link.exit().remove();
  node = node.data(force.nodes(), function (d) { return d.id;});
  node.enter().append("circle")
    .style("fill", function (d) { return colour(d.group); })
    .attr("r", 8)
    .call(force.drag)
    .append("title").text(function (d) {
      return d.name;
    });
  node.exit().remove();
  force.start();
}

function tick() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
}

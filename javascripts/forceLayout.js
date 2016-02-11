
var width = 700,
    height = 500,
    root;

var force = d3.layout.force()
    .linkDistance(85)
    .charge(-700)
    .gravity(0.05)
    .size([width, height])
    .on("tick", tick);

var svg = d3.select("#bio").append("svg")
    .attr("id","force")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");



function update() {
  var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

  // Restart the force layout.
  force
      .nodes(nodes)
      .links(links)
      .start();

  // Update links.
  link = link.data(links, function(d) { return d.target.id; });

  link.exit().remove();

  link.enter().insert("line", ".node")
      .attr("class", "link");

  link.attr("stroke","black")

  // Update nodes.
  node = node.data(nodes, function(d) { return d.id; });

  node.exit().remove();

  var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .on("click", click)
      .call(force.drag);

  nodeEnter.append("circle")
      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });

  nodeEnter.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  node.select("circle")
      .style("fill", color);
}

function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function color(d) {
  return d._children ? "#3182bd" // collapsed package
      : d.children ? "rgb(43, 72, 99)" // expanded package
      : "#fd8d3c"; // leaf node
}

// Toggle children on click.
function click(d) {
  if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
  var nodes = [], i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}

//Size of leaf node
var nodeSize = 1;
var bigSize = 65000;

root = {

 "name": "Skills",
 "size": bigSize,
 "children": [
  {
   "name": "Code",
   "size": bigSize,
   "children": [
      {"name": "Javascript", "size": nodeSize},
      {"name": "Java", "size": nodeSize},
      {"name": "Python", "size": nodeSize},
      {"name": "C", "size": nodeSize}  
     ]
  },

  {
   "name": "Web",
   "size": bigSize,
   "children": [
      {"name": "Angular", "size": nodeSize},
      {"name": "Node", "size": nodeSize},
      {"name": "D3", "size": nodeSize},
      {"name": "Express", "size": nodeSize}  
     ]
  },

  {
   "name": "Data",
   "size": bigSize,
   "children": [
      {"name": "Mongodb", "size": nodeSize},
      {"name": "SQL", "size": nodeSize},
      {"name": "Matlab", "size": nodeSize},
      {"name": "SciPy", "size": nodeSize}  
     ]
  }
  ]
  
};

update();

+++
title = "Binary Search Tree"
date = "2017-04-08"
draft = "true"

+++

I recently implemented a Binary Search Tree in JavaScript. It was a fun exercise and a great opportunity to use ES6 Classes.

Although I implemented insertion, removal, and a few other operations, this post will focus on insertion and how I connected it to d3.js.

<!--more-->

Here is my code for the Binary Search Tree class, Node class, and their insertion functions.

{{< highlight javascript >}}
/* Binary Search Tree Class */
class BinarySearchTree {
    // constructor
    constructor() {
        this.root = null;
    }

    // insert
    insert(value) {
        if (this.root == null) {
            this.root = new Node(value);
            return true;
        } else {
            return this.root.insert(new Node(value));
        }
    }
}

/* Node Class */
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
    // insert
    insert(node) {
        if (node.value == this.value) {
            return false;
        // Check Left    
        } else if (node.value < this.value) {
            if (this.left != null) {
                return this.left.insert(node);
            } else {
                this.left = node;
                node.parent = this;
                return true;
            }
        // Check Right    
        } else {
            if (this.right != null) {
                return this.right.insert(node);
            } else {
                this.right = node;
                node.parent = this;
                return true;
            }
        }
    }
}
{{</ highlight >}}

Here is the code for a vertical tree in d3.js. 

{{< highlight javascript >}}

var treeData = {
    "value": 25,
    "children": [{
            "value": 10,
            "parent": 25,
            "children": [{
                    "value": 7,
                    "parent": 10,
                },
                { "value": 15,
                  "parent": 10 }]
               },
               { "value": 50,
                 "parent": 25
               }]
};


// Set dimensions and margins for diagram
var margin = {top: 80, bottom: 80},
    width = 800,
    height = 600 - margin.top - margin.bottom;
    
// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin   
var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox","0 0 800 600")
    .append("g")
    .attr("transform", "translate(0," + margin.top + ")");
                
var i = 0,      
    duration = 750,
    root;

// Declares a tree layout and assigns the size
var treemap = d3.tree().size([width, height]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d){ 
    console.log(d.children)
    return d.children; 
});

root.x0 = width / 2;
root.y0 = 0;

console.log(root);

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d){
    if(d.children){
        d._children = d.children
        d._children.forEach(collapse)
        d.children = null;
    }
}

// Update
function update(source){
    // Assigns the x and y position for the nodes
    var treeData = treemap(root);
    
    // Compute the new tree layout.
    var nodes = treeData.descendants(),
        links = treeData.descendants().slice(1);
        
    // Normalize for fixed-depth
    nodes.forEach(function(d){ d.y = d.depth*100 });    
    
    // **************** Nodes Section ****************
    
    // Update the nodes...
    var node = svg.selectAll('g.node')
         .data(nodes, function(d) {return d.id || (d.id = ++i); });
         
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append('g')
                     .attr('class', 'node')
                     .attr("transform", function(d){
                         return "translate(" + source.x0 + "," + source.y0 + ")";
                     })
                     .on('click', click);
                     
    // Add Circle for the nodes
    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 1e-6)
        .style("fill", function(d){
            return d._children ? "lightsteelblue" : "#fff";
        });
    
    // Add labels for the nodes
    nodeEnter.append('text')
        .attr("dy", ".35em")
        .attr("x", function(d){
            return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", function(d){
            return d.children || d._children ? "end" : "start";
        })
        .text(function(d){ return d.data.value; });
    
    // Update
    var nodeUpdate = nodeEnter.merge(node);
    
    // Transition to the proper position for the nodes
    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
        .attr('r', 10)
        .style("fill", function(d){
            return d._children ? "lightsteelblue" : "#fff";
        })
        .attr('cursor', 'pointer');
        
    // Remove any exiting nodes
    nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d){
            return "translate(" + source.x +","+ source.y +")";
        })
        .remove();
        
    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
        .attr('r', 1e-6);
    
    // On exit reduce the opacity of text lables  
    nodeExit.select('text')
        .style('fill-opacity', 1e-6)
        
    // **************** Links Section ****************
    
    // Update the links...
    var link = svg.selectAll('path.link')
        .data(links, function(d){ return d.id; });
        
    // Enter any new links at the parent's previous position
    var linkEnter = link.enter().insert('path', "g")
        .attr("class", "link")
        .attr('d', function(d){
            var o = {x: source.x0, y: source.y0};
            return diagonal(o,o);
        });
    
    // Update
    var linkUpdate = linkEnter.merge(link);
    
    // Transition back to the parent element position
    linkUpdate.transition()
        .duration(duration)
        .attr('d', function(d){ return diagonal(d, d.parent) });
    
    // Remove any existing links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function(d){
                var o = {x: source.x, y: source.y};
            })
            .remove();
    
    // Store the old positions for transition.
    nodes.forEach(function(d){
        d.x0 = d.x;
        d.y0 = d.y;
    });
    
    // Create a curved (diagonal) path from parent to the child nodes
    function diagonal(s,d){
        path = `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`

        return path;
    }

    // Toggle children on click
    function click(d){
        if (d.children){
            d._children = d.children;
            d.children = null;
        }
        else{
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }
}
{{</ highlight>}}

The above code utilizes the d3-hierarchy module to help help visualize the dataset `treeData`. It returns the root node and gives each node the properties: data, depth, height, parent, children, and value.

I tried replacing `treeData` with an instance of my BST.

 `d3.hierarchy`. I thought that if I replaced the original `treeData`, d3 would be able to render a visualization. 

Not surprisingly this didn't work.  While a BST is hierarchical in nature, `d3.hierarchy` expects that the data is in a hierarchical format like JSON.  

- data needs to be in hierarchical form
- what does that mean? I thought my data structure was in hierarchical form.
- how I changed the insertion method

- this worked well, but for nodes that only had a single child, the child hung directly under the parent
- I thought about changing the coordinates of these nodes, by first identifying single children and adjusting them accordingly, but realized that if they had a dummy sibling they would be positioned correctly
- I augmented my code to support dummy children and gave them the class hidden
- This allowed me to hide the dummy children and give a correctly visualized BST

## Notes:

After completing my initial BST implementation, I consulted [Algolist](http://www.algolist.net/Data_structures/Binary_search_tree/Insertion) for some ideas on how to clean up my code. I particularly like how they have an insertion method in the BST and Node class. This allows for insertion to be called directly on a node or tree instance. This was cleaner than my method of passing the value to be inserted and a root node to insert().
 
I adapted [d3noob's block](https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd) for the vertical tree.
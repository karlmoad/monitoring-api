/**
 * Created by moadkj on 5/18/16.
 */
d3.esbFlowSankey = function () {
    "use strict";

    var esbFlowSankey = {},
        nodeWidth = 15,
        minHeight = 1,
        nodeSpacing = 5,
        linkSpacing = 5,
        minThickness = 1,
        maxThickness = 25,
        arrowheadScaleFactor = 0, // Specifies the proportion of a link's stroke width to be allowed for the marker at the end of the link.
        size = [1, 1], // default to one pixel by one pixel
        nodes = [],
        nodeMap = {},
        links = [],
        yScaleFactor = 1,
        positions = {},
        defaultLinkCurvature = 0.5;

    function gcd(a, b) {
        if (b) {
            return gcd(b, a % b);
        } else {
            return Math.abs(a);
        }
    }

    function center(node) {
        return node.y + node.height  / 2;
    }

    function value(link) {
        return link.value;
    }

    function sumNodeHeight(node){
        return node.height;
    }

    function parentNodeFilter(node){
        return (!node.parent || node.parent == null);
    }

    function leafNodeFilter(node){
        return (!node.children.length || node.children.length == 0)
    }

    function initializeNode(id, name, parent){
        var node = {};
        node.id = id;
        node.parent = parent;
        node.name = name;
        nodes.push(node);
        return node;
    }

    function initializeLink(link){
        //Value method is temp only for dev, replace this later with actual values of throughput numbers of the link
        link.value = Math.floor(Math.random() * 500000);
        link.source = link.startFlow;
        link.target = link.endFlow;
        links.push(link);
    }

    function initializeSystem(system){
        var sysNode = initializeNode(system.id, system.name, null);
        sysNode.type = "system";
        var types =['send','transform','receive'];
        types.forEach(function (t) {
            if (system.flows[t] && system.flows[t].length > 0) {
                var typeNode = initializeNode(sysNode.id+t, sysNode.name + " " + t,sysNode.id);
                typeNode.type = t;
                system.flows[t].forEach(function (flow) {
                    var flowNode = initializeNode(flow.id, flow.name,typeNode.id);
                    flowNode.type = t;
                    flow.links.source.forEach(initializeLink);
                    flow.links.target.forEach(initializeLink);
                });
            }
        });
    }

    function initializeNodeProperties(node) {
        node.netInput = 0;
        node.netOutput = 0;
        node.value = 0;
        node.height = 0;
        node.sourceLinks = [];
        node.rightLinks = [];
        node.targetLinks = [];
        node.leftLinks = [];
        node.connectedNodes = [];
        node.children = [];
        node.ancestors = [];

        if(positions[node.id]){
            node.x = positions[node.id].x;
            node.y = positions[node.id].y;
        }else {
            node.x = 0;
            node.y = 0;
        }
    }

    function scaleValues(){
        var max = d3.max(links,value);
        var min = d3.min(links,value);

        var scale = d3.scale.linear().domain([min,max]).range([0,100]).clamp(true);

        links.forEach(function(link){
            link.originalValue = link.value;
            link.value = scale(link.value);
        });
    }

    // generates the nodeMap {"1": <node1>, "2": <node2>}
    // and initializes the array properties of each node
    function initializeNodeMap() {
        nodes.forEach(function (node) {
            nodeMap[node.id] = node;
            initializeNodeProperties(node);
        });
    }

    function initializeLinkNodes(){
        links.forEach(function (link) {
            var sourceNode = nodeMap[link.source] || link.source;
            var targetNode = nodeMap[link.target] || link.target;
            link.id = link.source + '-' + link.target;
            link.source = sourceNode;
            link.target = targetNode;
        });
    }

    // generate hierarchical connections between parent and child nodes
    function initializeNodeHierarchy() {
        nodes.forEach(function (node) {
            node.sourceNodes = [];
            node.targetNodes = [];
            var parent = nodeMap[node.parent];
            if (parent) {
                node.parent = parent;
                parent.children.push(node);
            } else {
                node.parent = null;
            }
        });

        nodes.filter(function(node){
            return !node.parent || node.parent == null;
        }).forEach(addAncestors);
    }

    function addAncestors(node) {
        node.children.forEach(function (child) {
            child.ancestors = child.ancestors.concat(this.ancestors.concat([this]));
            addAncestors(child);
        }, node);
    }

    // Populate the sourceLinks and targetLinks for each node.
    function initializeNodeLinks() {
        links.forEach(function (link) {
            link.source.sourceLinks.push(link);
            link.target.targetLinks.push(link);
        });
    }

    function visible(linkCollection) {
        return linkCollection.filter(function (link) {
            return link.source.state === "collapsed" && link.target.state === "collapsed";
        });
    }

    // When child nodes are collapsed into their parents (or higher ancestors)
    // the links between the child nodes should be represented by links
    // between the containing ancestors. This function adds those extra links.
    function initializeAncestorLinks() {
        var sourceNode, targetNode;

        //use a for loop to iterate only the original input links form system collection not any added through this process
        var currentLinks = links.length;
        for(var i =0; i < currentLinks; i++){
            var link = links[i];
            sourceNode = link.source;
            targetNode = link.target;

            //Cant have a starting link bound to branch nodes
            if((targetNode && targetNode.children.length == 0)&&(sourceNode && sourceNode.children.length == 0)){
                //First establish a link between the source node and target + each ancestor
                var targetAncestors = targetNode.ancestors.filter(function(a){
                    return sourceNode.ancestors.indexOf(a) < 0;
                });
                targetAncestors.forEach(function(targetAncestor){
                    var targetAncestorLink = {source: sourceNode,
                        target: targetAncestor,
                        value: link.value,
                        id: sourceNode.id + "-" + targetAncestor.id };
                    links.push(targetAncestorLink);
                });

                //Now walk he source ancestor tree and add in links to the target and target ancestor(s)
                var sourceAncestors = sourceNode.ancestors.filter(function(a){
                    return targetNode.ancestors.indexOf(a) < 0;
                });

                sourceAncestors.forEach(function(sourceAncestor){
                    targetAncestors.forEach(function(targetAncestor){
                        var targetLink = {source: sourceAncestor,
                            target:targetNode,
                            value:link.value,
                            id:sourceAncestor.id +"-"+targetNode.id};
                        links.push(targetLink);

                        var ancestorLink = {source: sourceAncestor,
                            target: targetAncestor,
                            value: link.value,
                            id: sourceAncestor.id + "-" + targetAncestor.id};
                        links.push(ancestorLink);
                    });
                });
            }
        }
    }

    // To reduce clutter in the diagram merge links that are from the
    // same source to the same target by creating a new link
    // with a value equal to the sum of the values of the merged links
    function mergeLinks() {
        var linkGroups = d3.nest()
            .key(function (link) { return link.source.id + "->" + link.target.id; })
            .entries(links)
            .map(function (object) { return object.values; });

        links = linkGroups.map(function (linkGroup) {
            return linkGroup.reduce(function (previousLink, currentLink) {
                return {
                    "source": previousLink.source,
                    "target": previousLink.target,
                    "id": d3.min([previousLink.id, currentLink.id]),
                    "value": previousLink.value + currentLink.value
                };
            });
        });
    }

    // Compute the value of each node by summing the associated links.
    // Compute the number of spaces between the links
    // Compute the number of source links for later decrementing
    function computeNodeValues() {
        nodes.forEach(function (node) {
            node.value = Math.max(
                d3.sum(node.leftLinks, value),
                d3.sum(node.rightLinks, value)
            );
            node.netFlow = d3.sum(visible(node.targetLinks), value) - d3.sum(visible(node.sourceLinks), value);
            node.linkSpaceCount = Math.max(Math.max(node.leftLinks.length, node.rightLinks.length) - 1, 0);
        });
    }

    function initializeConnectedNodes() {
        var sourceNode, targetNode;
        links.forEach(function (link) {
            sourceNode = link.source;
            targetNode = link.target;
            if (sourceNode.connectedNodes.indexOf(targetNode) < 0) {
                sourceNode.connectedNodes.push(targetNode);
            }
            if (targetNode.connectedNodes.indexOf(sourceNode) < 0) {
                targetNode.connectedNodes.push(sourceNode);
            }
        });
    }

    function compressInXDirection() {
        var connectedNodesXPositions,
            nodesByXPosition = d3.nest()
                .key(function (node) { return node.x; })
                .sortKeys(d3.ascending)
                .entries(nodes)
                .map(function (object) { return object.values; });

        nodesByXPosition.forEach(function (xnodes) {
            xnodes.forEach(function (node) {
                connectedNodesXPositions = node.connectedNodes.map(function (connectedNode) {
                    return connectedNode.x;
                });
                // keep decrementing the x value of the node
                // unless it would have the same x value as one of its source or target nodes
                // or node.x is already 0
                while (node.x > 0 && connectedNodesXPositions.indexOf(node.x - 1) < 0) {
                    node.x -= 1;
                }
            });
        });
    }

    function scaleNodeXPositions() {
        var minX = d3.min(nodes, function (node) { return node.x; }),
            maxX = d3.max(nodes, function (node) { return node.x; }) - minX;

        nodes.forEach(function (node) {
            node.x *= (size[0] - nodeWidth) / maxX;
        });
    }

    function computeNodeBreadths() {
        //position the parent nodes first, then inherit the x position of the parent to all children

        var remainingNodes,
            nextNodes,
            x = 0,
            filterLinks = function(link){
                return (!link.target.parent || link.target.parent == null);
            },
            addToNextNodes = function (link) {
                if (nextNodes.indexOf(link.target) < 0 && link.target.x === this.x) {
                    nextNodes.push(link.target);
                }
            },
            setValues = function (node) {
                node.x = x;
                node.width = nodeWidth;
                node.sourceLinks.filter(filterLinks).forEach(addToNextNodes, node);
            };

        remainingNodes = nodes.filter(parentNodeFilter);
        while (remainingNodes.length) {
            nextNodes = [];
            remainingNodes.forEach(setValues);
            if (nextNodes.length) {
                remainingNodes = nextNodes;
            } else {
                links.filter(filterLinks).filter(function (link) {
                        return link.target.x === link.source.x;
                        }).forEach(function (link) {
                            if (nextNodes.indexOf(link.target) < 0) {
                                nextNodes.push(link.target);
                            }
                        });
                remainingNodes = nextNodes;
            }
            x += 1;
        }

        compressInXDirection();
        scaleNodeXPositions();
        inheritBreadth();
    }

    function inheritBreadth(){
        var inherit = function(node){
            node.x = this.x;
            node.width = nodeWidth;
            if(node.children.length){
                node.children.forEach(inherit, node);
            }
        };

        nodes.filter(parentNodeFilter).forEach(function(parent){
            parent.children.forEach(inherit, parent);
        });
    }

    function computeLeftAndRightLinks() {
        var source, target;
        nodes.forEach(function (node) {
            node.rightLinks = [];
            node.leftLinks = [];
        });
        links.forEach(function (link) {
            source = link.source;
            target = link.target;
            if (source.x < target.x) {
                source.rightLinks.push(link);
                target.leftLinks.push(link);
                link.direction = 1;
            } else {
                source.leftLinks.push(link);
                target.rightLinks.push(link);
                link.direction = -1;
            }
        });
    }

    function adjustTop(adjustment) {
        nodes.forEach(function (node) {
            node.y -= adjustment;
        });
    }

    function calculateYScaleFactor(){
        var leafNodesByX = d3.nest()
            .key(function(node){return node.x;})
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function(object){return object.values;});

        var linkSpacesCount, nodeValueSum, discretionaryY;
        var min, max;

        var calc = function(nodes){
            linkSpacesCount = d3.sum(nodes, function (node) {
                return node.linkSpaceCount;
            });
            nodeValueSum = d3.sum(nodes, function (node) {
                return node.value;
            });
            discretionaryY = (size[1]
            - (nodes.length - 1) * nodeSpacing
            - linkSpacesCount * linkSpacing);

            return  discretionaryY / nodeValueSum;
        };

        min = Math.abs(d3.min(leafNodesByX,calc));
        //max = Math.abs(d3.max(leafNodesByX,calc));

        yScaleFactor = min;

    }

    function computeNodeDepth(iterations) {
        var minY,
            alpha,
            nodesByXPosition = d3.nest()
                .key(function (node) { return node.x; })
                .sortKeys(d3.ascending)
                .entries(nodes.filter(parentNodeFilter))
                .map(function (object) { return object.values; });

        function inheritPosition(){
            var inherit = function(node, idx, nodes){
                if(idx == 0){
                    node.y = this.y;
                }
                else{
                    node.y = nodes[idx-1].y + nodes[idx-1].height + nodeSpacing;
                }

                if(node.children.length){
                    node.children.forEach(inherit, node);
                }
            };

            nodesByXPosition.forEach(function(nodes){
                nodes.forEach(function(parent){
                    parent.children.forEach(inherit, parent);
                });
            });
        }

        function calculateHeight(node){
            if(node.children.length){
                node.children.forEach(calculateHeight);
                var childrenHeight = d3.sum(node.children, sumNodeHeight);
                node.height = childrenHeight + node.children.length * nodeSpacing;
            }else{
                var h = node.value * yScaleFactor;
                if(h < minHeight){
                    node.height = minHeight;
                }else {
                    node.height = node.value * yScaleFactor;
                }
            }
        }

        function initializeNodeYPosition() {
            nodesByXPosition.forEach(function (nodes) {
                nodes.forEach(function (node, i) {
                    node.y = i;
                    calculateHeight(node);
                });
            });
        }

        function calculateLinkThickness() {

            var scaleLinkValue = function(link){
                return link.value * yScaleFactor;
            };

            var min = d3.min(links,scaleLinkValue);
            var max = d3.max(links,scaleLinkValue);

            var scaleThickness = d3.scale.linear().domain([min,max]).range([minThickness,maxThickness]).clamp(true);

            links.forEach(function(link){
                link.thickness = scaleThickness(scaleLinkValue(link));
            });

        }

        function relaxLeftToRight(alpha) {
            function weightedSource(link) {
                return center(link.source) * link.value;
            }

            nodesByXPosition.forEach(function (nodes) {
                nodes.forEach(function (node) {
                    if (node.rightLinks.length) {
                        var y = d3.sum(node.rightLinks, weightedSource) / d3.sum(node.rightLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });
        }

        function relaxRightToLeft(alpha) {
            function weightedTarget(link) {
                return center(link.target) * link.value;
            }

            nodesByXPosition.slice().reverse().forEach(function (nodes) {
                nodes.forEach(function (node) {
                    if (node.leftLinks.length) {
                        var y = d3.sum(node.leftLinks, weightedTarget) / d3.sum(node.leftLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });
        }

        function ascendingYPosition(a, b) {
            return a.y - b.y;
        }

        function adjustSpacing(){
            nodesByXPosition.forEach(function(nodez){
               nodez.sort(ascendingYPosition);
               var sumNodeHeights = d3.sum(nodez,sumNodeHeight);
               var spacing = (size[1] - sumNodeHeights)/(nodez.length+1);

               nodez.forEach(function(node, idx){
                   node.y += spacing;
               });
            });
        }

        function resolveCollisions() {
            nodesByXPosition.forEach(function (nodes) {
                var node,
                    dy,
                    y0 = 0,
                    n = nodes.length,
                    i,
                    sumNodeHeights,
                    spacing;

                nodes.sort(ascendingYPosition);


                sumNodeHeights = d3.sum(nodes,sumNodeHeight);
                spacing = (size[1] - sumNodeHeights)/(nodes.length+1);

                // Push any overlapping nodes down.
                for (i = 0; i < n; ++i) {
                    node = nodes[i];
                    dy = y0 - node.y;
                    if (dy > 0) {
                        node.y += dy;
                    }
                    y0 = node.y + node.height + spacing;
                }

                // If the bottommost node goes outside the bounds, push it back up.
                dy = y0 - spacing - size[1];
                if (dy > 0) {
                    node.y -= dy;
                    y0 = node.y;

                    // Push any overlapping nodes back up.
                    for (i = n - 2; i >= 0; --i) {
                        node = nodes[i];
                        dy = node.y + node.height + spacing - y0;
                        if (dy > 0) {
                            node.y -= dy;
                        }
                        y0 = node.y;
                    }
                }
            });
        }


        calculateYScaleFactor();
        initializeNodeYPosition();
        calculateLinkThickness();
        resolveCollisions();

        for (alpha = 1; iterations > 0; --iterations) {
            relaxRightToLeft(alpha *= .99);
            resolveCollisions();
            relaxLeftToRight(alpha);
            resolveCollisions();
        }

        adjustSpacing();

        minY = d3.min(nodes, function (node) {
            return node.y;
        });
        adjustTop(minY);
        inheritPosition();
    }

    function computeLinkYPositions() {

        function ascendingLeftNodeYPosition(a, b) {
            var aLeftNode = (a.direction > 0) ? a.source : a.target,
                bLeftNode = (b.direction > 0) ? b.source : b.target;
            return aLeftNode.y - bLeftNode.y;
        }

        function ascendingRightNodeYPosition(a, b) {
            var aRightNode = (a.direction > 0) ? a.target : a.source,
                bRightNode = (b.direction > 0) ? b.target : b.source;
            return aRightNode.y - bRightNode.y;
        }

        nodes.forEach(function (node) {
            node.rightLinks.sort(ascendingRightNodeYPosition);
            node.leftLinks.sort(ascendingLeftNodeYPosition);
        });

        nodes.forEach(function (node) {
            var rightY = 0, leftY = 0;
            var spacingRight = linkSpacing, spacingLeft = linkSpacing;

            var visibleLinks = function(link){
                return (link.target.state === "collapsed" || link.source.state ==="collapsed")
            },

            spacingRight = node.height / node.rightLinks.filter(visibleLinks).length;
            spacingLeft = node.height / node.leftLinks.filter(visibleLinks).length;

            node.rightLinks.forEach(function (link) {
                if (link.direction > 0) {
                    link.sourceY = rightY;
                    if (link.target.state === "collapsed") {
                        rightY += link.thickness + spacingRight;
                    }
                }
                else {
                    link.targetY = rightY;
                    if (link.source.state === "collapsed") {
                        rightY += link.thickness + spacingRight;
                    }
                }
            });

            node.leftLinks.forEach(function (link) {

                if (link.direction < 0) {
                    link.sourceY = leftY;
                    if (link.target.state === "collapsed") {
                        leftY += link.thickness + spacingLeft;
                    }
                }
                else {
                    link.targetY = leftY;
                    if (link.source.state === "collapsed") {
                        leftY += link.thickness + spacingLeft;
                    }
                }
            });

        });
    }


    esbFlowSankey.arrowheadScaleFactor = function (_) {
        if (!arguments.length) { return arrowheadScaleFactor; }
        arrowheadScaleFactor = +_;
        return esbFlowSankey;
    };

    esbFlowSankey.collapsedNodes = function () {
        return nodes.filter(function (node) { return node.state === "collapsed"; });
    };

    esbFlowSankey.connected = function (nodeA, nodeB) {
        return nodeA.connectedNodes.indexOf(nodeB) >= 0;
    };

    esbFlowSankey.expandedNodes = function () {
        return nodes.filter(function (node) { return node.state === "expanded"; });
    };

    esbFlowSankey.layout = function (iterations) {
        computeNodeBreadths();
        computeLeftAndRightLinks();
        computeNodeValues();
        computeNodeDepth(iterations);
        computeNodeValues();
        computeLinkYPositions();
        return esbFlowSankey;
    };

    esbFlowSankey.link = function () {
        var curvature = defaultLinkCurvature;

        function leftToRightLink(link) {
            var arrowHeadLength = link.thickness * arrowheadScaleFactor,
                straightSectionLength = (3 * link.thickness / 4) - arrowHeadLength,
                x0 = link.source.x + link.source.width,
                x1 = x0 + arrowHeadLength / 2,
                x4 = link.target.x - straightSectionLength - arrowHeadLength,
                xi = d3.interpolateNumber(x0, x4),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = link.source.y + link.sourceY + link.thickness / 2,
                y1 = link.target.y + link.targetY + link.thickness / 2;
            return "M" + x0 + "," + y0
                + "L" + x1 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x4 + "," + y1
                + "L" + (x4 + straightSectionLength) + "," + y1;
        }

        function rightToLeftLink(link) {
            var arrowHeadLength = link.thickness * arrowheadScaleFactor,
                straightSectionLength = link.thickness / 4,
                x0 = link.source.x,
                x1 = x0 - arrowHeadLength / 2,
                x4 = link.target.x + link.target.width + straightSectionLength + arrowHeadLength,
                xi = d3.interpolateNumber(x0, x4),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = link.source.y + link.sourceY + link.thickness / 2,
                y1 = link.target.y + link.targetY + link.thickness / 2;
            return "M" + x0 + "," + y0
                + "L" + x1 + "," + y0
                + "C" + x2 + "," + y0
                + " " + x3 + "," + y1
                + " " + x4 + "," + y1
                + "L" + (x4 - straightSectionLength) + "," + y1;
        }

        function link(d) {
            if (d.source.x < d.target.x) {
                return leftToRightLink(d);
            }
            return rightToLeftLink(d);
        }

        link.curvature = function (_) {
            if (!arguments.length) { return curvature; }
            curvature = +_;
            return link;
        };

        return link;
    };

    esbFlowSankey.links = function (_) {
        if (!arguments.length) { return links; }
        links = _.filter(function (link) {
            return link.source !== link.target; // filter out links that go nowhere
        });
        return esbFlowSankey;
    };

    esbFlowSankey.linkSpacing = function (_) {
        if (!arguments.length) { return linkSpacing; }
        linkSpacing = +_;
        return esbFlowSankey;
    };

    esbFlowSankey.nodes = function (_) {
        if (!arguments.length) { return nodes; }
        nodes = _;
        return esbFlowSankey;
    };

    esbFlowSankey.savedLayout = function (_) {
        if(!arguments.length) {return positions;}
        positions = _;
        return esbFlowSankey;
    };

    esbFlowSankey.nodeWidth = function (_) {
        if (!arguments.length) { return nodeWidth; }
        nodeWidth = +_;
        return esbFlowSankey;
    };

    esbFlowSankey.nodeSpacing = function (_) {
        if (!arguments.length) { return nodeSpacing; }
        nodeSpacing = +_;
        return esbFlowSankey;
    };

    esbFlowSankey.relayout = function () {
        computeLeftAndRightLinks();
        computeNodeValues();
        computeLinkYPositions();
        return esbFlowSankey;
    };

    esbFlowSankey.size = function (_) {
        if (!arguments.length) { return size; }
        size = _;
        return esbFlowSankey;
    };

    esbFlowSankey.visibleLinks = function () {
        return visible(links);
    };

    esbFlowSankey.initialize = function (systems, callback) {
        systems.forEach(initializeSystem);
        initializeNodeMap();
        initializeLinkNodes();
        initializeNodeHierarchy();
        initializeAncestorLinks();
        mergeLinks();
        initializeNodeLinks();
        initializeConnectedNodes();
        nodes.forEach(callback);
        return esbFlowSankey;
    };

    return esbFlowSankey;
};
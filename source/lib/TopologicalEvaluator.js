/**
 * Created by Karl Moad on 5/9/16.
 * Systems define links between components within the ESB and depict the flow of information between each point,
 * as a result a message flow within the ESB must exist as a Directed Acyclic Graph of nodes.  Any cyclic references
 * will cause great issues throughout the system and must be identified for resolution either in code and/or configuration.
 * The TopologicalEvaluator class is designed to scan a systems structure (array of System objects) and determine the
 * existence of cyclic links using depth first search DFS methods. Any cyclic link found will be identified and
 * can be returned for correction.  Topographical order should be evaluated whenever a system is added to ESB configuration
 * if links are known, and/or once links are established via log analysis during the link identification process.
 *
 * Callback to all functions should utilize the predicate function(error, data) where error if not null will contain the error message 
 * and data if not null will contain the resulting data array
 */

module.exports = TopologicalEvaluator;

function TopologicalEvaluator(){
    var _nodes={};
    var _links=[];

    function evaluateGraph(graph){
        //get initial group of link nodes
        var data = locateZeroIndegrees(graph);

        while(data.queue.length > 0){
            decrementLinks(data.queue, graph);
            data = locateZeroIndegrees(graph);
        }
        return data.remaining <= 0;
    }

    function locateZeroIndegrees(graph){
        var output = {queue: [], remaining: 0};

        for(var node in graph){
            if(graph.hasOwnProperty(node)){
                if(typeof graph[node].indegree == 'number') {
                    if (graph[node].indegree == 0) {
                        output.queue.push(node);
                    } else {
                        if (graph[node].indegree > 0) {
                            output.remaining += 1;
                        }
                    }
                }
            }
        }

        return output;
    }

    function decrementLinks(queue, graph){
        queue.forEach(function(node){
            graph[node].indegree = 'X';  //set the indegree to something other than a number so it wont get picked up anymore
            for(var target in graph[node].targets){
                if(graph[node].targets.hasOwnProperty(target)) {
                    if(graph[target] && typeof graph[target].indegree == 'number')
                        graph[target].indegree -= 1;
                }
            }
        });
    }

    function bindLink(link, graph){
        if(link.source && link.target){
            var source = link.source.id.toString();
            var target = link.target.id.toString();

            if(!graph[source]){
                graph[source] = {indegree: 0,targets:{}};
            }

            if(!graph[target]){
                graph[target] = {indegree: 0,targets:{}};
            }

            if(!graph[source].targets[target]){
                graph[source].targets[target] = 'X';
            }

            //increment the target indegree
            graph[target].indegree += 1;
        }
    }

    function unionGroups(node1, node2){
        //really crap method but it works,  should determine depth and merge to the larger tree
        //revisit at a later point to implement
        node2.parent = node1;
    }

    function identifyNodes(start, end){
        var link={};
        link.source = findNode(start);
        link.target = findNode(end);
        if(!link.source || !link.target){
            throw "Null pointer exception";
        }
        return link;
    }

    function evaluateLink(link){
        var out = {result: false, source: null, target: null, link: link};
        if(link.source && link.target){
            out.source = findGroup(link.source);
            out.target = findGroup(link.target);
            if(out.source && out.target)
                out.result = !(out.source.id === out.target.id);
        }
        return out;
    }

    function loadEdges(){
        var graph = {};
        _links.forEach(function(link){
                bindLink(link, graph);
        });
        return graph;
    }


    // Use TCO optimization model to improve call stack usage
    function findGroup(node){
        function recur(n){
            if(n){
                if(_nodes[n.id].parent){
                    return findGroup(_nodes[n.id].parent);
                }else{
                    return n;
                }
            }
        }
        return recur(node);
    }

    function findNode(nodeid){
        var out = null;
        if(_nodes[nodeid]){
            out = _nodes[nodeid];
        }
        return out;
    }

    this.addLink = function(start, end){
        try {
            var data = evaluateLink(identifyNodes(start, end));
            if (data.result == true) {
                _links.push(data.link);
                unionGroups(data.source, data.target);
            }
            // else{
            //     console.log("Bad Link: Source:%s, Target:%s", link.source.id.toString(), link.target.id.toString());
            // }
            return data.result;
        }
        catch(e){
            console.log(e);
            return false;
        }
    };

    this.evaluate= function(){
        var graph = loadEdges();
        var acyclic = evaluateGraph(graph);
        if(acyclic){
            return true;
        }
        else{
            return false;
        }
    };

    this.addNode = function(node){
        _nodes[node.id] = {id: node.id};
    };
}






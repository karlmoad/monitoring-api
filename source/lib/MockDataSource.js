/**
 * Created by moadkj on 4/15/16.
 */
var uuid = require('node-uuid');
var util = require('util');
var moniker = require('moniker');
var evaluator = require("../lib/TopologicalEvaluator");
var eval = new evaluator();
var systems =[];
var links=[];
var alerts=[];
var receivers = [];
var transforms =[];
var senders = [];
var json="";

exports.initDataSource = function(){

    var min = 10;
    var max = 25;
    var numSystems = Math.floor(Math.random() * (30 - 20 + 1)) + 20;

    for(var i = 0; i< numSystems; i++) {
        var system = {
            id: uuid.v4(),
            name: "System" + i,
            createTime: new Date().getTime(),
            createBy: "MOCK_GENERATOR",
            void: false,
            voidBy: null,
            voidTime: null,
            flows: {send: [], transform: [], receive: []}
        };
        
        var numFlows = Math.floor(Math.random() * (max - min + 1)) + min;
        for (var sf = 0; sf <= numFlows; sf++) {
            var flow = {
                id: uuid.v4(),
                name: system.id + "Flow" + sf,
                objectName: moniker.choose(),
                system: system.id,
                createTime: new Date().getTime(),
                createBy: "MOCK_GENERATOR",
                void: false,
                voidBy: null,
                voidTime: null,
                links: {source: [], target: []},
                components: []
            };
            var numComponents = Math.floor(Math.random() * (max - min + 1)) + min;
            for (var fc = 0; fc <= numComponents; fc++) {
                var component = {
                    id: uuid.v4(),
                    name: system.id + flow.id + "Component" + fc,
                    objectName: moniker.choose(),
                    createTime: new Date().getTime(),
                    createBy: "MOCK_GENERATOR",
                    void: false,
                    voidBy: null,
                    voidTime: null,
                    flows: []
                };
                component.flows.push({flow: flow.id});
                flow.components.push(component);
            }

            var partition = Math.floor(Math.floor(Math.random() * 100) % 3);
            switch (partition) {
                case 0:
                    flow['type'] = "RECEIVER";
                    receivers.push(flow);
                    system.flows.receive.push(flow);
                    break;
                case 1:
                    flow['type'] = "SENDER";
                    senders.push(flow);
                    system.flows.send.push(flow);
                    break;
                default:
                    flow['type'] = "TRANSFORM";
                    transforms.push(flow);
                    system.flows.transform.push(flow);
                    break;
            }
        }
        systems.push(system);

        var flowtypes = ['send', 'transform', 'receive'];

        flowtypes.forEach(function(t){
            if(system.flows[t]){
                system.flows[t].forEach(function(flow){
                    eval.addNode(flow);
                });
            }
        });

    }

    //add links to the systems
    var t1 = [], t2=[];

    for(var x = 0; x<transforms.length; x++) {
        if(Math.floor(x%2) > 0){
            t2.push(transforms[x]);
        }else{
            t1.push(transforms[x]);
        }
    }
    
    var RandT = receivers.concat(t1);
    var SandT = senders.concat(t2);

    //Randomly assign links
    for(var l = 0; l < RandT.length; l++){
        var numOut = Math.floor(Math.random() * (4 - 1 + 1)) + 1

        //get a random receiver
        var start = RandT[l];

        for(var x = 0; x<numOut; x++) {
            var link;
            var node;
            //derive a links loop until all checks are clear
            var attempts = 0;
            while(attempts < 10) {
                while (true) {
                    // get a target
                    var tmp = SandT.pop();
                    SandT.unshift(tmp);
                    if (start.id !== tmp.id && start.system !== tmp.system) {
                        node = tmp;
                        break;
                    }
                }

                link = {
                    id: uuid.v4(),
                    startFlow: start.id,
                    startSys: start.system,
                    endFlow: node.id,
                    endSys: node.system
                };

                if(eval.addLink(link.startFlow, link.endFlow)){
                    links.push(link);
                    start.links.source.push(link);
                    node.links.target.push(link);
                    break;
                }
                ++attempts;
            }
        }
    }
    console.log("Link count: %d", links.length);
    console.log("Systems collection is acyclic:%s", eval.evaluate().toString());
    json = JSON.stringify(systems || {}, null, 2);
};

exports.getSystems = function(){
    return systems;
};

exports.addAlert = function(alert){
    alerts.push(alert);
};

exports.getAlerts = function(){
    return alerts;
};

exports.getJSON = function(){
    return json;
};



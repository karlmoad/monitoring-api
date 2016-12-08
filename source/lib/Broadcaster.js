
/**
 * Created by moadkj on 4/14/16.
 */

var callback = null;

exports.setCallback = function(cb){
    callback = cb;
    console.log("registered callback with broadcaster");
}

exports.emit = function(message){
    if(callback){
        callback(message);
        console.log("callback evoked with message");
    }
}







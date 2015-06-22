function input(id){
	var value = parseFloat($("#" + id).val())
	return value
}
//update the view
function upView(lsg){
    if(lsg.length >= 1){
	    for(var i = 1; i<10; i++)
		    $("#f" + i).html(lsg[0][i-1])
    
        for(var j=0; j < lsg.length; j++){
            $("#output").append("<tr><td>" + (j+1) + "</td><td>" 
            + lsg[j] + "</td></tr>");
        }

        $("#output").show();
            
        alert("fertig")
    }else{
        alert("keine Lösung");    
    }
}


function readInput(){
	var ops  = [],
    	inps = [];
		
	for(var i = 1; i<13; i++)
		ops.push($("#o"+i).val());
			
	for(var i = 1; i<7; i++)
		inps.push(input("i"+i));

    return [ops, inps];
}

function valid(liste, ops, inps){
	if(eval("(" + liste[0] + ops[0]  + liste[1] + ")" + ops[1]  + liste[2]) != inps[0])
		return 1;
	if(eval("(" + liste[3] + ops[5]  + liste[4] + ")" + ops[6]  + liste[5]) != inps[1])
		return 2; 
	if(eval("(" + liste[6] + ops[10] + liste[7] + ")" + ops[11] + liste[8]) != inps[2])
		return 3;
	if(eval("(" + liste[0] + ops[2]  + liste[3] + ")" + ops[7]  + liste[6]) != inps[5])
		return 4;
	if(eval("(" + liste[1] + ops[3]  + liste[4] + ")" + ops[8]  + liste[7]) != inps[4])
		return 5;
	if(eval("(" + liste[2] + ops[4]  + liste[5] + ")" + ops[9]  + liste[8]) != inps[3])
		return 6;
	return false;
}

function anagrams(s){
    if(s === ""){
        return [s];    
    }else{
        var ans = [],
            re  = anagrams( s.substring(1) );
        
        for(w in re){
            for(var pos=0; pos < re[w].length +1; pos++){
                ans.push( re[w].substring(0, pos) + s[0] 
                    + re[w].substring(pos, re[w].length))     
            }    
        }

        return ans;
    }
}


$(document).ready(function(){
    $("#output").hide();

	$("#run").click(function(){
        $("#output").hide();
		var re   = readInput(),
            ops  = re[0],
            inps = re[1];
        
        
        if(!!window.Worker){
            var worker = new Worker("worker.js");

            worker.onmessage = function(e){
                upView(e.data.result);
            };

            worker.postMessage({
                "inps" : inps,
                "ops"  : ops,
                "type" : "start"
            });
        }else{
            var erg     = anagrams("123456789"), 
                res     = [];

            for(var i=0; i < erg.length; i++){
                var tmp = valid(erg[i], ops, inps);
                if(tmp === false){
                    res.push(erg[i]);
                }else if(tmp === 1){
                    i += 700;
                }
            }

            upView(erg);
        }
    });
});

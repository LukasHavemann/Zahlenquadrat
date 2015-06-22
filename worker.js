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

onmessage = function(e){
    if ( e.data.type === "start" ) {
        var erg     = anagrams("123456789").sort(), 
            res     =[], 
            inps    = e.data.inps,
            ops     = e.data.ops; 

        for(var i=0; i < erg.length; i++){
            var tmp = valid(erg[i], ops, inps);
            if(tmp === false){
                res.push(erg[i]);
            }else if(tmp === 1){
                i += 719;
            }
        }

        postMessage({
            "result" : res,
        });    
    }
};




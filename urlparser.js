const urlParser = {
    _queryStr:()=>{
        let query = location.hash.slice(location.hash.indexOf('/')+1);
            query = query.replace('?',"")
                            .split(',');
        return query;
    },
    parse:()=>{
        if (location.hash){
            let hash, query;
            if (location.hash.includes('/')){
                let obj = urlParser._queryStr()
                            .reduce((accu, iter)=>{
                                if (iter){
                                    iter = iter.split('=');
                                    iter[0] = iter[0].replace('%20', "");
                                    iter[1] = iter[1].replace('%20', " ");
                                    accu[iter[0]] = iter[1];
                                }
                                return accu;
                            },{})
                hash=location.hash.slice(1,location.hash.indexOf('/'));
                query=obj;
            } else {
                hash = location.hash.slice(1);
                query = {};
            }
            return{
                hash,
                query,
            }
        } else {
            return false;
        }
    },
	query:()=>{
		let query = urlParser.parse().query;
		return {
			replace:(obj)=>{
				let str = '#'+urlParser.parse().hash+'/';
				for (let key in query){
					if (key in obj){
						query[key] = obj[key];   
					}
					str = str+`${key}=${query[key]},`
				}
				console.log(str)
				history.replaceState(null, null, str);		
			},			
			get:(key)=>{
				if (key){
					return urlParser.parse()['query'][key];
				} else {
					return urlParser.parse()['query'];
				}
			},
		}
	},
    replace:(hash)=>{
		location.replace(hash);  
		history.replaceState(null, null, hash);
    },
}

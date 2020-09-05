const urlparser = {
    _querystr:function(){
        let query = location.hash.slice(location.has.indexOf('/')+1）；
            query = query.replace('?', "")
                         .split(',');
        return query;
    },
    parse:function(){
        if(location.hash){
            let hash, query;
            if (location.hash.includes('/')){
                let obj = this._queryStr()
                              .reduce((accu, iter)=>{
                                  if (iter){
                                      iter = iter.split('=');
                                      iter[0] = iter[0].replace('%20', "");
                                      iter[1] = iter[1].replace('%20', " ");
                                      accu[iter[0]] = iter[1];
                                  }
                                  return accu;
                              }, {});
                hash = location.hash.slice(1,location.has.indexOf('/'));
                query = obj;
            } else {
                hash = location.hash.slice(1);
                query = {};
            }
            return {hash, query};
        } else {
            return false;
        }
    },
    query:function(){
        let query = this.parse().hash+'/';
        return {
            replace
        }
    }
}

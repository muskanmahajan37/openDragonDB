'use strict'

const temprc = (require('temprc')).temprc;

exports.base=function(parentIn){
    /*
     * @param {string}
     * @public
     * @return {string} || {bool}
    */
    this.search = function(name){
        return search(name);
    }

    /*
     * @public
     * @return {object}
     */
    this.command = function(data){
        if(3 > data.length)
             return help();
        switch (data[2]) {
            case 'a':
            case 'add':
                return commandAdd(data);
                break;
            case 'l':
            case 'list':
                return commandList();
                break;
            case 'd':
            case 'det':
                return commandDel(data);
                break;
            case 'g':
            case 'get':
                return commandGet(data);
                break;
            default:
                return help();
                break;
        }
    }
    /*
     * @param {array}
     * @private
     * @return {string}
     */
    const commandAdd = function(data){
        if(4 > data.length)
             return help();
        let id = search(data[4]);
        if ( id !== false)
            return (cn+" already exist \n");
        add(data[4]);
        return (cn+' '+data[4]+" added \n");
    }
    /*
     * @param {array}
     * @private
     * @return {string}
     */
    const commandGet = function(data){
        if(4 > data.length)
             return help();
        let id = search(data[4]);
        if ( id === false)
            return (cn+" not found \n");
        let details = get(id);
        return JSON.stringify(
            details,
            null,
            4
        );
    }
    /*
     * @param {array}
     * @private
     * @return {string}
     */
    const commandDel = function(data){
        if(4 > data.length)
             return help();
        if ( get(data[4]) === false)
            return (cn+" not found \n");
        del(data[4]);
        return (cn+' '+data[4]+" deleted \n");
    }
    /*
     * @private
     * @return {string}
     */
    const commandList = function(){
        return JSON.stringify(
            list(),
            null,
            4
        );

    }
    /*
     * @param {string}
     * @private
     * @return {string} || {bool}
     */
    let search = function(name){
        let list = DB.all();
        for(let i in list)
            if(list[i].name === name)
            return i;
        return false;

    }
    /*
     * @param {string}
     * @private
     * @return {string} || {bool}
     */
    let get = function(id){
        return DB.get(id);
    }
    /*
     * @param {string}
     * @private
     * @return {string} || {bool}
     */
    let del = function(id){
       if(DB.del(id))
           return true;
       return false;
    }
    /*
     * @param {string}
     * @private
     * @return {string} || {bool}
     */

    let list = function(type){
        if(typeof type === 'undefined')
            type = 'all';
        let out = [];
        let list = DB.all();
        for(let i in list)
            out.push(list[i].name+' '+list[i].type);
        return out;
    }
    /*
     * @param {string}
     * @param {string}
     * @private
     * @return {string} || {bool}
     */
    let add =function (type, name){
        let id = ((Math.floor(Math.random()*36).toString(36)+
            DB.size+
            (Math.floor(Math.random()*36).toString(36));
        let packet = ({
            "serial"   : DB.size, 
            "id"       : id,
            "name"     : name, // name
            "type"     : type, // type
            "hash"     : "" // hash
         });
         DB.add(
             id,
             packet
         );
         return true;
    }
    /*
     * @param {string}
     * @private
     * @return {boolean}
     */
    let typeCheck = function (type){
        if(types.indexOf(type) > -1 )
            return true;
        return false;
    }
    /*
     * @private
     * @var {array}
     */
    let types = [
        'html',
        'css',
        'svg',
        'js'
    ]
    /*
     * @private
     * @var {object}
     */
    let DB = new temprc(
        'od_db/files.json'
    );
    /*
     * @private
     * @return {string}
     */
    const help = function(){
        return ('db '+cn+' help \n');
    }
    /*
     * @private
     * @var {object}
    */
    const openDragonDb = parentIn;
    /*
     * @private
     * @var {string}
     */
    const cn = 'file';
}
function run(str){
    return str.match(/\d+/g).map(x => x * 1);
}

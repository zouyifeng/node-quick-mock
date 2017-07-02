var fs = require('fs')
const PROJECT_LIST = './json/projectList.json'
const PROJECT_DETAIL = './json/projectDetail.json'

/**
 * 创建多层目录
 * 
 * @param {any} url 
 * @param {any} mode 
 * @param {any} cb 
 */
var mkdirSync = (url, mode, cb) => {
    var path = require("path"),
        arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function () {};
    if (arr[0] === ".") { //处理 ./aaa
        arr.shift();
    }
    if (arr[0] == "..") { //处理 ../ddd/d
        arr.splice(0, 2, arr[0] + "/" + arr[1])
    }

    function inner(cur) {
        if (!fs.existsSync(cur)) { //不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if (arr.length) {
            inner(cur + "/" + arr.shift());
        } else {
            cb();
        }
    }
    arr.length && inner(arr.shift());
}

var getReadPromise = (file) => {
    return new Promise((resolve, reject) => {
		var ret = fs.readFileSync(file);
		ret ? resolve(ret) : reject(ret);
	});
}

var getProjectList = () => {
    return getReadPromise(PROJECT_LIST);
}

var getProjectDetail = () => {
    return getReadPromise(PROJECT_DETAIL);
}

var writeProjectList = (content) => {
    fs.writeFileSync(PROJECT_LIST, content);
}

var writeProjectDetail = (content) => {
    fs.writeFileSync(PROJECT_DETAIL, content);
}

var devareFolder = function(path) {

    var files = [];

    if( fs.existsSync(path) ) {

        files = fs.readdirSync(path);

        files.forEach(function(file,index){

            var curPath = path + "/" + file;

            if(fs.statSync(curPath).isDirectory()) { // recurse

                devareFolderRecursive(curPath);

            } else { // devare file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

};

module.exports = {
    mkdirSync,
    getReadPromise,
    devareFolder,
    getProjectDetail,
    getProjectList,
    writeProjectDetail,
    writeProjectList
}
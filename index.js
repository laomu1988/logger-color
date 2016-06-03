var colors = require('colors');
var dateFormat = require('dateformat');
var _levels = {
    'log': {level: 0, color: 'white'},
    'info': {level: 10, color: 'cyan'},
    'debug': {level: 20, color: 'blue'},
    'notice': {level: 30, color: 'magenta'},
    'warning': {level: 40, color: 'yellow'},
    'error': {level: 100, color: 'red'}
};
var _defaultLevel = 0;

for (var method in _levels) {
    _levels[method].method = method;
}
function CloneLevel(method) {
    var config = _levels[method];
    if (config) {
        return {
            level: config.level,
            color: config.color,
            method: method
        }
    } else {
        return null;
    }
}


function LoggerError(msg) {
    console.log(colors.red('Logger-Color: ', msg));
}


function Logger() {
    if (arguments.length < 1 || !this.color) {
        return;
    }
    if (this.level < _defaultLevel) {
        return;
    }
    if (!colors[this.color]) {
        LoggerError('Unknow Color "' + this.color + '');
        return;
    }
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift(dateFormat(Date.now(), 'hh:MM:ss : '));
    args.unshift(this.method.toUpperCase());
    if (process.stdout.write) {
        if (this.oneline !== true) {
            args.push('\n');
        }
        process.stdout.write(colors[this.color].apply(colors, args));
    }
    else {
        console.log(colors[this.color].apply(colors, args));
    }
}

var logger = {};
// 设置颜色
logger.setColor = function (method, color) {
    if (!_levels[method]) {
        logger.error('Unkown setColor method: ', method);
        return logger;
    }
    if (!colors[color]) {
        logger.error('Unkown setColor color: ', color);
        return logger;
    }
    _levels[method].color = color;
    return logger;
};

// 设置级别
logger.setLevel = function (level) {
    if (_levels[level]) {
        _defaultLevel = _levels[level].level;
    } else {
        LoggerError('Unkonw Level: ', level);
    }
};

// 各种输出函数
for (var method in _levels) {
    logger[method] = (function (method) {
        _levels[method]['method'] = method;
        return function () {
            Logger.apply(_levels[method], arguments);
        }
    })(method);
}

// line 单行输出
logger.line = function (method, msg) {
    var args = [];
    if (arguments.length > 1) {
        if (_levels[method]) {
            args = Array.prototype.slice.call(arguments, 1);
        } else {
            method = 'info';
            args = Array.prototype.slice.call(arguments, 0);
        }
    } else {
        args = Array.prototype.slice.call(arguments, 0);
        method = 'info';
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    var config = CloneLevel(method);
    if (config) {
        config.oneline = true;
        Logger.apply(config, args);
    }
};
// 清除使用logger.line输出的内容（注意不要带换行符）
logger.clearLine = function () {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
};
logger.lineEnd = function () {
    process.stdout.write('\n');
};

module.exports = logger;
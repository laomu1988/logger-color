var logger = require('../index.js');

logger.setLevel('log');
logger.setColor('notice', 'magenta');
logger.log(' Test Log');
logger.info(' Test Info');
logger.debug(' Test Debug');
logger.notice(' Test Notice');
logger.warning(' Test Info');
logger.error(' Test Info');

var time = "***";
var timer = setInterval(function () {
    time += '*';
    logger.line('notice', 'now process: ' + time);
    if (time.length > 100) {
        logger.lineEnd();
        logger.log('finish');
        clearInterval(timer);
    }
}, 100);

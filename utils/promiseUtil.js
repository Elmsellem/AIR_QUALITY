const promiseUtil = {
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = promiseUtil;

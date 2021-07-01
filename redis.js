let redisDb = {};
let log4js = require('log4js');
// log4js.configure('../config/log4j.json');
let logger = log4js.getLogger('redis');
let redis = require("redis");
let client = redis.createClient('6379', '127.0.0.1');

client.on('error',function (err) {
    logger.error('redis error：'+err);
});

client.on('connect',function () {
    logger.info('redis连接成功...')
});

/**
 *
 * @param dbNum 库号
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 * @param callback 回调
 */
redisDb.set = function (dbNum,key,value,expire,callback) {
    client.select(dbNum,function (err) {
        if (err){
            logger.error('redis set 选库失败：'+err);
        }else {
            client.set(key,value,function (err,result) {
                if (err){
                    logger.error('redis插入失败：'+err);
                    callback(err,null);
                    return
                }
                if (!isNaN(expire) && expire>0){
                    client.expire(key, parseInt(expire));
                }
                callback(null,result);
            })
        }

    })
}

redisDb.setList = function (dbNum,key,value,expire,callback) {
  client.select(dbNum,function (err) {
      if (err){
          logger.error('redis set 选库失败：'+err);
      }else {
          client.send_command('lpush',[key,value],function (err,result) {
              if (err){
                  logger.error('redis插入失败：'+err);
                  callback(err,null);
                  return
              }
              if (!isNaN(expire) && expire>0){
                  client.expire(key, parseInt(expire));
              }
              callback(null,result);
          })
      }
  })
}

redisDb.get = function (dbNum,key,callback) {
    client.select(dbNum,function (err) {
        if (err){
            logger.error('redis get 选库失败：'+err)
        }else {
            client.get(key,function (err,result) {
                if (err){
                    logger.error('redis获取失败：'+err)
                    callback(err,null);
                    return
                }
                callback(null,result);
            })
        }
    })
}

module.exports = redisDb
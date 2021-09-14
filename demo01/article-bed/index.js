// 查看版本 mongod --version

// 启动和停止 MongoDB

  // 启动：mongod --dbpath="存储数据的目录"  默认端口 27017
  // 如果单独执行 mongod 默认存储目录为mongod命令所处磁盘根目录/data/db

// 连接 MongoDB 服务
  // mongo

// 命令
  // show dbs  查看数据库列表
  // db        当前所在的数据库
  // use database 进库,切换
  // use database 创建数据 创建数据库
  // show collections  查看数据库的中集合
  // db.dropDatabase() 删除数据库



// 退出
// exit  
// quit
// Ctrl + C


// 查询全部 db.collections.find()
// 查询部分字段,key为你要查询的字段 db.collections.find({}，{key: 1})
// 条件查询，例如查询age为20的数据 db.collections.find({age:20})

/**
 * OR 条件查询
 * db.collections.find({
 *  $or: [
 *    ....你的查询条件
 * ]
 * })
 * */

/**
 *  OR AND 查询
 * db.collections.find({
 *  ... and 查询条件
 * $or:[
 *  ....or 查询条件
 * ]
 * })
 *
 * */

/**
 *  查询运算操作符
 * $eq 匹配等于指定的值
 * $gt 匹配大于指定的值
 * $get 大于或等于
 * $in  匹配数组中指定的任何值
 * $lt 小于
 * $lte 小于或等于
 * $ne 匹配所有不等于指定值的值
 * $min 不匹配数组中指定的值
 *
 * db.collections.find({
 *  age: {
 *      $lt: 80,
 *      $get: 18
 *  }
 * })
 *
 * */

// $and $not $nor $or  逻辑运算符

/**
 *  嵌套文档查询
 *  {
 *    size: {h: 14, w: 21, uom: 'cm'}
 *  }
 * 
 *  db.collections.find({
 *    size: {h: 14, w: 21, uom: 'cm'}
 *  })
 * */ 

/**
 *  嵌套字段查询
 *  {
 *    size: {h: 14, w: 21, uom: 'cm'}
 *  }
 * 
 *  db.collections.find({
 *    "size.uom": "cm"
 *  })
 * */ 


/**
 *  嵌套字段运算符查询
 *  {
 *    size: {h: 14, w: 21, uom: 'cm'}
 *  }
 * 
 *  db.collections.find({
 *    "size.h": {$lt: 15}
 *  })
 * */ 

/**
 *  删除集合 db.collections.drop()
 * */ 

/**
 *  数组集合查询 $all, 查询tags数组，只要包含 red blank 即可
 *  db.collections.find({
 *    tags:{ $all: ["red","blank"]}  
 *  })
 * 
 * */ 

/**
 *  数组集合查询 查询tags 数组中包含 red
 *  db.collections.find({
 *    tags:"red"  
 *  })
 * 
 * */ 
const arr = [
  {
    item: 'journal', instock: [{warehouse:"A",qty: 5}]
  },
  {
    item: 'notebook', instock: [{warehouse:"C",qty: 5}]
  },
  {
    item: 'paper', instock: [{warehouse:"A",qty: 60},{warehouse:"B",qty: 60}]
  }
]
//db.arr.find({"instock.qty":{$lte:20}}) 查找每项中 instock中每项的qty 小于等于 20
//db.arr.find({'instock.0.qty':{$lte:20}}) 查找每项中 instock中下标为0的每项的qty 小于等于 20
//db.arr.find({"instock":{$elemMatch:{qty:5,warehouse:"A"}}}) 查询数组中每项至少包含字段qty等于5和warehouse等于A

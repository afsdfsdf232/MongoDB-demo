// 文档更新操作

// $set 不存在会创建该字字段

// 单个文档更新 
// db.collection.updateOne()
// eg: 
db.collection.updateOne(
  {
    item:"paper" // 条件, 会更新满足条件的第一个文档
  },{
  $set: { // 修改字段
    "size.uom":"cm",
    status: "p"
  },
  $currentDate: { // 更新时间
    lastModified: true
  }
})

// 更新多个文档 更新数量小于50的所有文档
db.collection.updateMany(
  {
    item:"paper" // 条件
  },{
  $set: { // 修改字段
    "size.uom":"cm",
    status: "p"
  },
  $currentDate: { // 更新时间
    lastModified: true
  }
})

// 替换文档
db.collection.replaceOne({
  item: 'paper'
},{
  item:'paper',
  instock: [{
    warehouse:"A"
  }]
})

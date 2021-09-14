const { MongoClient } = require('mongodb')

const client = new MongoClient('mongodb://127.0.0.1:27017',{
  useUnifiedTopology: true
})

async function run() {
  try{
    // 开始连接
    await client.connect()
    // 连接数据库
    const testDb = client.db('arr')
    // 连接你的集合
    const arrCollection = testDb.collection('arr')
    // 插叙文档
    const res = await arrCollection.find()
    
    // 删除文档
    // const res = await arrCollection.deleteMany({})
  
    // 插入文档
    // const res = await arrCollection.insertMany({})
    
    // 更新文档
    // const res = await arrCollection.updateMany({},{})
    
    console.log('result:', await res.toArray())
  } catch(err) {
    console.log('err:', err)
  } finally{
   await client.close()
  }
}
run()

const { ObjectID } = require('bson')
const express = require('express')
const { MongoClient } = require('mongodb')
const connectUri = 'mongodb://localhost:27017'
const dbClient = new MongoClient(connectUri)
const app = express()
// 配置解析请求体数据 application/json
// 它会把解析到的请求数据放到 req.body 中
// 注意：一定要在使用前就挂载这个中间件
app.use(express.json())

app.get('/', (req, res) => {
  res.end('hello word')
})

app.post('/articles', async (req, res, next) => {
  // 1. 获取客户端表单数据
  try {
    const { article } = req.body;
    article.createdAt = new Date()
    article.updatedAt = new Date()
    // 2. 验证数据合法性
    if (!article || !article.title || !article.body) {
      res.status(422).json({
        error: '请求参数不正确'
      })
    }
    // 3. 把验证通过的数据插入数据库
    // 创建链接
    await dbClient.connect()
    //  创建数据库和集合
    const collection = dbClient.db('test').collection('articles')
    const ret = await collection.insertOne(article)
    // 4. 成功 -> 发送成功响应
    // 5. 失败 -> 发送失败响应
    article._id = ret.insertedId
    res.status(201).json({
      article
    })
  } catch (err) {
    next(err) // 错误处理中间件

  }
})
app.get('/articles', async (req, res, next) => {
  try {
    const { _page = 1, _size = 10 } = req.query
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const ret = await collection
      .find() // 查询数据
      .skip((_page - 1) * _size) // 跳过多少条
      .limit(Number(_size)) // 拿多少
    const articles = await ret.toArray()
    // 总数量
    const articlesCount = await collection.countDocuments()
    res.status(200).json({
      articles,
      articlesCount
    })
  } catch (err) {
    next(err)
  }
})
app.patch('/articles/:id', async (req, res, next) => {
  // 更新文章
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    collection.updateOne({
      _id: ObjectID(req.params.id)
    }, {
      $set: req.body.article
    })
    const article = await collection.findOne({_id: ObjectID(req.params.id)})
    res.status(201).json(article)
  } catch (err) {
    next(err)
  }
})
app.get('/articles/:id', async (req,res,next)=> {
  try {
    await dbClient.connect()
    const collection = dbClient.db('test').collection('articles')
    const article = await collection.findOne({_id: ObjectID(req.params.id)})
    res.status(201).json(article)
  } catch(err) {
    next(err)
  }
})
app.use((err, req, res, next) => {
  // 之前路由中调用 next(err) 会进入该处理函数
  //  注意： 4个参数缺一不可, 否则不会当成错误中间件处理，会当成普通中间件处理
  res.status(500).json({
    message: err.message
  })
})
app.listen(3000, () => {
  console.log('app启动成功')
})

const HomeService = require('../service/home');
const fs = require('fs');
const path = require('path');
const { getAllCustomers,getCustomerById,getCustomerByName,createCustomer,updateCustomer,deleteCustomer } = require('../database/api/Customer')

module.exports = {
  customerRegister: async(ctx,next) => {
    ctx.status = 200;
    ctx.type = 'htmlMIME';
    ctx.body = `<form action="/customer" method="POST">
      <input type="text" name="name" placeholder="name"/><br/>
      <input type="text" name="sex" placeholder="sex" /><br/>
      <input type="text" name="address" placeholder="address" /><br/>
      <input type="email" name="email" placeholder="email" /><br/>
      <input type="number" name="phone" placeholder="phone" /><br/>
      <input type="text" name="country" placeholder="country" /><br/>
      <input type="text" name="city" placeholder="city" /><br/>
      <input type="text" name="fullAddress" placeholder="city" /><br/>
      <input type="submit" value="提交"/>
    </form>`
  },
  deleteCustomer: async(ctx,next) => {
    await deleteCustomer(ctx.params.id);
    ctx.type = 'jsonMIME';
    ctx.body = {
      status: 0
    }
  },
  modifyCustomer: async(ctx,next) => {
    const id = context.params.id;
    const customer = ctx.body;
    await updateCustomer(id,customer);
    ctx.type = 'jsonMIME';
    ctx.body = {
      status: 0
    }
  },
  createCustomer: async(ctx, next) => {
    const customer = ctx.request.body;
    console.log('添加客户: ',customer)
    await createCustomer(customer);
    ctx.type = 'jsonMIME';
    ctx.body = {
      status: 0
    }
  },
  customerByName: async(ctx, next) => {
    const customer = await getCustomerByName(ctx.params.name);
    ctx.type = 'jsonMIME';
    ctx.body = {
      status: 0,
      data: customer
    }
  },
  customerById: async(ctx, next) => {
    const customer = await getCustomerById(ctx.params.id);
    ctx.type = 'jsonMIME';
    ctx.body = {
      status: 0,
      data: customer
    }
  },
  customer: async(ctx, next) => {
    const customers = await getAllCustomers();
    ctx.type = 'jsonMIME';
    ctx.body = {
      status: 0,
      data: customers
    }
  },
  index: async(ctx, next) => {
    await ctx.render("home/index", {title: "iKcamp欢迎您"})
  },
  home: async(ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  },
  homeParams: async(ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  },
  login: async(ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  register: async(ctx, next) => {
    let params = ctx.request.body
    let name = params.name
    let password = params.password
    let res = await HomeService.register(name,password)
    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  },
  apis: async(ctx,next) => {
    // 处理ajax
    ctx.send({
      name: '凡凡',
      age: '22',
      sex: 'male',
      job: 'developer'
    })
  },
  upload: async (ctx,next) => {
    ctx.response.body = `
    <! DOCTYPE html> 
    <html lang="en">
    <head> 
    <meta charset="UTF-8">
    <title>文件上传</title> 
    </head> 
    <body> 
    <form method="post" action="/profile" enctype="multipart/form-data" >选择图片<input name="avatar" id="upfile" type="file"/>
    <input type="submit" value="上传" />
    </form> 
    </body> 
    </html>
    `
  },
  profile: async (ctx,next) => {
    console.log(ctx.req.file); // 原生req对象上
    const {
      originalname,
      path: out_path,
      mimetype
    } = ctx.req.file;
    let newName = out_path + path.parse(originalname).ext; // 添加后缀名
    let err = fs.renameSync(out_path,newName); // 重命名
    let result;
    if (err) {
      result = JSON.stringify(err);
    }else{
      result = `<h1>图片上传成功!</h1>`
    }
    ctx.response.body = result;
  }
}
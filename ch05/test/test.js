// 单元测试
const { assert } = require('chai');  // 测试驱动开发,是直接执行的函数
const foo = 'bar';
describe('String', () => {
    it('foo 应该是一个字符串',()=>{
        assert.typeOf(foo,'string');
    })
})

// const beverages = { tea: ['chai','matcha','oolong'] };
// assert.typeOf(foo,'string'); // 数据类型
// assert.typeOf(foo,'string','foo is sting');
// assert.equal(foo,'bar','foo equal bar');
// assert.lengthOf(foo,3,'foo is value has a length of 3');
// assert.lengthOf(beverages.tea,3,'');


// const { expect } = require('chai');  // expect 是一种 BDD 风格的断言,更接近自然语言,是一种链式断言
// const foo = 'bar';
// const beverages = { tea: ['chai','matcha','oolong'] };
// expect(foo).to.be.a(string);


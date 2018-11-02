const fs        = require('fs');
const path      = require('path');
const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');

const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

const fn = {
    // 类型判断
    // 数组
    'isarray': Array.isArray || function (target) {
        return toString.call(target) === '[object Array]';
    },
    // 类数组
    isarraylike(target) {
        let len = target && target.length;
        return len && typeof len === 'number' && len >= 0 && len <= MAX_ARRAY_INDEX;
    },
    isboolean(target) {
        return target === true || target === false || toString.call(target) === '[object Boolean]';
    },
    isdate(target) {
        return toString.call(target) === '[object Date]';
    },
    isnumber(target) {
        return typeof (target) === 'number';
    },
    isstring(target) {
        return typeof (target) === 'string';
    },
    isfunction(target) {
        return typeof (target) === 'function';
    },
    // 普通对象
    isobject(target) {
        return typeof (target) === 'object';
    },
    // 键值对象
    isplainobject(target) {
        return target && fn.isobject(target) && Object.getPrototypeOf(target) === Object.prototype;
    },
    // 去掉字符串前后空格
    trim(str) {
        return typeof str.trim !== 'undefined' ? str.trim() : str.replace(/(^\s*)|(\s*$)/g, '');
    },
    // 判断某值是否存在于对象类型数组的某属性
    hasvalue(obj, key, value) {
        let res = false;
        fn.each(obj, (item) => {
            if (item[key] && item[key] === value) {
                res = true;
                return false;
            }
        });
        return res;
    },
    // 判断对象是否包含某直接属性（非原型）
    haskey(obj, key) {
        return obj !== null && hasOwnProperty.call(obj, key);
    },
    // 获取对象所有属性名
    allkeys(obj) {
        if (!fn.isobject(obj)) {
            return [];
        }
        let keys = [], key;
        for (key in obj) {
            keys.push(key);
        }
        return keys;
    },
    // 获取对象自有属性名（不包含原型属性）
    keys(obj) {
        if (!fn.isobject(obj)) {
            return [];
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        let keys = [], key;
        for (key in obj) {
            if (fn.haskey(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    },
    // 获取对象自有属性值（数组）
    values(obj) {
        let keys = fn.keys(obj),
            len = keys.length,
            i = 0,
            arr = Array(len);

        for (; i < len; i++) {
            arr[i] = obj[ keys[i] ];
        }
        return arr;
    },
    // 对象属性扩展覆盖（同jQuery/Angularjs）
    // 放弃使用Object.assign, 因为Object.assign只能覆盖一层，不能深度扩展
    // return Object.assign.apply( (arguments.length > 0 ? arguments[0] : this), arguments);
    'extend': function (/* isdeep, */ obj) {
        let len = arguments.length, idx = 1, isdeep = false;
        if (len < 2 || obj === null) {
            return obj;
        }
        if (fn.isboolean(arguments[0])) {
            isdeep = arguments[0];
            obj = arguments[1];
            idx++;
        }
        let source, keys, proplen, i, key, iscopyarr, clone;
        for (; idx < len; idx++) {                                        // 多对象
            source = arguments[idx];                                    // 扩展目标对象
            keys = fn.allkeys(source);
            proplen = keys.length;
            for (i = 0; i < proplen; i++) {
                key = keys[i];
                if (source[key] === obj) {                            // 防止引用对象包含关系，导致死循环
                    continue;
                }
                if (isdeep && (fn.isplainobject(source[key]) || (iscopyarr = fn.isarray(source[key])))) {
                    if (iscopyarr) {
                        iscopyarr = false;
                        clone = obj[key] && fn.isarray(obj[key]) ? obj[key] : [];
                    } else {
                        clone = obj[key] && fn.isPlainObject(obj[key]) ? obj[key] : {};
                    }
                    obj[key] = fn.extend(isdeep, clone, source[key]);
                } else if (typeof source[key] !== 'undefined') {
                    obj[key] = source[key];
                }
            }
        }
        return obj;
    },
    // 拷贝
    copy(target, isdeep = true) {
        let clone;
        if (fn.isarray(target)) {
            clone = [];
        } else {
            clone = {};
        }
        return fn.extend(isdeep, clone, target);
    },
    // 遍历工具，dataset可以是数组和对象
    // 回调函数 handler( item, index|key, dataset);
    // break----用return false;
    // continue --用return ture;
    each(dataset, handler, context) {
        let callback = typeof context === 'undefined' ? handler : function (value, index, collection) {
            return handler.call(context, value, index, collection);
        };
        let i, len, res;
        if (fn.isarraylike(dataset)) {                                   // 类数组
            i = 0;
            len = dataset.length;
            for (; i < len; i++) {
                res = callback(dataset[i], i, dataset);
                if (res === false) {
                    break;
                } else if (res === true) {
                    continue;
                }
            }
        } else {                                                            // 键值对象
            let keys = fn.keys(dataset);
            i = 0;
            len = keys.length;
            for (; i < len; i++) {
                res = callback(dataset[keys[i]], keys[i], dataset);
                if (res === false) {
                    break;
                } else if (res === true) {
                    continue;
                }
            }
        }
        return dataset;
    }
};


const CONSOLESTYLE = {
    'Reset': '\x1b[0m',
    'Bright': '\x1b[1m',              // 高亮
    'Dim': '\x1b[2m',
    'Underscore': '\x1b[4m',
    'Blink': '\x1b[5m',
    'Reverse': '\x1b[7m',
    'Hidden': '\x1b[8m',

    'Black': '\x1b[30m',
    'Red': '\x1b[31m',
    'Green': '\x1b[32m',
    'Yellow': '\x1b[33m',
    'Blue': '\x1b[34m',
    'Magenta': '\x1b[35m',
    'Cyan': '\x1b[36m',
    'White': '\x1b[37m',

    'BgBlack': '\x1b[40m',
    'BgRed': '\x1b[41m',
    'BgGreen': '\x1b[42m',
    'BgYellow': '\x1b[43m',
    'BgBlue': '\x1b[44m',
    'BgMagenta': '\x1b[45m',
    'BgCyan': '\x1b[46m',
    'BgWhite': '\x1b[47m'
};
fn.extend(fn, {
    'fs':           fs,
    'path':         path,
    'mongoose':     mongoose,
    'bcrypt':       bcrypt,
    'rootpath':     path.join(__dirname, '../'),                  // 项目根目录
    'logStyle':     CONSOLESTYLE
});
fn.extend(fn, {
    require(userpath) {
        if (userpath.indexOf('/') === 0) {                  // 绝对路径引入
            userpath = path.join(fn.rootpath, userpath);
        }
        // fn.log(userpath);
        try {
            return require(userpath);
        } catch (err) {
            throw new Error('tools.require 文档引用中异常: ' + userpath + '\n\n' + err);
        }
    },
    log(content, styles) {
        if (styles) {
            if (fn.isarray(styles)) {
                styles = styles.join('');
            }
            console.log(styles + '%s' + CONSOLESTYLE.Reset, content);
        } else {
            console.log(CONSOLESTYLE.Reset + '%s', content);
        }
    },
    msg(content) {
        fn.log(content, [fn.logStyle.Blue]);
    },
    error(content) {
        fn.log(content, [fn.logStyle.BgRed]);
    },
    // 生成salt并获取hash值
    async bcrypt(password) {
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        return hash;
    },
    // 检查数据库里的密码和用户输入的密码是否匹配,hash(password)为数据库里存储的密码
    async bcryptCompare(password, hash) {
        let res = await bcrypt.compareSync(password, hash);
        return res;
    }
});

module.exports = fn;

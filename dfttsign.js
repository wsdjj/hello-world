/*
 @𝐃𝐃   
=========================================
邀请码 092014876
群友需要 写的毛不大 
=========================================
说明:
东方头条APP 签到可以获得金币 兑换现金
圈x获取不到ck就把body改成header
⚠️5个ck 签到记录 首页置顶视频 阅读新闻 视频奖励 小视频奖励 
⚠️阅读新闻 视频奖励 小视频奖励 这3个需要在body那里改1,2,3获取 看下面说明
定时建议10分钟左右自己设置
本人用的是2.6.3版本有视频奖励和小视频奖励
最新版没有 如果你用的版本有那就把209行到214行禁用取消
=========================================
一共5个cookie 
=========================================
surge:本地
签到获取ck
东方头条APP = type=http-request,pattern=^https:\/\/.+dftoutiao\.com\/*,requires-body=1,max-size=0,script-path=dfttsign.js
=========================================
圈x:本地
签到获取ck
^https:\/\/.+dftoutiao\.com\/* url script-request-body dfttsign.js
 
=========================================
loon:本地
签到获取ck
http-request ^https:\/\/.+dftoutiao\.com\/* script-path=dfttsign.js, requires-body=true, timeout=10, tag=东方头条APP
=========================================
小火箭:本地
签到获取ck
东方头条APP = type=http-request,script-path=dfttsign.js,pattern=^https:\/\/.+dftoutiao\.com\/*,max-size=131072,requires-body=true,timeout=10,enable=true
MITM= *.dftoutiao.com
=========================================
*/







const DD ='东方头条APP';

const $ = new Env(DD);
$.idx = ($.idx = ($.getval('dfttSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符

const logs=0;//设置0关闭日志,1开启日志

const log=0;//0关闭系统日志,1开启系统日志,和系统通知不要一起打开,关闭系统通知就要打开,系统日志

//let noNolog = ($.getval('noNolog') || '1');//1为所有通知 2为11小时通知一次 3为3小时通知一次 4为5小时通知一下

const noNolog = 1;//1为所有通知 2为11小时通知一次 3为3小时通知一次 4为5小时通知一次


const body = 0;//1为新闻阅读,2为视频,3为小视频



let dd = "" //

let score = ''
let scores = ''
let scorer = ''

let times = new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false});

let Time = new Date(
  new Date().getTime() +
  new Date().getTimezoneOffset() * 60 * 1000 +
  8 * 60 * 60 * 1000 );

const dftoutiaoheaderArr = [];
const dftoutiaobodyArr = [];
const dftoubodyArr = [];
const YuedutimerbodyArr = [];
const YuedutimebodyArr = [];
const YuedutimesbodyArr = [];
const bonusodyArr = [];




//let dftoutiaoheader = $.getdata('dftoutiaoheader');
let dftoutiaoheader = '{"Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Connection":"keep-alive","Content-Type":"application/x-www-form-urlencoded","Host":"task-center.dftoutiao.com","User-Agent":"DFTT/2.6.3 (iPhone; iOS 13.4.1; Scale/2.00)","Content-Length":"516","Accept-Language":"zh-Hans-CN;q=1"}'

let dftoutiaobody = $.getdata('dftoutiaobody');
//let dftoubody = $.getdata('dftoubody');
let dftoubody = 'accid=867336742&androidId=93659E7A-792B-42D5-BFD2-EF38E9D133B7&city=%E5%98%89%E5%85%B4%E5%B8%82&cqid=AppStore&device=iPhone%2011&device_brand=null&ime=90E29C52-8E19-4525-9129-BA485D54D2D0&iswifi=wifi&lt=UmtQS0NRaWhGdUR5eURYNWh6Ym5HMUNUdWNPTzBhUkw2U0hxK0xvYnhKRlI4L05HMEk5T2dEM0p6aGhPV0cyNnp4VGVzVGtKRkc2VDlCaVdoaDZ0N2c9PQ%3D%3D&mobile=13586387669&oem=DFTT&os=ios&os_version=iOS%2013.4.1&phonenum=13586387669&position=%E6%B5%99%E6%B1%9F&qid=AppStore210208&softname=DFTTIOS&softtype=TouTiao&ttaccid=867336742&ver=2.6.3'


//let Yuedutimerbody = $.getdata('Yuedutimerbody');
let Yuedutimerbody = 'params=H0QHGzkHERoCAFZeRCAbKicMAh1HWEYWGwc2BwwMHEdORoDB7bnC%2BkFeRwAXRE5WbkVUUUVSR11QTFZzUQQAEQwQRlxMQmhAVlVFUUZIRAAHAAAAEQQABkZcVlZzUQwQBQwSDUROVigaAwpQSVYICBNWZVFUUUJLQlxXQERsS1dVRldFXERYVjwaERpQX1aB/v2R2seA2/BHWEYXHRB9SUciAhUnEAkGEW1CVVFCXVZIRBcALFFfQUNTRVZRQ0dmRV1BXkcbF0ROVjYcFkFeRwcJIhECNhAAKhZHTkZUREZvQ1NRRFRAUVdFRG0QAwFKBxdcBRBBahYEBRMHTFEFQ0VpRVQFRQQQXAUSRG5EUlcTB0xWXxIWOUZWBVBJVgUWBAU2F0dZUCQEFDUAGy0WV1JCV0RcRFhWLBwDFxwEGQFETlYbNTE3OyonRkpWGCtRX0EnCAA1NUQ6DRIyCzUBITZTESENKis0GlMtCVM8OQo9MAclKyQwHDYcChgSUSdVHBwtRAwpKgsLOTcYLVI4RGo7KCYZUCBWAjE5bwNTAjUNJDJWFw0RHwZRPA5FVwMsIgUnIBM3AR4IMy0ZbkUBUBlWJiIjTSQOTlhBXkcaCwIRB31JRzgJOVYRFBgSLRwIP1BfKEYSGwErGgQMLkdYOEQADS8WOUFIOVYKAwMHA1FJP1AQBggSGyh9STlBGhEAFFwoKANcOT8uShlVSAAAcRALPy45WwkJFh0zFjk/LkpGVVZGRGdCU1FKUEFTV01aNwcIDy5HWDhEGhs7FjlBSFREGUoPKH0GFw8UFxsJOlZOA1ERDAcRHQUJKFZzL0cXCxUROEROKH0dABQBOVZIOlYBLR8RDC5HTjhEHAArA18/LjlbODooWzJCSxcGSxcKOigocB4KARsJETg6KFttQlVRQl1FUlRMQWpEVFpcDQAJCihWcy9HDR0BEThETkZvDkkYLkcBFgoSBjAeOUFIOVYQCQEANhIKP1BJKEYSDQQ6L0dZLkcaAREHKH1fOUEHFxgQCShWZS9HCwYRBF46KChwLzk/XQhFShIAWjwdOT8uShkLBB0YOi85P11XRVRURExuRVdbR1BDVV9aHCseCT9QSShGCBsQOi9HWUFVCUgdKFYqAQkFAAoZOEROKH0HChYGDBULOlZYA1ERGgIAKEZcKFYxFhIQLkdYOEQBBjMHCj9QXyhGDgAAL0k5Py5KKDg6WxluXREXXAYaODooWzIcBwoeACg4OltGbkNXU0pUQlZeQUFoQlxNGhEZCDpWWANRCwwWAChGXEBEIl8eP1AQBggABhsyL0dZLkcACxMAHT4cOUFeOVYQHwQRA1FfP1ALERMVKFZzL0cWAAkACzpWTgNRDRcGFU44OihbAy85TB9UWhASWhcxLzk/XQgbBg8YEQMvOUxAVERWVkxFaUFRU0tRQlRIHAAyHzlBXjlWCgkQEQNRX1ZCGClGSlYCOgFHWVBXWlJIQFZzUQoGH0dORiIyIAtRSUEGDBkBFCsAJgMAQUhHGgERBysrGggGAEdYRgkHKykWFxAbChpGXFYdECBFUkFLQEpXVlh9HwQXUF9WV1ZaQGZFXFNKVURSVkJFakBHT1AEBBQSDQQ6GgFBSEcwIjIgVnNRDA4XR05GX0QxbUomVkBITCFXTVlrRldWX1xFVl9ZNh5HXVY2UEAgVDBEfV9HAAMMEEZcVjUvAzYXHRcRRkpWFj4AABAGBAANCRpWZVELFh4JVkhEFRo7AQoKFiwQRlxWTWxFUFo3UjVJUU1GHV5RUTZQWSYgMEZyNiNQSiBNIFdHRx1ER09QARESDxcRfUlHCiINGwoDVEVuURg%3D'

let Yuedutimebody = $.getdata('Yuedutimebody');
let Yuedutimesbody = $.getdata('Yuedutimesbody');

//let bonusody = $.getdata('bonusody');
let bonusody = 'appqid=AppStore210208&apptypeid=DFTT&appver=020604&basestation=null&deviceid=93659E7A-792B-42D5-BFD2-EF38E9D133B7&id=3&ime=90E29C52-8E19-4525-9129-BA485D54D2D0&lat=30.49681630562134&lng=120.6814880887537&lt=UmtQS0NRaWhGdUR5eURYNWh6Ym5HMUNUdWNPTzBhUkw2U0hxK0xvYnhKRlI4L05HMEk5T2dEM0p6aGhPV0cyNjF5bmVkZTU1MjBXdTg5MjdLVmVNTHc9PQ%3D%3D&os=iOS%2013.4.1&softname=DFTTIOS&softtype=TouTiao&ver=2.6.4'



dftoutiaoheaderArr.push('{"Accept":"*/*","Accept-Encoding":"gzip, deflate, br","Connection":"keep-alive","Content-Type":"application/x-www-form-urlencoded","Host":"task-center.dftoutiao.com","User-Agent":"DFTT/2.6.3 (iPhone; iOS 13.4.1; Scale/2.00)","Content-Length":"516","Accept-Language":"zh-Hans-CN;q=1"}')
dftoutiaobodyArr.push($.getdata("dftoutiaobody"));
 
dftoubodyArr.push('accid=867336742&androidId=93659E7A-792B-42D5-BFD2-EF38E9D133B7&city=%E5%98%89%E5%85%B4%E5%B8%82&cqid=AppStore&device=iPhone%2011&device_brand=null&ime=90E29C52-8E19-4525-9129-BA485D54D2D0&iswifi=wifi&lt=UmtQS0NRaWhGdUR5eURYNWh6Ym5HMUNUdWNPTzBhUkw2U0hxK0xvYnhKRlI4L05HMEk5T2dEM0p6aGhPV0cyNnp4VGVzVGtKRkc2VDlCaVdoaDZ0N2c9PQ%3D%3D&mobile=13586387669&oem=DFTT&os=ios&os_version=iOS%2013.4.1&phonenum=13586387669&position=%E6%B5%99%E6%B1%9F&qid=AppStore210208&softname=DFTTIOS&softtype=TouTiao&ttaccid=867336742&ver=2.6.3')

YuedutimerbodyArr.push('params=H0QHGzkHERoCAFZeRCAbKicMAh1HWEYWGwc2BwwMHEdORoDB7bnC%2BkFeRwAXRE5WbkVUUUVSR11QTFZzUQQAEQwQRlxMQmhAVlVFUUZIRAAHAAAAEQQABkZcVlZzUQwQBQwSDUROVigaAwpQSVYICBNWZVFUUUJLQlxXQERsS1dVRldFXERYVjwaERpQX1aB/v2R2seA2/BHWEYXHRB9SUciAhUnEAkGEW1CVVFCXVZIRBcALFFfQUNTRVZRQ0dmRV1BXkcbF0ROVjYcFkFeRwcJIhECNhAAKhZHTkZUREZvQ1NRRFRAUVdFRG0QAwFKBxdcBRBBahYEBRMHTFEFQ0VpRVQFRQQQXAUSRG5EUlcTB0xWXxIWOUZWBVBJVgUWBAU2F0dZUCQEFDUAGy0WV1JCV0RcRFhWLBwDFxwEGQFETlYbNTE3OyonRkpWGCtRX0EnCAA1NUQ6DRIyCzUBITZTESENKis0GlMtCVM8OQo9MAclKyQwHDYcChgSUSdVHBwtRAwpKgsLOTcYLVI4RGo7KCYZUCBWAjE5bwNTAjUNJDJWFw0RHwZRPA5FVwMsIgUnIBM3AR4IMy0ZbkUBUBlWJiIjTSQOTlhBXkcaCwIRB31JRzgJOVYRFBgSLRwIP1BfKEYSGwErGgQMLkdYOEQADS8WOUFIOVYKAwMHA1FJP1AQBggSGyh9STlBGhEAFFwoKANcOT8uShlVSAAAcRALPy45WwkJFh0zFjk/LkpGVVZGRGdCU1FKUEFTV01aNwcIDy5HWDhEGhs7FjlBSFREGUoPKH0GFw8UFxsJOlZOA1ERDAcRHQUJKFZzL0cXCxUROEROKH0dABQBOVZIOlYBLR8RDC5HTjhEHAArA18/LjlbODooWzJCSxcGSxcKOigocB4KARsJETg6KFttQlVRQl1FUlRMQWpEVFpcDQAJCihWcy9HDR0BEThETkZvDkkYLkcBFgoSBjAeOUFIOVYQCQEANhIKP1BJKEYSDQQ6L0dZLkcaAREHKH1fOUEHFxgQCShWZS9HCwYRBF46KChwLzk/XQhFShIAWjwdOT8uShkLBB0YOi85P11XRVRURExuRVdbR1BDVV9aHCseCT9QSShGCBsQOi9HWUFVCUgdKFYqAQkFAAoZOEROKH0HChYGDBULOlZYA1ERGgIAKEZcKFYxFhIQLkdYOEQBBjMHCj9QXyhGDgAAL0k5Py5KKDg6WxluXREXXAYaODooWzIcBwoeACg4OltGbkNXU0pUQlZeQUFoQlxNGhEZCDpWWANRCwwWAChGXEBEIl8eP1AQBggABhsyL0dZLkcACxMAHT4cOUFeOVYQHwQRA1FfP1ALERMVKFZzL0cWAAkACzpWTgNRDRcGFU44OihbAy85TB9UWhASWhcxLzk/XQgbBg8YEQMvOUxAVERWVkxFaUFRU0tRQlRIHAAyHzlBXjlWCgkQEQNRX1ZCGClGSlYCOgFHWVBXWlJIQFZzUQoGH0dORiIyIAtRSUEGDBkBFCsAJgMAQUhHGgERBysrGggGAEdYRgkHKykWFxAbChpGXFYdECBFUkFLQEpXVlh9HwQXUF9WV1ZaQGZFXFNKVURSVkJFakBHT1AEBBQSDQQ6GgFBSEcwIjIgVnNRDA4XR05GX0QxbUomVkBITCFXTVlrRldWX1xFVl9ZNh5HXVY2UEAgVDBEfV9HAAMMEEZcVjUvAzYXHRcRRkpWFj4AABAGBAANCRpWZVELFh4JVkhEFRo7AQoKFiwQRlxWTWxFUFo3UjVJUU1GHV5RUTZQWSYgMEZyNiNQSiBNIFdHRx1ER09QARESDxcRfUlHCiINGwoDVEVuURg%3D')

YuedutimebodyArr.push($.getdata("Yuedutimebody"));
YuedutimesbodyArr.push($.getdata("Yuedutimesbody"));
                              
bonusodyArr.push('appqid=AppStore210208&apptypeid=DFTT&appver=020604&basestation=null&deviceid=93659E7A-792B-42D5-BFD2-EF38E9D133B7&id=3&ime=90E29C52-8E19-4525-9129-BA485D54D2D0&lat=30.49681630562134&lng=120.6814880887537&lt=UmtQS0NRaWhGdUR5eURYNWh6Ym5HMUNUdWNPTzBhUkw2U0hxK0xvYnhKRlI4L05HMEk5T2dEM0p6aGhPV0cyNjF5bmVkZTU1MjBXdTg5MjdLVmVNTHc9PQ%3D%3D&os=iOS%2013.4.1&softname=DFTTIOS&softtype=TouTiao&ver=2.6.4') 


 // boxjs中设置多账号数

  let dfttCount = ($.getval('dfttCount') || '1') - 0;
  for (let i = 2; i <= dfttCount; i++) {
    if ($.getdata(`dftoutiaoheader${i}`)) {	
dftoutiaoheaderArr.push($.getdata(`dftoutiaoheader${i}`));

dftoutiaobodyArr.push($.getdata(`dftoutiaobody${i}`));

dftoubodyArr.push($.getdata(`dftoubody${i}`));
YuedutimerbodyArr.push($.getdata(`Yuedutimerbody${i}`));

YuedutimebodyArr.push($.getdata(`Yuedutimebody${i}`));
YuedutimesbodyArr.push($.getdata(`Yuedutimesbody${i}`));

bonusodyArr.push($.getdata(`bonusody${i}`));



    }
  }

!(async () => {
if (typeof $request != "undefined") {
    await dfttsign()
  } else{

if (!YuedutimerbodyArr[0]) {
    $.msg($.name, '运行前需要获取cookie点击前往\n', 'http://net.aalafmk.cn/vre9csd5/lp/oz7j7e69/b4.html?pVLB9MuDpQ=', {"open-url": "http://net.aalafmk.cn/vre9csd5/lp/oz7j7e69/b4.html?pVLB9MuDpQ="});
    return;
  } else {console.log(`\n************ 脚本共${YuedutimerbodyArr.length}个${$.name}账号  ************\n`
  );
  console.log(`\n============ 脚本执行时间(TM)：${new Date(new Date().getTime() + 0 * 60 * 60 * 1000).toLocaleString('zh', {hour12: false})}  =============\n`)}

  for (let i = 0; i < YuedutimerbodyArr.length; i++) {
if(YuedutimerbodyArr[i]){
    dftoutiaoheader = dftoutiaoheaderArr[i];
    dftoutiaobody = dftoutiaobodyArr[i];
    dftoubody = dftoubodyArr[i];
    Yuedutimerbody = YuedutimerbodyArr[i];
    Yuedutimebody = YuedutimebodyArr[i];
    Yuedutimesbody = YuedutimesbodyArr[i];
    bonusody = bonusodyArr[i];
    host=JSON.parse(dftoutiaoheader)["Host"];
     $.index = i + 1;
console.log(`\n开始执行【${$.name}${$.index}】\n`) 
    
}




    
    await $.wait(1200);
console.log(`开始执行阅读新闻任务时间:${times}`)
    await receive();
    //await $.wait(1200);
//console.log(`开始执行视频任务时间:${times}`)
    //await pros();
    //await $.wait(1200);
//console.log(`开始执行小视频任务时间:${times}`)
     //await yue();

await $.wait(1000);
console.log(`开始执行签到任务时间:${times}`)
    await update();
    await detail();
    await $.wait(1200);
console.log(`开始执行签到翻倍任务时间:${times}`)
    await gold();
    await $.wait(1200);
console.log(`开始执行首页置顶视频任务时间:${times}`)
    await bonus();
    await $.wait(1200);
console.log(`开始执行转盘查询任务时间:${times}`)
    await zhuanpan();
    await $.wait(1200);
console.log(`开始执行转盘奖励任务时间:${times}`)
    await zhuangold();
    await $.wait(1200);
console.log(`开始执行时段宝箱任务时间:${times}`)
    await award();
    await $.wait(1200);
console.log(`开始执行开宝箱任务时间:${times}`)
    await box();
    await $.wait(1200);
console.log(`开始执行查询账号信息时间:${times}`)
    await jinbi();
    await Msg();

}

}
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())



async function receive(){
   for(i = 0;i<3;i++){
  $.index = i + 1;
    await news(i)
}
$.log(`本次完成${$.index}次阅读,阅读结束\n`)
}


async function pros(){
   for(i = 0;i<3;i++){
  $.index = i + 1;
    await service(i)
}
$.log(`本次完成${$.index}次阅读,阅读结束\n`)
}


async function yue(){
   for(i = 0;i<3;i++){
  $.index = i + 1;
    await yuedu(i)
}
$.log(`本次完成${$.index}次阅读,阅读结束\n`)
}




function update(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let Url = {
        url : 'https://sign.dftoutiao.com/sign/news_take_s',
        headers : JSON.parse(dftoutiaoheader),
        body: Yuedutimerbody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.update = data;
       if($.update.status== true){
       dd+= "【每日签到】+"+$.update.bonus+"金币";
       $.log(`本次执行任务情况:获得${$.update.bonus}金币\n`);}
else{
     if($.update.status== false)
     dd+= "【每日签到】"+$.update.msg;
     $.log(`本次执行任务情况:${$.update.msg}\n`)
        }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}



function detail(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
 hosts = 'task-center.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : `https://task-center.dftoutiao.com/task/center/task_index`,
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.detail = data;
       if($.detail.code== 0)
      dd+= ":已签到"+$.detail.data.sign_info.total_signed+"天\n";
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}



function gold(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'sign2.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : 'https://sign2.dftoutiao.com/sign/sign_invideo/send_gold',
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.gold = data;
       if($.gold.code== 0){
       dd+= "【签到翻倍】+"+$.gold.data.bonus+"金币\n";
       $.log(`本次执行任务情况:获得${$.gold.data.bonus}金币\n`);}
else{
     if($.gold.code== -1)
     dd+= "【签到翻倍】"+$.gold.message+"\n";
     $.log(`本次执行任务情况:${$.gold.message}\n`)
       }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}






function news(i) {
  return new Promise((resolve) => {
   $.index = i + 1;
    setTimeout( ()=>{
hosts = 'yuedu4.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : `https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news`,
        headers : JSON.parse(dfheader),
        body: Yuedutimerbody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.news = data;
     if($.news.status== true){
   console.log('开始第'+(i+1)+'次阅读新闻+'+$.news.bonus+"金币,进度"+$.news.step+",请等待30s\n") 
     score = $.news.bonus;
    dd= "【阅读新闻】+" +score+"金币\n";}
else{
    if($.news.status== false)
console.log('阅读新闻:'+$.news.msg+'\n');
        }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },i*35000)
  })
}





function service(i) {
  return new Promise((resolve) => {
   $.index = i + 1;
    setTimeout( ()=>{
hosts = 'yuedu4.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : `https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news`,
        headers : JSON.parse(dfheader),
        body: Yuedutimebody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.news = data;
     if($.news.status== true){
   console.log('开始第'+(i+1)+'次阅读视频+'+$.news.bonus+"金币,进度"+$.news.step+",请等待30s\n") 
     scores = $.news.bonus;
    dd= "【阅读视频】+" +scores+"金币\n";}
else{
    if($.news.status== false)
console.log('阅读视频:'+$.news.msg+'\n');
        }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },i*35000)
  })
}





function yuedu(i) {
  return new Promise((resolve) => {
   $.index = i + 1;
    setTimeout( ()=>{
hosts = 'yuedu4.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : `https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news`,
        headers : JSON.parse(dfheader),
        body: Yuedutimesbody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.news = data;
     if($.news.status== true){
   console.log('开始第'+(i+1)+'次阅读小视频+'+$.news.bonus+"金币,进度"+$.news.step+",请等待30s\n") 
     scorer = $.news.bonus;
    dd+= "【阅读小视频】+" +scorer+"金币\n";}
else{
    if($.news.status== false)
console.log('阅读小视频:'+$.news.msg+'\n');
        }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },i*35000)
  })
}






 
function jinbi(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'wallet.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : `https://wallet.dftoutiao.com/get_balance/index_timer`,
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.jinbi = data;
if($.jinbi.code== 0)
dd+= "【账号金币】"+"约"+$.jinbi.data.money+"元"+",累计"+$.jinbi.data.bonus+"金币\n";
   $.log(`本次执行任务情况,约${$.jinbi.data.money}元,账号${$.jinbi.data.bonus}金币\n`)
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}






function award(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'timesaward.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : 'https://timesaward.dftoutiao.com/timesaward/timesaward/get_award',
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.award = data;
       if($.award.data.status== 1){
       dd+= "【首页时段】+"+$.award.data.coin+"金币\n";
       $.log(`本次执行任务情况:获得${$.award.data.coin}金币\n`);}
     else{
     if($.award.data.status== 2)
     dd+= "【首页时段】"+$.award.data.msg+"\n";
     $.log(`本次执行任务情况:${$.award.data.msg}\n`)
       }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}




function box(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'shoutu2.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : 'https://shoutu2.dftoutiao.com/invite/open_treasure_box',
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.box = data;
       if($.box.code== 0){
       dd+= "【开宝箱任务】+"+$.box.data.coin+"金币\n";
       $.log(`本次执行任务情况:获得${$.box.data.coin}金币\n`);}
     else{
     if($.box.code== -3)
     dd+= "【开宝箱任务】"+"时间未到\n";
     $.log(`本次执行任务情况:${$.box.message}\n`)
        }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}



function zhuanpan(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'zhuanpan.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : 'https://zhuanpan.dftoutiao.com/zhuanpan_v3/get_zhuanpan_new',
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.zhuanpan = data;
       if($.zhuanpan.code == 0){
       $.log(`本次执行任务情况:次数${$.zhuanpan.data.cur_num}/${$.zhuanpan.data.cur_tn},本场转盘时间${formatSeconds($.zhuanpan.data.cur_end_time)}\n`);}
     else{
     if($.zhuanpan.code== -202)
     dd+= "【幸运转盘】"+$.zhuanpan.message+"\n";
     $.log(`本次执行任务情况:${$.zhuanpan.message}\n`)
       }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}




function zhuangold(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'zhuanpan.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : 'https://zhuanpan.dftoutiao.com/zhuanpan_v3/get_gold',
        headers : JSON.parse(dfheader),
        body: dftoubody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.zhuanpan = data;
       if($.zhuanpan.code == 0){
       dd+= "【转盘奖励】+"+$.zhuanpan.data.gold+"金币\n";
       $.log(`本次执行任务情况:获得:${$.zhuanpan.data.gold}\n`);}
     else{
     if($.zhuanpan.code!= -301)
     dd+= "【转盘奖励】"+$.zhuanpan.message+"\n";
     $.log(`本次执行任务情况:${$.zhuanpan.message}\n`)
       }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}




function bonus(timeout=0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
hosts = 'adv-invedio.dftoutiao.com';
dfheader = dftoutiaoheader.replace(`${host}`,`${hosts}`);
      let Url = {
        url : 'https://adv-invedio.dftoutiao.com/adv/send_gold/bonus',
        headers : JSON.parse(dfheader),
        body: bonusody,
      }
      $.post(Url, async (err, resp, data) => {
        try {
          data = JSON.parse(data);
          if(logs==1)console.log(data)
          $.bonus = data;
       if($.bonus.code == 0){
       dd+= "【首页置顶视频】+"+$.bonus.data.bonus+"金币\n";
       $.log(`本次执行任务情况:获得:${$.bonus.data.bonus}\n`);}
     else{
     if($.bonus.code== -2)
     dd+= "【首页置顶视频】"+$.bonus.message+"\n";
     $.log(`本次执行任务情况:${$.bonus.message}\n`)
        }
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}



function Msg() {

if(log==1)console.log(`\n==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3==============\n${$.name}\n${dd}`);


 if(noNolog==1){
 $.msg($.name,"",`${dd}`);}




if(noNolog == 2 && (Time.getHours() == 11 || Time.getHours() == 23 ) && (Time.getMinutes() >=0 && Time.getMinutes() <=5)){ 
 $.msg($.name,"",dd);}


if(noNolog==3 && (Time.getHours() == 0 || Time.getHours() == 3 || Time.getHours() == 6 || Time.getHours() == 9 || Time.getHours() == 12 || Time.getHours() == 15 || Time.getHours() == 18 || Time.getHours() == 21 ) && (Time.getMinutes() >=0 && Time.getMinutes() <=5)){ 
 $.msg($.name,"",dd);

}

if(noNolog==4 && (Time.getHours() == 0 || Time.getHours() == 5 || Time.getHours() == 10 || Time.getHours() == 15 || Time.getHours() == 20 ) && (Time.getMinutes() >=0 && Time.getMinutes() <=5)){ 
 $.msg($.name,"",dd);
}


}









function dfttsign() {


if ($request.url.indexOf("news_take_s") > 0) {
    
 
const dftoutiaobody = $request.body;
if(dftoutiaobody)
    $.setdata(dftoutiaobody,"dftoutiaobody" + $.idx);
 $.msg($.name + $.idx,"","[获取签到数据]✅成功");}


if ($request.url.indexOf("task/center/task_index") > 0) {

const dftoutiaoheader = JSON.stringify($request.headers);
if(dftoutiaoheader)
$.setdata(dftoutiaoheader,"dftoutiaoheader" + $.idx);

const dftoubody = $request.body;
if(dftoubody)
    $.setdata(dftoubody,"dftoubody" + $.idx);
 $.msg($.name + $.idx,"","[获取签到记录数据]✅成功");}


if (body == 1){
 if ($request.url.indexOf("index/Yuedutimer/read_news") > 0) {
const Yuedutimerbody = $request.body;
if(Yuedutimerbody)
    $.setdata(Yuedutimerbody,"Yuedutimerbody" + $.idx);
 $.msg($.name + $.idx,"","[获取阅读新闻数据]✅成功");}
}


if (body == 2){
if ($request.url.indexOf("index/Yuedutimer/read_news") > 0) {
 
const Yuedutimebody = $request.body;
if(Yuedutimebody)
    $.setdata(Yuedutimebody,"Yuedutimebody" + $.idx);
 $.msg($.name + $.idx,"","[获取视频数据]✅成功");}
}

if (body == 3){
if ($request.url.indexOf("index/Yuedutimer/read_news") > 0) {
 
const Yuedutimesbody = $request.body;
if(Yuedutimesbody)
    $.setdata(Yuedutimesbody,"Yuedutimesbody" + $.idx);
 $.msg($.name + $.idx,"","[获取小视频数据]✅成功");}
}


if ($request.url.indexOf("send_gold/bonus") > 0) {
 
const bonusody = $request.body;
if(bonusody)
    $.setdata(bonusody,"bonusody" + $.idx);
 $.msg($.name + $.idx,"","[获取首页置顶视频数据]✅成功");}



}








function
formatSeconds(value) {
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
 
    let res = '';
    if(h !== '00') res += `${h}小时`;
    if(m !== '00') res += `${m}分`;
    res += `${s}秒`;
    return res;
  }























function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

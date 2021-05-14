/*
软件名称:动物研究院 (越狱可多开)
更新时间：2021-05-13 @肥皂
脚本说明：动物研究院自动刷红包。。
玩法和食材大冲关一样。先把食材大冲关的视频重写关了。。。
第一天有三块左右吧。抓包后重新登录后要重新抓包。登录信息会过期。提现手动吧。带了验证码没法。

动物研究院使用方法:
1-世界红包群领取一个红包,观看广告结束获得视频数据。
2-领取红包获得红包数据。

注意事项。如果不能获取视频数据只能多试试了。进任务红包领取或者家族群都视频。不行就退了游戏再打开

商店搜索不到。自己复制链接跳转吧。
https://apps.apple.com/cn/app/%E5%8A%A8%E7%89%A9%E7%A0%94%E7%A9%B6%E9%99%A2/id1566693411

本脚本以学习为主

TG通知群:https://t.me/Ariszy_Scripts
TG电报交流群: https://t.me/hahaha8028

boxjs地址 :  

https://raw.githubusercontent.com/age174/-/main/feizao.box.json

动物研究院
圈X配置如下，其他软件自行测试
[task_local]
#动物研究院
10 9 * * * https://raw.githubusercontent.com/age174/-/main/dwyjy.js, tag=动物研究院, img-url=https://ae01.alicdn.com/kf/Uc740cff52d1c48c49223a8a7378a54d1q.jpg, enabled=true

[rewrite_local]
#动物研究院视频
https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/ url script-request-body https://raw.githubusercontent.com/age174/-/main/dwyjy.js
#动物研究院红包
https://zoon.renyouwangluo.cn/api/redbag/normal url script-request-body https://raw.githubusercontent.com/age174/-/main/dwyjy.js

[MITM]
hostname = zoon.renyouwangluo.cn,api-access.pangolin-sdk-toutiao.com

*/
const $ = new Env('动物研究院');
let status;
status = (status = ($.getval("dwyjystatus") || "1") ) > 1 ? `${status}` : ""; // 账号扩展字符
const dwyjyhdArr = [],dwyjybodyArr = [],dwyjyspbodyArr = [],dwyjycount = ''
let dwyjyhd = $.getdata('dwyjyhd')
let dwyjybody = $.getdata('dwyjybody')
let dwyjyspbody = $.getdata('dwyjyspbody')
const sphd = {
'Accept' : `*/*`,
'Accept-Encoding' : `gzip, deflate, br`,
'Connection' : `keep-alive`,
'Content-Type' : `application/json`,
'Host' : `api-access.pangolin-sdk-toutiao.com`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148`,
'Accept-Language' : `zh-Hans-CN;q=1`
};
!(async () => {
	$.setdata('{"message":"3L5aiY0hJrnbarFLkbHda6ok8BkSjupCrDTDsATL16NpPviuvWpLUi1lOrvDNPjxNKPuuLqUITpvpR7cX9q2J34C+o9beWdituanFuEboHe28zdQN9W+gyTztknWu6llak2fv5jAXPEZninrxQV7U8qg8yH2M6dTCNzkDNeGyIT4zt9mKDYeK0+41uFjD2Ir9pfWLFOem6+XIdnZryCO3qJQwqz35h12O0PtvU53LkDXCy78xrygvsm+0ZlsXvmET+v0c3AnAxa6Q7P4hpXFSNrLbhJ7kDO7pFO78aUL2LhunZz1J6TZSHoueBjy7tHm\/U4U0Fw3k\/OzNvOH3BCfkKpqm8eWsDoDleT36CehPK0VkEP6ivoSdyiCLc3eyBNezclpPvErT+zRsnKBqZcy0J3yxR2YcNNKlsH4cF7eRXI+UM4BaqUQwgyWCVu8yB9wF9QVOgyY6eYOMaxU+tF2OepR\/I7zYQOQcZWR3NhRp4Gy70Fg7LaC6QXIyEjC8Hp8ld4J\/RsQ7Vj6BJZONx2EHJFSHmzDlqYviA3PKzl+E07aRDUrcALKgQC0k+D0fojjtHuSaf\/tR36qXq\/Ppu2wUD2wGArMEcNjc1Z5Zf7cRP3GsCOqlr6mEwIFMcWuluBhiQwlLLh2mO0mJrHSo45XHaxxQkDgagaztfGZdpxU3HyAOpeMeq1Oqf9YTbGf1idwltsA1nR16fwHYKZvvBRKpSUeoVhuXFREMS6yZep4Pvp1w425hC8dS3BziIKrb8SZv8K64JKan93zVJto1xjwehP8eQ7I7rQSlNwaIm+KUV8MrRhaiDEuetoxJeIEvVNCVDlAFFDzwQeZphBeQmG3kS\/Ha0+woQMhIcqTH4KDpXO2LCk0J4G1j1MYs8qE0l\/QB\/iCU5IkqrZR27KT+SgugeyyJUKKF\/TkJ3lXONLat8nwJChrz7NG5PtTUPF0cRP39eugwkXC4jkGGeBtrH\/WVG8qpGDI5cfJNn+w\/dTN3xXZbKxqfSZFqrnLVfBBV7A8dpECIGICOMqflSPysa8X6z7MILjcfJ4C8C9XvSBqe0Bk4w4z\/\/CLm9zLWWFFMlVTcW1q9nPVaWkwr1b69ygg+fC5D8hO+Gjn42R\/gLJYvkE71hDsvVBDkrOVj\/2RFgO8VM3b2opkk50TbJyV\/gUSimG5p1JYLV2n99A8xCUtdZT9dwpyUU0jqJ9rvdmRl\/al8QVwv2ikCELOD3iuiAMwQ9R+znGDSc2+Yfe7kfHrYEAGda7Y5QQ33ZLg3ChPknpD5dHUerCHQKBQFwZL\/woZv7MJycCYtfUxlOeGgdiadcWQEkd5fjmK4+4QgVsk5XhId0A8MBgU4sWVCq1KPba3U+Xm7o84Um4iLa2oQFzPDwuTplxhaijLBmynZ82rvdiT\/GqZ+Yqybx+AYK8l6dQKpqJ5nlraHRujAZFqDNhN9c9cH4g4ncuA90Ky3WfaunLIJbBZc4TKYB2UAbWamB28QA1z8DQ1Bemo5cN9wxDdWhNUyRx9KXTh8ugPBDV5JN\/GPMykwWfh\/lDDzdypTDilIgnlLynQ\/tU2aXVKoa8DEoYrm3szcqvz20VR1TPt6OQDW2rkNkDb8A0wmWxd+xYMwETNaDA\/ccG+ArXzSTwu2nvFvBe+UYhxqJK60X5TsuXpCjNiZnXHCVgM\/AdGo58HmkKEjRDGmvVc\/BKix+Bt\/wKmJd2R+vhV\/2xvDSh1\/rx3Y5w8MK4OxWdI4f\/h4hrk8gzLhlfm+DzWNs2\/tv9MlrJdv5Q3LeZwrliPR6oeEqyNMTA03U0p3TNz21\/hNFHNkfkW7tHR4JpqwAV7oli7MQ\/Bx+03a+y+ylcdq+E+xOVbffMeUZnuIhGmV6+vQfIVTKsjWyvmAmx1aSlPMLyigBr+sQVf2pmwiV3oz+m3Eg1CiU6PaqQsOo7T0z3zXDcqqKVq4TDxZ8xyQLDBObYzAS3fCsnya4ZgfFT4oVyCzk2UZqLAbkEOre3lgnoJhASkexMW7HRf31KuX4wT40L5Eql1ml+JVIWZPtvzJXzU0hkleImezHc7sJIdvTZDMrmDoTwgPGxCu97sji8q4VGr8VD3vPN8BwFFEDpOjWQKZ7CwaVsTXEf0UQV3Nm\/rcCww8gsRiSzSNaxkBS3GNOBwtAvh0+3gWQ2SUgJy8LGlZqP4fdjUJ5ORl5H0gqfa9SLumRR72C+07zsLe\/DcJpNcvG4G8iXtDxEn9t75B\/cpbNFnkdySpZ3dcJiuysgFJXNNgWnLOiU4FDVvXoO8d18WM98rgf3ghoGC9uMjf6DKNVXtfSuoZ1fvob1fcJcuzukmIJ96NSZylhkTV4tHw1wCtesx83uYZoNiuBGbMVIaEKQpIDV\/YDSx5ujkipHThnCNKBfxhrPibm5wrBLqEuP4LW\/taX90a3yT0juBxPTRfJ9aTPokCG4ZpNRRcitAsJq5K7jtd8s1Ea4BPhRnByrpJHIWSMpVck1buy1bj6n2XOAuOpnv5m+CZ4DjJpem6VUlFKT+UPW3XUJ+eeeG6tWyGAR3mNplkZeggt2PW0hojzlME67znX4NpLlY7lLOGLM9pTKBKjU6AZCadeYA2crHq69wzbDYrmLesOtF4wxCXKrG6HzdapkJtz6Vyuxwv5F5bfi34IacWBX3wfKI2HZ3yfqXGp8oDhPrqSg\/3VwNZWh8pEP3X12AO3citXZxIEJ8WLRImF8bx0eVIVZP7X2NaCG9LTC+1\/cXB4a1O1uQ8ofXOBKQWZx\/gijL4D1xjXGuhKnWm7hr0osiNcYEDBm2DxRickGsTqxOFA0Xh5QHtn8yINGZSuwNIOqqo5neduKE\/\/FchmS1TezJ1Dtsr\/oOGiIwSktzWlP1fwMYm27NpCPGqQV4Nmhpu58o5ZfcSaiql9f6\/o0XO7rDBbTNZRmB6y+D9fV7vYLswEZob58zhCaThU83aVYKUMkliDhMlC4pHJAACqznsf\/oOdoZYuvEvBWnPWzLQvdEJYH48KzMlRSkluLpT5QIt5bO\/jfXCOnFFPWr3Rr8eApBU5MpLF8z7R9g6OmRTemSD2a5uiIdUz2pAE12eQllCuL\/Y6DXT7SSF3gkT6Xv3Qa\/icFmqyYOJpMtECvkdQ4v0FagChRELd\/dp5WqqXbkvZuRs+KJDRZ29zqP60s8=","cypher":3}',`dwyjyspbody${status}`)
  if (typeof $request !== "undefined") {
    await dwyjyck()
   
  } else {
    dwyjyhdArr.push($.getdata('dwyjyhd'))
    dwyjybodyArr.push($.getdata('dwyjybody'))
    dwyjyspbodyArr.push($.getdata('dwyjyspbody'))
    let dwyjycount = ($.getval('dwyjycount') || '1');
  for (let i = 2; i <= dwyjycount; i++) {
    dwyjyhdArr.push($.getdata(`dwyjyhd${i}`))
    dwyjybodyArr.push($.getdata(`dwyjybody${i}`))
    dwyjyspbodyArr.push($.getdata(`dwyjyspbody${i}`))
  }
    console.log(`------------- 共${dwyjyhdArr.length}个账号-------------\n`)
      for (let i = 0; i < dwyjyhdArr.length; i++) {
        if (dwyjyhdArr[i]) {
          dwyjyhd = dwyjyhdArr[i];
          dwyjybody = dwyjybodyArr[i];
          dwyjyspbody = dwyjyspbodyArr[i];
          $.index = i + 1;
          console.log(`\n开始【动物研究院${$.index}】`)
   
    
         await dwyjysp();
         

    
    
  }
}}

})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
//数据获取


function dwyjyck() {
   if ($request.url.indexOf("normal") > -1) {
 
  const dwyjyhd = JSON.stringify($request.headers)
        if(dwyjyhd)    $.setdata(dwyjyhd,`dwyjyhd${status}`)
$.log(dwyjyhd)
const dwyjybody = $request.body
        if(dwyjybody)    $.setdata(dwyjybody,`dwyjybody${status}`)
$.log(dwyjybody)
   $.msg($.name,"",'动物研究院'+`${status}` +'红包数据获取成功！')
  }else if ($request.url.indexOf("reward_video/reward/") > -1) {
 
const dwyjyspbody = $request.body
        if(dwyjyspbody)    $.setdata(dwyjyspbody,`dwyjyspbody${status}`)
$.log(dwyjyspbody)
   $.msg($.name,"",'动物研究院'+`${status}` +'视频数据获取成功！')
  }
}

//红包
function dwyjyhb(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://zoon.renyouwangluo.cn/api/redbag/normal',
        headers : JSON.parse(dwyjyhd),
        body : dwyjybody,
}
      $.post(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.code == 1){
  $.log(`\n动物研究院:成功领取${result.data.money}余额:${result.data.redbag}`)
await dwyjysp();
} else {

        $.log(`\n动物研究院:领取失败${data}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}


function dwyjysp(timeout = 0) {
  return new Promise((resolve) => {

let url = {
        url : 'https://api-access.pangolin-sdk-toutiao.com/api/ad/union/sdk/reward_video/reward/',
        headers : sphd,
        body : dwyjyspbody,
}
      $.post(url, async (err, resp, data) => {
        try {
    const result = JSON.parse(data)
        if(result.cypher == 3){
  $.log(`\n动物研究院视频观看成功`)
    await $.wait(3000)
   await dwyjyhb();
    
} else {

        $.log(`\n动物研究院视频观看失败:${data}`)
 
}
   
        } catch (e) {
          //$.logErr(e, resp);
        } finally {
          resolve()
        }
    },timeout)
  })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

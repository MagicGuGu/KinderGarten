export default {
  // 保存json对象到sessionStorage
  saveJsonObj2Session: function (key, json) {
    sessionStorage.setItem(key, JSON.stringify(json));
},
  // 从sessionStorage获取json对象
  getJsonObj4Session: function(key) {
    var str = sessionStorage.getItem(key)
    if (str) {
      return JSON.parse(str)
    }
    return null
  },
  // 获取状态集合
  saveDict: function(jsonObj) {
    this.saveJsonObj2Session('dict', jsonObj)
  },

  getListByAlias: function(alias) {
    var dictInfos = this.getJsonObj4Session('dict')
    var map = new Map()
    for (var i = 0; i < dictInfos.length; i++) {
      if (dictInfos[i].dictType === alias) {
        map.set(dictInfos[i].dictValue, dictInfos[i].dictLabel)
      }
    }
    return map
  },
  findStateName: function(alias, stateId) {
    var list = this.getListByAlias(alias)// 获取对应字段的集合
    return list.get(stateId)
  },

  formatTime: function(time) {
    var temp_time = Number(time)
    var temp_date = new Date(temp_time)
    var temp_year = ''
    var temp_month = ''
    var temp_day = ''
    temp_year = temp_date.getFullYear()
    temp_month = (temp_date.getMonth() + 1) > 9 ? (temp_date.getMonth() + 1) : '0' + (temp_date.getMonth() + 1)
    temp_day = (temp_date.getDate()) > 9 ? (temp_date.getDate()) : '0' + (temp_date.getDate())
    return temp_year.toString() + '-' + temp_month.toString() + '-' + temp_day.toString()
  },

  valueFormat: function(value, options, keyOptions) {
    const { labelKey, valueKey } = keyOptions
    const target = options.find(item => item[labelKey] === value)
    return target ? target[valueKey] : value
  },
  // token
  saveStr2Session: function(key, str) {
    sessionStorage.setItem(key, str)
  },
  getStr4Session: function(key) {
    return sessionStorage.getItem(key)
  },
  saveToken2Session: function(str) {
    this.saveStr2Session('token', str)
  },
  getToken4Session: function() {
    return this.getStr4Session('token')
  },
  // 解析时间戳 yyyy-MM-dd
  getDateForEndDay: function (num) {
    console.log(num);
    var d = new Date(num);
    return d.getFullYear() + "-" +
        this.addZero(d.getMonth() + 1) + "-" +
        this.addZero(d.getDate())
},
// 解析时间戳 yyyy-MM-dd-HH-mm-ss
getDate: function (num) {
    let d = new Date(num);
    return d.getFullYear() + "-" +
        this.addZero(d.getMonth() + 1) + "-" +
        this.addZero(d.getDate()) + " " +
        this.addZero(d.getHours()) + ":" +
        this.addZero(d.getMinutes()) + ":" +
        this.addZero(d.getSeconds());
},
// 补0
addZero: function (data) {
    if (data > 9) {
        return data;
    } else {
        return "0" + data;
    }
},
}


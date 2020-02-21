// pages/addmission/addmission.js
const util = require('../../utils/util.js')
const cweb = require('../../utils/cweb.js')
var ddl = ""
var teamid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    detail: "",
    colorchoose: 0,
    timeshow: false,
    formatter(type, value) {
      if (type === 'year') {
        return `${value*1}年`;
      } else if (type === 'month') {
        return `${value*1}月`;
      } else if (type === 'day') {
        return `${value*1}日`;
      }
      return value;
    },
    filter(type, options) {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0)
      }
      return options;
    },
    now: "",
    ddlshow: "",
    team: {},
    people: []
  },

  onChange(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail
    })
  },

  ontimeconfirm(e) {
    // console.log(e.detail)
    ddl = e.detail
    this.setData({
      ddlshow: util.formatDateTime(new Date(ddl)),
      timeshow: false
    })
  },

  onPeople(e) {
    this.setData({
      people: e.detail
    });
  },

  bindtime() {
    this.setData({
      timeshow: !this.data.timeshow,
      now: new Date().getTime()
    })
  },

  bindcolor(e) {
    this.setData({
      colorchoose: e.currentTarget.dataset.index
    })
  },

  bindbutton() {
    if (this.data.name == "" | this.data.detail == "") {
      return 0;
    }
    var that = this
    cweb.request('POST', '/mission', {
      name: that.data.name,
      detail: that.data.detail,
      teamid: teamid,
      color: that.data.colorchoose,
      deadline: ddl,
      people: JSON.stringify(that.data.people)
    }).then(res => {
      wx: wx.navigateBack({
        delta: 1,
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    teamid = getApp().globalData.teamid
    var that = this
    cweb.request('GET', '/team', {
      'teamid': teamid
    }).then(res => {
      if (res.code == 1001) {
        that.setData({
          team: res
        })
      } else {
        wx: wx.reLaunch({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {

  // }
})
// pages/mission/mission.js
const cweb = require('../../utils/cweb.js')
const util = require('../../utils/util.js')
var teamid = ""
var missionid = ''
var teampeople = {}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mission: {},
    popshow: false,
    tipshow: false,
    popdata: {},
    tips: ""
  },

  bindedit() {
    this.setData({
      popdata: this.data.mission,
      popshow: !this.data.popshow
    })
  },

  bindtip() {
    this.setData({
      tipshow: !this.data.tipshow,
      tips: ""
    })
  },

  bindfinish() {
    var that = this
    cweb.cpost('/missionfinish', {
      state: 1,
      missionid: missionid
    }).then(() => {
      that.loadfun()
    })
  },

  binddelete(e) {
    var that = this
    cweb.cpost('/deltip', {
      missionid: missionid,
      tipdate: e.currentTarget.dataset.id
    }).then(() => {
      that.loadfun()
    })
  },

  bindeditconfirm(e) {
    var that = this
    cweb.cpost('/missionedit', {
      name: e.detail.name,
      detail: e.detail.detail,
      missionid: missionid
    }).then(res => {
      that.setData({
        popshow: false
      })
      that.loadfun()
    })
  },

  handletip(e) {
    var that = this
    // console.log(e.detail)
    var date = new Date()
    cweb.cpost('/addtip', {
      missionid: missionid,
      tip: e.detail
    }).then(res => {
      that.setData({
        tips: "",
        tipshow: false
      })
      that.loadfun()
    })
  },

  bindline() {
    wx: wx.showModal({
      title: '提示',
      content: '右划删除Tips',
      showCancel: false,
    })
  },

  loadfun() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.cpost('/teampeople', {
        teamid: teamid
      }).then(res => {
        if (res.code == 1000) {
          wx: wx.reLaunch({
            url: '/pages/index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        else {
          teampeople = res
          that.loadfun2().then(() => {
            resolve()
          })
        }
      })
    })
  },

  loadfun2() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.cpost('/missiondetail', {
        missionid: missionid
      }).then(res => {
        if (res.code == 1000) {
          wx: wx.navigateBack({
            delta: 1,
          })
        }
        else {
          var mission = res
          mission.tiplist = []
          for (var i in mission.tips) {
            mission.tips[i] = JSON.parse(mission.tips[i])
            let x = mission.tips[i]
            x.dateshow = util.formatTime(new Date(x.date * 1000))
            try {
              x.personname = teampeople.people[x.openid].name
            } catch (e) {
              x.personname = ''
            }
            mission.tiplist.push(x)
          }
          mission.tiplist.sort(function(a, b) {
            return a.date - b.date
          })
          that.setData({
            mission: mission
          })
          resolve()
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    teamid = options.teamid
    missionid = options.missionid
    this.loadfun()
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
    wx.showNavigationBarLoading()
    this.loadfun().then(res => {
      wx.stopPullDownRefresh()
      wx.hideNavigationBarLoading()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
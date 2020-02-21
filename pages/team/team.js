// pages/team/team.js
const cweb = require('../../utils/cweb.js')
const util = require('../../utils/util.js')
var teamid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    finished: [],
    unfinished: [],
    mine: [],
    team: {},
    color: ["#2d8cf0", "#19be6b", "#ff9900", "#ed3f14"]
  },

  bindfinish(e) {
    // console.log(e.currentTarget.dataset.finish)
    var that = this
    cweb.request('PUT', '/mission/finish', {
      missionid: e.currentTarget.dataset.id,
      state: e.currentTarget.dataset.finish
    }).then(() => {
      that.loadfun()
    })
  },

  bindmission(e) {
    wx: wx.navigateTo({
      url: '/pages/mission/mission?teamid=' + teamid + '&missionid=' + e.currentTarget.dataset.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindteam() {
    wx: wx.redirectTo({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindadd() {
    wx: wx.navigateTo({
      url: '/pages/addmission/addmission',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  binddelete(e) {
    var that = this
    cweb.request('DELETE', '/mission', {
      id: e.currentTarget.dataset.id
    }).then(res => {
      that.loadfun()
    })
  },

  bindline() {
    wx: wx.showModal({
      title: '提示',
      content: '左划展开任务操作',
      showCancel: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    teamid = getApp().globalData.teamid
  },

  loadfun() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.request('GET', '/team', {
        teamid: teamid
      }).then(res => {
        if (res.code == 1000) {
          wx: wx.showModal({
            title: '提示',
            content: '当前队伍已解散或您已被移出队伍',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx: wx.reLaunch({
                  url: '/pages/index/index',
                  success: function(res) {},
                  fail: function(res) {},
                  complete: function(res) {},
                })
              }
            },
            fail: function(res) {},
            complete: function(res) {},
          })
          reject()
        }
        else {
          var finished = []
          var unfinished = []
          var mine = []
          for (var x of res.missionlist) {
            x.date = util.formatTime(new Date(x.time * 1000))
            if (x.finish == 1) {
              finished.push(x)
            } else {
              unfinished.push(x)
              if (x.people.length == 0 | x.people.indexOf(res.openid) > -1) {
                mine.push(x)
              }
            }
          }
          wx.setTabBarBadge({
            index: 1,
            text: mine.length + ''
          });
          res.peoplenum = Object.keys(res.people).length
          that.setData({
            finished: finished,
            unfinished: unfinished,
            mine: mine,
            team: res
          })
          resolve()
        }
      })
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
    wx.hideHomeButton()
    this.loadfun()
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
    return {
      title: '快加入我的团队（' + this.data.team.name + '）吧！',
      path: "/pages/index/index?teamid=" + teamid,
      imageUrl: "https://i.loli.net/2020/02/17/WPYNQKZbRVqnkXm.png"
    }
  }
})
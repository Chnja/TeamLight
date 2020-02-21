// pages/me/me.js
const cweb = require('../../utils/cweb.js')
var teamid = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    person: {},
    input: false
  },

  bindname() {
    this.setData({
      input: true
    })
  },

  confirmname(e) {
    // console.log(e)
    var that = this
    cweb.request('PUT', '/person', {
      name: e.detail
    }).then(() => {
      this.setData({
        input: false
      })
      that.loadfun()
    })
  },

  bindcreateteam() {
    wx: wx.redirectTo({
      url: '/pages/index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindweapp() {
    wx: wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=AxTVFyJeAPE%3D'
    })
  },


  loadfun() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.request('GET', '/person').then(res => {
        if (res.code == 1000) {
          if (res.confirm) {
            wx: wx.reLaunch({
              url: '/pages/index/index',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
          reject()
        } else {
          var flag = 0
          for (var i of res.teamlist) {
            if (i._id == teamid) {
              res.team = i.name
              flag = 1
              break
            }
          }
          if (flag == 0) {
            wx: wx.reLaunch({
              url: '/pages/index/index',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
          that.setData({
            person: res
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
    teamid = getApp().globalData.teamid
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
// pages/teamlist/teamlist.js
const cweb = require('../../utils/cweb.js')
var teamid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    persondata: {},
    teamid: ""
  },

  teammode(e) {
    wx: wx.navigateTo({
      url: '/pages/index/index?mode=create',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  bindteamcard(e) {
    getApp().globalData.teamid = e.currentTarget.dataset.id
    wx: wx.reLaunch({
      url: '/pages/team/team',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },


  loadfun() {
    var that = this
    cweb.request('GET', '/person').then(res => {
      if (res.code == 1000) {
        wx: wx.reLaunch({
          url: '/pages/index/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
      else {
        that.setData({
          persondata: res
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    teamid = getApp().globalData.teamid
    this.setData({
      teamid: teamid
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
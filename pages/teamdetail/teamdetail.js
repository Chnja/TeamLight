// pages/teamdetail/teamdetail.js
const cweb = require('../../utils/cweb.js')
var teamid = ''
Page({
  /**
   * 页面的初始数据
   */
  data: {
    teamid: '',
    show: {},
    person: {},
    popbottom: false,
    team: ''
  },

  bindbutton() {
    var api = ""
    var method = ''
    if (this.data.show.peoplelist[0] == this.data.person.openid) {
      method = 'DELETE'
      api = '/team'
    } else {
      method = 'PUT'
      api = '/team/leave'
    }
    cweb.request(method, api, {
      teamid: teamid
    }).then(res => {
      wx: wx.reLaunch({
        url: '/pages/index/index',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    })
  },

  bindteam() {
    var that = this
    cweb.request('PUT', '/team/name', {
      team: this.data.team,
      teamid: teamid
    }).then(res => {
      that.setData({
        popbottom: false,
      })
      that.loadperson().then(() => {
        that.loadfun()
      })
    })
  },

  bindbottom() {
    this.setData({
      popbottom: !this.data.popbottom,
      team: this.data.show.name
    })
  },

  inputchange(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    teamid = getApp().globalData.teamid
    // this.loadteam()
  },

  loadperson() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.request('GET', '/person').then(res => {
        if (res.code == 1000) {
          wx: wx.redirectTo({
            url: '/pages/index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
        else {
          var flag = false
          for (var i of res.teamlist) {
            i.text = i.name
            i.value = i._id
            if (teamid == i._id) {
              flag = true
            }
          }
          if (!flag) {
            wx: wx.reLaunch({
              url: '/pages/index/index',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
          that.setData({
            person: res,
            teamid: teamid * 1
          })
          resolve()
        }
      })
    })
  },

  loadfun() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.request('GET', '/team', {
        'teamid': teamid
      }).then(res => {
        if (res.code == 1001) {
          that.setData({
            show: res
          })
          resolve()
        } else {
          that.loadperson()
          reject()
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
    var that = this
    this.loadperson().then(() => {
      that.loadfun()
    })
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
    var that = this
    this.loadperson().then(() => {
      that.loadfun().then(() => {
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
      })
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
      title: '快加入我的团队（' + this.data.show.name + '）吧！',
      path: "/pages/index/index?teamid=" + teamid,
      imageUrl: "https://i.loli.net/2020/02/17/WPYNQKZbRVqnkXm.png"
    }
  }
})
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
    popup: false,
    popbottom: false,
    name: '',
    team: ''
  },

  bindbutton() {
    var api = ""
    if (this.data.show.peoplelist[0] == this.data.person.openid) {
      api = '/delteam'
    } else {
      api = '/leaveteam'
    }
    cweb.cpost(api, {
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

  dropchange(e) {
    // console.log(e)
    teamid = e.detail
    this.setData({
      teamid: teamid
    })
    this.loadfun()
  },

  bindname() {
    var that = this
    cweb.cpost('/personname', {
      name: this.data.name
    }).then(res => {
      that.setData({
        popup: false,
      })
      that.loadperson().then(() => {
        that.loadfun()
      })
    })
  },

  bindteam() {
    var that = this
    cweb.cpost('/teamname', {
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

  bindup() {
    this.setData({
      popup: !this.data.popup,
      name: this.data.person.name
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
    teamid = options.teamid
    var that = this
    this.loadperson().then(() => {
      that.loadfun()
    })
    // this.loadteam()
  },

  loadperson() {
    var that = this
    return new Promise(function(resolve, reject) {
      cweb.cpost('/launch', {}).then(res => {
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
      cweb.cpost('/teampeople', {
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
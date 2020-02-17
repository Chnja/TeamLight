// pages/index/index.js
const cweb = require('../../utils/cweb.js')
var jointeamid = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: 0,
    name: "",
    team: ''
  },

  inputchange(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail
    })
  },

  bindteam() {
    var team = this.data.team
    if (team == '') {
      return;
    }
    var that = this
    cweb.cpost('/addteam', {
      teamname: team
    }).then(res => {})
  },

  bindname() {
    var name = this.data.name
    if (name == '') {
      return;
    }
    var that = this
    cweb.cpost('/personname', {
      name: name
    }).then(res => {
      that.handlejoin()
    })
  },

  handlejoin() {
    var that = this
    if (jointeamid == undefined) {
      that.setData({
        loading: 2
      })
    } else {
      cweb.cpost('/jointeam', {
        teamid: jointeamid
      }).then(res => {
        wx: wx.redirectTo({
          url: '/pages/team/team?teamid=' + jointeamid,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      })
    }
  },

  bindjoin() {
    wx: wx.showModal({
      title: '加入团队',
      content: '点击微信群中的小程序卡片即可加入相应团队',
      showCancel: false,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    jointeamid = options.teamid
    console.log(jointeamid)
    var that = this
    cweb.cpost('/launch', {}, false).then(res => {
      // getApp().globalData.person = res
      if (res.code == '1000') {
        that.setData({
          loading: 1
        })
      } else if (res.teamlist.length == 0) {
        that.handlejoin()
      } else {
        if (jointeamid != undefined) {
          that.handlejoin()
        } else {
          var teamid = wx.getStorageSync('teamid')
          if ((teamid == '') | (res.teamidlist.indexOf(teamid) == -1)) {
            teamid = res.teamidlist[0]
          }
          wx: wx.redirectTo({
            url: '/pages/team/team?teamid=' + teamid,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
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
  onShareAppMessage: function() {
    return {
      title: '和我一起用团队协作Light这个小程序吧！',
      path: "/pages/index/index",
      imageUrl: "https://i.loli.net/2020/02/17/WPYNQKZbRVqnkXm.png"
    }
  }
})
// cui/addmission/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: ""
    },
    detail: {
      type: String,
      value: ""
    },
    bname:{
      type: String,
      value: "创建"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      this.setData({
        [e.currentTarget.dataset.name]: e.detail
      })
    },
    bindbutton() {
      if (this.data.name == "" | this.data.detail == "") {
        return 0;
      } else {
        this.triggerEvent('confirm', {
          name: this.data.name,
          detail: this.data.detail
        });
      }
    }
  }
})
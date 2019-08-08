// unit/unit.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    x: Number,
    y: Number,
    mineMap:Array,
    tapMap:{
      type:Array,
      observer: function (newVal, oldVal, changedPath){
        if (newVal[this.data.x][this.data.y] == 1){
          this.setData({
            isTap: true,
          })
        }
        this.setData({
          value: this.data.mineMap[this.data.x][this.data.y]
        })
      }
    },
    isOver: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal, changedPath) {
        if(!newVal){
          this.setData({
            isTap: false,
            value: 0,
          })
        }
      }
    },
    reset:{
      type:Number,
      value:0,
      observer: function () {
        this.setData({
          isTap: false,
          canFlag:false,
          isFlag:false,
          value: 0,
        })
      }
    },
    canFlag:{
      type: Boolean,
      value: false,
    },
    isFlag:{
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isTap: false,
    value: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bt: function () {
      this.triggerEvent("unitTap", [this.data.x, this.data.y])
      this.setData({
        value: this.data.mineMap[this.data.x][this.data.y]
      })
    },
    setFlag:function(){
      this.setData({
        isFlag:!this.data.isFlag
      })
    }
  },
})

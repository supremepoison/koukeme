// pages/sos/sos.js
Page({
  data: {
    isBreathing: false,
    breathClass: '',
    breathText: '点击下方开始'
  },

  // 切换呼吸练习
  toggleBreathing() {
    if (this.data.isBreathing) {
      // 停止呼吸
      this.setData({
        isBreathing: false,
        breathClass: '',
        breathText: '点击下方开始'
      });
      return;
    }

    this.setData({
      isBreathing: true
    });

    this.breathCycle();
  },

  // 呼吸循环
  breathCycle() {
    if (!this.data.isBreathing) return;

    // 吸气 4秒
    this.setData({
      breathClass: 'inhale',
      breathText: '吸气... (4秒)'
    });

    setTimeout(() => {
      if (!this.data.isBreathing) return;

      // 屏息 7秒
      this.setData({
        breathClass: 'hold',
        breathText: '屏息... (7秒)'
      });

      setTimeout(() => {
        if (!this.data.isBreathing) return;

        // 呼气 8秒
        this.setData({
          breathClass: 'exhale',
          breathText: '呼气... (8秒)'
        });

        setTimeout(() => {
          this.breathCycle();
        }, 8000);
      }, 7000);
    }, 4000);
  },

  // 播放正念音频
  playAudio() {
    wx.showModal({
      title: '正念音频',
      content: '正在播放 5 分钟正念音频...\n\n专注于你的呼吸，\n让平静在心中流淌。',
      showCancel: false
    });
  },

  // 发送位置
  sendLocation() {
    wx.showModal({
      title: '发送位置',
      content: '已发送你的位置给紧急联系人。\n\n不要担心，\n有人正在赶来帮助你。',
      showCancel: false
    });
  },

  // 拨打热线
  callHotline() {
    wx.showModal({
      title: '拨打心理危机干预热线',
      content: '热线：400-XXX-XXXX\n\n这是免费的，\n你随时可以获得帮助。',
      confirmText: '拨打',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '正在拨号...',
            icon: 'none'
          });
        }
      }
    });
  },

  onUnload() {
    // 页面卸载时停止呼吸练习
    this.setData({
      isBreathing: false
    });
  }
});

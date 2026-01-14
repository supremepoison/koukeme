// app.js
App({
  onLaunch() {
    // 初始化数据
    this.initData();
  },

  onShow() {
    // 应用显示时
  },

  onHide() {
    // 应用隐藏时
  },

  initData() {
    // 从本地存储读取数据
    const streakDays = wx.getStorageSync('streakDays') || 0;
    const savedMoney = wx.getStorageSync('savedMoney') || 0;
    const liverStage = wx.getStorageSync('liverStage') || 'healing';

    wx.setStorageSync('streakDays', streakDays);
    wx.setStorageSync('savedMoney', savedMoney);
    wx.setStorageSync('liverStage', liverStage);
  },

  globalData: {
    userInfo: null,
    streakDays: 30,
    savedMoney: 1500,
    liverStage: 'healthy'
  }
})

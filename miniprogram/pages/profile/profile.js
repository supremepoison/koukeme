// pages/profile/profile.js
Page({
  data: {},

  onLoad() {
    // 页面加载
  },

  // 升级VIP
  upgradeVIP() {
    wx.showModal({
      title: '会员功能',
      content: '💎 超级会员特权：\n• 超级肝脏皮肤（5款精美皮肤）\n• 无限次模拟体验\n• AI深度咨询（每日不限次数）\n• 专属成就徽章\n• 数据云端备份\n\n价格：¥68/年',
      showCancel: false
    });
  },

  // 查看报告
  viewReport() {
    wx.showModal({
      title: '健康报告',
      content: '📊 你的恢复进度：\n\n肝脏健康度：85%\n脂肪肝风险：↓ 15%\n肝酶指标：趋于正常\n睡眠质量：提升 20%\n\n继续保持，肝脏正在快速恢复！',
      showCancel: false
    });
  },

  // 查看历史
  viewHistory() {
    wx.showModal({
      title: '打卡历史',
      content: '📅 本月打卡记录：\n\n✅ 连续打卡 30 天\n🏆 本月最长记录 30 天\n📈 成功率 100%\n\n你做得太棒了！继续保持！',
      showCancel: false
    });
  },

  // 查看成就
  viewAchievements() {
    wx.showModal({
      title: '成就系统',
      content: '🏆 已解锁成就：\n\n✓ 清醒新人（1天）\n✓ 坚持一周（7天）\n✓ 半月达人（15天）\n✓ 社区之星（获得50个点亮）\n✓ 模拟室体验官（完成10次模拟）\n\n🔒 待解锁成就：\n• 月度冠军（30天）\n• 三月挑战（90天）\n• 年度英雄（365天）\n...',
      showCancel: false
    });
  },

  // 设置提醒
  setReminder() {
    wx.showModal({
      title: '打卡提醒设置',
      content: '当前提醒时间：每天 21:00\n\n你可以自定义提醒时间，帮助养成打卡习惯。',
      showCancel: false
    });
  },

  // 设置紧急联系人
  setEmergencyContact() {
    wx.showModal({
      title: '紧急联系人设置',
      content: '当你点击SOS按钮时，可以一键拨打预设的紧急联系人电话。\n\n建议设置：\n• 家人/朋友电话\n• 心理咨询热线\n• 戒酒互助热线',
      showCancel: false
    });
  },

  // 隐私设置
  setPrivacy() {
    wx.showModal({
      title: '隐私设置',
      content: '🔒 你的隐私我们很重视：\n\n• 所有数据仅存储在本地\n• 社区发帖完全匿名\n• 可随时导出/删除数据\n• 不会与第三方共享',
      showCancel: false
    });
  },

  // 关于我们
  viewAbout() {
    wx.showModal({
      title: '关于清醒时光',
      content: '一款"可视化、游戏化、AI化"的口袋戒酒教练。\n\n通过生命肝脏、模拟室、AI教练等创新功能，帮助你看见伤害、体验后果、获得支持。\n\n版本：v1.1.0\n团队：[bowei]',
      showCancel: false
    });
  },

  // 意见反馈
  feedback() {
    wx.showModal({
      title: '意见反馈',
      content: '感谢你的反馈！\n\n请告诉我们：\n• 你最喜欢哪个功能？\n• 有什么改进建议？\n• 遇到了什么问题？\n\n我们会认真听取每一条建议。',
      showCancel: false
    });
  },

  // 分享
  share() {
    wx.showModal({
      title: '分享清醒时光',
      content: '如果这个工具帮助了你，\n也许它也能帮助你的朋友。\n\n一起保持清醒，一起变得更好！💪',
      showCancel: false
    });
  },

  // 分享到微信
  onShareAppMessage() {
    return {
      title: '清醒时光 - 让戒酒变得简单',
      path: '/pages/index/index',
      imageUrl: '/images/share-cover.png'
    };
  }
});

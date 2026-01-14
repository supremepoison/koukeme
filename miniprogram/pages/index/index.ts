// 提示文案配置（后端接口就绪后替换）
const tipsConfig = [
  '想喝酒的时候... 这股冲动通常只持续 15 分钟。深呼吸 3 次，或者点开「赛博喝酒」看看。',
  '每次拒绝一杯酒，就是在为更健康的自己投资。',
  '记录是为了更好地重新开始，而不是自责。',
  '今天不喝，明天你会感谢今天的自己。',
  '与家人朋友分享你的决定，他们可以成为你的支持力量。',
  '想喝酒时试试喝一杯温水或无糖饮料。',
];

// 酒类类型配置
const alcoholTypeConfig = {
  beer: { name: '啤酒', unit: 'ml', min: 50, max: 3000 },
  redwine: { name: '红酒', unit: 'ml', min: 50, max: 1500 },
  baijiu: { name: '白酒', unit: '两', min: 0.5, max: 10 },
  whisky: { name: '威士忌', unit: '两', min: 0.5, max: 10 },
  huangjiu: { name: '黄酒', unit: 'ml', min: 50, max: 1000 },
  cocktail: { name: '鸡尾酒', unit: 'ml', min: 50, max: 500 },
  other: { name: '其他', unit: 'ml', min: 50, max: 2000 },
};

// 身体状态配置（后端接口就绪后替换）
const bodyStatusConfig = [
  {
    level: 1,
    levelText: '启动修复',
    title: '肝脏开始修复',
    description: '肝脏正在启动自我修复机制，这是一个好的开始。',
    image: '/images/body-status-1.png', // 后端返回
  },
  {
    level: 2,
    levelText: '脂肪减少',
    title: '脂肪肝改善',
    description: '脂肪堆积明显减少，肝脏功能逐步恢复。',
    image: '/images/body-status-2.png', // 后端返回
  },
  {
    level: 3,
    levelText: '功能恢复',
    title: '肝功能恢复',
    description: '肝脏解毒能力显著提升，身体状态持续向好。',
    image: '/images/body-status-3.png', // 后端返回
  },
  {
    level: 4,
    levelText: '活力提升',
    title: '肝脏活力增强',
    description: '肝脏活力大幅提升，新陈代谢更加高效。',
    image: '/images/body-status-4.png', // 后端返回
  },
  {
    level: 5,
    levelText: '完全健康',
    title: '肝脏状态最佳',
    description: '恭喜！你的肝脏已经恢复到最佳健康状态。',
    image: '/images/body-status-5.png', // 后端返回
  },
];

// 模拟用户数据（后端接口就绪后替换）
const mockUserData = {
  streakDays: 7, // 连续清醒天数
  sobrietyStartTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime(), // 戒酒开始时间
  bodyStatusLevel: 3, // 身体状态等级
  savedMoney: 280, // 省下的钱（元）
  savedCalories: 12000, // 减少的卡路里
};

Page({
  data: {
    sobrietyTime: {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    },
    bodyStatus: bodyStatusConfig[2], // 默认等级3
    loading: false,
    savedMoney: mockUserData.savedMoney,
    savedCalories: (mockUserData.savedCalories / 1000).toFixed(1),
    showAchievement: false,
    achievementDesc: '连续清醒 7 天',
    currentTip: tipsConfig[0], // 当前提示文案
    tipIndex: 0, // 当前提示索引
    showDrinkModal: false, // 显示饮酒记录弹窗
    alcoholTypes: ['啤酒', '红酒', '白酒', '威士忌', '黄酒', '鸡尾酒', '其他'], // 酒类类型选项
    alcoholTypeIndex: -1, // 选中的酒类索引
    drinkForm: {
      type: '', // 酒类类型
      typeName: '', // 酒类类型名称（显示用）
      name: '', // 酒名
      amount: '', // 数量
      unit: 'ml', // 单位
      time: '', // 时间
      remark: '', // 备注
    },
    errors: {
      type: '',
      name: '',
      amount: '',
    },
    amountRange: '请选择酒类', // 数量范围提示
  },

  timer: null as number | null, // 计时器
  tipTimer: null as number | null, // 提示文案轮播计时器

  onLoad() {
    this.updateBodyStatus(mockUserData.bodyStatusLevel);
    this.startTimer();
    this.startTipRotation();
    // 后端接口就绪后，从服务器获取数据
    // this.fetchUserData();
  },

  onUnload() {
    this.stopTimer();
    this.stopTipRotation();
  },

  onShow() {
    this.startTimer();
    this.startTipRotation();
  },

  onHide() {
    this.stopTimer();
    this.stopTipRotation();
  },

  // 启动计时器
  startTimer() {
    if (this.timer) return;

    this.updateTimer(); // 立即执行一次
    this.timer = setInterval(() => {
      this.updateTimer();
    }, 1000);
  },

  // 停止计时器
  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  },

  // 启动提示文案轮播
  startTipRotation() {
    if (this.tipTimer) return;

    this.tipTimer = setInterval(() => {
      this.rotateTip();
    }, 8000); // 每8秒切换一次
  },

  // 停止提示文案轮播
  stopTipRotation() {
    if (this.tipTimer) {
      clearInterval(this.tipTimer);
      this.tipTimer = null;
    }
  },

  // 轮播提示文案
  rotateTip() {
    const nextIndex = (this.data.tipIndex + 1) % tipsConfig.length;
    this.setData({
      currentTip: tipsConfig[nextIndex],
      tipIndex: nextIndex,
    });
  },

  // 更新计时器
  updateTimer() {
    const now = Date.now();
    const startTime = mockUserData.sobrietyStartTime;
    const elapsed = Math.floor((now - startTime) / 1000); // 秒数

    const days = Math.floor(elapsed / (24 * 60 * 60));
    const hours = Math.floor((elapsed % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((elapsed % (60 * 60)) / 60);
    const seconds = elapsed % 60;

    this.setData({
      sobrietyTime: {
        days: this.padNumber(days),
        hours: this.padNumber(hours),
        minutes: this.padNumber(minutes),
        seconds: this.padNumber(seconds),
      },
    });
  },

  // 数字补零
  padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  },

  // 更新身体状态
  updateBodyStatus(level: number) {
    const status = bodyStatusConfig.find(s => s.level === level) || bodyStatusConfig[0];
    this.setData({ bodyStatus: status });
  },

  // 获取用户数据（待接入后端）
  fetchUserData() {
    // TODO: 接入后端接口
    // wx.request({
    //   url: 'https://api.example.com/user/stats',
    //   success: (res) => {
    //     mockUserData.sobrietyStartTime = res.data.sobrietyStartTime;
    //     this.updateBodyStatus(res.data.bodyStatusLevel);
    //     this.setData({
    //       savedMoney: res.data.savedMoney,
    //       savedCalories: (res.data.savedCalories / 1000).toFixed(1),
    //     });
    //     this.updateTimer();
    //   }
    // });
  },

  // 今日清醒打卡
  handleCheckIn() {
    if (this.data.loading) return;

    this.setData({ loading: true });

    // 模拟 API 请求延迟
    setTimeout(() => {
      // TODO: 接入后端打卡接口
      // wx.request({
      //   url: 'https://api.example.com/checkin',
      //   method: 'POST',
      //   success: (res) => {
      //     this.setData({
      //       loading: false,
      //       bodyStatus: res.data.bodyStatus,
      //     });
      //   }
      // });

      // 临时使用模拟数据
      const currentLevel = this.data.bodyStatus.level;
      if (currentLevel < 5) {
        this.updateBodyStatus(currentLevel + 1);
      }

      this.setData({ loading: false });
      this.checkAchievement();
      wx.showToast({ title: '打卡成功！继续加油', icon: 'none' });
    }, 1000);
  },

  // 记录饮酒 - 打开弹窗
  handleRecordDrink() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    this.setData({
      showDrinkModal: true,
      alcoholTypeIndex: -1,
      drinkForm: {
        type: '',
        typeName: '',
        name: '',
        amount: '',
        unit: 'ml',
        time: `${hours}:${minutes}`,
        remark: '',
      },
      errors: {
        type: '',
        name: '',
        amount: '',
      },
      amountRange: '请选择酒类',
    });
  },

  // 关闭饮酒记录弹窗
  closeDrinkModal() {
    this.setData({ showDrinkModal: false });
  },

  // 选择酒类类型（下拉选择）
  onAlcoholTypeChange(e: WechatMiniprogram.TouchEvent) {
    const index = e.detail.value as number;
    const typeName = this.data.alcoholTypes[index];
    const typeMap = ['beer', 'redwine', 'baijiu', 'whisky', 'huangjiu', 'cocktail', 'other'];
    const type = typeMap[index] as keyof typeof alcoholTypeConfig;
    const config = alcoholTypeConfig[type];

    this.setData({
      alcoholTypeIndex: index,
      'drinkForm.type': type,
      'drinkForm.typeName': typeName,
      'drinkForm.unit': config.unit,
      amountRange: `合理范围: ${config.min}-${config.max} ${config.unit}`,
      'errors.type': '',
    });
  },

  // 酒名输入
  onDrinkNameInput(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      'drinkForm.name': e.detail.value,
      'errors.name': '',
    });
  },

  // 酒量输入
  onDrinkAmountInput(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      'drinkForm.amount': e.detail.value,
      'errors.amount': '',
    });
  },

  // 时间选择
  onDrinkTimeChange(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      'drinkForm.time': e.detail.value,
    });
  },

  // 备注输入
  onDrinkRemarkInput(e: WechatMiniprogram.TouchEvent) {
    this.setData({
      'drinkForm.remark': e.detail.value,
    });
  },

  // 验证表单
  validateDrinkForm(): boolean {
    const { type, amount } = this.data.drinkForm;
    let isValid = true;
    const errors: { type: string; name: string; amount: string } = {
      type: '',
      name: '',
      amount: '',
    };

    // 验证酒类类型
    if (!type) {
      errors.type = '请选择酒的类别';
      isValid = false;
    }

    // 验证数量
    if (!amount) {
      errors.amount = '请输入饮酒数量';
      isValid = false;
    } else {
      const num = parseFloat(amount);
      const config = alcoholTypeConfig[type as keyof typeof alcoholTypeConfig];

      if (isNaN(num) || num <= 0) {
        errors.amount = '数量必须为正数';
        isValid = false;
      } else if (config && (num < config.min || num > config.max)) {
        errors.amount = `数量应在 ${config.min}-${config.max} ${config.unit} 之间`;
        isValid = false;
      }
    }

    this.setData({ errors });
    return isValid;
  },

  // 提交饮酒记录
  submitDrinkRecord() {
    if (!this.validateDrinkForm()) {
      return;
    }

    const { type, name, amount, time, remark } = this.data.drinkForm;
    const config = alcoholTypeConfig[type as keyof typeof alcoholTypeConfig];

    // TODO: 接入后端接口
    // wx.request({
    //   url: 'https://api.example.com/drink',
    //   method: 'POST',
    //   data: {
    //     userId: mockUserData.userId,
    //     type,
    //     name,
    //     amount: parseFloat(amount),
    //     unit: config.unit,
    //     time,
    //     remark,
    //     timestamp: Date.now(),
    //   },
    //   success: (res) => {
    //     this.resetAfterDrinkRecord();
    //   },
    //   fail: () => {
    //     wx.showToast({ title: '提交失败，请重试', icon: 'none' });
    //   }
    // });

    // 临时重置数据
    this.resetAfterDrinkRecord();
  },

  // 饮酒记录后的数据重置
  resetAfterDrinkRecord() {
    mockUserData.sobrietyStartTime = Date.now();
    this.updateBodyStatus(1);
    this.updateTimer();
    this.setData({ showDrinkModal: false });

    // 显示鼓励提示
    wx.showToast({
      title: '已记录本次饮酒，明天重新开始！',
      icon: 'none',
      duration: 2500,
    });
  },

  // 查看身体状态详情
  showStatusDetail() {
    const { bodyStatus } = this.data;
    wx.navigateTo({
      url: `/pages/profile/profile?level=${bodyStatus.level}`,
    });
  },

  // 检查成就
  checkAchievement() {
    const achievements = [
      { days: 3, desc: '连续清醒 3 天' },
      { days: 7, desc: '连续清醒 7 天' },
      { days: 30, desc: '连续清醒 30 天' },
      { days: 100, desc: '百日清醒' },
    ];

    const now = Date.now();
    const elapsed = Math.floor((now - mockUserData.sobrietyStartTime) / (24 * 60 * 60 * 1000));
    const achievement = achievements.find(a => a.days === elapsed);

    if (achievement) {
      this.setData({
        showAchievement: true,
        achievementDesc: achievement.desc,
      });
    }
  },

  // 隐藏成就弹窗
  hideAchievement() {
    this.setData({ showAchievement: false });
  },
});

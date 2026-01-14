// pages/simulation-lab/simulation-lab.js
Page({
  data: {
    currentType: 'beer',
    drinkColor: '#ffd700',
    damagePerDrink: 10,
    damageLevel: 0,
    liquidHeight: 0,
    drunkBlur: 0,
    liverClass: '',
    showWarning: false,
    showRedemption: false,
    showResult: false,
    lastDrinkType: '',
    isDrinking: false
  },

  onLoad() {
    this.setData({
      currentType: 'beer',
      drinkColor: '#ffd700',
      damagePerDrink: 10
    });
  },

  // 选择酒类
  selectDrink(e) {
    const { type, color, damage } = e.currentTarget.dataset;
    this.setData({
      currentType: type,
      drinkColor: color,
      damagePerDrink: damage
    });
  },

  // 倒酒
  pour() {
    this.setData({
      liquidHeight: 80
    });

    // 震动反馈
    wx.vibrateShort({
      type: 'light'
    });
  },

  // 开始饮用
  startDrinking(e) {
    if (this.data.liquidHeight === 0) {
      wx.showToast({
        title: '请先倒酒！',
        icon: 'none'
      });
      return;
    }

    this.setData({
      isDrinking: true
    });

    // 混饮逻辑
    if (this.data.lastDrinkType && this.data.lastDrinkType !== this.data.currentType) {
      this.setData({
        showWarning: true,
        damagePerDrink: this.data.damagePerDrink * 2
      });
    }

    this.setData({
      lastDrinkType: this.data.currentType
    });

    this.drinkInterval = setInterval(() => {
      const newDamage = this.data.damageLevel + (this.data.damagePerDrink / 5);
      this.updateUI(newDamage);

      // 震动反馈
      const vibrationDuration = Math.min(100 + this.data.damageLevel, 200);
      wx.vibrateShort({
        type: vibrationDuration > 150 ? 'heavy' : 'medium'
      });

      // 减少酒量
      if (this.data.liquidHeight > 0) {
        this.setData({
          liquidHeight: this.data.liquidHeight - 5
        });
      } else {
        this.stopDrinking();
      }
    }, 200);
  },

  // 停止饮用
  stopDrinking() {
    if (!this.data.isDrinking) return;

    this.setData({
      isDrinking: false
    });

    if (this.drinkInterval) {
      clearInterval(this.drinkInterval);
    }

    if (this.data.damageLevel > 50) {
      this.setData({
        showRedemption: true
      });
    }
  },

  // 更新UI
  updateUI(damage) {
    // 肝脏状态
    let liverClass = '';
    if (damage > 30) {
      liverClass = 'damaged';
    }

    // 屏幕模糊
    const blur = damage / 8;

    this.setData({
      damageLevel: damage,
      drunkBlur: blur,
      liverClass: liverClass
    });

    // 震动反馈
    if (damage >= 100) {
      wx.vibrateLong();

      // 显示结果弹窗
      setTimeout(() => {
        this.setData({
          showResult: true
        });
      }, 500);

      this.restore();
    }
  },

  // 恢复
  restore() {
    this.setData({
      damageLevel: 0,
      lastDrinkType: '',
      liquidHeight: 0,
      showWarning: false,
      showRedemption: false,
      drunkBlur: 0,
      liverClass: '',
      damagePerDrink: this.data.damagePerDrink / 2
    });
  },

  // 关闭弹窗
  closeModal() {
    this.setData({
      showResult: false
    });
  },

  onUnload() {
    if (this.drinkInterval) {
      clearInterval(this.drinkInterval);
    }
  }
});

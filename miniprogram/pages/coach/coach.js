// pages/coach/coach.js
Page({
  data: {
    inputText: '',
    messages: [
      {
        type: 'ai',
        content: '你好！👋 我是你的清醒伙伴。\n\n不管你现在感觉如何，我都在这里陪着你。聊聊吧，或者告诉我你现在最需要什么？'
      },
      {
        type: 'ai',
        content: '很多时候，我们想喝酒是因为这四个原因之一：\n\n🍔 饿了\n😤 生气\n🥺 孤独\n😴 疲惫'
      }
    ]
  },

  onLoad() {
    // 页面加载时设置
  },

  // 输入变化
  onInput(e) {
    this.setData({
      inputText: e.detail.value
    });
  },

  // 发送消息
  sendMsg() {
    const text = this.data.inputText.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    this.setData({ inputText: '' });

    setTimeout(() => {
      this.respond(text);
    }, 600);
  },

  // 发送 HALT 消息
  sendHalt(e) {
    const text = e.currentTarget.dataset.text;
    this.addMessage(text, 'user');

    setTimeout(() => {
      this.respond(text);
    }, 600);
  },

  // 添加消息
  addMessage(content, type) {
    const messages = this.data.messages;
    messages.push({ type, content });

    this.setData({ messages }, () => {
      // 滚动到底部
      this.scrollToBottom();
    });
  },

  // 滚动到底部
  scrollToBottom() {
    wx.createSelectorQuery()
      .select('#chat-bottom')
      .boundingClientRect((rect) => {
        wx.pageScrollTo({
          scrollTop: rect ? rect.top : 9999,
          duration: 300
        });
      })
      .exec();
  },

  // AI 回复
  respond(text) {
    let reply = '我理解你的感受。这股冲动确实很难熬，但我们能一起度过。记住，这股冲动通常只持续15分钟。';

    if (text.includes('饿')) {
      reply = '饿的时候，自控力会显著下降。\n\n💡 建议：先去吃点高蛋白的食物，或者喝一杯热牛奶。饱腹感会让你更理智。\n\n吃东西的时候，想想你的身体正在慢慢恢复，这顿饭是对它的奖励。';
    } else if (text.includes('气')) {
      reply = '愤怒是强烈的复饮诱因，我理解那种想用酒精麻痹自己的感觉。\n\n💡 建议：尝试写下让你生气的事，或者去快走10分钟来宣泄情绪。\n\n你不需要酒精来解决问题，你已经比这强大多了。';
    } else if (text.includes('孤独')) {
      reply = '孤独感最难熬，但请记住：你并不孤单。\n\n💡 建议：去社区看看大家的打卡日志，你会发现有很多人和你一样在坚持。\n\n或者给支持你的朋友打个电话，说说话就会好很多。';
    } else if (text.includes('累')) {
      reply = '身体疲劳时，大脑会寻求即时奖赏，这是正常的。\n\n💡 建议：现在最好的办法是关掉手机，好好睡一觉。\n\n你明天醒来会感谢今晚做出的选择。';
    } else if (text.includes('劝酒')) {
      reply = '面对劝酒确实很难，但你可以说「不」。\n\n💡 拒酒话术：\n• "最近在吃头孢，真的不能喝"\n• "我正在戒酒，谢谢理解"\n• "开车了，下次吧"\n\n坚持立场，真正的朋友会尊重你的选择。';
    }

    this.addMessage(reply, 'ai');
  },

  // 清空输入
  clearInput() {
    this.setData({ inputText: '' });
  },

  onReady() {
    this.scrollToBottom();
  }
});

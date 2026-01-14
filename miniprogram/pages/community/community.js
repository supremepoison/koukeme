// pages/community/community.js
Page({
  data: {
    posts: [
      {
        id: 1,
        avatar: '🦁',
        name: '清醒的狮子',
        days: 30,
        time: '10分钟前',
        content: '今天路过酒吧，虽然闻到了酒味，但我加快脚步走过去了。现在回家喝着苏打水，感觉非常好。这是我坚持的第30天。💪',
        liked: true,
        likes: 24,
        comments: 3,
        hearts: 8
      },
      {
        id: 2,
        avatar: '🐳',
        name: '逆流而上',
        days: 7,
        time: '1小时前',
        content: '刚才差一点就破戒了。多亏点开了后果模拟室，看着变黑的肝脏，瞬间清醒了。呼，好险。😰',
        liked: false,
        likes: 12,
        comments: 5,
        hearts: 15
      },
      {
        id: 3,
        avatar: '🌞',
        name: '晨曦',
        days: 45,
        time: '3小时前',
        content: '戒酒不仅是省了钱，更多的是赢回了生活的掌控权。每天早上醒来，没有宿醉的头痛，这种感觉太棒了！🌟',
        liked: false,
        likes: 45,
        comments: 8,
        hearts: 32
      },
      {
        id: 4,
        avatar: '🦊',
        name: '森林行者',
        days: 90,
        time: '5小时前',
        content: '3个月了！今天去医院检查，医生说我的肝功能指标已经完全正常了。感谢这个应用，感谢大家的陪伴。🙏',
        liked: true,
        likes: 128,
        comments: 23,
        hearts: 67
      }
    ],
    hasMore: true
  },

  onLoad() {
    // 页面加载
  },

  // 点亮帖子
  toggleLight(e) {
    const index = e.currentTarget.dataset.index;
    const posts = this.data.posts;
    const post = posts[index];

    if (post.liked) {
      post.likes -= 1;
      post.liked = false;
    } else {
      post.likes += 1;
      post.liked = true;
    }

    // 震动反馈
    wx.vibrateShort({
      type: 'light'
    });

    this.setData({ posts });
  },

  // 发新帖子
  newPost() {
    wx.showModal({
      title: '发心情',
      content: '匿名发帖功能开发中...\n\n我们会在未来版本上线，\n敬请期待！',
      showCancel: false
    });
  },

  onReachBottom() {
    if (!this.data.hasMore) return;

    // 模拟加载更多
    wx.showLoading({ title: '加载中...' });

    setTimeout(() => {
      const newPosts = [
        {
          id: 5,
          avatar: '🐰',
          name: '小白兔',
          days: 15,
          time: '刚刚',
          content: '今天和朋友聚餐，他们劝我喝酒。我说"最近在戒酒"，没想到他们都表示理解和支持。真正的朋友就是这样！',
          liked: false,
          likes: 8,
          comments: 2,
          hearts: 5
        }
      ];

      this.setData({
        posts: [...this.data.posts, ...newPosts],
        hasMore: false
      });

      wx.hideLoading();
    }, 1000);
  }
});

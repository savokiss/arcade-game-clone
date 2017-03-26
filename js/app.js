// 这是我们的玩家要躲避的敌人
var Enemy = function (x, y, speed) {
  // 要应用到每个敌人的实例的变量写在这里
  // 我们已经提供了一个来帮助你实现更多
  this.x = x || 0;
  this.y = y || 0;
  this.speed = speed || 100;
  // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
  this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function (dt) {
  // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
  // 都是以同样的速度运行的
  this.x += this.speed * dt;
  this.repeat();
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 让bug重复出现
Enemy.prototype.repeat = function () {
  if (this.x > 500) {
    this.x = -100;
  }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function () {
  this.x = 200;
  this.y = 380;
  this.hasWon = false;
  this.sprite = 'images/char-boy.png'
}

// 更新玩家
Player.prototype.update = function (dt) {
  // TODO
}

// 渲染玩家
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 胜利检测函数
// hasWon 为是否通关辅助变量，用来防止用户点击取消后重复弹框
Player.prototype.checkWin = function () {
  if (this.y < 10 && !this.hasWon) {
    this.hasWon = true;
    // 延时弹窗提示用户已通关
    setTimeout(function(){
      if(confirm('Win~ start again?')){
        // 用户确认后游戏重新开始
        this.reset();
      }
    }.bind(this), 500);
  }
}

// 玩家重置到初始位置
Player.prototype.reset = function () {
  this.x = 200;
  this.y = 380;
  this.hasWon = false;
}

// 处理键盘控制
Player.prototype.handleInput = function (key) {
  // 键盘操作映射map
  var hash = {
    left: handleLeft,
    right: handleRight,
    up: handleUp,
    down: handleDown
  };
  // 处理键盘操作逻辑
  if (hash[key]) {
    hash[key](this);
    this.render();
    // 此处检测是否通关
    this.checkWin();
  }

  // 键盘操作绑定函数
  function handleLeft(scope) {
    scope.x -= 100;
    scope.x = Math.max(scope.x, 0);
  }
  function handleRight(scope) {
    scope.x += 100;
    scope.x = Math.min(scope.x, 400);
  }
  function handleUp(scope) {
    scope.y -= 83;
    scope.y = Math.max(scope.y, -10);
  }
  function handleDown(scope) {
    scope.y += 83;
    scope.y = Math.min(scope.y, 400);
  }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(0, 60), new Enemy(0, 145, 200), new Enemy(0, 230, 300)];
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

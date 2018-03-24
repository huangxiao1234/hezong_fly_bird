//index.js
//定义需要用到的变量
const app = getApp()
var imgArr = ["../image/he0.png", "../image/he2.png"];//小鸟展翅的动画图片数组
var index = 0;//小鸟展翅数组的下标
var index1 = 0;//草的移动数组下标
var imggrass = ["../image/g1.jpg", "../image/g2.jpg"]//草的动画图片数组
var birdtop=200;//小鸟初始位置
var downspped=0;//下降速度的初始值
var flyinterval;//飞翔间断
var downinterval;//下落间断
var pipemoveinterval;//管道障碍间断
var pipemovespeed=1;//管道移动步长
//上方管道定义
var pipeleft=320;//管道距离最左端距离
var pipeleft2 = 320;
var pipeleft3 = 320;
var time=0;//以time的值为时间轴
var pipe2height;//管道长度
var pipeheight;
var pipe3height;
//下方管道定义
var pipeleft11 = 320;
var pipeleft22 = 320;
var pipeleft33 = 320;
var pipe22height;
var pipe11height;
var pipe33height;
var pipemoveinterval;
var score=0;//得分值统计


//该页面的实现
Page({
  data: {
    birdsrc: '../image/he0.png',
    grasssrc:'../image/g1.jpg',
    blocksrc:'../image/pipe_down.png',
    blocksrc2: '../image/pipe_down.png',
    blocksrc3: '../image/pipe_down.png',
    blocksrc11: '../image/pipe_up.png',
    blocksrc22: '../image/pipe_up.png',
    blocksrc33: '../image/pipe_up.png',
    buttonswitch:'',
    birdtop:'200px',
    pipeleft:'320',
    pipeleft2: '320',
    //将初始的管子隐藏，到时间再显示出来，因为这个微信开发没法实现动态添加view，只能用隐藏与显示的方法实现伪动态添加
    b2hidden:"d",
    b3hidden: "d",
    b22hidden: "d",
    b33hidden: "d",
    endhidden:"j",//gameover的标志
    restarthidden:"j",//重新开始标志
    score:score

  },
  //移动函数，把所有管道都放在一个函数里，如果放在多个函数里该统一的参数会因为手机的延迟变得不统一，同理setdata的渲染效果也应该尽量放在一起,打算做个预加载来提高渲染速度【手机里会比较卡，如果不做预加载】
  move(){
    if (time > 200) {
      if (pipeleft2 == -50) {
        score++;
        pipeleft2 = 350
        pipe2height = Math.random() * 300 + 50
        pipeleft22 = 350
        pipe22height = 500 - pipe2height - Math.random() * 20 - 60
        this.setData({ pipe2height: pipe2height + 'px', score: score, pipe22height: pipe22height + 'px' })   
      }
      pipeleft2 = pipeleft2 - pipemovespeed
      pipeleft22 = pipeleft22 - pipemovespeed
      this.setData({
        b22hidden: '',
        b2hidden: '',
        pipeleft2: pipeleft2 - pipemovespeed + 'px' ,pipeleft22: pipeleft22 - pipemovespeed + 'px' })
    };
    //手动添加一根管道
    // if (time > 300) {
    //   this.setData({ b3hidden: '' })
    //   this.setData({ b33hidden: '' })
    //   if (pipeleft3 == 0) {
    //     pipeleft3 = 350
    //     pipe3height = Math.random() * 300 + 50
    //     this.setData({ pipe3height: pipe3height + 'px' })
    //     pipeleft33 = 350
    //     pipe33height = 500 - pipe3height - Math.random() * 20 - 60
    //     this.setData({ pipe33height: pipe33height + 'px' })
    //   }
    //   pipeleft3 = pipeleft3 - pipemovespeed
    //   this.setData({ pipeleft3: pipeleft3 - pipemovespeed + 'px' })
    //   pipeleft33 = pipeleft33 - pipemovespeed
    //   this.setData({ pipeleft33: pipeleft33 - pipemovespeed + 'px' })
    // };
    time=time+1;
    //最开始的管子
    if (pipeleft ==-50) {
      score++;
      pipeleft = 350
      pipeheight = Math.random() * 300 + 50
      pipeleft11 = 350
      pipe11height = 500 - pipeheight - Math.random() * 20 - 60
      this.setData({ pipeheight: pipeheight + 'px', score: score, pipe11height: pipe11height + 'px'})

      // this.setData({ pipe11height: pipe11height + 'px' })
    }
    pipeleft = pipeleft - pipemovespeed
    // console.log(pipeleft,"pipeleft")
    // this.setData({ pipeleft: pipeleft - pipemovespeed + 'px' })
    pipeleft11 = pipeleft11 - pipemovespeed
    this.setData({ pipeleft: pipeleft - pipemovespeed + 'px', pipeleft11: pipeleft11 - pipemovespeed + 'px' })

  },
  //----------------------------------------------------------------
  //点击屏幕小鸟跳起函数
  jumpbird: function () {
      downspped=-8
  },
  //拍打翅膀函数
  headWave() {
    var that = this;
    that.setData({ birdsrc: imgArr[index++] });
    that.setData({grasssrc: imggrass[index1++]});
    if(index == 2) {
      index = 0;
    }
    if (index1 == 2) {
      index1 = 0;
    }
  },
  //关闭按钮
  closebutton:function(){
    this.setData({ b2hidden: 't' })
    this.setData({ b22hidden: 't' })
    score=0
    birdtop=200
    time=0
    pipeleft = 350
    downspped = 0;
    //上方管道定义
    pipeleft = 350;
    pipeleft2 = 350;
    pipeleft3 = 350;
    pipeleft11 = 350;
    pipeleft22 = 350;
    pipeleft33 = 350;
    this.setData({buttonswitch:"true",endhidden:"t",restarthidden:"t"})
    pipeheight = Math.random() * 300 + 50
    pipe2height = Math.random() * 300 + 50
    pipe3height = Math.random() * 300 + 50
    this.setData({ pipeheight: pipeheight + 'px' })
    this.setData({ pipe2height: pipe2height + 'px' })
    this.setData({ pipe3height: pipe3height + 'px' })
    pipe11height = 500 - pipeheight - Math.random() * 20 - 30
    pipe22height = 500 - pipe2height - Math.random() * 20 - 30
    pipe33height = 500 - pipe3height - Math.random() * 20 - 30
    this.setData({ pipe11height: pipe11height + 'px' })
    this.setData({ pipe22height: pipe22height + 'px' })
    this.setData({ pipe33height: pipe33height + 'px' })
    flyinterval = setInterval(this.headWave, 200);//翅膀煽动速度
    setInterval(this.panduan,10)
    downinterval = setInterval(this.down, 40)//下落速度
    pipemoveinterval=setInterval(this.move,10)
  },
  panduan(){
    if (birdtop < pipeheight-10 & pipeleft<=50&pipeleft>=10) {
      clearInterval(downinterval);
      clearInterval(flyinterval);
      clearInterval(pipemoveinterval);
      this.setData({ endhidden: "", restarthidden: "" })
    }
    if (birdtop >600-pipe11height-45 & pipeleft <= 50 & pipeleft >= 10) {
      clearInterval(downinterval);
      clearInterval(flyinterval);
      clearInterval(pipemoveinterval);
      this.setData({ endhidden: "", restarthidden: "" })
    }
    if (birdtop < pipe2height - 10 & pipeleft2 <= 50 & pipeleft2 >= 10) {
      clearInterval(downinterval);
      clearInterval(flyinterval);
      clearInterval(pipemoveinterval);
      this.setData({ endhidden: "", restarthidden: "" })
    }
    if (birdtop > 600 - pipe22height - 45 & pipeleft22 <= 50 & pipeleft22 >= 10) {
      clearInterval(downinterval);
      clearInterval(flyinterval);
      clearInterval(pipemoveinterval);
      this.setData({ endhidden: "", restarthidden: "" })
    }

  },
  //下落函数
  down(){
    if(birdtop>530){
      birdtop=530//防止越界
      clearInterval(downinterval);
      clearInterval(flyinterval);
      clearInterval(pipemoveinterval);
      this.setData({endhidden:"",restarthidden:""})     
    }
    if(birdtop<0){
      birdtop=0
    }
    if(downspped>12){
      downspped=12
    }
    var that=this;
    birdtop=birdtop+downspped;
    downspped++;
    that.setData({birdtop:birdtop+'px'})
  } 

})

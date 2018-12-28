//初始化整个游戏的精灵，作为游戏开始的路口
import {ResourcesLoader} from "./js/base/ResourcesLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    //构造方法
    constructor() {
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourcesLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

    }

    onResourceFirstLoaded(map) {
        this.dataStore.canvas = this.canvas;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        //首先重置游戏是没有结束的
        this.director.isGameOver = false;

        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('startButton',StartButton)
            .put('score', Score);
        this.registerEvent();
        //创建铅笔要在游戏运行之前
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        wx.onTouchStart(() => {
          if (this.director.isGameOver) {
              console.log('游戏开始');
              this.init();
          } else {
              this.director.birdsEvent();
          }
        });
        // this.canvas.addEventListener('touchstart', e => {
        //     //屏蔽掉js的事件冒泡
        //     e.preventDefault();
        //     if (this.director.isGameOver) {
        //         console.log('游戏开始');
        //         this.init();
        //     } else {
        //         this.director.birdsEvent();
        //     }
        // });
    }
}
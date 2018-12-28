//资源文件加载器，确保canvas在图片资源完成后进行渲染
import {Resources} from "./Resources.js";

export class ResourcesLoader {
    constructor() {
        this.map = new Map(Resources);
        console.log(this.map);
        for (let [key, value] of this.map) {
            //微信 wx.crateImage();
            const image = wx.createImage();
            image.src = value;
            //将map里面value替换成image对象
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        let loadedCount = 0;
        for (let value of this.map.values()) {
            //使用箭头函数，里面的this始终指向整个的this
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map);
                }
            }
        }
    }

    static create() {
        return new ResourcesLoader();
    }
}
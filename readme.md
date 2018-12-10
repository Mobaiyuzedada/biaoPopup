# biaoPopup使用文档

## 上手
```html
<link rel="stylesheet" href="my-popup.css">
<link rel="stylesheet" href="btn.css">
<script src="../biaoPopup.js"></script>
<script >
    boot('#trigger', '#popup');
    let btn=document.getElementsByTagName('button');
    console.log( btn);
    for(let i=0;i<btn.length;i++){
        btn[i].classList.add('my-btn');
    }
</script>
```
### 选项
```js
boot('#trigger', '#popup', custom = {//可选
        position: 'centerX-top',//支持centerX,centerY,top,lef,right,bottom任一或多个组合

        /**
         * x_offset:10,//横向偏移量
         * y_offset:20,//纵向偏移量
         * on:'dblclick',//触发方式
         * keyCode:9,//关闭快捷键(按键对应ascii码)
         * /
    });
```
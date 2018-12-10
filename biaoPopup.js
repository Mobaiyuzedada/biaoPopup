window.biaoPopup={
    boot,
}

    //全局变量
    let trigger, popup, mask,config;
    const html=document.documentElement;
    const defaultConfig={//默认配置
        position:'default', 
        x_offset:0,
        y_offset:0,
        on:'click',
        keyCode:27,//Escape
    }


    // boot('#trigger', '#popup',custom={
    //     position:'left-top',
    //     // x_offset:10,
    //     // y_offset:20,
    //     // on:'dblclick',
    //     // keyCode:9,
    // });

    function boot(triggerS, popupS,custom) {
        trigger = document.querySelector(triggerS);
        popup = document.querySelector(popupS)

        //传入配置
        loadConfig(custom);

        //popup初始隐藏，并为用户传入的选择器添加类my-popup以添加弹窗样式
        initPopup();

        //添加遮罩
        creatMask();

        //点击trigger弹出popup
        bindOpen();

        //点击弹窗周围(遮罩mask)关闭
        bindclose();

    }

    function loadConfig(custom){
        // console.log(custom );
        config=Object.assign({},defaultConfig,custom);
        console.log(config );
    }


    //初始化popup
    function initPopup() {
        popup.hidden = true;
        popup.classList.add('my-popup');
    }


    //创建对应遮罩
    function creatMask() {
        //创建遮罩
        mask = document.createElement('div');//创建div节点
        mask.classList.add('my-mask');   //添加遮罩样式
        //指定放置位置
        document.body.appendChild(mask);
        //初始隐藏，如果直接放到trigger里面再次点击会再次添加一个div.my-mask.改为点击触发hidden属性
        mask.hidden = true;
    }

    //监听打开
    function bindOpen() {
        trigger.addEventListener(config.on, () => {
            let arr = ['a', 'left', 'right',];
            setVisibility(true);
            repositionPopup(config.position,config.y_offset,config.x_offset);
        })
    }

    function repositionPopup(position, y_offset = 0, x_offset = 0) {
        let width = popup.offsetWidth;
        let height = popup.offsetHeight;
        const style=popup.style;

        if (!position.includes('-')) {
            if (position === 'left' || position === 'right') {
                position += '-centerY';
                console.log('position:', position);
            } else if (position === 'top' || position === 'bottom') {
                position += '-centerX';
                console.log(position);
            } else {//默认popup横纵都居中
                position = 'centerX-centerY';
                console.log(position);
            }
        }

        if (position.includes('centerX'))
            style.left = html.offsetWidth / 2 - width / 2 + x_offset + 'px';
        if (position.includes('centerY'))
            style.top =html.offsetHeight / 2 - height / 2 + y_offset + 'px';
        if (position.includes('top'))
            style.top = x_offset + 'px';
        if (position.includes('left'))
            style.left = y_offset + 'px';
        if (position.includes('bottom'))
            style.bottom = y_offset + 'px';
        if (position.includes('right'))
            style.right = x_offset + 'px';




        //     switch (position) {
        //         case 'top-left':
        //             popup.style.left = 0 + x_offset + 'px';
        //             popup.style.top = 0 + y_offset + 'px';
        //             break;
        //         case 'bottom-left':
        //             popup.style.left = 0 + x_offset + 'px';
        //             popup.style.bottom = 0 + y_offset + 'px';
        //             break;
        //         case 'center':
        //             popup.style.left = window.innerWidth / 2 - width / 2 + x_offset + 'px';
        //             popup.style.top = window.innerHeight / 2 - height / 2 + y_offset + 'px';
        //             break;
        //     }
    }


    //监听关闭
    function bindclose() {
        mask.addEventListener('click', () => {
            setVisibility(false);
        })
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === config.keyCode)
                setVisibility(false);
        })
    }

    //设置是否显示
    function setVisibility(visible = false) {
        //初始隐藏
        mask.hidden = popup.hidden = !visible;
    }




    //test keyCode
    
    // window.addEventListener('keyup',function(e){
    //     console.log(e.keyCode);
    // })
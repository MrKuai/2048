//定义一个数组，存放格子里的数
var board = new Array();
//定义分数score
var score = 0;

//触控变量
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


$(document).ready(function () {
    Mobile();
    newgame();
});

function Mobile() {
    if (documentWidth > 500) {
        zhutiWidth = 500;
        geziWidth = 100;
        jianju = 20;
    }

    $("#zhuti").css('width', zhutiWidth - 2 * jianju);
    $("#zhuti").css('height', zhutiWidth - 2 * jianju);
    $("#zhuti").css('padding', jianju);
    $("#zhuti").css('border-radius', 0.02 * zhutiWidth);

    $(".div_gezi").css('width', geziWidth);
    $(".div_gezi").css('height', geziWidth);
    $(".div_gezi").css('border-radius', 0.02 * geziWidth);

}

//弢?始新游戏方法
function newgame() {
    //初始化游戏面??
    init();
    //随机在两个格子里生成数字??2或???4??
    generateOneNumber();
    generateOneNumber();
}

//初始化方??
function init() {
//循环遍历每一个小格子
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //根据id获取到小格子
            var gezi = $("#gezi-" + i + "-" + j);
            //通过 .css（）方法赋??位置信??
            gezi.css('top', getPosTop(i, j));
            gezi.css('left', getPosLeft(i, j));
        }
    }

    //将board定义为二维数??
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        //给初始化的每丢?个board的??都赋??为0
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    //调用函数刷新前端页面
    updateBoardView();
    score = 0;
    updateScore(score);//刷新前台的分??
}

//根据board变量的??，对前端的number元素进行丢?些操??
function updateBoardView() {
    $(".number").remove();
    //向zhuti添加number元素（div??
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#zhuti").append('<div class="number" id="number-' + i + '-' + j + '"></div>')
            var theNumber = $('#number-' + i + '-' + j);

            //
            if (board[i][j] == 0) {
                //值为0的时候不显示出来，设宽和高为0px
                theNumber.css('width', '0px');
                theNumber.css('height', '0px');
                //位置为中??
                theNumber.css('top', getPosTop(i, j) + geziWidth / 2);
                theNumber.css('left', getPosLeft(i, j) + geziWidth / 2);
            }
            else {
                //不为0
                theNumber.css('width', geziWidth);
                theNumber.css('height', geziWidth);
                theNumber.css('top', getPosTop(i, j));
                theNumber.css('left', getPosLeft(i, j));
                //调用getNumberBackgroundColor(board[i][j])，给这个number的背景色赋???
                theNumber.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumber.css('color', getNumberColor(board[i][j]));
                theNumber.text(board[i][j]);
            }
        }
    }
    $(".number").css('line-height', geziWidth + 'px');
    $(".number").css('font-size', 0.6 * geziWidth + 'px');
}


//随机在两个格子里生成数字2或4的方法
function generateOneNumber() {
    //调用nospace方法，检查是否还有空??
    if (nospace(board))
        return false;
    else {
        //随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
        //判断随机的位置是否可??
        while (true) {
            if (board[randx][randy] == 0) {
                break;
            }
            else {
                randx = parseInt(Math.floor(Math.random() * 4));
                randy = parseInt(Math.floor(Math.random() * 4));
            }
        }

        //随机一个数
        var randNumber = Math.random() < 0.6 ? 2 : 4;
        //在随机的位置上显示出随机的数??
        board[randx][randy] = randNumber;
        showNumberWithAnimation(randx, randy, randNumber);
        return false;
    }
}

//键盘控制
$(document).keydown(function (event) {
    //阻止按键的默认效果
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                //生成丢?个新的数字格??
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default: //default
            break;
    }
});


//触控监听事件
document.addEventListener('touchstart',function (event) {
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
});
//防止android的触控bug
document.addEventListener('touchmove',function (event) {
    event.preventDefault();
})

document.addEventListener('touchend',function (event) {
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

    var deltax=endx-startx;
    var deltay=endy-starty;

    //判断是否为点击，点击直接return
    if (Math.abs(deltax)<0.2*documentWidth&&Math.abs(deltay)<0.2*documentWidth){
        return
    }

    //如果deltax的绝对值大于detaly的绝对值，则是在X轴方向，左右方向
    if (Math.abs(deltax)>=Math.abs(deltay)){
        //detalx的??大??0，则是向右滑??
        if (deltax>0){
            if (moveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
        //否则就是向左滑动
        else {
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
    }
    //否则就是在Y轴方向，上下
    else {
        //在Y轴，如果deltay大于0，则是向下滑
        if (deltay>0){
            if (moveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
        //否则就是向上滑动
        else {
            if (moveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
        }
    }
});

//向左移动方法
function moveLeft() {
    //首先判断能否移动
    if (!canMoveLeft(board))
        return false;

    for (var i = 0; i < 4; i++) { //可以移动，遍历格子
        for (var j = 1; j < 4; j++) {
            //判断格子里的值是否为不为0
            if (board[i][j] != 0) {
                //落脚点ik
                for (var k = 0; k < j; k++) {
                    //如果落脚点ik为0，且之间没有阻拦
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //满足条件，进行移??
                        showMoveAnimation(i, j, i, k);//移动动画，ij移动到ik
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    //或??落脚点ik与board相等，且之间没有阻拦
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //满足条件，进行移??
                        showMoveAnimation(i, j, i, k);
                        //叠加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        updateScore(score);//刷新前台的分??

                        continue;
                    }
                }
            }
        }
    }
    //等待200毫秒，以执行移动动画
    setTimeout("updateBoardView()", 200);
    return true;
}

//向右移动方法
function moveRight() {

    if (!canMoveRight(board))
        return false;

    //moveRight
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

//向上移动方法
function moveUp() {

    if (!canMoveUp(board))
        return false;

    //moveUp
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

//向下移动方法
function moveDown() {

    if (!canMoveDown(board))
        return false;

    //moveDown
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);

                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}

//判断游戏是否结束
function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}

function gameover() {
    alert("Game Over !")
}
//获得窗口宽度
documentWidth = window.screen.availWidth;
//设置主体宽度
zhutiWidth= 0.92*documentWidth;
//设置小方块宽度
geziWidth= 0.18*documentWidth;
//设置格子间距
jianju = 0.04*documentWidth;

function getPosTop(i, j) {
    return jianju + i * (geziWidth+jianju);
}

function getPosLeft(i, j) {
    return jianju + j * (geziWidth+jianju);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#EDDCD4";
            break;
        case 4:
            return "#EAD9BF";
            break;
        case 8:
            return "#F2B179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#92c";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    else {
        return "white";
    }
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}

//判断是否可以向左移动
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++)
            //如果该格子不是空的
            if (board[i][j] != 0){
                //该格子左边的格子是否为空，或者与其相等，则可以移动，返回true
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
    return false;
}

function canMoveUp() {

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ )
            if( board[i][j] != 0 )
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j] )
                    return true;

    return false;
}

function canMoveRight() {

    for( var i = 0 ; i < 4 ; i ++ )
        for( var j = 2; j >= 0 ; j -- )
            if( board[i][j] != 0 )
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j] )
                    return true;

    return false;
}


function canMoveDown() {

    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- )
            if( board[i][j] != 0 )
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j] )
                    return true;

    return false;
}

//判断块之间是否有阻拦

function noBlockHorizontal( row , col1 , col2 , board ){
    for( var i = col1 + 1 ; i < col2 ; i ++ )
        if( board[row][i] != 0 )
            return false;
    return true;
}

function noBlockVertical( col , row1 , row2 , board ){
    for( var i = row1 + 1 ; i < row2 ; i ++ )
        if( board[i][col] != 0 )
            return false;
    return true;
}

//判断能否继续移动
function nomove(board) {
    if (canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)) {
        return false;
    }
    return true;
}
Page({
  data: {
    num: 0,
    mineMap: makeMineMap(),
    tapMap: makeSpaceMap(),
    isOver:false,
    isWin:false,
    canFlag:false,
    reset: 0
  },
  onLoad: function(options) {

  },
  setFlag:function(){
    this.setData({
      canFlag:!this.data.canFlag
    })
  },
  reset:function(){
    this.setData({
      num: 0,
      mineMap: makeMineMap(),
      tapMap: makeSpaceMap(),
      isOver: false,
      isWin :false,
      canFlag: false,
      reset: this.data.reset+1
    })
  },
  uTe:function(e){
    const tx = e.detail[0];
    const ty = e.detail[1];
    this.setData({
      tapMap: setTapMap(this.data.tapMap,this.data.mineMap,tx,ty)
    })
    if (isMine(this.data.mineMap, tx, ty)) {
      this.setData({
        isOver:true
      })
      wx.vibrateLong();
      return;
    }
    if (countTapMap(this.data.tapMap)==10){
      wx.showToast({
        title: "You Win",
        duration:5000
      })
      this.setData({
        isWin: true
      })
    }
  }
})

function countTapMap(m){
  var n = 0;
  for(var x = 0;x<10;x++){
    for(var y=0;y<10;y++){
      if(m[x][y] == 0){
        n++
      }
    }
  }
  return n;
}

function isMine(mMap, x, y){
  if(mMap[x][y] == 9){
    return true;
  }
  return false;
}

function setTapMap(tMap,mMap,x,y){
  if (tMap[x][y] == 1){
    return tMap;
  }
  tMap[x][y] =  1;
  if(mMap[x][y] == 0){
    autoTap(tMap, mMap, x - 1, y - 1);
    autoTap(tMap, mMap, x - 1, y);
    autoTap(tMap, mMap, x - 1, y + 1);
    autoTap(tMap, mMap, x , y + 1);
    autoTap(tMap, mMap, x + 1, y + 1);
    autoTap(tMap, mMap, x + 1, y );
    autoTap(tMap, mMap, x + 1, y - 1);
    autoTap(tMap, mMap, x, y - 1);
  }
  return tMap;
}

function isInMap(n){
  if(n!=-1&n!=10){
    return true;
  }
  return false;
}

function autoTap(tMap, mMap,x,y){
  if (isInMap(x) & isInMap(y)){
    setTapMap(tMap, mMap, x, y)
  }
}

function makeSpaceMap() {
  var map = [];
  for (var y = 0; y < 10; y++) {
    var unit = []
    map[y] = unit;
    for (var x = 0; x < 10; x++) {
      unit[x] = 0;
    }
  }
  return map;
}

function getRandom() {
  var n;
  while (true) {
    n = Math.floor(Math.random() * 10);
    if (n != 0 & n != 9) {
      return n;
    }
  }
}

function makeMineMap() {
  var map = makeSpaceMap();
  for (var n = 0; n < 10; n++) {
    while (true) {
      var x = getRandom();
      var y = getRandom();
      if (map[x][y] != 9) {
        map[x][y] = 9;
        if (map[x - 1][y - 1] != 9) {
          map[x - 1][y - 1]++;
        }
        if (map[x - 1][y] != 9) {
          map[x - 1][y]++;
        }
        if (map[x - 1][y + 1] != 9) {
          map[x - 1][y + 1]++;
        }
        if (map[x][y - 1] != 9) {
          map[x][y - 1]++;
        }
        if (map[x][y + 1] != 9) {
          map[x][y + 1]++;
        }
        if (map[x + 1][y - 1] != 9) {
          map[x + 1][y - 1]++;
        }
        if (map[x + 1][y] != 9) {
          map[x + 1][y]++;
        }
        if (map[x + 1][y + 1] != 9) {
          map[x + 1][y + 1]++;
        }
        break;
      }
    }
  }
  return map;
}
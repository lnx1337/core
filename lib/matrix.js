function Matrix(width) {
  var breakpoints = [
    { width: 1920, columns: 10 }, 
    { width: 1440, columns: 8 }, 
    { width: 1280, columns: 7 }, 
    { width: 1024, columns: 7 }, 
    { width: 768, columns: 4 }, 
    { width: 560, columns: 3 }, 
    { width: 320, columns: 2 }
  ];
  for( i in breakpoints) {
    if (width >= breakpoints[i].width) {
      return breakpoints[i].columns;
    }
  }
}

module.exports = Matrix;
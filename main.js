window.onload = () => {

  // Cache DOM nodes for better performance
  let h1 = document.getElementById('h1').childNodes;
  let h2 = document.getElementById('h2').childNodes;
  let m1 = document.getElementById('m1').childNodes;
  let m2 = document.getElementById('m2').childNodes;
  let s1 = document.getElementById('s1').childNodes;
  let s2 = document.getElementById('s2').childNodes;
  let nodes = [h1, h2, m1, m2, s1, s2];
  let filteredNodes = [];

  // Create a filtered list of elements
  nodes.forEach((nodeList) => {
    nodeList.forEach((node) => {
      if (node.nodeType === 1) filteredNodes.push(node);
    });
  });

  setInterval(updateClock.bind(null, filteredNodes), 1000);
}

function updateClock(nodes) {
  let timeArr = _getBinaryTime();
  let onIndArr = _getONIndicators(timeArr);
  _redrawIndicators(onIndArr, nodes);
}

function _getBinaryTime() {

  let time = new Date();
  let h = time.getHours().toString();
  if (h.length === 1) h = "0" + h;
  let m = time.getMinutes().toString();
  if (m.length === 1) m = "0" + m;
  let s = time.getSeconds().toString();
  if (s.length === 1) s = "0" + s;

  // Get units at 1s and 10s place 
  let h1 = h.charAt(0);
  let h2 = h.charAt(1);
  let m1 = m.charAt(0);
  let m2 = m.charAt(1);
  let s1 = s.charAt(0);
  let s2 = s.charAt(1);

  // Return individual digits of current time
  return ([h1, h2, m1, m2, s1, s2]);

}

function _getONIndicators(timeArr) {

  let onIndArr = [];

  timeArr.forEach((digit) => {
    digit = +digit;
    let bin = digit.toString(2);
    while (bin.length < 4) {
      bin = "0" + bin; // Padd it with zeros for uniform length of 4
    }
    bin = bin.split('');
    onIndArr.push(bin);
  });

  // Return an array of arrays
  return (onIndArr);

}

function _redrawIndicators(onIndArr, nodes) {
  let nodeList = [...nodes];
  onIndArr.forEach((col) => {
    col.forEach((row) => {
      row = +row;
      let node = nodeList.shift();
      if (row) { // If the indicator is ON (bit is 1)
        node.style.backgroundColor = 'greenyellow';
      } else { // If the indicator is OFF (bit is 0)
        node.style.backgroundColor = '';
      }
    });
  });
}
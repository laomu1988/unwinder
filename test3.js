
function quux(i) {
  var z = 1;
  var obj = { x: 1, y: 2 };
  for(var k in obj) {
    z *= obj[k];
  }
  return z;
}

function mumble(i) {
  var z = 10;
  for(var j=0; j<i; j++) {
    z = j;
  }
  return quux(z);
}

function baz(i) {
  var j = 10;
  do {
    j = 5;
    i--;
  } while(i > 0);

  return mumble(j);
}

function bar(i) {
  if(i > 0) {
    return baz(i) + bar(i - 1);
  }
  return 100;
}

function foo() {
  return bar(10000);
}

console.log(foo());

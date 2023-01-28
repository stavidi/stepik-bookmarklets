javascript:(function(){let w = window, url = w.location;
if (url.hostname == 'stepik.org') {
 let path = url.pathname.split('/');
 if (path[1] == 'lesson') 
  w.open(url.protocol + '//' + url.hostname + 
   ':' + url.port + '/lesson/' + path[2] + '/plain');
}})()

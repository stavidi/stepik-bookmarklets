javascript:(function(url){let w = window;
if (url.hostname == 'stepik.org') {
 let path = url.pathname.split('/');
 if (path[1] == 'lesson') 
  w.open(url.protocol + '//' + url.host
   + '/api/lessons/' + path[2]);
}})(location)

javascript:((url, w=window, d=document) => {
if (url.hostname == 'stepik.org') {
 let path = url.pathname.split('/');

 if (path[1] == 'lesson') {
  w.open(url.origin + '/api/lessons/' + path[2]);

 } else if (path[1] == 'users') {
  w.open(url.origin + '/api/users/' + path[2]);

 } else if (path[1] == 'course' && path.length > 3 && path[3] == 'info') {
  url.assign(url.origin + '/course/' + path[2] + '/syllabus');

 } else if (path[1] == 'course') {
  w.open(url.origin + '/api/courses/' + path[2]);

 } else if (path[1] == 'cert') {
  w.open(url.origin + '/api/certificates/' + path[2]);
 }
}})(location)

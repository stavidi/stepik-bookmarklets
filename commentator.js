javascript: ((url, user = '') => {
  if (url.hostname == 'stepik.org') {
    if (!user) {
      user = prompt('Enter USER id=', user);
    }
    if (url.pathname.startsWith('/learn/courses') && user) {
      let done = 0;
      for (var i = 0; i < document.links.length; i++) {
        xref = document.links[i];
        if (xref.hostname == 'stepik.org' && xref.pathname.startsWith('/course/')) {
          cid = xref.pathname.substring(8);
          if (cid.indexOf('/') > -1) {
            cid = cid.substring(0, cid.indexOf('/'));
          }
          xref.href = xref.origin + '/user-comments/' + user + '?course=' + cid;
          done += 1;
        }
      }
      alert('' + document.links.length + ' ' + done);
    }
  }
})(location, '149226')

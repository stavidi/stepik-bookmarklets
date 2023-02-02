javascript: ((url, w = window, d = document) => {
  if (url.hostname == 'stepik.org') {
    let msg = '<ol>',
      path, courses = {};
    for (let i = 0; i < d.links.length; i++) {
      if (d.links[i].hostname == 'stepik.org') {
        path = d.links[i].pathname.split('/');
        if (path[1] == 'course' && path[2] != '128628' &&
          !(path.length > 3 && !!(path[3]))) {
          if (path[2] in courses) {
            msg += '<li>';
            if (d.links[i].innerHTML != courses[path[2]]) {
              msg += path[2] + '. ' + courses[path[2]] + '<br>';
            }
            msg += '' + path[2] +
              '. <a href="' + d.links[i].href + '">' +
              d.links[i].innerHTML + '</a></li>';
          }
          courses[path[2]] = d.links[i].innerHTML;
        }
      }
    }
    msg += '</ol>';
    if (msg == '<ol></ol>') {
      alert('Дубликаты ссылок на курсы не найдены');
    } else {
      let wnd = w.open();
      wnd.document.write(msg);
      wnd.document.close();
    }
  }
})(location)

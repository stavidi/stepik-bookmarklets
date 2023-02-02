javascript: ((url, user_id = '', course_id = '', w = window, d = document) => {
  if (url.hostname == 'stepik.org') {
    let path = url.pathname.split('/');
    if (path[1] == 'lesson') {
      let ember = d.getElementsByClassName('lesson-sidebar__course-title')[
        0];
      if (!!ember) {
        ember = ember.href.split('/')[4];
      } else {
        ember = prompt('Урок вне курса. Укажите номер курса=',
          course_id).trim()
      }
      if (!!ember) {
        let c = prompt('Enter USER id/url=', user_id).trim();
        if (!!c) {
          if (isNaN(c)) {
            if (c.split('/')[3] == 'users') {
              c = c.split('/')[4]
            } else {
              c = ''
            }
          }
          if (!!c && !isNaN(c)) {
            w.open(url.origin + '/user-comments/' + c +
              '?course=' + ember);
          }
        }
      }
    } else if (path[1] == 'users') {
      let c = prompt('Enter COURSE id/url=', course_id).trim();
      if (!!c) {
        if (isNaN(c)) {
          if (c.split('/')[3] == 'course') {
            c = c.split('/')[4]
          } else {
            c = ''
          }
        }
        if (!!c && !isNaN(c)) {
          w.open(url.origin + '/user-comments/' + path[2] + '?course=' + c);
        }
      }
    } else if (path[1] == 'course') {
      let c = prompt('Enter USER id/url=', user_id).trim();
      if (!!c) {
        if (isNaN(c)) {
          if (c.split('/')[3] == 'users') {
            c = c.split('/')[4]
          } else {
            c = ''
          }
        }
        if (!!c && !isNaN(c)) {
          w.open(url.origin + '/user-comments/' + c + '?course=' + path[2]);
        }
      }
    } else if (path[1] == 'cert') {
      alert('Please, open course or user profile and try again');
    }
  }
})(location)

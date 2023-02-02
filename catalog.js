javascript: ((url, unique = undefined, id = true, promo = undefined) => {
  let qs = (function(ahref) {
    if (ahref.substr(0, 23) == "https://vk.com/away.php") {
      let last = ahref.indexOf("\u0026", 0);
      if (last == -1) last = ahref.length;
      last = ahref.substring(27, last);
      try {
        last = decodeURIComponent(last);
      } catch (ex) {
        console.log("decodeURI error:", ahref);
      }
      return last;
    }
    return ahref;
  });
  const findFirstDiff = (str1, str2) =>
    str2[[...str1].findIndex((el, index) => el !== str2[index])];
  let w = window,
    d = document,
    cnt = '',
    prt = 0,
    cntr = 0;
  if (promo === undefined) {
    if (unique === undefined) {
      promo = true;
    } else {
      promo = false;
    }
  }
  if (url.hostname == 'stepik.org' || url.hostname == 'vk.com' ||
      url.hostname == 'discord.com') {
    let di, h, img, svg, path, div, text, course, courses = {},
      msg = '',
      dbl = {},
      stepic = 0;
    for (let i = 0; i < d.links.length; i++) {
      di = d.links[i];
      h = di.href;
      if (h.substring(0, 7) == 'mailto:') continue;
      if (di.hostname == 'vk.com' && di.pathname == '/away.php') {
        di.href = qs(h);
      }
      if (di.hostname == 'stepik.org') {
        img = di.getElementsByTagName('img');
        svg = di.getElementsByTagName('svg');
        if (img.length + svg.length == 0 &&
          !di.classList.contains(
            'lesson-sidebar__course-title') &&
          !di.classList.contains(
            'catalog-rich-card__link-wrapper') &&
          !di.classList.contains(
            'item-tile__link-wrapper')) {
          stepic += 1;
          path = di.pathname.split('/');
          if (['course', 'a', 'z'].includes(path[1]) &&
            (promo || !(path.length > 3 && !!(path[3]))) &&
            path[3]?.substring(0, 4) !== 'edit') {
            course = decodeURI(path[2]);
          } else if (path.length == 2 && !path[0] && !isNaN(path[1])) {
            course = decodeURI(path[1]);
          } else {
            course = '';
          }
          if (!!(course.trim())) {
            cntr += 1;
            div = di;
            text = (div.textContent || div.innerText ||
              div.innerHTML || "").trim().replaceAll(
              String.fromCharCode(160), ' ');
            if (text.endsWith(' · Stepik')) {
              text = text.substring(0, text.length - 9)
            }
            if (text.trim()) {
              if (course in courses === false) {
                courses[course] = [text];
              } else {
                if (courses[course].includes(text) === false) {
                  courses[course].push(text);
                }
                dbl[course] = (course in dbl ? dbl[course] + 1 : 2);
              }
            }
          }
        }
      }
    }
    if (unique !== undefined && !unique) {
      cnt = Object.keys(dbl).length + ' * 2 + ' + (
        cntr - Object.keys(courses).length - Object.keys(dbl).length);
    }
    let bold, oblique, uniq = (unique === undefined ? 'all' :
      (unique ? 'unique' : 'repeated')) + ' links';
    msg = '<style>a { text-decoration:none; ' +
      'font-family: sans-serif; line-height: 1.5em; } ' +
      'a:hover, a:active { text-decoration: underline; }</style>';
    msg += (id ? '<ul>' : '<ul>'); /* ol */
    /* Create items array */
    let item, items = Object.keys(courses).map(function(key) {
      return [key, courses[key]];
    });
    /* Sort the array based on the second element */
    if (!id) {
      items.sort(function(a, b) {
        if (a[1] < b[1]) return -1;
        if (a[1] > b[1]) return +1;
        return 0;
      });
    }
    for (let i = 0; i < items.length; i++) {
      course = items[i][0];
      if (unique === undefined || (unique ? !(course in dbl) : course in
          dbl)) {
        prt += 1;
        if (course in dbl) {
          if (unique === undefined) {
            oblique = dbl[course] == 2 || dbl[course] == 3;
            bold = dbl[course] > 2;
          } else {
            oblique = dbl[course] == 3 || dbl[course] == 4;
            bold = dbl[course] > 3;
          }
        } else {
          oblique = bold = false;
        }
        msg += '<li>' + (bold ? '<b>' : '') + (oblique ? '<i>' : '') +
          (id ? course + ' ' : ' ') + '<a href="https://stepik.org/' +
          course + '">' + courses[course][
            courses[course].length > 1 ? 1 : 0
          ] +
          '</a>' + (oblique ? '</i>' : '') + (bold ? '</b>' : '') +

          ((unique !== undefined && !unique &&
              courses[course] !== undefined &&
              courses[course].length > 1) ? '<br>' +
            JSON.stringify(findFirstDiff(courses[course][1],
              courses[course][0])) +
            ' ~~ ' + JSON.stringify(findFirstDiff(courses[course][0],
              courses[course][1])) +
            '<br>' + courses[course].join('<br>') + ' ' :
            '') +
          /* (course in dbl ? ' &nbsp; <sub>' + dbl[course] + '</sub>' : '') + */
          '</li>';
      }
    }
    msg += (id ? '</ul>' : '</ul>'); /* </ol> */
    if (prt == 0) {
      alert((unique === undefined ? 'Никакие ссылки' :
          (unique ? 'Неповторимые ссылки' : 'Дубликаты ссылок')) +
        ' на курсы не найдены');
    } else {
      let h123 = d.getElementsByTagName('h1');
      if (h123.length == 0) {
        h123 = d.getElementsByTagName('h2');
      }
      if (h123.length == 0) {
        h123 = d.getElementsByTagName('h3');
      }
      if (h123.length == 0) {
        h123 = d.getElementsByTagName('h4');
      }
      if (h123.length == 0) {
        h123 = d.getElementsByTagName('h5');
      }
      if (h123.length == 0) {
        h123 = d.getElementsByTagName('h6');
      }
      if (h123.length == 0) {
        h123 = d.getElementsByClassName('top-tools__lesson-name');
        if (!!(h123)) {
          h123 = h123[0]?.title; /* Название урока */
        } else {
          h123 = !!(d.title) ? d.title : '';
          /* Step 1 · Название урока · Stepik */
          /* if you need step number */
        }
      } else {
        h123 = h123[0]?.innerText;
      }
      if (h123.indexOf('—') > 0) {
        h123 = h123.substring(0, h123.indexOf('—'));
      }
      let wnd = w.open(''),
        html = '<h3># <a href="' + url.href + '">' + h123 + '</a>' +
        ' <b style="color:#cd0000;"> — ' + (cnt == '' ? prt : cnt) +
        '</b> of ' + cntr + ' (' +
        stepic + ' of ' + d.links.length + ') ' + uniq + ' ' +
        new Date().toLocaleDateString("ru-RU") + '</h3>';
      div = document.createElement("div");
      div.innerHTML = html;
      text = div.textContent || div.innerText || "";
      if (text.indexOf('—') > 0) {
        text = text.substring(0, text.indexOf('—'));
      }
      wnd.document.write('<title>' + text + '</title>');
      wnd.document.write(html + msg + '<p>&nbsp;</p>');
      wnd.document.close();
    }
  }
})(location)

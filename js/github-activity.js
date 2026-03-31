(function () {
  var FULL_CELL_COUNT = 53 * 7;
  var THUMB_CELL_COUNT = 26 * 7;
  var countsPromise = null;

  function isHomePage() {
    if (document.body.classList.contains('is-home')) return true;
    return /^\/(?:index\.html)?$/.test(window.location.pathname);
  }

  function isArchivePage() {
    return /^\/archives(?:\/|$)/.test(window.location.pathname);
  }

  function startOfWeek(date) {
    var d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    return d;
  }

  function endOfWeek(date) {
    var d = new Date(date);
    d.setDate(d.getDate() + (6 - d.getDay()));
    return d;
  }

  function formatDay(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    var d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
  }

  function levelByCount(count) {
    if (count <= 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count <= 4) return 3;
    return 4;
  }

  function getStartDate(end, cellCount) {
    var start = new Date(end);
    start.setDate(start.getDate() - (cellCount - 1));
    return start;
  }

  function buildMonthLabels(start, weeks) {
    var labels = [];
    for (var week = 0; week < weeks; week += 1) {
      var day = new Date(start);
      day.setDate(day.getDate() + week * 7);

      if (week === 0 || day.getDate() <= 7) {
        labels.push('<span>' + (day.getMonth() + 1) + '月</span>');
      } else {
        labels.push('<span></span>');
      }
    }
    return labels.join('');
  }

  function buildYearSwitch(years, activeYear) {
    var html = [];
    for (var i = 0; i < years.length; i += 1) {
      var y = years[i];
      var activeClass = y === activeYear ? ' active' : '';
      html.push('<button class="blog-activity-year-btn' + activeClass + '" data-year="' + y + '" type="button">' + y + '</button>');
    }
    return html.join('');
  }

  function buildCells(start, end, countByDay, cellClassPrefix) {
    var html = [];
    var total = 0;
    var days = 0;

    var max = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
    for (var i = 0; i < max; i += 1) {
      var current = new Date(start);
      current.setDate(current.getDate() + i);
      if (current > end) break;
      days += 1;

      var key = formatDay(current);
      var count = countByDay[key] || 0;
      total += count;

      var level = levelByCount(count);
      var title = key + ' 发布 ' + count + ' 篇';
      html.push('<span class="' + cellClassPrefix + ' lv-' + level + '" title="' + title + '"></span>');
    }

    return {
      cellsHtml: html.join(''),
      total: total,
      days: days
    };
  }

  function parsePostDateFromUrl(url) {
    var match = url.match(/\/(\d{4})\/(\d{2})\/(\d{2})\//);
    if (!match) return null;
    return match[1] + '-' + match[2] + '-' + match[3];
  }

  function extractYears(countByDay) {
    var yearMap = {};
    var keys = Object.keys(countByDay);
    for (var i = 0; i < keys.length; i += 1) {
      var y = Number(keys[i].slice(0, 4));
      if (!Number.isNaN(y)) yearMap[y] = true;
    }

    var thisYear = new Date().getFullYear();
    yearMap[thisYear] = true;

    return Object.keys(yearMap)
      .map(function (v) { return Number(v); })
      .sort(function (a, b) { return b - a; });
  }

  function getYearRange(year) {
    var start = new Date(year, 0, 1);
    var end = new Date(year, 11, 31);
    return {
      rangeStart: start,
      rangeEnd: end,
      gridStart: startOfWeek(start),
      gridEnd: endOfWeek(end)
    };
  }

  async function fetchCountsByDay() {
    var response = await fetch('/search.xml', { credentials: 'same-origin' });
    if (!response.ok) throw new Error('load search.xml failed');

    var xmlText = await response.text();
    var xml = new DOMParser().parseFromString(xmlText, 'application/xml');
    var urls = xml.querySelectorAll('entry > url');
    var countByDay = {};

    for (var i = 0; i < urls.length; i += 1) {
      var text = (urls[i].textContent || '').trim();
      var day = parsePostDateFromUrl(text);
      if (!day) continue;
      countByDay[day] = (countByDay[day] || 0) + 1;
    }

    return countByDay;
  }

  function getCountsByDay() {
    if (!countsPromise) {
      countsPromise = fetchCountsByDay();
    }
    return countsPromise;
  }

  function buildArchiveHtml(countByDay) {
    var end = new Date();
    var start = getStartDate(end, FULL_CELL_COUNT);
    var monthLabels = buildMonthLabels(start, 53);
    var cells = buildCells(start, end, countByDay, 'blog-activity-cell');

    return [
      '<div class="item-headline">',
      '  <i class="fa-solid fa-chart-simple"></i>',
      '  <span>博客活跃度</span>',
      '</div>',
      '<div class="blog-activity-total">最近一年发布 <strong>' + cells.total + '</strong> 篇</div>',
      '<div class="blog-activity-months">' + monthLabels + '</div>',
      '<div class="blog-activity-heatmap">' + cells.cellsHtml + '</div>',
      '<div class="blog-activity-legend"><span>少</span><i class="lv-0"></i><i class="lv-1"></i><i class="lv-2"></i><i class="lv-3"></i><i class="lv-4"></i><span>多</span></div>'
    ].join('');
  }

  function buildArchiveByYearHtml(countByDay, year, years) {
    var range = getYearRange(year);
    var days = Math.round((range.gridEnd.getTime() - range.gridStart.getTime()) / 86400000) + 1;
    var weeks = Math.ceil(days / 7);
    var monthLabels = buildMonthLabels(range.gridStart, weeks);

    var html = [];
    var total = 0;
    for (var i = 0; i < days; i += 1) {
      var current = new Date(range.gridStart);
      current.setDate(current.getDate() + i);

      if (current < range.rangeStart || current > range.rangeEnd) {
        html.push('<span class="blog-activity-cell out-year" title=""></span>');
        continue;
      }

      var key = formatDay(current);
      var count = countByDay[key] || 0;
      total += count;
      var level = levelByCount(count);
      var title = key + ' 发布 ' + count + ' 篇';
      html.push('<span class="blog-activity-cell lv-' + level + '" title="' + title + '"></span>');
    }

    return [
      '<div class="item-headline">',
      '  <i class="fa-solid fa-chart-simple"></i>',
      '  <span>博客活跃度</span>',
      '</div>',
      '<div class="blog-activity-year-switch">' + buildYearSwitch(years, year) + '</div>',
      '<div class="blog-activity-total">' + year + ' 年发布 <strong>' + total + '</strong> 篇</div>',
      '<div class="blog-activity-months" style="grid-template-columns:repeat(' + weeks + ',1fr)">' + monthLabels + '</div>',
      '<div class="blog-activity-heatmap" style="grid-template-columns:repeat(' + weeks + ',1fr)">' + html.join('') + '</div>',
      '<div class="blog-activity-legend"><span>少</span><i class="lv-0"></i><i class="lv-1"></i><i class="lv-2"></i><i class="lv-3"></i><i class="lv-4"></i><span>多</span></div>'
    ].join('');
  }

  function buildHomeThumbHtml(countByDay) {
    var end = new Date();
    var start = getStartDate(end, THUMB_CELL_COUNT);
    var cells = buildCells(start, end, countByDay, 'blog-activity-thumb-cell');

    return [
      '<div class="item-headline">',
      '  <i class="fa-solid fa-chart-simple"></i>',
      '  <span>博客活跃度</span>',
      '</div>',
      '<a class="blog-activity-thumb-link" href="/archives/" title="前往归档页查看完整活跃度">',
      '  <div class="blog-activity-total">近半年发布 <strong>' + cells.total + '</strong> 篇，点击查看完整图</div>',
      '  <div class="blog-activity-thumb">' + cells.cellsHtml + '</div>',
      '</a>'
    ].join('');
  }

  function ensureHomeHost() {
    var asideContent = document.getElementById('aside-content');
    var authorCard = asideContent ? asideContent.querySelector('.card-widget.card-info') : null;
    if (!authorCard) return null;

    var oldCard = document.getElementById('blog-activity-home-card');
    if (oldCard) oldCard.remove();

    if (!isHomePage()) return null;

    var wrapper = document.createElement('div');
    wrapper.className = 'card-widget';
    wrapper.id = 'blog-activity-home-card';
    wrapper.innerHTML = [
      '<div class="item-headline">',
      '  <i class="fa-solid fa-chart-simple"></i>',
      '  <span>博客活跃度</span>',
      '</div>',
      '<div class="blog-activity-loading">正在统计博客活跃度...</div>'
    ].join('');

    authorCard.insertAdjacentElement('afterend', wrapper);
    return wrapper;
  }

  function ensureArchiveHost() {
    var old = document.getElementById('blog-activity-archive-card');
    if (old) old.remove();

    if (!isArchivePage()) return null;
    var archiveContainer = document.getElementById('archive');
    if (!archiveContainer) return null;

    var wrapper = document.createElement('div');
    wrapper.className = 'card-widget blog-activity-archive-card';
    wrapper.id = 'blog-activity-archive-card';
    wrapper.innerHTML = '<div class="blog-activity-loading">正在统计博客活跃度...</div>';
    archiveContainer.insertAdjacentElement('afterbegin', wrapper);
    return wrapper;
  }

  async function renderHomeActivity() {
    var wrapper = ensureHomeHost();
    if (!wrapper) return;

    try {
      var countByDay = await getCountsByDay();
      wrapper.innerHTML = buildHomeThumbHtml(countByDay);
    } catch (e) {
      wrapper.innerHTML = '<div class="blog-activity-loading">活跃度数据加载失败</div>';
    }
  }

  async function renderArchiveActivity() {
    var wrapper = ensureArchiveHost();
    if (!wrapper) return;

    try {
      var countByDay = await getCountsByDay();
      var years = extractYears(countByDay);
      var defaultYear = years.indexOf(new Date().getFullYear()) >= 0 ? new Date().getFullYear() : years[0];

      var renderYear = function (year) {
        wrapper.innerHTML = buildArchiveByYearHtml(countByDay, year, years);
        var buttons = wrapper.querySelectorAll('.blog-activity-year-btn');
        for (var i = 0; i < buttons.length; i += 1) {
          buttons[i].addEventListener('click', function (e) {
            var y = Number(e.currentTarget.getAttribute('data-year'));
            if (!Number.isNaN(y)) renderYear(y);
          });
        }
      };

      renderYear(defaultYear);
    } catch (e) {
      wrapper.innerHTML = '<div class="blog-activity-loading">活跃度数据加载失败</div>';
    }
  }

  function renderAll() {
    renderHomeActivity();
    renderArchiveActivity();
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderAll();
  });
  document.addEventListener('pjax:complete', function () {
    renderAll();
  });
})();

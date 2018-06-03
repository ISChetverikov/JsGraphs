
var lightblue = 'rgb(0,174,234)';
var verylightblue = 'rgb(229,247,240)';
var transp = 'rgb(255,255,255,1)';

// Переменные графа
var chart = [];
var graphEngine;

// Массив ребер
var linkIds = [];
// Массив топов
var topTen = [];

// Переменные для сохранения размера экрана
var height = 0;
var width = 0;

// Загрузка узлов и ребер из объекта JSON, формирование групп
function loadFromJson(obj) {
    var chartData = {
        type: 'LinkChart',
        items: []
    };

    // Массив группировок
    var groupsDefn = [];

    for (var i = 0; i < obj.nodes.length; i++) {
        var node = obj.nodes[i];
        var id = "node" + i;

        chartData.items.push({
            id: id,
            u: 'icon.png',
            type: 'node',
            t: node.name,
            fb: true,
            fbc: transp,
            fs: 40
        });

        // Заполняем массив группировок
        var comboStyle = { b: lightblue, bw: 2, c: lightblue, e: 1.25, fbc: 'white' };
        var openStyle = { b: lightblue, bw: 4 };
        if (groupsDefn[node.group] === undefined)
            groupsDefn[node.group] = {
                ids: [],
                open: true,
                label: '',
                style: comboStyle,
                openStyle: openStyle
            };
        groupsDefn[node.group].ids.push(id);
    }


    for (var j = 0; j < obj.links.length; j++) {
        var link = obj.links[j];
        var linkId = "link" + j;
        var linkSource = "node" + link.source;
        var linkTarget = "node" + link.target;

        linkIds[j] = linkId;
        // Считаем сколько ребер у вершин (степень вершин)
        (found = topTen.find(x => x.name == linkSource)) === undefined ?
            topTen.push({ name: linkSource, value: 1 }) :
            found.value++;
        (found = topTen.find(x => x.name == linkTarget)) === undefined ?
            topTen.push({ name: linkTarget, value: 1 }) :
            found.value++;

        chartData.items.push({
            id: linkId,
            type: 'link',
            id1: linkSource,
            id2: linkTarget,
            w: link.value,
            a1: true,
            a2: true
        });
    }

    // Опеределяем 10 вершин с наибольшим количеством ребер
    topTen.sort((x, y) => { return y.value - x.value; });
    topTen = topTen.slice(0, 10);

    chart.load(chartData, function () {
        afterLoad(groupsDefn);
    });
}

// Загрузка графа
function chartLoaded(err, loadedChart) {
    chart = loadedChart;
    graphEngine = KeyLines.getGraphEngine();

    $.ajax({
        type: "GET",
        url: "https://bost.ocks.org/mike/miserables/miserables.json",
        dataType: "json",
        success: function (json) {
            loadFromJson(json);
        }
    });
}

// Действия после загрузки (группировка узлов)
function afterLoad(groupsDefn) {

    chart.combo().combine(
        groupsDefn,
        {
            animate: false,
            select: false,
            arrange: 'concentric'
        },
        function (comboIds) {
            
            var comboLinks = chart.graph().neighbours(comboIds).links;
            
            chart.setProperties(comboLinks.map(function (id) {
                return { id: id, w: '6', ls: 'dashed' };
            }), false, chart.layout);
        }
        
    );

    // Вешаем обработчик на чек-бокс
    $('#is_all_links_cb').click(function () {
        formatLinksBetweenCombos($(this).is(':checked'));
    });

    // Вешаем обработчик изменения выбора
    chart.bind('selectionchange', revealNeighbours);
}

// Выделение соседей выбранных узлов
function revealNeighbours() {

    var ids = chart.selection();

    // Показывать ли все ребра
    var isAllLinksShowed = $('#is_all_links_cb').is(':checked');
    graphEngine.load(chart.serialize());

    // Если есть выделенные узлы
    if (ids.length > 0) {
        
        var underlyingIds = getUnderlyingIds(ids);
        var neighbours = graphEngine.neighbours(underlyingIds);
        if (!isAllLinksShowed) {
            chart.combo().reveal(neighbours.links.concat(underlyingIds));
        }
        var itemsToForeground = neighbours.nodes.concat(neighbours.links).concat(underlyingIds);
        chart.foreground(
            function (item) {
                return (itemsToForeground.indexOf(item.id) !== -1);
            },
            { type: 'all' }
        );
    } else {
        
        if (!isAllLinksShowed) {
            chart.combo().reveal([]);
        }
        chart.foreground(function () { return true; });
    }
}

// Получение внутренних узлов группы (либо сам узел, если не группа)
function getUnderlyingIds(ids) {
    var underlyingIds = [];
    ids.forEach(function (id) {
        var info = chart.combo().info(id);
        if (info) {
            var subIds = info.links.concat(info.nodes).map(function (item) {
                return item.id;
            });
            underlyingIds = underlyingIds.concat(subIds);
        } else {
            underlyingIds.push(id);
        }
    });
    return underlyingIds;
}

// Действия при нажатии на чек-бокс 
// (выделение всех ребер/ группировка ребер)
function formatLinksBetweenCombos(isAllLinksShowed) {
    
    if (isAllLinksShowed) {
        chart.combo().reveal(linkIds);
    }
    // Прячем все ребра
    var formattedLinks = [];
    chart.each({ type: 'link', items: 'toplevel' }, function (link) {
        formattedLinks.push({ id: link.id, hi: isAllLinksShowed });
    });
    // Показываем необходимые
    chart.setProperties(formattedLinks, false, function () {
        revealNeighbours();
    });
}

// Изменение размера окна при вкл/выкл полноэкранного режима
function resize(isFullScreen) {

    if (isFullScreen) {
        height = $('#fullScreen').height();
        width = $('#fullScreen').width();
        
        KeyLines.setSize('kl', screen.width, screen.height);
        
        $('#fsBtn').hide();
    } else {
        KeyLines.setSize('kl', width, height);
        $('#fsBtn').show();
    }
    
    fitChartWithDelay();
}

// Анимация изменения окна при смене режима
function fitChartWithDelay() {
    setTimeout(function () {
        chart.zoom('fit', { animate: true, time: 300 });
    }, 200);
}

// Точка входа выполнения скрипта
$(function () {

    // Настройка слайдера для выбора топа
    $("#slider").bootstrapSlider();
    $(".slider-selection").css('background', '#BABABA');
    $("#slider").on("change", function (slideEvt) {

        chart.selection(topTen.slice(0, slideEvt.value.newValue)
            .map(x => x.name));

        revealNeighbours();
    });

    // Настройка и запуск SDK
    KeyLines.paths({
        assets: 'lib/KeyLines/assets/',
        flash: {
            swf: 'lib/KeyLines/swf/keylines.swf',
            swfObject: 'lib/KeyLines/js/swfobject.js',
            expressInstall: 'lib/KeyLines/swf/expressInstall.swf'
        }
    });

    var options = {
        backgroundAlpha: 0.1,
        selectionColour: lightblue
    };
    KeyLines.create({ id: 'kl', type: 'chart', options: options }, chartLoaded);

    $('#fsBtn').click(function (evt) {
        if (KeyLines.fullScreenCapable()) {
            KeyLines.toggleFullScreen(document.getElementById('fullScreen'), resize);
        }
    });
});


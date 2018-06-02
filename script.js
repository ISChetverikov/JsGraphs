var red = 'rgba(214, 39, 40, 0.75)';
var blue = 'rgb(31, 119, 180)';
var green = 'rgba(44, 160, 44, 0.75)';
var orange = 'rgb(255, 127, 14)';
var lightBlue = 'rgb(174, 199, 232)';
var lightGrey = 'rgb(220, 220, 220)';
var darkGrey = 'rgb(105, 105, 105)';
var black = 'rgb(0, 0, 0)';

var chart = [];
var graphEngine;
var linkIds = [];
var topTen = [];

var height = 0;
var width = 0;

// Загрузка узлов и ребер из объекта JSON, формирование групп
function ParseJSONData (obj) {
    var chartData ={
        type: 'LinkChart',
        items: []
    };
    
    // Массив группировок
    var groupsDefn = [];
    
    for(  var i = 0; i < obj.nodes.length; i++) {
        var node = obj.nodes[i];
        var id = "node"+i;
        
        chartData.items.push( {
            id: id,
            u: 'icon.png',
            type: 'node',
            t: node.name
        });
        
        // Заполняем массив группировок
        var comboStyle = { b: green, bw: 2, c: green, e: 1.25, fbc: 'white' };
        if (groupsDefn[node.group] === undefined)
            groupsDefn[node.group] = { 
                ids: [],
                open: true,
                label: '',
                style: comboStyle 
            };
        groupsDefn[node.group].ids.push(id);
    }


    for  (var j = 0; j < obj.links.length; j++) {
        var link = obj.links[j];
        var linkId = "link" + j;
        var linkSource = "node" + link.source;
        var linkTarget = "node" + link.target;

        linkIds[j] = linkId;
        // Считаем сколько ребер у вершин
        (found = topTen.find(x => x.name == linkSource)) === undefined ?
            topTen.push({ name: linkSource, value: 1 }) :
            found.value++;
        (found = topTen.find(x => x.name == linkTarget)) === undefined ?
            topTen.push({ name: linkTarget, value: 1 }) :
            found.value++;

        chartData.items.push ({
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
    
    chart.load(chartData, function(){
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
        success: function(json){
            ParseJSONData(json);
        }
    });
}

// Действия после загрузки
function afterLoad(groupsDefn) {
  
  chart.combo().combine(
        groupsDefn,
        {
            animate: false,
            select: false,
            arrange: 'concentric'
        },
        function (comboIds) {
        // Style the combo links
        var comboLinks = chart.graph().neighbours(comboIds).links;
        chart.setProperties(comboLinks.map(function (id) {
            return { id: id, w: '6', ls: 'dashed' };
        }), false, chart.layout);
    }
  );
  $('#onlyunderlying').click(function () {
    formatLinksBetweenCombos($(this).is(':checked'));
  });

  chart.bind('selectionchange', revealNeighbours);
}

function revealNeighbours() {
    
  var ids = chart.selection();

  var onlyUnderlying = $('#onlyunderlying').is(':checked');
  graphEngine.load(chart.serialize());
  if (ids.length > 0) {
    // Get, show (if required), and foreground the neighbours of the underlying items
    var underlyingIds = getUnderlyingIds(ids);
    var neighbours = graphEngine.neighbours(underlyingIds);
    if (!onlyUnderlying) {
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
    // No items selected, foreground everything
    if (!onlyUnderlying) {
      chart.combo().reveal([]);
    }
    chart.foreground(function () { return true; });
  }
}

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

function formatLinksBetweenCombos(onlyunderlying) {
  // If only showing underlying links, reveal them all
  if (onlyunderlying) {
    chart.combo().reveal(linkIds);
  }
  // Set the hidden property on the top level links
  var formattedLinks = [];
  chart.each({ type: 'link', items: 'toplevel' }, function (link) {
    formattedLinks.push({ id: link.id, hi: onlyunderlying });
  });
  chart.setProperties(formattedLinks, false, function () {
    // Update the backgrounding/foregrounding
    revealNeighbours();
  });
}

function resize(isFullScreen) {
    
    if (isFullScreen) {
        height = $('#fullScreen').height();
        width = $('#fullScreen').width();

        console.log(width);
        KeyLines.setSize('kl', screen.width, screen.height);
        // Hide the button in fullscreen mode
        $('#fsBtn').hide();
    } else {
        KeyLines.setSize('kl', width, height);
        $('#fsBtn').show();
    }
    // After resize, fit the chart to the window
    fitChartWithDelay();
}

function fitChartWithDelay() {
    setTimeout(function () {
        chart.zoom('fit', { animate: true, time: 300 });
    }, 200);
}

// Запуск KeyLines
$(function () {

    $("#ex1").bootstrapSlider();
    $(".slider-selection").css('background', '#BABABA');
    $("#ex1").on("change", function (slideEvt) {
        
        chart.selection(topTen.slice(0, slideEvt.value.newValue)
            .map(x => x.name));
        
        revealNeighbours();
    });

    KeyLines.paths({ 
        assets: 'lib/KeyLines/assets/',
        flash: { 
            swf: 'lib/KeyLines/swf/keylines.swf', 
            swfObject: 'lib/KeyLines/js/swfobject.js', 
            expressInstall: 'lib/KeyLines/swf/expressInstall.swf' 
        }
    });
  
    KeyLines.create('kl', chartLoaded);

    $('#fsBtn').click(function (evt) {
        if (KeyLines.fullScreenCapable()) {
            KeyLines.toggleFullScreen(document.getElementById('fullScreen'), resize);
        }
    });
});


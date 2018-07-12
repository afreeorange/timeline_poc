const scrollDuration = 500;

Math.easeInOutQuad = function (current_time, start_val, value_change, duration) {
    current_time /= duration/2;
    if (current_time < 1) return value_change/2*current_time*current_time + start_val;
    current_time--;
    return -value_change/2 * (current_time*(current_time-2) - 1) + start_val;
};

function smoothScroll(element, to, duration) {
    let start = element.scrollLeft;
    let change = to - start;
    let currentTime = 0;
    let increment = 20;

    let animateScroll = () => {        
        currentTime += increment;
        let val = Math.easeInOutQuad(currentTime, start, change, duration);
        element.scrollLeft = val;

        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    }

    animateScroll();
}

const nodesWithData = document.querySelectorAll('.node-with-data');

function hideAllPopups() {
    document.querySelectorAll('.popup').forEach(p => {
        p.style.visibility = 'hidden';
    });
}

// // Hide all popups when any place outside the track is clicked
// document.getElementById('timeline-wrapper').addEventListener('click', event => {
//     hideAllPopups();
// });

// Each node, when clicked will...
nodesWithData.forEach(node => {
    node.addEventListener('click', event => {

        // hide all other popups
        hideAllPopups();

        // will show its child popup...
        let nodePopup = node.getElementsByClassName('popup')[0];
        nodePopup.style.visibility = 'visible';
    });
});

// Scroll timeline to left and right
document.getElementById('ahead').addEventListener('click', e => {
    smoothScroll(document.getElementById('timeline-wrapper'), 0, scrollDuration);
});

document.getElementById('behind').addEventListener('click', e => {
    smoothScroll(document.getElementById('timeline-wrapper'), document.getElementById('timeline').getBoundingClientRect().width, scrollDuration);
});


// instantiate the graph
// view-source:https://shutterstock.github.io/rickshaw/examples/lines.html
var seriesData = [ [], [], [] ];
var random = new Rickshaw.Fixtures.RandomData(150);

for (var i = 0; i < 150; i++) {
    random.addData(seriesData);
}

var graph = new Rickshaw.Graph( {
    element: document.getElementById('graph-wrapper'),
    width: document.getElementById('timeline').getBoundingClientRect().width,
    height: 250,
    renderer: 'line',
    series: [
        {
            color: "#c05020",
            data: seriesData[0],
            name: 'Flibbity'
        }, {
            color: "#30c020",
            data: seriesData[1],
            name: 'Flabbity'
        }, {
            color: "#6060c0",
            data: seriesData[2],
            name: 'Floo!'
        }
    ]
} );

graph.render();

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: graph
} );

var legend = new Rickshaw.Graph.Legend( {
    graph: graph,
    element: document.getElementById('legend')

} );

var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: graph,
    legend: legend
} );

var axes = new Rickshaw.Graph.Axis.Time( {
    graph: graph
} );
axes.render();

/**
 * @license MIT, http://github.com/asvd/dragscroll
 */
!function(e,n){"function"==typeof define&&define.amd?define(["exports"],n):"undefined"!=typeof exports?n(exports):n(e.dragscroll={})}(this,function(e){var n,t,o=window,l=document,c="mousemove",r="mouseup",i="mousedown",m="EventListener",d="add"+m,s="remove"+m,f=[],u=function(e,m){for(e=0;e<f.length;)(m=(m=f[e++]).container||m)[s](i,m.md,0),o[s](r,m.mu,0),o[s](c,m.mm,0);for(f=[].slice.call(l.getElementsByClassName("dragscroll")),e=0;e<f.length;)!function(e,m,s,f,u,a){(a=e.container||e)[d](i,a.md=function(n){e.hasAttribute("nochilddrag")&&l.elementFromPoint(n.pageX,n.pageY)!=a||(f=1,m=n.clientX,s=n.clientY,n.preventDefault())},0),o[d](r,a.mu=function(){f=0},0),o[d](c,a.mm=function(o){f&&((u=e.scroller||e).scrollLeft-=n=-m+(m=o.clientX),u.scrollTop-=t=-s+(s=o.clientY),e==l.body&&((u=l.documentElement).scrollLeft-=n,u.scrollTop-=t))},0)}(f[e++])};"complete"==l.readyState?u():o[d]("load",u,0),e.reset=u});

const scrollDuration = 500;
const timelineNodes = document.querySelectorAll('.node');
const nodesWithData = document.querySelectorAll('.node-with-data');
const theWidth = timelineNodes.length * timelineNodes[0].offsetWidth + 'px';

// Set width of timeline and graph
// TODO: Do this in CSS
document.getElementById('timeline').style.width = theWidth;
document.getElementById('graphs').style.width = theWidth;

// TODO: Make this sane.
// https://gist.github.com/gre/1650294
Math.easeInOutQuad = function (current_time, start_val, value_change, duration) {
    current_time /= duration / 2;
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

function hideAllPopups() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.style.visibility = 'hidden';
    });
}

function clearActiveNodes() {
    nodesWithData.forEach(node => {
        node.classList.remove('active-node');
    });
}

// Each node, when clicked will...
nodesWithData.forEach(node => {
    node.addEventListener('click', event => {
        // hide all other popups
        hideAllPopups();

        // will show its child popup...
        let nodePopup = node.getElementsByClassName('popup')[0];
        nodePopup.style.visibility = 'visible';

        // clear all active nodes
        clearActiveNodes();

        // set active class
        node.classList.add('active-node');
    });
});

// Scroll timeline to left and right
document.getElementById('ahead').addEventListener('click', e => {
    smoothScroll(document.getElementById('timeline-wrapper'), 0, scrollDuration);
});

document.getElementById('behind').addEventListener('click', e => {
    smoothScroll(document.getElementById('timeline-wrapper'), document.getElementById('timeline').getBoundingClientRect().width, scrollDuration);
});


// Set the graph bounds
// TODO: Do this in CSS.
document.getElementById('graphs').style.width = document.getElementById('timeline').getBoundingClientRect().width + 'px';

// Draw some random graphs
const nodeCount = document.querySelectorAll('.node').length;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDataset(min, max) {
    let data = [];
    for (let i = nodeCount - 1; i >= 0; i--) {
        data[i] = {
            x: i,
            y: getRandomIntInclusive(min, max)
        };
    }
    return data;
}

let randomGraphA = new Rickshaw.Graph({
    element: document.getElementById('graph-a'),
    renderer: 'bar',
    width: 2700,
    height: 50,
    series: [{
        data: getRandomDataset(0, 3),
        color: 'steelblue'
    }]
});

randomGraphA.render();

let randomGraphB = new Rickshaw.Graph({
    element: document.getElementById('graph-b'),
    renderer: 'area',
    width: 2700,
    height: 50,
    series: [{
        data: getRandomDataset(0, 12),
        color: 'steelblue'
    }]
});

randomGraphB.render();

let randomGraphC = new Rickshaw.Graph({
    element: document.getElementById('graph-c'),
    renderer: 'lineplot',
    width: 2700,
    height: 50,
    series: [{
        data: getRandomDataset(4, 8),
        color: 'steelblue'
    }]
});

randomGraphC.render();

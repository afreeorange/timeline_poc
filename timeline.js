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
    document.getElementById('timeline-wrapper').scrollLeft = 0;
});

document.getElementById('behind').addEventListener('click', e => {
    document.getElementById('timeline-wrapper').scrollLeft = document.getElementById('timeline').getBoundingClientRect().width;
});

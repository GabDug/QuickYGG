console.log("Quick YGG loaded!");

// Which colum to add the column after ? 
const newColumnIndex = 2; // 1 will be the second column, between "type" and "name"
// 2 is suggested as CSS and JS from YGG expect 2nd column to be name

chrome.extension.sendMessage({}, function (response) {
    var readyStateCheckInterval = setInterval(function () {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            // ----------------------------------------------------------
            // This part of the script triggers when page is done loading
            console.log("Hello. This message was sent from scripts/inject.js");
            // ----------------------------------------------------------

        }
    }, 10);
});

window.addEventListener("load", myMain, false);

function myMain(evt) {

    const tables = document.querySelectorAll('table.table');

    tables.forEach(table => {
    
        console.log("Executed")
        // Add a new cell in heading (td)
        let row = table.tHead.rows[0];
        let td = row.insertCell(newColumnIndex);

        // Make it a header cell (th)
        var th = document.createElement('th');
        th.innerHTML = td.innerHTML;
        td.parentNode.replaceChild(th, td);

        th.colSpan = 1;
        th.innerText = 'DL';
        th.classList = ['quick-download-header'];

        for (let row of table.tBodies[0].rows) {
            // First, get the link from the link in the "name" column, which is index 1 (before adding a cell)
            const link = row.cells[1].firstChild.href;
            const name = link.substr(link.lastIndexOf('/') + 1);
            const id = name.substr(0, name.indexOf('-'));

            // Add new cell with download button
            let td = row.insertCell(newColumnIndex);
            td.innerHTML = '<a href="' + window.location.origin + '/engine/download_torrent?id=' + id + '"><span class="ico_download"></span></a>';
            td.classList = ['quick-download-item']
        };
    });
}
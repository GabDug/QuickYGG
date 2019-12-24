console.log("Quick YGG loaded!");
chrome.runtime.sendMessage({"message": "activate_icon"});
// Which colum to add the column after ? 
const newColumnIndex = 2; // 1 will be the second column, between "type" and "name"
// 2 is suggested as CSS and JS from YGG expect 2nd column to be name

// We wait for complete state before adding DL icon (so we don't break YGG by adding a new column)
window.addEventListener("load", myMain, false);

function myMain(evt) {

    const tables = document.querySelectorAll('table.table');

    tables.forEach(table => {
        console.log(table.rows.length);
        if (table.rows.length <= 1) {
            console.log("Not processing! Table is empty.")
            // We have to check every 100ms if the table is populated.
            // Because we are unable to get the DataTable jQuery event from the page
            let checkExist = setInterval(function () {
                if (table.rows.length > 1) {
                    clearInterval(checkExist);
                    tableProcess(table);
                }
            }, 100);
        }
        else {
            console.log("Quick YGG running!")
            tableProcess(table);
        }


    });
}

function tableProcess(table) {
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
}
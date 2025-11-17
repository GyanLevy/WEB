// src/userManagement.js

const html = document.documentElement;
const userName = document.getElementById('userName');

// משתנה גלובלי שישמור את תוכן db.json לאחר fetch
let jsonData = null;

// טעינת נתונים בעת עליית הדף
window.onload = function () {

    // שליפת המשתמש המחובר מ-localStorage
    let user = JSON.parse(localStorage.getItem('currentUser'));

    // עדכון טקסט הכותרת
    if (user) {
        userName.innerHTML = "Welcome " + user.username;
    } else {
        userName.innerHTML = "Welcome (No user logged in)";
    }

    // שליפת נתוני db.json
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;        // נשמור גלובלית
            populateTable('usersData', jsonData);
        });
};


// פונקציה לבניית הטבלה
function populateTable(tableId, jsonData) {

    const table = document.getElementById(tableId);
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    thead.innerHTML = '';
    tbody.innerHTML = '';

    if (jsonData.users.length > 0) {

        // כותרות (למעט הסיסמה)
        const headers = Object.keys(jsonData.users[0]).filter(h => h !== "password");

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            th.classList.add('px-4', 'py-2', 'text-left');
            thead.appendChild(th);
        });

        // בניית שורות הטבלה
        jsonData.users.forEach(item => {
            const tr = document.createElement('tr');

            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = item[header];
                td.classList.add('border', 'px-4', 'py-2');

                // הפיכת התא לעריך
                td.addEventListener("dblclick", () => editable.edit(td));

                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.textContent = "No data found in JSON.";
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
}


// אובייקט התומך בעריכה של תאי טבלה
let editable = {

    ccell: null,
    cval: null,

    edit: cell => {
        editable.ccell = cell;
        editable.cval = cell.innerHTML;

        cell.classList.add("edit");
        cell.contentEditable = true;
        cell.focus();

        cell.onblur = editable.done;
        cell.onkeydown = e => {
            if (e.key === "Enter") editable.done();
            if (e.key === "Escape") editable.done(1);
        };
    },

    done: discard => {

        editable.ccell.onblur = "";
        editable.ccell.onkeydown = "";
        editable.ccell.classList.remove("edit");
        editable.ccell.contentEditable = false;

        if (discard === 1) { // ESC
            editable.ccell.innerHTML = editable.cval;
        }

        // אם הערך השתנה – לבצע עדכון בקובץ
        if (editable.ccell.innerHTML !== editable.cval) {
            console.log("change");

            // --- עדכון בקובץ db.json ---

            // 1. איתור שם השדה
            const headerIndex = editable.ccell.cellIndex;
            const headers = Object.keys(jsonData.users[0]).filter(h => h !== "password");
            const fieldName = headers[headerIndex];

            // 2. איתור השורה (המשתמש המתאים)
            const rowIndex = editable.ccell.parentElement.rowIndex - 1; 
            const userToUpdate = users[rowIndex]; // users מגיע מ-users.js

            // 3. עדכון הערך
            userToUpdate[fieldName] = editable.ccell.innerHTML;

            // 4. שמירה לקובץ DB חדש
            updateData(); // מתוך users.js — יוצר הורדה של db.json החדש
        }
    }
};

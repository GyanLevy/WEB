// users.js

// מערך גלובלי של משתמשים
let users = [];

// קובץ ה-DB שממנו נטען ושאליו נשמור
const file = "db.json";

function initUsers() {
    let rawFile = new XMLHttpRequest(); // יצירת אובייקט בקשה חדש
    rawFile.open("GET", file, false);   // פתיחת בקשה לקריאת הקובץ (סינכרוני)

    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            // בדיקה אם הסטטוס תקין (200 - הצלחה, 0 - לעיתים בקובץ מקומי)
            if (rawFile.status === 200 || rawFile.status == 0) {
                let allText = rawFile.responseText;   // קריאת הטקסט מהתגובה
                let data = JSON.parse(allText);       // המרת הטקסט לאובייקט
                users = data.users || [];             // שמירת מערך המשתמשים במשתנה גלובלי
            }
        }
    };

    rawFile.send(null); // שליחת הבקשה
}

function find(nameOrMail) {
    // אם המערך עדיין ריק – נאתחל אותו מהקובץ
    if (!users || users.length === 0) {
        initUsers();
    }
    // נחזיר מהמערך משתמש עם שם משתמש או מייל הזהה לפרמטר
    return users.find(u => u.username === nameOrMail || u.email === nameOrMail);
}

function updateData() {
    // המרת מערך המשתמשים למחרוזת עם המבנה הרצוי
    let data = '{ "users": ' + JSON.stringify(users) + ' }';

    // יצירת אובייקט בינארי של הנתונים
    const blob = new Blob([data], { type: 'application/json' });

    // יצירת כתובת רשת זמנית לאובייקט
    const url = URL.createObjectURL(blob);

    // יצירת אלמנט קישור להורדת הקובץ
    const a = document.createElement('a');
    a.download = file; // הגדרת שם הקובץ שיישמר
    a.href = url;      // הצמדת כתובת הרשת של האובייקט לאלמנט
    a.click();         // סימולציה של לחיצה כדי להתחיל בהורדה

    URL.revokeObjectURL(url); // ניקוי המשאב מהזיכרון
}

function add(username, email, password, dob, isAdmin) {
    // ודא שהמערך מאותחל לפני הוספה
    if (!users || users.length === 0) {
        initUsers();
    }

    // יצירת משתמש חדש והוספתו למערך
    let user = {
        "username": username,
        "email": email,
        "password": password,
        "dob": dob,
        "isAdmin": isAdmin
    };

    users.push(user);

    // עדכון קובץ ה-JSON (הורדה מחודשת של db.json)
    updateData();
}

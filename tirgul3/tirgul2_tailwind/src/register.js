// src/register.js
const html = document.documentElement;
const registerForm = document.getElementById('registerForm');
const registerMessage = document.getElementById('registerMessage');

registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const dob = document.getElementById('dob').value;

  // איפוס הודעת חיווי
  registerMessage.textContent = "";
  registerMessage.classList.remove("text-red-500", "text-green-500");

  // אימות סיסמא
  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
    return;
  }

  try {
    // דואגים שהמערך users מה־users.js יהיה מאותחל מה-db.json
    initUsers();

    // במקום בדיקה על localStorage:
    // let users = JSON.parse(localStorage.getItem('users')) || [];
    // if (users.some(user => user.username === username || user.email === email)) {

    // משתמש עם אותו username כבר קיים?
    if (find(username)) {
      registerMessage.textContent = "Username already exists.";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }

    // לוגיקת אדמין: אם אין עדיין משתמשים בקובץ – זה משתמש ראשון => admin
    let isAdmin = false;
    if (users.length === 0) {
      isAdmin = true;
    }

    // במקום:
    // users.push({ username, email, password, dob, role });
    // localStorage.setItem('users', JSON.stringify(users));

    // אנחנו עובדים מול db.json דרך users.js
    add(username, email, password, dob, isAdmin);

    registerMessage.textContent = "Registration successful! (Data stored in DB)";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");

  } catch (error) {
    registerMessage.textContent = "An error occurred during registration.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
  }
});

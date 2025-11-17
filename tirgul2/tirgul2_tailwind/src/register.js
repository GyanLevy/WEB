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
    // שליפת משתמשים קיימים
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // בדיקה אם קיים כבר שם משתמש או אימייל זהים
    if (users.some(user => user.username === username || user.email === email)) {
      registerMessage.textContent = "Username or email already exists.";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }

    // קביעת תפקיד: הראשון שנרשם = admin, השאר = user
    const role = users.length === 0 ? "admin" : "user";

    // הוספה ושמירה ב-localStorage
    users.push({ username, email, password, dob, role });
    localStorage.setItem('users', JSON.stringify(users));

    registerMessage.textContent = `Registration successful! (${role.toUpperCase()} created and stored in local storage)`;
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");

    // אופציונלי: איפוס טופס
    // registerForm.reset();

  } catch (error) {
    registerMessage.textContent = "An error occurred during registration.";
    registerMessage.classList.remove("text-green-500");
    registerMessage.classList.add("text-red-500");
    // console.error(error);
  }
});

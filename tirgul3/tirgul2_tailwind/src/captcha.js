// captcha.js
document.addEventListener('DOMContentLoaded', () => {
  // 🧾 משתני הטופס
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');
  let isAdmin = true;

  // 🔢 משתני ה-CAPTCHA (IDs תואמים ל-register.html)
  const arithmeticChallengeSpan = document.getElementById('arithmetic-challenge');
  const arithmeticAnswerInput = document.getElementById('arithmetic-answer');
  const refreshArithmeticCaptchaButton = document.getElementById('refresh-arithmetic-captcha');
  const arithmeticError = document.getElementById('arithmetic-error');
  const captchaAttemptsError = document.getElementById('captcha-attempts-error');

  let arithmeticNum1, arithmeticNum2, arithmeticExpectedAnswer;
  let incorrectAttempts = 0;
  const maxIncorrectAttempts = 3;

  // פונקציה ליצירת חישוב אריתמטי רנדומלי: +, -, *, ÷
  function generateArithmeticCaptcha() {
    // הגרלת שני מספרים 1–10
    arithmeticNum1 = Math.floor(Math.random() * 10) + 1;
    arithmeticNum2 = Math.floor(Math.random() * 10) + 1;

    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === '+') {
      arithmeticExpectedAnswer = arithmeticNum1 + arithmeticNum2;
      arithmeticChallengeSpan.textContent = `${arithmeticNum1} + ${arithmeticNum2} = ?`;
    } else if (operation === '-') {
      arithmeticExpectedAnswer = arithmeticNum1 - arithmeticNum2;
      arithmeticChallengeSpan.textContent = `${arithmeticNum1} - ${arithmeticNum2} = ?`;
    } else if (operation === '*') {
      arithmeticExpectedAnswer = arithmeticNum1 * arithmeticNum2;
      arithmeticChallengeSpan.textContent = `${arithmeticNum1} × ${arithmeticNum2} = ?`;
    } else {
      // חילוק עם תוצאה שלמה
      const result = Math.floor(Math.random() * 10) + 1; // 1–10
      arithmeticNum2 = Math.floor(Math.random() * 10) + 1; // מחלק
      arithmeticNum1 = arithmeticNum2 * result;            // מחולק
      arithmeticExpectedAnswer = result;
      arithmeticChallengeSpan.textContent = `${arithmeticNum1} ÷ ${arithmeticNum2} = ?`;
    }

    // ניקוי תשובה והסתרת שגיאות
    arithmeticAnswerInput.value = '';
    arithmeticError.classList.add('hidden');
    if (captchaAttemptsError) {
      captchaAttemptsError.classList.add('hidden');
    }
  }

  // קריאה ראשונית בעת טעינה
  generateArithmeticCaptcha();

  // ריענון CAPTCHA
  function refreshCaptcha() {
    generateArithmeticCaptcha();
  }

  // מאזין לכפתור ריענון
  refreshArithmeticCaptchaButton.addEventListener('click', refreshCaptcha);

  // מאזין לטופס הרישום
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // בדיקה אם חרגנו ממספר ניסיונות מותר
    if (incorrectAttempts >= maxIncorrectAttempts) {
      if (captchaAttemptsError) {
        captchaAttemptsError.classList.remove('hidden');
      }
      return;
    }

    // משתני הטופס – תואמים ל-IDs ב-register.html
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;

    registerMessage.textContent = "";
    registerMessage.classList.remove("text-red-500", "text-green-500");

    // אימות סיסמא
    if (password !== confirmPassword) {
      registerMessage.textContent = "Passwords do not match.";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }

    // בדיקת CAPTCHA
    const userAnswer = parseInt(arithmeticAnswerInput.value, 10);

    if (!isNaN(userAnswer) && userAnswer === arithmeticExpectedAnswer) {
      // תשובה נכונה
      try {
        // בדוק אם המשתמש כבר קיים (ע"י users.js)
        if (find(username)) {
          registerMessage.textContent = "Username or email already exists.";
          registerMessage.classList.remove("text-green-500");
          registerMessage.classList.add("text-red-500");
          return;
        }

        // קביעת האם זה משתמש ראשון => admin
        if (typeof users === "undefined" || users.length < 1) {
          isAdmin = true;
        } else {
          isAdmin = false;
        }

        // שמירת המשתמש ב-db.json דרך users.js
        add(username, email, password, dob, isAdmin);

        registerMessage.textContent = "Registration successful!";
        registerMessage.classList.remove("text-red-500");
        registerMessage.classList.add("text-green-500");

        // איפוס שדות
        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('confirmPassword').value = "";
        document.getElementById('dob').value = "";

      } catch (error) {
        registerMessage.textContent = "An error occurred during registration.";
        registerMessage.classList.remove("text-green-500");
        registerMessage.classList.add("text-red-500");
      }

      // איפוס ניסיונות וריענון שאלה
      incorrectAttempts = 0;
      generateArithmeticCaptcha();

    } else {
      // תשובה שגויה
      arithmeticError.classList.remove('hidden');
      incorrectAttempts++;

      if (incorrectAttempts >= maxIncorrectAttempts && captchaAttemptsError) {
        captchaAttemptsError.classList.remove('hidden');
      }
    }
  });
});

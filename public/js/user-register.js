document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submitBtn');
    
    // Error message elements
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const phoneError = document.getElementById('phoneError');
    
    // Full name validation function
    function validateFullName(name) {
      // Check if name is empty
      if (!name) {
        fullNameError.textContent = 'Full name is required';
        return false;
      }
      
      // Check length (3-20 characters)
      if (name.length < 3) {
        fullNameError.textContent = 'Full name must be at least 3 characters long';
        return false;
      } else if (name.length > 20) {
        fullNameError.textContent = 'Full name cannot be longer than 20 characters';
        return false;
      }
      
      // Check if only letters and spaces are used
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        fullNameError.textContent = 'Full name can only contain letters and spaces';
        return false;
      }
      
      // All validations passed
      fullNameError.textContent = '';
      return true;
    }
    
    // Email validation function
    function validateEmail(email) {
      // Check if email is empty
      if (!email) {
        emailError.textContent = 'Email is required';
        return false;
      }
      
      // Check if email ends with @gmail.com
      if (!email.endsWith('@gmail.com')) {
        emailError.textContent = 'Email must end with @gmail.com';
        return false;
      }
      
      // Extract the part before @gmail.com
      const localPart = email.substring(0, email.indexOf('@gmail.com'));
      
      // Check length (3-15 characters)
      if (localPart.length < 3) {
        emailError.textContent = 'Username part is too short (minimum 3 characters)';
        return false;
      } else if (localPart.length > 15) {
        emailError.textContent = 'Username part is too long (maximum 15 characters)';
        return false;
      }
      
      // Check if only letters and digits are used
      if (!/^[a-zA-Z0-9]+$/.test(localPart)) {
        emailError.textContent = 'Username part can only contain letters and digits';
        return false;
      }
      
      // All validations passed
      emailError.textContent = '';
      return true;
    }
    
    // Password validation function
    function validatePassword(password) {
      // Check if password is empty
      if (!password) {
        passwordError.textContent = 'Password is required';
        return false;
      }
      
      // Check length (8-15 characters)
      if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long';
        return false;
      } else if (password.length > 15) {
        passwordError.textContent = 'Password cannot be longer than 15 characters';
        return false;
      }
      
      // Check for digits
      const digitCount = (password.match(/\d/g) || []).length;
      if (digitCount < 1) {
        passwordError.textContent = 'Password must include at least 1 digit';
        return false;
      } else if (digitCount > 6) {
        passwordError.textContent = 'Password cannot have more than 6 digits';
        return false;
      }
      
      // Check for special characters
      const specialChars = ['@', '_', '.', '#', '$', '&'];
      let specialCount = 0;
      for (const char of password) {
        if (specialChars.includes(char)) {
          specialCount++;
        }
      }
      
      if (specialCount < 1) {
        passwordError.textContent = 'Password must include at least 1 special character (@, _, ., #, $, &)';
        return false;
      } else if (specialCount > 2) {
        passwordError.textContent = 'Password cannot have more than 2 special characters';
        return false;
      }
      
      // Check if other characters are letters
      const nonSpecialNonDigit = password.replace(/[@_.#$&]|\d/g, '');
      if (!/^[a-zA-Z]*$/.test(nonSpecialNonDigit)) {
        passwordError.textContent = 'Password can only contain letters, digits, and special characters (@, _, ., #, $, &)';
        return false;
      }
      
      // All validations passed
      passwordError.textContent = '';
      return true;
    }
    
    // Phone validation function
    function validatePhone(phone) {
      // Check if phone is empty
      if (!phone) {
        phoneError.textContent = 'Contact number is required';
        return false;
      }
      
      // Check if phone is exactly 10 digits
      if (!/^\d{10}$/.test(phone)) {
        phoneError.textContent = 'Contact number must be exactly 10 digits';
        return false;
      }
      
      // Check if phone starts with 6, 7, 8, or 9
      const firstDigit = phone.charAt(0);
      if (!['6', '7', '8', '9'].includes(firstDigit)) {
        phoneError.textContent = 'Contact number must start with 6, 7, 8, or 9';
        return false;
      }
      
      // All validations passed
      phoneError.textContent = '';
      return true;
    }
    
    // Real-time validation for full name
    fullNameInput.addEventListener('input', function() {
      const isValid = validateFullName(this.value);
      
      if (this.value === '') {
        fullNameError.style.display = 'none';
        this.classList.remove('invalid-input', 'valid-input');
      } else if (isValid) {
        fullNameError.style.display = 'none';
        this.classList.remove('invalid-input');
        this.classList.add('valid-input');
      } else {
        fullNameError.style.display = 'block';
        this.classList.remove('valid-input');
        this.classList.add('invalid-input');
      }
      
      updateSubmitButton();
    });
    
    // Real-time validation for email
    emailInput.addEventListener('input', function() {
      const isValid = validateEmail(this.value);
      
      if (this.value === '') {
        emailError.style.display = 'none';
        this.classList.remove('invalid-input', 'valid-input');
      } else if (isValid) {
        emailError.style.display = 'none';
        this.classList.remove('invalid-input');
        this.classList.add('valid-input');
      } else {
        emailError.style.display = 'block';
        this.classList.remove('valid-input');
        this.classList.add('invalid-input');
      }
      
      updateSubmitButton();
    });
    
    // Real-time validation for password
    passwordInput.addEventListener('input', function() {
      const isValid = validatePassword(this.value);
      
      if (this.value === '') {
        passwordError.style.display = 'none';
        this.classList.remove('invalid-input', 'valid-input');
      } else if (isValid) {
        passwordError.style.display = 'none';
        this.classList.remove('invalid-input');
        this.classList.add('valid-input');
      } else {
        passwordError.style.display = 'block';
        this.classList.remove('valid-input');
        this.classList.add('invalid-input');
      }
      
      updateSubmitButton();
    });
    
    // Real-time validation for phone
    phoneInput.addEventListener('input', function() {
      const isValid = validatePhone(this.value);
      
      if (this.value === '') {
        phoneError.style.display = 'none';
        this.classList.remove('invalid-input', 'valid-input');
      } else if (isValid) {
        phoneError.style.display = 'none';
        this.classList.remove('invalid-input');
        this.classList.add('valid-input');
      } else {
        phoneError.style.display = 'block';
        this.classList.remove('valid-input');
        this.classList.add('invalid-input');
      }
      
      updateSubmitButton();
    });
    
    // Update submit button state
    function updateSubmitButton() {
      const isFullNameValid = fullNameInput.value === '' || validateFullName(fullNameInput.value);
      const isEmailValid = emailInput.value === '' || validateEmail(emailInput.value);
      const isPasswordValid = passwordInput.value === '' || validatePassword(passwordInput.value);
      const isPhoneValid = phoneInput.value === '' || validatePhone(phoneInput.value);
      
      if (isFullNameValid && isEmailValid && isPasswordValid && isPhoneValid && 
          fullNameInput.value !== '' && emailInput.value !== '' && 
          passwordInput.value !== '' && phoneInput.value !== '') {
        submitBtn.disabled = false;
      } else {
        submitBtn.disabled = true;
      }
    }
    
    // Form submission
    registerForm.addEventListener('submit', function(event) {
      const isFullNameValid = validateFullName(fullNameInput.value);
      const isEmailValid = validateEmail(emailInput.value);
      const isPasswordValid = validatePassword(passwordInput.value);
      const isPhoneValid = validatePhone(phoneInput.value);
      
      if (!isFullNameValid || !isEmailValid || !isPasswordValid || !isPhoneValid) {
        event.preventDefault();
        
        if (!isFullNameValid) {
          fullNameError.style.display = 'block';
          fullNameInput.classList.add('invalid-input');
        }
        
        if (!isEmailValid) {
          emailError.style.display = 'block';
          emailInput.classList.add('invalid-input');
        }
        
        if (!isPasswordValid) {
          passwordError.style.display = 'block';
          passwordInput.classList.add('invalid-input');
        }
        
        if (!isPhoneValid) {
          phoneError.style.display = 'block';
          phoneInput.classList.add('invalid-input');
        }
      } else {
        // If all validations pass, redirect to login page
        window.location.href = '/login';
      }
    });
    
    // Initialize submit button state
    updateSubmitButton();
  });
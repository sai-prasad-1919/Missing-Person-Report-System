document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Get all input fields
    const reporterNameInput = document.getElementById('reporterName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const childNameInput = document.getElementById('childName');
    const approximateAgeInput = document.getElementById('approximateAge');
    const genderInput = document.getElementById('gender');
    const foundLocationInput = document.getElementById('foundLocation');
    const foundDateInput = document.getElementById('foundDate');
    const descriptionInput = document.getElementById('description');
    
    // Set found date to current date and make it read-only
    if (foundDateInput) {
        const today = new Date();
        // Get local date components
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        // Format as YYYY-MM-DD
        const todayFormatted = `${year}-${month}-${day}`;
        foundDateInput.value = todayFormatted;
        foundDateInput.readOnly = true;
        foundDateInput.style.backgroundColor = '#f8f9fa';
        foundDateInput.style.cursor = 'not-allowed';
    }
    
    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .form-control {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .invalid-feedback {
            display: none;
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        .is-invalid ~ .invalid-feedback {
            display: block;
            opacity: 1;
        }
        .is-valid {
            border-color: #28a745 !important;
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
        }
        .is-invalid {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
        }
        .alert {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Validation rules
    const validationRules = {
        'reporterName': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 3 || trimmedValue.length > 50) return false;
                const nameRegex = /^[a-zA-Z\s]+$/;
                return nameRegex.test(trimmedValue);
            },
            message: 'Name must be between 3 and 25 characters.'
        },
        'district': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 5 || trimmedValue.length > 20) return false;
                const nameRegex = /^[a-zA-Z\s-]+$/;
                return nameRegex.test(trimmedValue);
            },
            message: 'District name must be between 5 and 20 characters .'
        },
        'stationName': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 5 || trimmedValue.length > 30) return false;
                const nameRegex = /^[a-zA-Z\s-]+$/;
                return nameRegex.test(trimmedValue);
            },
            message: 'Station name must be between 5 and 30 characters.'
        },
        'stationLocation': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 10 || trimmedValue.length > 50) return false;
                const locationRegex = /^[a-zA-Z0-9\s.,'-]+$/;
                return locationRegex.test(trimmedValue);
            },
            message: 'Station location mustbe min length 5.'
        },
        'stationPhone': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
        
                // Must match format 0XX-XXXX-XXXX
                const phoneRegex = /^0[1-9]\d-[0-9]{4}-[0-9]{4}$/;
                if (!phoneRegex.test(trimmedValue)) return false;
        
                // Ensure neither number block is all zeros
                const [, part1, part2] = trimmedValue.split('-');
                if (/^0{4}$/.test(part1) || /^0{4}$/.test(part2)) return false;
        
                return true;
            },
            message: 'Enter valid station number in format 040-1234-5678 (not all zeros).'
        
        },
        'phone': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                const phoneRegex = /^[6-9]\d{9}$/;
                return phoneRegex.test(trimmedValue);
            },
            message: 'Phone number must be 10 digits long and start with 6, 7, 8, or 9.'
        },
        'email': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(trimmedValue);
            },
            message: 'Please enter a valid email address.'
        },
        'childName': {
            validate: (value) => {
                if (!value || value.trim() === '') return true;
                const trimmedValue = value.trim();
                if (trimmedValue.length < 3 || trimmedValue.length > 25) return false;
                const nameRegex = /^[a-zA-Z\s.]+$/;
                return nameRegex.test(trimmedValue);
            },
            message: 'If provided, name must be between 3 and 25 .'
        },
        'approximateAge': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                const age = parseInt(trimmedValue);
                return !isNaN(age) && age >= 1 && age <= 75;
            },
            message: 'Age must be a number between 1 and 75.'
        },
        'gender': {
            validate: (value) => value !== '',
            message: 'Please select a gender.'
        },
        'foundLocation': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 5 || trimmedValue.length > 100) return false;
                const locationRegex = /^[a-zA-Z0-9\s.,'-]+$/;
                return locationRegex.test(trimmedValue);
            },
            message: 'Location must be min length 5 and max 100.'
        },
        'foundDate': {
            validate: (value) => true,
            message: ''
        },
        'description': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 20 || trimmedValue.length > 500) return false;
                const descriptionRegex = /^[a-zA-Z0-9\s.,!?'"-]+$/;
                return descriptionRegex.test(trimmedValue);
            },
            message: 'Description must be between 20 and 500 characters, digits.'
        }
    };
    
    // Track form validity
    let formIsValid = false;
    const validFields = {};
    
    // Initialize all fields as invalid
    Object.keys(validationRules).forEach(fieldId => {
        validFields[fieldId] = false;
    });
    
    // Function to validate a field
    function validateField(fieldId, value, showError = false) {
        const rule = validationRules[fieldId];
        const isValid = rule.validate(value);
        
        // Update validity tracking
        validFields[fieldId] = isValid;
        
        // Get the input element
        const inputElement = document.getElementById(fieldId);
        
        // Get or create feedback element
        let feedbackElement = inputElement.nextElementSibling;
        if (!feedbackElement || !feedbackElement.classList.contains('invalid-feedback')) {
            feedbackElement = document.createElement('div');
            feedbackElement.classList.add('invalid-feedback');
            inputElement.parentNode.insertBefore(feedbackElement, inputElement.nextSibling);
        }
        
        // Update UI based on validation result
        if (isValid) {
            inputElement.classList.remove('is-invalid');
            inputElement.classList.add('is-valid');
            feedbackElement.textContent = '';
        } else {
            inputElement.classList.remove('is-valid');
            inputElement.classList.add('is-invalid');
            
            // Only show error message if showError is true
            if (showError) {
                feedbackElement.textContent = rule.message;
            } else {
                feedbackElement.textContent = '';
            }
        }
        
        // Check if all fields are valid
        checkFormValidity();
        
        return isValid;
    }
    
    // Function to check if all fields are valid
    function checkFormValidity() {
        formIsValid = Object.values(validFields).every(isValid => isValid);
        
        // Enable/disable submit button
        if (submitButton) {
            submitButton.disabled = !formIsValid;
        }
    }
    
    // Function to show general error message
    function showGeneralError(message) {
        let generalErrorElement = document.getElementById('general-error');
        
        if (generalErrorElement) {
            generalErrorElement.textContent = message;
            generalErrorElement.style.display = 'block';
        } else {
            // Create general error element if it doesn't exist
            generalErrorElement = document.createElement('div');
            generalErrorElement.id = 'general-error';
            generalErrorElement.classList.add('alert', 'alert-danger', 'mt-3');
            generalErrorElement.textContent = message;
            form.insertBefore(generalErrorElement, submitButton.parentNode);
        }
        
        // Hide the error message after 5 seconds
        setTimeout(() => {
            generalErrorElement.style.opacity = '0';
            setTimeout(() => {
                generalErrorElement.style.display = 'none';
                generalErrorElement.style.opacity = '1';
            }, 300);
        }, 5000);
    }
    
    // Add event listeners for blur events (when user leaves a field)
    Object.keys(validationRules).forEach(fieldId => {
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            // Validate on blur (when user leaves the field) and show error
            inputElement.addEventListener('blur', function() {
                validateField(fieldId, this.value, true);
            });
            
            // Validate on input but don't show error message yet
            inputElement.addEventListener('input', function() {
                validateField(fieldId, this.value, false);
            });
        }
    });
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', function(event) {
            // Validate all fields before submission
            let allValid = true;
            let firstInvalidField = null;
            let emptyFields = [];
            
            Object.keys(validationRules).forEach(fieldId => {
                const inputElement = document.getElementById(fieldId);
                if (inputElement) {
                    const value = inputElement.value.trim();
                    
                    // Check if field is empty (except for optional fields)
                    if (!value && fieldId !== 'childName') {
                        emptyFields.push(fieldId);
                        allValid = false;
                        
                        // Mark field as invalid
                        inputElement.classList.remove('is-valid');
                        inputElement.classList.add('is-invalid');
                        
                        // Get or create feedback element
                        let feedbackElement = inputElement.nextElementSibling;
                        if (!feedbackElement || !feedbackElement.classList.contains('invalid-feedback')) {
                            feedbackElement = document.createElement('div');
                            feedbackElement.classList.add('invalid-feedback');
                            inputElement.parentNode.insertBefore(feedbackElement, inputElement.nextSibling);
                        }
                        
                        feedbackElement.textContent = 'This field is required.';
                        
                        if (!firstInvalidField) {
                            firstInvalidField = inputElement;
                        }
                    } else {
                        // Validate non-empty fields
                        const isValid = validateField(fieldId, value, true);
                        if (!isValid) {
                            allValid = false;
                            if (!firstInvalidField) {
                                firstInvalidField = inputElement;
                            }
                        }
                    }
                }
            });
            
            if (!allValid) {
                event.preventDefault();
                
                // Show appropriate error message
                if (emptyFields.length > 0) {
                    showGeneralError('Please fill in all required fields before submitting.');
                } else {
                    showGeneralError('Please fix the errors before submitting.');
                }
                
                // Focus on the first invalid field
                if (firstInvalidField) {
                    firstInvalidField.focus();
                    
                    // Scroll to the first invalid field
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Initialize form validation
    checkFormValidity();
});

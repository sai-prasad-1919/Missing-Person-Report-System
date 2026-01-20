document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('report-missing-form');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Get all input fields
    const reporterNameInput = document.getElementById('reporterName');
    const reporterTypeInput = document.getElementById('reporterType');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');
    const childNameInput = document.getElementById('childName');
    const ageInput = document.getElementById('age');
    const genderInput = document.getElementById('gender');
    const lastSeenLocationInput = document.getElementById('lastSeenLocation');
    const lastSeenDateInput = document.getElementById('lastSeenDate');
    const descriptionInput = document.getElementById('description');
    
    // Set date input constraints
    if (lastSeenDateInput) {
        // Get today's date
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];
        
        // Calculate date 3 years ago
        const threeYearsAgo = new Date();
        threeYearsAgo.setFullYear(today.getFullYear() - 3);
        const threeYearsAgoFormatted = threeYearsAgo.toISOString().split('T')[0];
        
        // Set min and max attributes to restrict date selection
        lastSeenDateInput.setAttribute('max', todayFormatted);
        lastSeenDateInput.setAttribute('min', threeYearsAgoFormatted);
    }
    
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
            message: 'Name must be between 3 and 50 characters.'
        },
        'district': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 5 || trimmedValue.length > 20) return false;
                const nameRegex = /^[a-zA-Z\s]+$/;
                return nameRegex.test(trimmedValue);
            },
            message: 'District name must be between 5 and 20 characters.'
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
            message: 'Station location must be between 10 and 50 characters.'
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
        'reporterType': {
            validate: (value) => value !== '',
            message: 'Please select a reporter type.'
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
        'address': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                return trimmedValue.length >= 5 && trimmedValue.length <= 100;
            },
            message: 'Address must be between 5 and 100 characters.'
        },
        'childName': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                if (trimmedValue.length < 3 || trimmedValue.length > 25) return false;
                const nameRegex = /^[a-zA-Z\s]+$/;
                return nameRegex.test(trimmedValue);
            },
            message: 'Name must be between 3 and 25 characters.'
        },
        'age': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                const age = parseInt(trimmedValue);
                return !isNaN(age) && age >= 1 && age <= 75;
            },
            message: 'Age must be between 1 and 75.'
        },
        'gender': {
            validate: (value) => value !== '',
            message: 'Please select a gender.'
        },
        'lastSeenLocation': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                return trimmedValue.length >= 5 && trimmedValue.length <= 100;
            },
            message: 'Location must be between 5 and 100 characters.'
        },
        'lastSeenDate': {
            validate: (value) => {
                if (!value) return false;
                const selectedDate = new Date(value);
                const today = new Date();
                const threeYearsAgo = new Date();
                threeYearsAgo.setFullYear(today.getFullYear() - 5);
                return selectedDate <= today && selectedDate >= threeYearsAgo;
            },
            message: 'Last seen date must be within the past 4 years and not a future date.'
        },
        'description': {
            validate: (value) => {
                const trimmedValue = value.trim();
                if (!trimmedValue) return false;
                return trimmedValue.length >= 20 && trimmedValue.length <= 500;
            },
            message: 'Description must be between 20 and 500 characters.'
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
            feedbackElement.className = 'invalid-feedback';
            inputElement.parentNode.insertBefore(feedbackElement, inputElement.nextSibling);
        }
        
        // Update feedback
        if (!isValid && showError) {
            inputElement.classList.add('is-invalid');
            feedbackElement.textContent = rule.message;
        } else {
            inputElement.classList.remove('is-invalid');
            feedbackElement.textContent = '';
        }
        
        return isValid;
    }
    
    // Function to check overall form validity
    function checkFormValidity() {
        formIsValid = Object.values(validFields).every(isValid => isValid);
        submitButton.disabled = !formIsValid;
    }
    
    // Add input event listeners to all fields
    Object.keys(validationRules).forEach(fieldId => {
        const inputElement = document.getElementById(fieldId);
        if (inputElement) {
            inputElement.addEventListener('input', function() {
                validateField(fieldId, this.value, true);
                checkFormValidity();
            });
            
            inputElement.addEventListener('blur', function() {
                validateField(fieldId, this.value, true);
                checkFormValidity();
            });
        }
    });
    
    // Add form submit event listener
    form.addEventListener('submit', function(event) {
        // Validate all fields before submission
        let allValid = true;
        Object.keys(validationRules).forEach(fieldId => {
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                const isValid = validateField(fieldId, inputElement.value, true);
                if (!isValid) {
                    allValid = false;
                }
            }
        });
        
        if (!allValid) {
            event.preventDefault();
        }
    });
});

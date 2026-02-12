// EmailJS integration for contact form

// Initialize EmailJS
(function() {
    emailjs.init("kFku6jjLAEXagzQZE"); // Replace with your EmailJS public key
})();

// DOM Elements
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnSpinner = document.getElementById('btn-spinner');
const successMessage = document.getElementById('success-message');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_c881qzl'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_5gk7seo'; // Replace with your EmailJS template ID

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add input event listeners for real-time validation
    if (nameInput) {
        nameInput.addEventListener('input', () => validateField(nameInput, nameError, 'name'));
        nameInput.addEventListener('blur', () => validateField(nameInput, nameError, 'name'));
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', () => validateField(emailInput, emailError, 'email'));
        emailInput.addEventListener('blur', () => validateField(emailInput, emailError, 'email'));
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', () => validateField(messageInput, messageError, 'message'));
        messageInput.addEventListener('blur', () => validateField(messageInput, messageError, 'message'));
    }
});

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateField(nameInput, nameError, 'name');
    const isEmailValid = validateField(emailInput, emailError, 'email');
    const isMessageValid = validateField(messageInput, messageError, 'message');
    
    if (!isNameValid || !isEmailValid || !isMessageValid) {
        showNotification('Please fix the errors before submitting', 'error');
        return;
    }
    
    // Show loading state
    setLoading(true);
    
    try {
        // Prepare form data
        const formData = {
            from_name: nameInput.value.trim(),
            from_email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            to_name: 'MARAGANI MOHANA VENKATA SAI',
            reply_to: emailInput.value.trim()
        };
        
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );
        
        if (response.status === 200) {
            // Success
            showSuccess();
            resetForm();
            showNotification('Message sent successfully!', 'success');
        } else {
            throw new Error('Failed to send message');
        }
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        setLoading(false);
    }
}

// Validate individual field
function validateField(input, errorElement, fieldType) {
    const value = input.value.trim();
    
    if (!value) {
        showError(input, errorElement, `Please enter ${fieldType}`);
        return false;
    }
    
    if (fieldType === 'name') {
        if (value.length < 2) {
            showError(input, errorElement, 'Name must be at least 2 characters');
            return false;
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
            showError(input, errorElement, 'Name should only contain letters and spaces');
            return false;
        }
    }
    
    if (fieldType === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(input, errorElement, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (fieldType === 'message') {
        if (value.length < 10) {
            showError(input, errorElement, 'Message must be at least 10 characters');
            return false;
        }
        if (value.length > 1000) {
            showError(input, errorElement, 'Message must be less than 1000 characters');
            return false;
        }
    }
    
    // Clear error if validation passes
    hideError(input, errorElement);
    return true;
}

// Show error state
function showError(input, errorElement, message) {
    if (input) {
        input.classList.add('border-red-500');
        input.classList.remove('border-gray-700');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Hide error state
function hideError(input, errorElement) {
    if (input) {
        input.classList.remove('border-red-500');
        input.classList.add('border-gray-700');
    }
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Set loading state
function setLoading(loading) {
    if (submitBtn) {
        submitBtn.disabled = loading;
    }
    
    if (btnText) {
        btnText.textContent = loading ? 'Sending...' : 'Send Message';
    }
    
    if (btnSpinner) {
        btnSpinner.classList.toggle('hidden', !loading);
    }
}

// Show success message
function showSuccess() {
    if (successMessage) {
        successMessage.classList.remove('hidden');
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
    }
}

// Reset form
function resetForm() {
    if (contactForm) {
        contactForm.reset();
    }
    
    // Clear all error states
    hideError(nameInput, nameError);
    hideError(emailInput, emailError);
    hideError(messageInput, messageError);
}

// Show notification (reusing from main.js)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-6 px-6 py-3 rounded-lg text-white font-medium z-50 transform translate-x-full transition-transform duration-300`;
    
    // Set background color based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #6366F1, #22D3EE)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Auto-resize textarea
function initAutoResize() {
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
}

// Initialize auto-resize
document.addEventListener('DOMContentLoaded', initAutoResize);

// Character counter for message
function initCharacterCounter() {
    if (messageInput) {
        const counter = document.createElement('div');
        counter.className = 'text-sm text-gray-400 mt-1 text-right';
        counter.textContent = '0 / 1000';
        
        messageInput.parentNode.appendChild(counter);
        
        messageInput.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / 1000`;
            
            if (length > 900) {
                counter.classList.add('text-yellow-500');
                counter.classList.remove('text-gray-400');
            } else {
                counter.classList.add('text-gray-400');
                counter.classList.remove('text-yellow-500');
            }
            
            if (length > 1000) {
                counter.classList.add('text-red-500');
                counter.classList.remove('text-yellow-500', 'text-gray-400');
            }
        });
    }
}

// Initialize character counter
document.addEventListener('DOMContentLoaded', initCharacterCounter);

// Form analytics (optional)
function trackFormSubmission() {
    // This would integrate with Google Analytics or other tracking
    console.log('Form submitted successfully');
    
    // Example: gtag('event', 'form_submit', {
    //     'event_category': 'contact',
    //     'event_label': 'contact_form'
    // });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (contactForm && document.activeElement.form === contactForm) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        if (contactForm && document.activeElement.form === contactForm) {
            resetForm();
        }
    }
});

// Add form field focus effects
function initFocusEffects() {
    const inputs = [nameInput, emailInput, messageInput];
    
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('transform', 'scale-105');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('transform', 'scale-105');
            });
        }
    });
}

// Initialize focus effects
document.addEventListener('DOMContentLoaded', initFocusEffects);

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Add form submission to localStorage for recovery
function saveFormData() {
    const formData = {
        name: nameInput?.value || '',
        email: emailInput?.value || '',
        message: messageInput?.value || ''
    };
    
    localStorage.setItem('contactFormData', JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            if (nameInput) nameInput.value = formData.name || '';
            if (emailInput) emailInput.value = formData.email || '';
            if (messageInput) messageInput.value = formData.message || '';
        } catch (e) {
            console.error('Error loading form data:', e);
        }
    }
}

function clearSavedFormData() {
    localStorage.removeItem('contactFormData');
}

// Auto-save form data
if (contactForm) {
    contactForm.addEventListener('input', saveFormData);
}

// Load saved data on page load
document.addEventListener('DOMContentLoaded', loadFormData);

// Clear saved data after successful submission
const originalShowSuccess = showSuccess;
showSuccess = function() {
    originalShowSuccess();
    clearSavedFormData();
};

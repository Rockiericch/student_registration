document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    async function submitForm() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            const supabaseUrl = localStorage.getItem('SUPABASE_URL') || 'https://fjwoazbfhpylnsioolgs.supabase.co';
            const supabaseKey = localStorage.getItem('SUPABASE_PUBLISHABLE_KEY') || 'sb_publishable_MlUx6LiYoPHw7DbLDNOaeQ_j2tRRj0D';
            
            const checkResponse = await fetch(`${supabaseUrl}/rest/v1/students?student_id=eq.${encodeURIComponent(data.student_id)}`, {
                method: 'GET',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json'
                }
            });
            
            const existingStudents = await checkResponse.json();
            
            if (existingStudents && existingStudents.length > 0) {
                showError('student_id', 'This Student ID is already registered. Please use another Student ID.');
                return;
            }
            
            const hashedPassword = await hashPassword(data.password);
            
            const insertData = {
                student_id: data.student_id,
                first_name: data.first_name,
                last_name: data.last_name,
                gender: data.gender,
                date_of_birth: data.date_of_birth,
                telephone: data.telephone,
                email: data.email,
                address: data.address,
                department_id: parseInt(data.department),
                programme_id: parseInt(data.programme),
                level_id: parseInt(data.level),
                username: data.username,
                password: hashedPassword
            };
            
            const insertResponse = await fetch(`${supabaseUrl}/rest/v1/students`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(insertData)
            });
            
            if (insertResponse.ok) {
                alert('Registration successful!');
                form.reset();
                window.location.href = 'success.html';
            } else {
                const errorData = await insertResponse.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        }
    }
    
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
    
    function validateForm() {
        let isValid = true;
        
        const studentId = document.getElementById('student_id').value.trim();
        const firstName = document.getElementById('first_name').value.trim();
        const lastName = document.getElementById('last_name').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        
        if (studentId === '') {
            showError('student_id', 'Student ID is required');
            isValid = false;
        } else {
            clearError('student_id');
        }
        
        if (firstName === '') {
            showError('first_name', 'First Name is required');
            isValid = false;
        } else {
            clearError('first_name');
        }
        
        if (lastName === '') {
            showError('last_name', 'Last Name is required');
            isValid = false;
        } else {
            clearError('last_name');
        }
        
        if (telephone === '') {
            showError('telephone', 'Telephone number is required');
            isValid = false;
        } else if (!validatePhone(telephone)) {
            showError('telephone', 'Please enter a valid telephone number');
            isValid = false;
        } else {
            clearError('telephone');
        }
        
        if (email === '') {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('email');
        }
        
        if (password === '') {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters');
            isValid = false;
        } else {
            clearError('password');
        }
        
        if (confirmPassword === '') {
            showError('confirm_password', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirm_password', 'Passwords do not match');
            isValid = false;
        } else {
            clearError('confirm_password');
        }
        
        return isValid;
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\d\s\-\+\(\)]+$/;
        return re.test(phone) && phone.length >= 10;
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const existingError = field.parentElement.querySelector('.error-message');
        
        if (existingError) {
            existingError.textContent = message;
        } else {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = '#dc2626';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '4px';
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
        }
        
        field.style.borderColor = '#dc2626';
    }
    
    function clearError(fieldId) {
        const field = document.getElementById(fieldId);
        const existingError = field.parentElement.querySelector('.error-message');
        
        if (existingError) {
            existingError.remove();
        }
        
        field.style.borderColor = '#d1d5db';
    }
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id);
        });
    });
});

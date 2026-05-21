function switchTab(tab) {
    document.querySelectorAll('.form-content').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.tabs button').forEach(b => b.classList.remove('active'));
    document.getElementById(tab + '-form').classList.add('active');
    document.getElementById('tab-' + tab).classList.add('active');
}

function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

const cities = {
    ua: ['Kyiv', 'Lviv', 'Kharkiv'],
    pl: ['Warsaw', 'Krakow', 'Wroclaw']
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="">Select City</option>';
    
    if (country) {
        citySelect.disabled = false;
        cities[country].forEach(city => {
            citySelect.innerHTML += `<option value="${city}">${city}</option>`;
        });
    } else {
        citySelect.disabled = true;
    }
}

const setError = (element, message) => {
    element.classList.remove('valid');
    element.classList.add('invalid');
    const errorDisplay = element.closest('.form-group').querySelector('.error-message');
    if (errorDisplay) {
        errorDisplay.innerText = message;
    }
};

const setSuccess = (element) => {
    element.classList.remove('invalid');
    element.classList.add('valid');
    const errorDisplay = element.closest('.form-group').querySelector('.error-message');
    if (errorDisplay) {
        errorDisplay.innerText = '';
    }
};

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    ['firstName', 'lastName'].forEach(id => {
        const el = document.getElementById(id);
        if (el.value.length < 3 || el.value.length > 15) {
            setError(el, 'Must be 3-15 characters'); isValid = false;
        } else setSuccess(el);
    });

    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        setError(email, 'Enter a valid email'); isValid = false;
    } else setSuccess(email);

    const pwd = document.getElementById('regPassword');
    const confirmPwd = document.getElementById('confirmPassword');
    if (pwd.value.length < 6) {
        setError(pwd, 'Minimum 6 characters'); isValid = false;
    } else setSuccess(pwd);
    
    if (pwd.value !== confirmPwd.value || confirmPwd.value === '') {
        setError(confirmPwd, 'Passwords do not match'); isValid = false;
    } else setSuccess(confirmPwd);

    const phone = document.getElementById('phone');
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(phone.value)) {
        setError(phone, 'Format: +380XXXXXXXXX'); isValid = false;
    } else setSuccess(phone);

    const dob = document.getElementById('dob');
    if (!dob.value) {
        setError(dob, 'Required'); isValid = false;
    } else {
        const birthDate = new Date(dob.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

        if (birthDate > today) {
            setError(dob, 'Cannot be in the future'); isValid = false;
        } else if (age < 12) {
            setError(dob, 'Must be at least 12 years old'); isValid = false;
        } else setSuccess(dob);
    }

    ['sex', 'country', 'city'].forEach(id => {
        const el = document.getElementById(id);
        if (el.value === '') {
            setError(el, 'Required field'); isValid = false;
        } else setSuccess(el);
    });

    if (isValid) {
        document.getElementById('signup-success').innerText = 'Registration successful!';
        this.reset();
        document.querySelectorAll('input, select').forEach(el => el.classList.remove('valid'));
        setTimeout(() => document.getElementById('signup-success').innerText = '', 3000);
    }
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    const username = document.getElementById('loginUsername');
    if (username.value.trim() === '') {
        setError(username, 'Required field'); isValid = false;
    } else setSuccess(username);

    const pwd = document.getElementById('loginPassword');
    if (pwd.value.length < 6) {
        setError(pwd, 'Minimum 6 characters'); isValid = false;
    } else setSuccess(pwd);

    if (isValid) {
        document.getElementById('login-success').innerText = 'Login successful!';
        this.reset();
        document.querySelectorAll('input').forEach(el => el.classList.remove('valid'));
        setTimeout(() => document.getElementById('login-success').innerText = '', 3000);
    }
});
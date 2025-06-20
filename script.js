<<<<<<< HEAD
fetch('http://localhost:3000/get-survey-results')
  .then(res => res.json())
  .then(surveyData => {
    const totalSurveys = surveyData.length;
    const currentYear = new Date().getFullYear();
    const validAges = surveyData
  .map(p => {
    const birthYear = new Date(p.dob).getFullYear();
    return isNaN(birthYear) ? null : currentYear - birthYear;
  })
  .filter(age => age !== null);

const averageAge = validAges.length > 0 ? (validAges.reduce((a, b) => a + b, 0) / validAges.length).toFixed(1) : 'N/A';
const oldest = validAges.length > 0 ? Math.max(...validAges) : 'N/A';
const youngest = validAges.length > 0 ? Math.min(...validAges) : 'N/A';

    // Count food preferences
    const foodCounts = { Pizza: 0, Pasta: 0, 'Pap and Wors': 0 };
    surveyData.forEach(p => {
      if (p.food) {
        const foodArray = p.food.split(',').map(f => f.trim());
        foodArray.forEach(f => {
          if (foodCounts[f] !== undefined) foodCounts[f]++;
        });
      }
    });

    const pizzaPct = ((foodCounts['Pizza'] / totalSurveys) * 100).toFixed(1);
    const pastaPct = ((foodCounts['Pasta'] / totalSurveys) * 100).toFixed(1);
    const papPct = ((foodCounts['Pap and Wors'] / totalSurveys) * 100).toFixed(1);

    
    const activityCounts = {
      movies: 0,
      radio: 0,
      eatOut: 0,
      tv: 0
    };

    surveyData.forEach(p => {
      if (p.q1 === '1' || p.q1 === '2') activityCounts.movies++;
      if (p.q2 === '1' || p.q2 === '2') activityCounts.radio++;
      if (p.q3 === '1' || p.q3 === '2') activityCounts.eatOut++;
      if (p.q4 === '1' || p.q4 === '2') activityCounts.tv++;
    });

    
    document.getElementById("totalNumber").textContent = totalSurveys;
    document.getElementById("averageAge").textContent = averageAge;
    document.getElementById("oldestPerson").textContent = oldest;
    document.getElementById("youngestPerson").textContent = youngest;

    document.getElementById("pizzaPercentage").textContent = pizzaPct + "%";
    document.getElementById("pastaPercentage").textContent = pastaPct + "%";
    document.getElementById("papPercentage").textContent = papPct + "%";

    document.getElementById("moviesTotal").textContent = activityCounts.movies;
    document.getElementById("radioTotal").textContent = activityCounts.radio;
    document.getElementById("eatOutTotal").textContent = activityCounts.eatOut;
    document.getElementById("tvTotal").textContent = activityCounts.tv;
  })
  .catch(err => {
    console.error('Error fetching survey results:', err);
  });

  document.getElementById('surveyForm').addEventListener('submit', function (e) {
  e.preventDefault();

   
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const foods = Array.from(document.querySelectorAll('input[name="food"]:checked'));
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');
        const q4 = document.querySelector('input[name="q4"]:checked');

        
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
        let hasError = false;

        
        if (!name) { document.getElementById('nameError').textContent = 'Full name is required.'; hasError = true; }
        if (!email) { document.getElementById('emailError').textContent = 'Email is required.'; hasError = true; }
        if (!dob) {
    document.getElementById('dobError').textContent = 'Date of birth is required.';
    hasError = true;
} else {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 5 || age > 120) {
        document.getElementById('dobError').textContent = 'Age must be between 5 and 120 years.';
        hasError = true;
    }
}
        if (!contact) { document.getElementById('contactError').textContent = 'Contact number is required.'; hasError = true; }
        if (foods.length === 0) { document.getElementById('foodError').textContent = 'Select at least one food.'; hasError = true; }
        if (!q1) { document.getElementById('q1Error').textContent = 'Please answer question 1.'; hasError = true; }
        if (!q2) { document.getElementById('q2Error').textContent = 'Please answer question 2.'; hasError = true; }
        if (!q3) { document.getElementById('q3Error').textContent = 'Please answer question 3.'; hasError = true; }
        if (!q4) { document.getElementById('q4Error').textContent = 'Please answer question 4.'; hasError = true; }

        if (hasError) return;

        // Form is valid, prepare data
        const data = {
            name,
            email,
            dob,
            contact,
            food: foods.map(f => f.value),
            q1: q1.value,
            q2: q2.value,
            q3: q3.value,
            q4: q4.value
        };

        // Submit
        fetch('http://localhost:3000/submit-survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.ok ? alert('Survey submitted!') : alert('Failed to submit.'))
        .catch(err => {
            console.error(err);
            alert('Error occurred');
        });
=======
fetch('http://localhost:3000/get-survey-results')
  .then(res => res.json())
  .then(surveyData => {
    const totalSurveys = surveyData.length;
    const currentYear = new Date().getFullYear();
    const validAges = surveyData
  .map(p => {
    const birthYear = new Date(p.dob).getFullYear();
    return isNaN(birthYear) ? null : currentYear - birthYear;
  })
  .filter(age => age !== null);

const averageAge = validAges.length > 0 ? (validAges.reduce((a, b) => a + b, 0) / validAges.length).toFixed(1) : 'N/A';
const oldest = validAges.length > 0 ? Math.max(...validAges) : 'N/A';
const youngest = validAges.length > 0 ? Math.min(...validAges) : 'N/A';

    // Count food preferences
    const foodCounts = { Pizza: 0, Pasta: 0, 'Pap and Wors': 0 };
    surveyData.forEach(p => {
      if (p.food) {
        const foodArray = p.food.split(',').map(f => f.trim());
        foodArray.forEach(f => {
          if (foodCounts[f] !== undefined) foodCounts[f]++;
        });
      }
    });

    const pizzaPct = ((foodCounts['Pizza'] / totalSurveys) * 100).toFixed(1);
    const pastaPct = ((foodCounts['Pasta'] / totalSurveys) * 100).toFixed(1);
    const papPct = ((foodCounts['Pap and Wors'] / totalSurveys) * 100).toFixed(1);

    
    const activityCounts = {
      movies: 0,
      radio: 0,
      eatOut: 0,
      tv: 0
    };

    surveyData.forEach(p => {
      if (p.q1 === '1' || p.q1 === '2') activityCounts.movies++;
      if (p.q2 === '1' || p.q2 === '2') activityCounts.radio++;
      if (p.q3 === '1' || p.q3 === '2') activityCounts.eatOut++;
      if (p.q4 === '1' || p.q4 === '2') activityCounts.tv++;
    });

    
    document.getElementById("totalNumber").textContent = totalSurveys;
    document.getElementById("averageAge").textContent = averageAge;
    document.getElementById("oldestPerson").textContent = oldest;
    document.getElementById("youngestPerson").textContent = youngest;

    document.getElementById("pizzaPercentage").textContent = pizzaPct + "%";
    document.getElementById("pastaPercentage").textContent = pastaPct + "%";
    document.getElementById("papPercentage").textContent = papPct + "%";

    document.getElementById("moviesTotal").textContent = activityCounts.movies;
    document.getElementById("radioTotal").textContent = activityCounts.radio;
    document.getElementById("eatOutTotal").textContent = activityCounts.eatOut;
    document.getElementById("tvTotal").textContent = activityCounts.tv;
  })
  .catch(err => {
    console.error('Error fetching survey results:', err);
  });

  document.getElementById('surveyForm').addEventListener('submit', function (e) {
  e.preventDefault();

   
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const foods = Array.from(document.querySelectorAll('input[name="food"]:checked'));
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');
        const q4 = document.querySelector('input[name="q4"]:checked');

        
        document.querySelectorAll('.error-message').forEach(span => span.textContent = '');
        let hasError = false;

        
        if (!name) { document.getElementById('nameError').textContent = 'Full name is required.'; hasError = true; }
        if (!email) { document.getElementById('emailError').textContent = 'Email is required.'; hasError = true; }
        if (!dob) {
    document.getElementById('dobError').textContent = 'Date of birth is required.';
    hasError = true;
} else {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 5 || age > 120) {
        document.getElementById('dobError').textContent = 'Age must be between 5 and 120 years.';
        hasError = true;
    }
}
        if (!contact) { document.getElementById('contactError').textContent = 'Contact number is required.'; hasError = true; }
        if (foods.length === 0) { document.getElementById('foodError').textContent = 'Select at least one food.'; hasError = true; }
        if (!q1) { document.getElementById('q1Error').textContent = 'Please answer question 1.'; hasError = true; }
        if (!q2) { document.getElementById('q2Error').textContent = 'Please answer question 2.'; hasError = true; }
        if (!q3) { document.getElementById('q3Error').textContent = 'Please answer question 3.'; hasError = true; }
        if (!q4) { document.getElementById('q4Error').textContent = 'Please answer question 4.'; hasError = true; }

        if (hasError) return;

        // Form is valid, prepare data
        const data = {
            name,
            email,
            dob,
            contact,
            food: foods.map(f => f.value),
            q1: q1.value,
            q2: q2.value,
            q3: q3.value,
            q4: q4.value
        };

        // Submit
        fetch('http://localhost:3000/submit-survey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.ok ? alert('Survey submitted!') : alert('Failed to submit.'))
        .catch(err => {
            console.error(err);
            alert('Error occurred');
        });
>>>>>>> 5fb31280f14313331ce77e1fe9d256ea00789c75
    });
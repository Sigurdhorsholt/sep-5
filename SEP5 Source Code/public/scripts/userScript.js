document.title = 'Profile'

function set_profile(data) {
    const profile_box = document.getElementById('profile');
    const companiesBox = document.getElementById('companiesBox');
    const user = data.user;

    // Profile section parse
    profile_box.innerHTML += `<h1> Profile ${user.username}</h1>
        <img src="${user.image_url}" alt="User Photo" title="User Photo"/>`;

    const companies = data.companies;

    // Company section parse
    companies.forEach(function(company) {
        companiesBox.innerHTML += 
        `<div class='company-card'>
            <div class='label-info-pair'>
                <span class='label'>CVR:</span>
                <span class='info'>${company.cvr}</span>
            </div>
            <div class='label-info-pair'>
                <span class='label'>Name:</span>
                <span class='info'>${company.name}</span>
            </div>
            <div>
                <button class='edit-btn' data-cvr='${company.cvr}'>Edit</button>
                <button class='delete-btn' data-cvr='${company.cvr}'>Delete</button>
            </div>
        </div>`;
    });

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    // Edit button functionality
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const companyCVR = this.getAttribute('data-cvr');

            fetch('/company/edit', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ companyCVR }),
            })
            .then(response => {
                // Check if the request was successful (status code 2xx)
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // Parse the response as JSON or handle it accordingly
                return response.json();
            })
            .then(data => {
                window.location.href = `/insertCompany?processedData=${encodeURIComponent(JSON.stringify(data))}`;
            })
            .catch(error => {
                // Handle errors
                console.error('Fetch error:', error);
            });
        });
    });

    // Delete button functionality
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const confirmDelete = window.confirm(`Are you sure you want to delete company with cvr ${this.getAttribute('data-cvr')}?`);

            if(confirmDelete) {
                const companyCVR = this.getAttribute('data-cvr');

                fetch('/company/delete', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ companyCVR }),
                })
                .then(response => {
                    // Check if the request was successful (status code 2xx)
                    if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // Parse the response as JSON or handle it accordingly
                    return response.json();
                })
                .then(data => {
                    window.location.href = '/user';
                })
                .catch(error => {
                    // Handle errors
                    console.error('Fetch error:', error);
                });
            }
            else {
                console.log("Action canceled!")
            }
        });
    });
};

// Fetch for retrieving data for the profile page
fetch('/user/profile')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok'); //Handling response if company not found
        }
        return response.json();
    })
    .then(data => {
        set_profile(data); //Injecting received data 
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Probably this part will be moved to header. But options for now stay
const form = document.getElementById('userForm');

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function pageChange(value) {
    if(value === 'home') {
        form.action = '/';
    }
    else if(value === 'logout') {
        
        deleteCookie('currentUserId');

        form.action = '/user/logout';
    }
    else if(value === 'insertCompany') {
        form.action = '/insertCompany';
    }
    
    form.submit(); // You can submit the form immediately or trigger submission later
}


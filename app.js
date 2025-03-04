document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const profile = {
        name: name,
        email: email,
        age: age
    };

    fetch('https://api.github.com/repos/sarathch66/profiledata/profiles.json', {
        method: 'GET',
        headers: {
            'Authorization': 'token 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',
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        let profiles = [];
        let sha = '';
        if (data.content) {
            profiles = JSON.parse(atob(data.content));
            sha = data.sha;
        }
        profiles.push(profile);

        const updatedContent = btoa(JSON.stringify(profiles, null, 2));

        fetch('https://api.github.com/repos/sarathch66/profiledata/profiles.json', {
            method: 'PUT',
            headers: {
                'Authorization': 'token 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',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: 'Add new profile',
                content: updatedContent,
                sha: sha
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Profile information saved successfully!');
        });
    });
});

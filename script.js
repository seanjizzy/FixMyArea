document.getElementById('issueForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('issueTitle').value;
    const desc = document.getElementById('issueDesc').value;
    const type = document.getElementById('issueType').value;
    const location = document.getElementById('location').value;

    if (!title || !desc || !type || !location) {
        alert("Please fill all fields!");
        return;
    }

    const issue = {
        title,
        desc,
        type,
        location,
        date: new Date().toLocaleDateString(),
        status: "Pending"
    };

    // Save to localStorage (or replace with a backend API later)
    let issues = JSON.parse(localStorage.getItem('issues')) || [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    // Reset form
    document.getElementById('issueForm').reset();

    // Refresh issues list
    displayIssues();
});

function displayIssues() {
    const issuesContainer = document.getElementById('issuesContainer');
    const issues = JSON.parse(localStorage.getItem('issues')) || [];

    issuesContainer.innerHTML = '';

    if (issues.length === 0) {
        issuesContainer.innerHTML = '<p>No issues reported yet. Be the first!</p>';
        return;
    }

    issues.forEach(issue => {
        const issueCard = document.createElement('div');
        issueCard.className = 'issue-card';
        issueCard.innerHTML = `
            <h3>${issue.title}</h3>
            <p>${issue.desc}</p>
            <div class="meta">
                <span><strong>Type:</strong> ${issue.type}</span> |
                <span><strong>Location:</strong> ${issue.location}</span> |
                <span><strong>Status:</strong> ${issue.status}</span> |
                <span><strong>Date:</strong> ${issue.date}</span>
            </div>
        `;
        issuesContainer.appendChild(issueCard);
    });
}

// Load issues on page load
document.addEventListener('DOMContentLoaded', displayIssues);

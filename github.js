// GitHub API integration for projects page

// Configuration
const GITHUB_USERNAME = 'mohan-677787'; // Replace with actual GitHub username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const PROJECTS_PER_PAGE = 9;

// DOM Elements
const loading = document.getElementById('loading');
const projectsGrid = document.getElementById('projects-grid');
const error = document.getElementById('error');
const filterButtons = document.querySelectorAll('.filter-btn');

// State
let allProjects = [];
let filteredProjects = [];
let currentFilter = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initFilterButtons();
    loadProjects();
});

// Load projects from GitHub API
async function loadProjects() {
    try {
        showLoading();
        
        const response = await fetch(`${GITHUB_API_URL}?per_page=${PROJECTS_PER_PAGE}&sort=updated&direction=desc`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Process repositories
        allProjects = await Promise.all(repos.map(async (repo) => {
            const languages = await getRepoLanguages(repo.languages_url);
            return {
                id: repo.id,
                name: repo.name,
                description: repo.description || 'No description available',
                html_url: repo.html_url,
                homepage: repo.homepage,
                language: repo.language,
                languages: languages,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated_at: repo.updated_at,
                topics: repo.topics,
                category: categorizeProject(repo.name, repo.topics, languages)
            };
        }));
        
        // Filter out forked repos and empty descriptions (optional)
        allProjects = allProjects.filter(project => 
            project.description !== 'No description available' || project.stars > 0
        );
        
        filteredProjects = [...allProjects];
        
        renderProjects();
        hideLoading();
        
    } catch (err) {
        console.error('Error loading projects:', err);
        showError();
    }
}

// Get repository languages
async function getRepoLanguages(languagesUrl) {
    try {
        const response = await fetch(languagesUrl);
        if (!response.ok) return [];
        const languages = await response.json();
        return Object.keys(languages);
    } catch (err) {
        console.error('Error fetching languages:', err);
        return [];
    }
}

// Categorize project based on name, topics, and languages
function categorizeProject(name, topics, languages) {
    const nameLower = name.toLowerCase();
    const topicsLower = topics.map(t => t.toLowerCase());
    const languagesLower = languages.map(l => l.toLowerCase());
    
    // Check for frontend indicators
    const frontendKeywords = ['frontend', 'react', 'vue', 'angular', 'css', 'html', 'tailwind', 'bootstrap', 'ui', 'design'];
    const hasFrontend = frontendKeywords.some(keyword => 
        nameLower.includes(keyword) || 
        topicsLower.some(topic => topic.includes(keyword)) ||
        languagesLower.some(lang => lang.includes(keyword))
    );
    
    // Check for backend indicators
    const backendKeywords = ['backend', 'api', 'server', 'spring', 'node', 'express', 'django', 'flask', 'database'];
    const hasBackend = backendKeywords.some(keyword => 
        nameLower.includes(keyword) || 
        topicsLower.some(topic => topic.includes(keyword)) ||
        languagesLower.some(lang => lang.includes(keyword))
    );
    
    // Determine category
    if (hasFrontend && hasBackend) {
        return 'fullstack';
    } else if (hasFrontend) {
        return 'frontend';
    } else if (hasBackend) {
        return 'backend';
    } else {
        // Default categorization based on languages
        if (languagesLower.includes('javascript') || languagesLower.includes('typescript') || 
            languagesLower.includes('html') || languagesLower.includes('css')) {
            return 'frontend';
        } else if (languagesLower.includes('java') || languagesLower.includes('python') || 
                   languagesLower.includes('nodejs') || languagesLower.includes('php')) {
            return 'backend';
        }
        return 'fullstack'; // Default to fullstack
    }
}

// Render projects to the grid
function renderProjects() {
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    if (filteredProjects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-folder-open text-6xl text-gray-600 mb-4"></i>
                <h3 class="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p class="text-gray-400">Try selecting a different filter</p>
            </div>
        `;
        return;
    }
    
    filteredProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
}

// Create project card element
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card p-6 rounded-lg relative';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const languageBadge = getLanguageBadge(project.language);
    const techStack = project.languages.slice(0, 3).map(lang => 
        `<span class="text-xs px-2 py-1 rounded glass">${lang}</span>`
    ).join('');
    
    const demoButton = project.homepage ? 
        `<a href="${project.homepage}" target="_blank" class="gradient-btn px-4 py-2 rounded text-sm text-white font-medium">
            <i class="fas fa-external-link-alt mr-2"></i>Live Demo
        </a>` : '';
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-semibold text-white mb-2">${project.name}</h3>
            ${languageBadge}
        </div>
        
        <p class="text-gray-300 mb-4 line-clamp-3">${project.description}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
            ${techStack}
        </div>
        
        <div class="flex items-center justify-between text-sm text-gray-400 mb-4">
            <div class="flex items-center gap-4">
                <span><i class="fas fa-star mr-1"></i> ${project.stars}</span>
                <span><i class="fas fa-code-branch mr-1"></i> ${project.forks}</span>
            </div>
            <span class="text-xs">${formatDate(project.updated_at)}</span>
        </div>
        
        <div class="flex gap-3">
            <a href="${project.html_url}" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <i class="fab fa-github"></i> Code
            </a>
            ${demoButton}
        </div>
        
        <div class="absolute top-2 right-2">
            <span class="px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeClass(project.category)}">
                ${project.category}
            </span>
        </div>
    `;
    
    return card;
}

// Get language badge HTML
function getLanguageBadge(language) {
    if (!language) return '';
    
    const badgeColors = {
        'JavaScript': 'lang-javascript',
        'Java': 'lang-java',
        'HTML': 'lang-html',
        'CSS': 'lang-css',
        'Python': 'lang-python',
        'TypeScript': 'lang-typescript'
    };
    
    const badgeClass = badgeColors[language] || 'lang-default';
    
    return `<span class="lang-badge ${badgeClass}">
        <i class="fas fa-circle text-xs mr-1"></i> ${language}
    </span>`;
}

// Get category badge class
function getCategoryBadgeClass(category) {
    const classes = {
        'frontend': 'bg-blue-600 text-white',
        'backend': 'bg-green-600 text-white',
        'fullstack': 'bg-purple-600 text-white'
    };
    return classes[category] || 'bg-gray-600 text-white';
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Initialize filter buttons
function initFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            setFilter(filter);
        });
    });
}

// Set active filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    filterButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.filter === filter) {
            button.classList.add('active');
        }
    });
    
    // Filter projects
    if (filter === 'all') {
        filteredProjects = [...allProjects];
    } else {
        filteredProjects = allProjects.filter(project => project.category === filter);
    }
    
    // Re-render projects
    renderProjects();
}

// Show loading state
function showLoading() {
    if (loading) loading.classList.remove('hidden');
    if (projectsGrid) projectsGrid.classList.add('hidden');
    if (error) error.classList.add('hidden');
}

// Hide loading state
function hideLoading() {
    if (loading) loading.classList.add('hidden');
    if (projectsGrid) projectsGrid.classList.remove('hidden');
    if (error) error.classList.add('hidden');
}

// Show error state
function showError() {
    if (loading) loading.classList.add('hidden');
    if (projectsGrid) projectsGrid.classList.add('hidden');
    if (error) error.classList.remove('hidden');
}

// Search functionality (bonus feature)
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search projects...';
    searchInput.className = 'w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-indigo-500 focus:outline-none mb-6';
    
    const filterContainer = document.querySelector('.flex.flex-wrap.justify-center.gap-4.mb-12');
    if (filterContainer) {
        filterContainer.parentNode.insertBefore(searchInput, filterContainer.nextSibling);
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm === '') {
                setFilter(currentFilter);
            } else {
                filteredProjects = allProjects.filter(project => 
                    project.name.toLowerCase().includes(searchTerm) ||
                    project.description.toLowerCase().includes(searchTerm) ||
                    project.languages.some(lang => lang.toLowerCase().includes(searchTerm))
                );
                renderProjects();
            }
        });
    }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSearch, 1000); // Delay to ensure projects are loaded
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Clear search if active
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.blur();
            setFilter(currentFilter);
        }
    }
});

// Add infinite scroll (bonus feature)
let isLoadingMore = false;

function initInfiniteScroll() {
    window.addEventListener('scroll', () => {
        if (isLoadingMore) return;
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMoreProjects();
        }
    });
}

async function loadMoreProjects() {
    // This would require pagination support from GitHub API
    // For now, it's a placeholder for future enhancement
    console.log('Loading more projects...');
}

// Initialize infinite scroll
document.addEventListener('DOMContentLoaded', initInfiniteScroll);

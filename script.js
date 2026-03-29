// ============================================
// STEP 1: CREATE THE DATA ARRAY
// This array stores all our photo information
// Each object has: url, caption, and favorite status
// ============================================

const photos = [
    {
        url: "https://picsum.photos/id/1015/400/300",
        caption: "🏔️ Beautiful Mountain Landscape",
        isFavorite: true
    },
    {
        url: "https://picsum.photos/id/104/400/300",
        caption: "💙 Serene Mountain Lake",
        isFavorite: false
    },
    {
        url: "https://picsum.photos/id/169/400/300",
        caption: "🌅 Stunning Sunrise Over Ocean",
        isFavorite: true
    },
    {
        url: "https://picsum.photos/id/155/400/300",
        caption: "🏙️ Modern City Architecture",
        isFavorite: false
    },
    {
        url: "https://picsum.photos/id/96/400/300",
        caption: "🌲 Enchanted Forest Path",
        isFavorite: true
    },
    {
        url: "https://picsum.photos/id/20/400/300",
        caption: "💻 Creative Workspace",
        isFavorite: false
    },
    {
        url: "https://picsum.photos/id/42/400/300",
        caption: "🎵 Musical Inspiration",
        isFavorite: true
    },
    {
        url: "https://picsum.photos/id/24/400/300",
        caption: "📚 Cozy Library Corner",
        isFavorite: false
    },
    {
        url: "https://picsum.photos/id/29/400/300",
        caption: "🏖️ Tropical Beach Paradise",
        isFavorite: true
    },
    {
        url: "https://picsum.photos/id/39/400/300",
        caption: "🍕 Delicious Pizza",
        isFavorite: false
    }
];

// ============================================
// STEP 2: GET REFERENCE TO HTML ELEMENTS
// ============================================

const galleryContainer = document.getElementById('galleryContainer');
let currentFilter = 'all'; // 'all' or 'favorites'

// ============================================
// STEP 3: FUNCTION TO RENDER GALLERY
// This uses a LOOP to create all images dynamically
// Uses CONDITIONALS to filter favorites
// ============================================

function renderGallery() {
    // Clear the container first
    galleryContainer.innerHTML = '';
    
    // LOOP through each photo in the array
    for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        
        // CONDITIONAL: Skip non-favorites if filter is active
        if (currentFilter === 'favorites' && !photo.isFavorite) {
            continue; // Skip this iteration
        }
        
        // Create the card container
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        
        // Create image element
        const img = document.createElement('img');
        img.src = photo.url;
        img.alt = photo.caption;
        img.loading = 'lazy'; // Lazy loading for better performance
        
        // Create caption container
        const captionDiv = document.createElement('div');
        captionDiv.classList.add('caption');
        captionDiv.textContent = photo.caption;
        
        // Add favorite badge if needed
        if (photo.isFavorite) {
            const favSpan = document.createElement('span');
            favSpan.classList.add('favorite-badge');
            favSpan.textContent = '⭐ Favorite';
            captionDiv.appendChild(favSpan);
        }
        
        // Assemble the card
        galleryItem.appendChild(img);
        galleryItem.appendChild(captionDiv);
        
        // Add to gallery
        galleryContainer.appendChild(galleryItem);
    }
    
    // Show message if no items found
    if (galleryContainer.children.length === 0) {
        const message = document.createElement('div');
        message.style.textAlign = 'center';
        message.style.gridColumn = '1 / -1';
        message.style.padding = '2rem';
        message.innerHTML = '<p>⭐ No favorite photos found! Click "Show All Photos" to see everything.</p>';
        galleryContainer.appendChild(message);
    }
}

// ============================================
// STEP 4: DARK MODE TOGGLE FUNCTION
// ============================================

function setupDarkMode() {
    const toggleButton = document.getElementById('themeToggle');
    
    // Check if user had dark mode enabled before
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = '☀️ Light Mode';
    }
    
    // Add click event listener
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.textContent = '☀️ Light Mode';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.textContent = '🌙 Dark Mode';
        }
    });
}

// ============================================
// STEP 5: FILTER BUTTONS FUNCTION
// ============================================

function setupFilters() {
    const favButton = document.getElementById('filterFavBtn');
    const allButton = document.getElementById('showAllBtn');
    
    favButton.addEventListener('click', () => {
        currentFilter = 'favorites';
        renderGallery(); // Re-render with filter
    });
    
    allButton.addEventListener('click', () => {
        currentFilter = 'all';
        renderGallery(); // Re-render without filter
    });
}

// ============================================
// STEP 6: INITIALIZE EVERYTHING
// ============================================

function init() {
    renderGallery();      // Display all photos
    setupDarkMode();      // Setup dark mode toggle
    setupFilters();       // Setup filter buttons
    
    console.log('Gallery initialized! Ready to use.');
}

// Start the application when page loads
init();

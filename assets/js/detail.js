class DestinationDetail {
    constructor() {
        this.destinationId = null;
        this.destinationData = null;
        this.init();
    }

    init() {
        this.getDestinationId();
        if (this.destinationId) {
            this.loadDestinationData();
        } else {
            this.showError();
        }
    }

    getDestinationId() {
        const urlParams = new URLSearchParams(window.location.search);
        this.destinationId = parseInt(urlParams.get('id'));
    }

    async loadDestinationData() {
        try {
            this.showLoading();

            const response = await fetch('data/map.geojson');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const geoJsonData = await response.json();

            // Find the destination by ID
            const destination = geoJsonData.features.find(feature =>
                feature.properties.id === this.destinationId
            );

            if (!destination) {
                throw new Error('Destination not found');
            }

            this.destinationData = destination.properties;
            this.renderDestinationDetail();

        } catch (error) {
            console.error('Error loading destination data:', error);
            this.showError();
        }
    }

    showLoading() {
        document.getElementById('loading').classList.remove('hidden');
        document.getElementById('error').classList.add('hidden');
        document.getElementById('detail-content').classList.add('hidden');
    }

    showError() {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('detail-content').classList.add('hidden');
    }

    renderDestinationDetail() {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('error').classList.add('hidden');
        document.getElementById('detail-content').classList.remove('hidden');

        // Set main image
        const mainImage = document.getElementById('main-image');
        mainImage.src = this.destinationData.images[0];
        mainImage.alt = this.destinationData.nama;

        // Set hero content
        document.getElementById('hero-title').textContent = this.destinationData.nama;
        document.getElementById('hero-category').innerHTML = `
            <i class="fas fa-tag"></i>
            <span>${this.destinationData.kategori}</span>
        `;

        // Set location, hours, price
        document.getElementById('location-text').textContent = this.destinationData.location;
        document.getElementById('hours-text').textContent = this.destinationData.hours;
        document.getElementById('price-text').textContent = this.destinationData.price;

        // Set description
        document.getElementById('description-text').textContent = this.destinationData.long_desc;

        // Set rating
        this.renderRating();

        // Render gallery
        this.renderGallery();

        // Render tags
        this.renderTags();

        // Initialize rating and comments
        this.initRatingComments();
    }

    renderGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        galleryGrid.innerHTML = '';

        this.destinationData.images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `<img src="${image}" alt="Gallery image ${index + 1}">`;
            galleryItem.addEventListener('click', () => this.openImageModal(index));
            galleryGrid.appendChild(galleryItem);
        });
    }

    openImageModal(index) {
        // Create modal for full-size image view
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${this.destinationData.images[index]}" alt="Full size image">
                <div class="modal-navigation">
                    ${index > 0 ? `<button class="nav-btn prev-btn" onclick="changeImage(${index - 1})"><i class="fas fa-chevron-left"></i></button>` : ''}
                    ${index < this.destinationData.images.length - 1 ? `<button class="nav-btn next-btn" onclick="changeImage(${index + 1})"><i class="fas fa-chevron-right"></i></button>` : ''}
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
            }
            .modal-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
                z-index: 1001;
            }
            .modal-content img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            .modal-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-navigation {
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                transform: translateY(-50%);
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
            }
            .nav-btn {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            }
            .nav-btn:hover {
                background: rgba(255, 255, 255, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    renderRating() {
        const rating = this.destinationData.rating;
        const starsContainer = document.getElementById('rating-stars');
        const ratingText = document.getElementById('rating-text');

        starsContainer.innerHTML = this.createStarRating(rating);
        ratingText.textContent = `${rating}/5`;
    }

    createStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHtml = '';

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }

        // Half star
        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }

        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }

        return starsHtml;
    }

    renderTags() {
        const tagsSection = document.getElementById('tags-section');
        const tagsContainer = document.getElementById('tags-container');

        if (this.destinationData.tags && this.destinationData.tags.length > 0) {
            tagsContainer.innerHTML = '';
            this.destinationData.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
            tagsSection.style.display = 'block';
        } else {
            tagsSection.style.display = 'none';
        }
    }

    retryLoad() {
        this.init();
    }

    initRatingComments() {
        this.loadComments();
        this.initStarRating();
        this.initSubmitReview();
    }

    initStarRating() {
        const stars = document.querySelectorAll('#stars-input i');
        let selectedRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;
                this.updateStarDisplay(selectedRating);
            });

            star.addEventListener('mouseover', () => {
                this.updateStarDisplay(index + 1, false);
            });

            star.addEventListener('mouseout', () => {
                this.updateStarDisplay(selectedRating, false);
            });
        });

        // Store selected rating for later use
        this.selectedRating = selectedRating;
    }

    updateStarDisplay(rating, isSelected = true) {
        const stars = document.querySelectorAll('#stars-input i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                if (isSelected) star.classList.add('active');
            } else {
                star.classList.remove('fas', 'active');
                star.classList.add('far');
            }
        });
    }

    initSubmitReview() {
        const submitBtn = document.getElementById('submit-review');
        const commentInput = document.getElementById('comment-input');

        submitBtn.addEventListener('click', () => {
            const comment = commentInput.value.trim();
            const rating = this.selectedRating;

            if (rating === 0) {
                showNotification('Silakan pilih rating terlebih dahulu!');
                return;
            }

            if (!comment) {
                showNotification('Silakan tulis ulasan Anda!');
                return;
            }

            this.submitReview(rating, comment);
        });
    }

    submitReview(rating, comment) {
        const review = {
            id: Date.now(),
            author: 'Pengguna Anonim', // In a real app, this would come from user authentication
            rating: rating,
            comment: comment,
            date: new Date().toLocaleDateString('id-ID'),
            destinationId: this.destinationId
        };

        // Save to localStorage (in a real app, this would be sent to a server)
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push(review);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Clear form
        document.getElementById('comment-input').value = '';
        this.selectedRating = 0;
        this.updateStarDisplay(0);

        // Reload comments
        this.loadComments();

        showNotification('Ulasan berhasil dikirim!');
    }

    loadComments() {
        const commentsList = document.getElementById('comments-list');
        const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
        const destinationReviews = reviews.filter(review => review.destinationId == this.destinationId);

        if (destinationReviews.length === 0) {
            commentsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Belum ada ulasan. Jadilah yang pertama memberikan ulasan!</p>';
            return;
        }

        commentsList.innerHTML = '';
        destinationReviews.forEach(review => {
            const commentItem = document.createElement('div');
            commentItem.className = 'comment-item';
            commentItem.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${review.author}</span>
                    <div class="comment-rating">
                        <div class="stars">${this.createStarRating(review.rating)}</div>
                        <span class="rating-value">${review.rating}/5</span>
                    </div>
                </div>
                <span class="comment-date">${review.date}</span>
                <p class="comment-text">${review.comment}</p>
            `;
            commentsList.appendChild(commentItem);
        });
    }
}

// Utility functions
function goBack() {
    window.history.back();
}

function shareDestination() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Lihat destinasi wisata ini!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link berhasil disalin!');
        });
    }
}

function toggleFavorite() {
    const btn = document.querySelector('.action-btn:nth-child(2) i');
    const isFavorited = btn.classList.contains('fas');

    if (isFavorited) {
        btn.classList.remove('fas');
        btn.classList.add('far');
        showNotification('Dihapus dari favorit');
    } else {
        btn.classList.remove('far');
        btn.classList.add('fas');
        showNotification('Ditambahkan ke favorit');
    }

    // Here you would typically save to localStorage or send to server
    const destinationId = new URLSearchParams(window.location.search).get('id');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorited) {
        const index = favorites.indexOf(destinationId);
        if (index > -1) favorites.splice(index, 1);
    } else {
        if (!favorites.includes(destinationId)) favorites.push(destinationId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DestinationDetail();

    // Load favorite state
    const destinationId = new URLSearchParams(window.location.search).get('id');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const btn = document.querySelector('.action-btn:nth-child(2) i');

    if (favorites.includes(destinationId)) {
        btn.classList.remove('far');
        btn.classList.add('fas');
    }
});

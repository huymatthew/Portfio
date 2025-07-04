  document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('searchInput');
            const searchPanel = document.getElementById('searchPanel');
            const searchOverlay = document.getElementById('searchOverlay');
            const closeBtn = document.getElementById('closeBtn');
            const suggestionItems = document.querySelectorAll('.suggestion-item');
            const recentItems = document.querySelectorAll('.recent-item');

            // Mở search panel
            function openSearchPanel() {
                searchPanel.classList.add('active');
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Reset animation cho suggestions
                suggestionItems.forEach((item, index) => {
                    item.style.animation = 'none';
                    setTimeout(() => {
                        item.style.animation = `slideInUp 0.5s ease forwards`;
                        item.style.animationDelay = `${0.1 * (index + 1)}s`;
                    }, 50);
                });
            }

            // Đóng search panel
            function closeSearchPanel() {
                searchPanel.classList.remove('active');
                searchOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                searchInput.blur();
            }

            // Event listeners
            searchInput.addEventListener('focus', openSearchPanel);
            searchInput.addEventListener('click', openSearchPanel);
            
            closeBtn.addEventListener('click', closeSearchPanel);
            searchOverlay.addEventListener('click', closeSearchPanel);

            // Xử lý suggestion clicks
            suggestionItems.forEach(item => {
                item.addEventListener('click', function() {
                    const text = this.querySelector('span').textContent;
                    searchInput.value = text;
                    closeSearchPanel();
                });
            });

            // Xử lý recent search clicks
            recentItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const text = this.textContent;
                    searchInput.value = text;
                    closeSearchPanel();
                });
            });

            // Đóng panel khi nhấn ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeSearchPanel();
                }
            });

            // Xử lý submit form
            searchInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = this.value.trim();
                    if (query) {
                        console.log('Tìm kiếm:', query);
                        // Thêm logic tìm kiếm ở đây
                        closeSearchPanel();
                    }
                }
            });
        });
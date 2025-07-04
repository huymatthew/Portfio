function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query.trim()) {
        searchVocabulary(query);
    }
}

function searchVocabulary(query) {
    const allWords = vocabularyData.all;
    const filteredWords = allWords.filter(word => 
        word.word.toLowerCase().includes(query.toLowerCase()) ||
        word.meaning.toLowerCase().includes(query.toLowerCase())
    );
    
    displayVocabulary(filteredWords);
    updateVocabCount(filteredWords.length, query);
}
function filterResults(filter) {
    currentFilter = filter;
    
    // Cập nhật tab active
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Hiển thị từ vựng theo level
    displayVocabularyByLevel(filter);
}
function displayVocabularyByLevel(level) {
    const allWords = vocabularyData.all;
    let filteredWords = allWords;
    
    if (level !== 'all') {
        filteredWords = allWords.filter(word => word.level === level);
    }
    
    displayVocabulary(filteredWords);
}
function displayVocabulary(words) {
    const resultsList = document.getElementById('resultsList');
    
    if (words.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <h2>Không tìm thấy từ vựng</h2>
                <p>Thử tìm kiếm với từ khóa khác</p>
                <div class="suggestions">
                    <h3>Gợi ý từ vựng:</h3>
                    <div class="suggestion-list">
                        <a href="#" class="suggestion-item">Beautiful</a>
                        <a href="#" class="suggestion-item">Adventure</a>
                        <a href="#" class="suggestion-item">Success</a>
                        <a href="#" class="suggestion-item">Learning</a>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = '';
    
    words.forEach(vocab => {
        const vocabElement = document.createElement('div');
        vocabElement.className = 'vocab-item';
        
        const levelClass = `level-${vocab.level}`;
        const levelText = vocab.level === 'beginner' ? 'Cơ bản' : 
                         vocab.level === 'intermediate' ? 'Trung cấp' : 'Nâng cao';
        
        vocabElement.innerHTML = `
            <div class="vocab-word">
                ${vocab.word} <span class="vocab-phonetic">${vocab.phonetic}</span>
                <span class="vocab-type">${vocab.type}</span>
            </div>
            <div class="vocab-meaning">
                ${vocab.meaning}
            </div>
            <div class="vocab-example">
                <strong>"${vocab.example}"</strong> - ${vocab.translation}
            </div>
            <div class="vocab-meta">
                <div class="vocab-level">
                    <span class="level-badge ${levelClass}">${levelText}</span>
                </div>
                <div class="vocab-actions">
                    <button class="action-btn pronunciation-btn" onclick="playPronunciation('${vocab.word.toLowerCase()}')" title="Phát âm">🔊</button>
                    <button class="action-btn" onclick="toggleFavorite(this)" title="Yêu thích">❤️</button>
                    <button class="action-btn" onclick="markAsLearned(this)" title="Đã học">✓</button>
                </div>
            </div>
        `;
        
        resultsList.appendChild(vocabElement);
    });
}
function updateVocabCount(count, query = '') {
    const countElement = document.querySelector('.results-count');
    if (query) {
        countElement.innerHTML = `Tìm thấy <strong>${count}</strong> từ vựng cho "${query}"`;
    } else {
        countElement.innerHTML = `Tổng cộng <strong>156</strong> từ vựng trong bộ sưu tập`;
    }
}
function playPronunciation(word) {
    // Mô phỏng phát âm (có thể tích hợp với Web Speech API)
    console.log(`Playing pronunciation for: ${word}`);
    
    // Tạo hiệu ứng visual
    event.target.style.transform = 'scale(1.2)';
    event.target.style.background = '#28a745';
    
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
        event.target.style.background = '#28a745';
    }, 200);
    
    // Có thể sử dụng Web Speech API để phát âm thật
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}
function toggleFavorite(button) {
    const isActive = button.classList.contains('active');
    if (isActive) {
        button.classList.remove('active');
        button.style.color = '';
        button.innerHTML = '❤️';
    } else {
        button.classList.add('active');
        button.style.color = '#e74c3c';
        button.innerHTML = '💖';
    }
}
function markAsLearned(button) {
    const vocabItem = button.closest('.vocab-item');
    const isLearned = vocabItem.classList.contains('learned');
    
    if (isLearned) {
        vocabItem.classList.remove('learned');
        button.style.background = '#f8f9fa';
        button.style.color = '';
        button.innerHTML = '✓';
    } else {
        vocabItem.classList.add('learned');
        button.style.background = '#28a745';
        button.style.color = 'white';
        button.innerHTML = '✅';
        vocabItem.style.opacity = '0.7';
    }
}
function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query.trim()) {
        // Mô phỏng tìm kiếm mới
        highlightSearchTerm(query);
        updateResultsCount(query);
    }
}
function filterResults(filter) {
    currentFilter = filter;
    
    // Cập nhật tab active
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Hiển thị kết quả theo filter
    displayResults(filter);
}
function displayResults(filter) {
    const resultsList = document.getElementById('resultsList');
    const results = searchResults[filter] || searchResults.all;
    
    resultsList.innerHTML = '';
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <h2>Không tìm thấy kết quả</h2>
                <p>Thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả</p>
                <div class="suggestions">
                    <h3>Gợi ý tìm kiếm:</h3>
                    <div class="suggestion-list">
                        <a href="#" class="suggestion-item">web development</a>
                        <a href="#" class="suggestion-item">ui design</a>
                        <a href="#" class="suggestion-item">responsive design</a>
                        <a href="#" class="suggestion-item">css tutorials</a>
                    </div>
                </div>
            </div>
        `;
        return;
    }
    
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result-item';
        resultElement.innerHTML = `
            <a href="#" class="result-title">${result.title}</a>
            <a href="#" class="result-url">${result.url}</a>
            <p class="result-snippet">${result.snippet}</p>
            <div class="result-meta">
                <span class="result-date">${result.date}</span>
                <div class="result-tags">
                    ${result.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        resultsList.appendChild(resultElement);
    });
}
function highlightSearchTerm(term) {
    const elements = document.querySelectorAll('.result-snippet');
    elements.forEach(element => {
        const text = element.innerHTML;
        const highlightedText = text.replace(new RegExp(term, 'gi'), `<span class="highlight">${term}</span>`);
        element.innerHTML = highlightedText;
    });
}
function updateResultsCount(query) {
    const countElement = document.querySelector('.results-count');
    const randomCount = Math.floor(Math.random() * 1000000) + 50000;
    countElement.innerHTML = `Khoảng ${randomCount.toLocaleString()} kết quả cho "<span class="highlight">${query}</span>"`;
}
function goToPage(page) {
    currentPage = page;
    updatePagination();
    // Mô phỏng tải kết quả mới
    window.scrollTo(0, 0);
}
function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= 20) {
        goToPage(newPage);
    }
}
function updatePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    pageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent == currentPage) {
            btn.classList.add('active');
        }
    });
    
    // Cập nhật trạng thái nút Previous/Next
    const prevBtn = pageButtons[0];
    const nextBtn = pageButtons[pageButtons.length - 1];
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === 20;
}
// Xử lý tìm kiếm khi nhấn Enter
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});
// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    highlightSearchTerm('web design');
    updatePagination();
});
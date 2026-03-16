// Dummy Data for the Showcase
const dummyCars = [
    {
        id: 1,
        model: "Model 3",
        title: "Tesla Model 3 ロングレンジ AWD",
        price: 458,
        year: 2021,
        mileage: 18000,
        source: "carsensor",
        sourceLabel: "カーセンサー",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80",
        url: "#"
    },
    {
        id: 2,
        model: "Model Y",
        title: "Tesla Model Y RWD",
        price: 520,
        year: 2023,
        mileage: 5000,
        source: "goonet",
        sourceLabel: "gooネット",
        image: "https://images.unsplash.com/photo-1662998394936-a36c8be202f5?auto=format&fit=crop&w=600&q=80",
        url: "#"
    },
    {
        id: 3,
        model: "Model S",
        title: "Tesla Model S プラッド",
        price: 1250,
        year: 2022,
        mileage: 12000,
        source: "certified",
        sourceLabel: "テスラ認定中古車",
        image: "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=600&q=80",
        url: "#"
    },
    {
        id: 4,
        model: "Model 3",
        title: "Tesla Model 3 スタンダードレンジ プラス",
        price: 380,
        year: 2020,
        mileage: 35000,
        source: "kurumaerabi",
        sourceLabel: "車選び.com",
        image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=600&q=80",
        url: "#"
    },
    {
        id: 5,
        model: "Model X",
        title: "Tesla Model X ロングレンジ",
        price: 890,
        year: 2020,
        mileage: 28000,
        source: "carsensor",
        sourceLabel: "カーセンサー",
        image: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?auto=format&fit=crop&w=600&q=80",
        url: "#"
    },
    {
        id: 6,
        model: "Model Y",
        title: "Tesla Model Y パフォーマンス",
        price: 650,
        year: 2022,
        mileage: 15000,
        source: "certified",
        sourceLabel: "テスラ認定中古車",
        image: "https://images.unsplash.com/photo-1662998394936-a36c8be202f5?auto=format&fit=crop&w=600&q=80",
        url: "#"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const resultsSection = document.getElementById('results-section');
    const demoResults = document.getElementById('demo-results');
    const externalButtons = document.getElementById('external-buttons');
    const resultCount = document.getElementById('result-count');

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect filter values
        const model = document.getElementById('model-select').value;
        const priceMin = parseInt(document.getElementById('price-min').value) || 0;
        const priceMax = parseInt(document.getElementById('price-max').value) || 99999;
        const mileage = document.getElementById('mileage-select').value;
        
        // Collect selected sources
        const sourceCheckboxes = document.querySelectorAll('.sources-group input[type="checkbox"]:checked');
        const selectedSources = Array.from(sourceCheckboxes).map(cb => cb.value);

        // Filter dummy data
        const filteredCars = dummyCars.filter(car => {
            if (model !== 'all' && car.model !== model) return false;
            if (car.price < priceMin || car.price > priceMax) return false;
            if (mileage !== 'all' && car.mileage > parseInt(mileage)) return false;
            if (!selectedSources.includes(car.source)) return false;
            return true;
        });

        // Render dummy results
        renderDemoResults(filteredCars);
        resultCount.textContent = filteredCars.length;

        // Render external links
        renderExternalLinks(model, selectedSources);

        // Show results softly
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    function renderDemoResults(cars) {
        demoResults.innerHTML = '';
        if (cars.length === 0) {
            demoResults.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">条件に一致するサンプルデータはありません。</p>';
            return;
        }

        cars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.innerHTML = `
                <img src="${car.image}" alt="${car.title}" class="car-img">
                <div class="car-info">
                    <span class="source-tag tag-${car.source}">${car.sourceLabel}</span>
                    <h3 class="car-title">${car.title}</h3>
                    <div class="car-price">${car.price}万円</div>
                    <div class="car-specs">
                        <span><i class="fa-regular fa-calendar"></i> ${car.year}年</span>
                        <span><i class="fa-solid fa-gauge"></i> ${(car.mileage).toLocaleString()}km</span>
                    </div>
                    <a href="${car.url}" class="btn-detail" onclick="event.preventDefault(); alert('デモ版のため詳細ページは用意されていません。実際のサイト検索をご利用ください。');">詳細を見る</a>
                </div>
            `;
            demoResults.appendChild(card);
        });
    }

    function renderExternalLinks(model, sources) {
        externalButtons.innerHTML = '';
        
        // Define site configurations
        const sites = [
            {
                id: 'carsensor',
                name: 'カーセンサーで検索',
                icon: 'fa-car',
                // Generate simplistic URLs based on model
                getUrl: (m) => `https://www.carsensor.net/usedcar/freeword/${encodeURIComponent(m === 'all' ? 'テスラ' : 'テスラ ' + m)}/`
            },
            {
                id: 'goonet',
                name: 'gooネットで検索',
                icon: 'fa-car-side',
                getUrl: (m) => `https://www.goo-net.com/usedcar/brand-TESLA/` // Keep it general for goo-net as precise URL building depends on internal codes
            },
            {
                id: 'kurumaerabi',
                name: '車選び.comで検索',
                icon: 'fa-desktop',
                getUrl: (m) => `https://www.kurumaerabi.com/usedcar/tesla/`
            },
            {
                id: 'certified',
                name: 'テスラ認定中古車を検索',
                icon: 'fa-bolt',
                getUrl: (m) => {
                    const modelCode = m === 'Model 3' ? 'm3' : m === 'Model Y' ? 'my' : m === 'Model S' ? 'ms' : m === 'Model X' ? 'mx' : '';
                    return `https://www.tesla.com/ja_jp/inventory/used/${modelCode}`;
                }
            }
        ];

        sites.forEach(site => {
            if (sources.includes(site.id)) {
                const btn = document.createElement('a');
                btn.href = site.getUrl(model);
                btn.target = '_blank';
                btn.className = 'btn-external';
                btn.innerHTML = `${site.name} <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
                externalButtons.appendChild(btn);
            }
        });
        
        if (externalButtons.innerHTML === '') {
            externalButtons.innerHTML = '<p style="color: var(--text-muted);">検索対象サイトが選択されていません。</p>';
        }
    }
});

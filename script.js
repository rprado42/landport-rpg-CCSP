// Data
const tables = {
    DnD: [
        {
            id: 6,
            name: 'A Forja dos Deuses',
            master: 'Mestre Thorin',
            time: '14:00 - 18:00',
            location: 'Mesa 6 - Sala D&D',
            players: '5/6',
            description: 'Aventureiros épicos buscam reacender a forja divina perdida.',
            system: 'D&D 5e',
            icon: 'fas fa-dragon'
        },
        {
            id: 7,
            name: 'Dragões de Ferro e Fogo',
            master: 'Mestra Aria',
            time: '14:30 - 17:30',
            location: 'Mesa 7 - Sala D&D',
            players: '4/6',
            description: 'Uma campanha épica contra os dragões metálicos corrompidos.',
            system: 'D&D 5e',
            icon: 'fas fa-dragon'
        },
        {
            id: 8,
            name: 'A Academia Arcana',
            master: 'Mestre Gandalf',
            time: '15:00 - 18:00',
            location: 'Mesa 8 - Sala D&D',
            players: '6/6',
            description: 'Jovens magos enfrentam mistérios na mais prestigiosa escola de magia.',
            system: 'D&D 5e',
            icon: 'fas fa-dragon'
        }
    ],
    ShadowLords: [
        {
            id: 9,
            name: 'Senhores das Sombras: Origem',
            master: 'Mestre Shadow',
            time: '14:00 - 17:00',
            location: 'Mesa 9 - Sala Indie',
            players: '3/4',
            description: 'Descubra os segredos do sistema Shadow Lords em sua forma mais pura.',
            system: 'Shadow Lords MS 3e',
            icon: 'fas fa-sword'
        },
        {
            id: 10,
            name: 'Crônicas Sombrias',
            master: 'Mestra Luna',
            time: '15:00 - 18:00',
            location: 'Mesa 10 - Sala Indie',
            players: '2/4',
            description: 'Explore as profundezas do mundo sombrio com regras simplificadas.',
            system: 'Shadow Lords MS 3e',
            icon: 'fas fa-sword'
        }
    ],
    Outros: [
        {
            id: 11,
            name: 'Tormenta: Heróis de Arton',
            master: 'Mestre Vallen',
            time: '14:00 - 17:00',
            location: 'Mesa 11 - Sala Diversos',
            players: '4/5',
            description: 'Aventuras no mundo de Arton com o sistema nacional Tormenta.',
            system: 'Tormenta RPG',
            icon: 'fas fa-book'
        },
        {
            id: 12,
            name: 'Call of Cthulhu: Mistérios Urbanos',
            master: 'Mestre Lovecraft',
            time: '15:30 - 18:30',
            location: 'Mesa 12 - Sala Diversos',
            players: '3/6',
            description: 'Investigadores enfrentam horrores cósmicos na década de 1920.',
            system: 'Call of Cthulhu',
            icon: 'fas fa-book'
        },
        {
            id: 13,
            name: 'Vampiro: A Máscara',
            master: 'Mestra Selene',
            time: '16:00 - 19:00',
            location: 'Mesa 13 - Sala Diversos',
            players: '5/5',
            description: 'Política vampiresca nas noites modernas de São Paulo.',
            system: 'Vampiro: A Máscara',
            icon: 'fas fa-book'
        }
    ]
};

const artesContent = {
    'artes-jogadores': {
        title: 'Artes dos Jogadores',
        description: 'Criações artísticas feitas pelos participantes da nossa comunidade.',
        items: [
            {
                title: 'Galeria da Comunidade',
                description: 'Em breve, uma galeria com as artes criadas pelos nossos jogadores!',
                type: 'placeholder'
            }
        ]
    },
    'inspiracao': {
        title: 'Inspiração',
        description: 'Referências visuais e artísticas que inspiram nossas aventuras.',
        items: [
            {
                title: 'Referências Visuais',
                description: 'Coletânea de imagens que servem de inspiração para mestres e jogadores.',
                type: 'placeholder'
            }
        ]
    },
    'ilustracoes': {
        title: 'Ilustrações',
        description: 'Ilustrações oficiais e fan arts relacionadas ao RPG.',
        items: [
            {
                title: 'Ilustrações Oficiais',
                description: 'Arte conceitual e ilustrações dos sistemas que jogamos.',
                type: 'placeholder'
            }
        ]
    }
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeSidebar = document.getElementById('close-sidebar');
const navItems = document.querySelectorAll('.nav-item[data-section]');
const submenuItems = document.querySelectorAll('.submenu-item');
const contentSections = document.querySelectorAll('.content-section');
const sectionTitle = document.getElementById('section-title');
const tablesGrid = document.getElementById('tables-grid');
const tablesTitle = document.getElementById('tables-title');

// State
let currentSection = 'home';
let currentCategory = 'DnD';
let isMobile = window.innerWidth <= 768;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateSection('home');
    checkMobile();
});

// Event Listeners
function setupEventListeners() {
    // Mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleSidebar);
    }
    
    if (closeSidebar) {
        closeSidebar.addEventListener('click', toggleSidebar);
    }

    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            if (section) {
                updateSection(section);
                updateActiveNav(item);
                if (isMobile) {
                    toggleSidebar();
                }
            }
        });
    });

    // Submenu items
    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            const category = item.getAttribute('data-category');
            
            if (section === 'mesas' && category) {
                currentCategory = category;
                updateSection('mesas');
                updateActiveSubmenu(item);
                if (isMobile) {
                    toggleSidebar();
                }
            } else if (section === 'artes' && category) {
                updateArtes(category);
                updateActiveSubmenu(item);
                if (isMobile) {
                    toggleSidebar();
                }
            }
        });
    });

    // Expandable menus
    const mesasToggle = document.getElementById('mesas-toggle');
    const artesToggle = document.getElementById('artes-toggle');
    
    if (mesasToggle) {
        mesasToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMesasMenu();
        });
    }
    
    if (artesToggle) {
        artesToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleArtesMenu();
        });
    }

    // Window resize
    window.addEventListener('resize', checkMobile);
}

// Mobile functions
function checkMobile() {
    isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'block';
        sidebar.style.transform = 'translateX(-100%)';
    } else {
        if (mobileMenuBtn) mobileMenuBtn.style.display = 'none';
        sidebar.style.transform = 'translateX(0)';
    }
}

function toggleSidebar() {
    if (isMobile) {
        const isOpen = sidebar.style.transform === 'translateX(0px)' || sidebar.style.transform === '';
        sidebar.style.transform = isOpen ? 'translateX(-100%)' : 'translateX(0)';
    }
}

// Menu functions
function toggleMesasMenu() {
    const submenu = document.getElementById('mesas-submenu');
    const icon = document.querySelector('#mesas-toggle .expand-icon');
    
    if (submenu && icon) {
        const isExpanded = submenu.classList.contains('expanded');
        
        if (isExpanded) {
            submenu.classList.remove('expanded');
            icon.style.transform = 'rotate(0deg)';
        } else {
            submenu.classList.add('expanded');
            icon.style.transform = 'rotate(180deg)';
        }
    }
}

function toggleArtesMenu() {
    const submenu = document.getElementById('artes-submenu');
    const icon = document.querySelector('#artes-toggle .expand-icon');
    
    if (submenu && icon) {
        const isExpanded = submenu.classList.contains('expanded');
        
        if (isExpanded) {
            submenu.classList.remove('expanded');
            icon.style.transform = 'rotate(0deg)';
        } else {
            submenu.classList.add('expanded');
            icon.style.transform = 'rotate(180deg)';
        }
    }
}

// Navigation functions
function updateActiveNav(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

function updateActiveSubmenu(activeItem) {
    submenuItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

// Content functions
function updateSection(section) {
    currentSection = section;
    
    // Hide all sections
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show current section
    const currentSectionElement = document.getElementById(`${section}-content`);
    if (currentSectionElement) {
        currentSectionElement.classList.add('active');
    }
    
    // Update title and content based on section
    switch(section) {
        case 'home':
            sectionTitle.textContent = 'Bem-vindos ao XXXVIII Encontro de RPG';
            break;
        case 'mesas':
            updateTables();
            break;
        case 'materiais':
            sectionTitle.textContent = 'Materiais';
            break;

        case 'artes':
            sectionTitle.textContent = 'Artes';
            updateArtes('artes-jogadores');
            break;
        case 'sobre':
            sectionTitle.textContent = 'Sobre';
            break;
        case 'suporte':
            sectionTitle.textContent = 'Suporte';
            break;
    }
}

function updateTables() {
    const categoryTables = tables[currentCategory] || [];
    const categoryNames = {
        'DnD': 'D&D 5e',
        'ShadowLords': 'ShadowLords Mini-System 3e',
        'Outros': 'Outros Sistemas'
    };
    
    sectionTitle.textContent = categoryNames[currentCategory] || 'Mesas';
    
    if (tablesTitle) {
        const icon = currentCategory === 'DnD' ? 'fas fa-dragon' : 
                    currentCategory === 'ShadowLords' ? 'fas fa-sword' : 'fas fa-book';
        tablesTitle.innerHTML = `<i class="${icon}"></i> Mesas Disponíveis - ${categoryNames[currentCategory]}`;
    }
    
    if (tablesGrid) {
        tablesGrid.innerHTML = categoryTables.map(table => `
            <div class="table-card">
                <div class="table-header">
                    <h3 class="table-name">
                        <i class="${table.icon}"></i>
                        ${table.name}
                    </h3>
                    <div class="table-players ${table.players.includes('6/6') || table.players.includes('5/5') ? 'full' : ''}">${table.players}</div>
                </div>
                <div class="table-info">
                    <div class="table-detail">
                        <i class="fas fa-user"></i>
                        <span>${table.master}</span>
                    </div>
                    <div class="table-detail">
                        <i class="fas fa-clock"></i>
                        <span>${table.time}</span>
                    </div>
                    <div class="table-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${table.location}</span>
                    </div>
                    <div class="table-detail">
                        <i class="fas fa-dice-d20"></i>
                        <span>${table.system}</span>
                    </div>
                </div>
                <p class="table-description">${table.description}</p>
                <button class="table-btn" onclick="window.open('https://mailchi.mp/fc10778cdc9c/form', '_blank')">
                    <i class="fas fa-user-plus"></i>
                    Inscrever-se na Mesa
                </button>
            </div>
        `).join('');
    }
}

function updateArtes(category) {
    const artesTitle = document.getElementById('artes-title');
    const artesDescription = document.getElementById('artes-description');
    const artesGrid = document.getElementById('artes-grid');
    
    const content = artesContent[category];
    if (!content) return;
    
    if (artesTitle) {
        artesTitle.textContent = content.title;
    }
    
    if (artesDescription) {
        artesDescription.textContent = content.description;
    }
    
    if (artesGrid) {
        artesGrid.innerHTML = content.items.map(item => `
            <div class="arte-card">
                <div class="arte-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }
    
    // Update section
    currentSection = 'artes';
    contentSections.forEach(section => section.classList.remove('active'));
    const artesSection = document.getElementById('artes-content');
    if (artesSection) {
        artesSection.classList.add('active');
    }
    
    sectionTitle.textContent = content.title;
}

// Utility functions
function openLink(url) {
    window.open(url, '_blank');
}

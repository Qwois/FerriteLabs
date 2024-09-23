var AnimationProgress = false;
var currentActive = '';

function showProjectsContent() {
    if (!AnimationProgress && currentActive !== 'projects') {
        currentActive = 'projects';
        AnimationProgress = true;
        setButtonActive('showProjects');

        var content = document.getElementById('dynamicContent');
        content.classList.remove('active');

        setTimeout(function() {
            content.innerHTML = `
                <section class="content">
                    <h1>PROJECTS:</h1>
                    <div class="card-container">
                        <div class="card">
                            <a href="https://store.steampowered.com/app/2110820/Granny_Remake/" target="_blank" rel="noopener noreferrer">
                                <div class="card-content">
                                    <img src="images/GrannyRemakeCapsule.png" alt="Granny Remake">
                                    <div class="title">Granny Remake</div>
                                </div>
                            </a>
                            <!-- Контейнер для частиц -->
                            <div class="particle-container"></div>
                        </div>
                        <div class="card">
                            <a href="https://store.steampowered.com/app/2753940/Burger_Takeout/" target="_blank" rel="noopener noreferrer">
                                <div class="card-content">
                                    <img src="images/BurgerTakeoutCapsule.jpg" alt="Burger Takeout">
                                    <div class="title">Burger Takeout</div>
                                </div>
                            </a>
                            <!-- Контейнер для частиц -->
                            <div class="particle-container"></div>
                        </div>
                    </div>
                </section>
            `;
            content.classList.add('active');
            AnimationProgress = false;

            // Добавляем обработчики событий для карточек после динамической вставки контента
            addCardHoverEffects();
        }, 200);
    }
}

function showLinksContent() {
    if (!AnimationProgress && currentActive !== 'links') {
        currentActive = 'links';
        AnimationProgress = true;
        setButtonActive('showLinks');

        var content = document.getElementById('dynamicContent');
        content.classList.remove('active');

        setTimeout(function() {
            content.innerHTML = `
                <section class="content">
                    <h1>LINKS:</h1>
                    <div class="link-card-container">
                        <div class="link-card">
                            <a href="https://store.steampowered.com/search/?developer=FerriteLabs" target="_blank">
                                <img src="images/steam-1.svg" alt="Steam" class="link-icon">
                                <div class="link-description">
                                    Check out our games on Steam.
                                </div>
                            </a>
                        </div>

                        <div class="link-card">
                            <a href="https://discord.com/invite/ynSd9EhVtM" target="_blank">
                                <img src="images/discord-mark-white.svg" alt="Discord" class="link-icon">
                                <div class="link-description">
                                    Join our Discord server for updates, discussions, and more.
                                </div>
                            </a>
                        </div>

                        <div class="link-card">
                            <a href="https://t.me/FerriteLabs" target="_blank">
                                <img src="images/Telegram-logo.png" alt="Telegram" class="link-icon">
                                <div class="link-description">
                                    Join our Telegram channel for updates, discussions, and giveaways.
                                </div>
                            </a>
                        </div>
                    </div>
                </section>
            `;
            content.classList.add('active');
            AnimationProgress = false;
        }, 200);
    }
}

document.getElementById('showProjects').addEventListener('click', showProjectsContent);
document.getElementById('showAbout').addEventListener('click', function() {
    if (!AnimationProgress && currentActive !== 'about') {
        currentActive = 'about';
        AnimationProgress = true;
        setButtonActive('showAbout');

        var content = document.getElementById('dynamicContent');
        content.classList.remove('active');

        setTimeout(function() {
            content.innerHTML = `
                <section class="content">
                    <h1>ABOUT:</h1>
                    <div class="about-content">
                        <p>
                            We are Ferrite Labs, a passionate team dedicated to creating immersive gaming experiences.
                        </p>
                        <p>
                            From indie projects to large-scale productions, we strive to deliver high-quality content that resonates with players around the world.
                        </p>
                    </div>
                </section>
            `;
            content.classList.add('active');
            AnimationProgress = false;
        }, 200);
    }
});

document.getElementById('showLinks').addEventListener('click', showLinksContent);

function setButtonActive(id) {
    document.querySelectorAll('.nav-buttons .custom-button').forEach(button => {
        button.classList.remove('active-button');
    });
    document.getElementById(id).classList.add('active-button');
}

document.addEventListener('DOMContentLoaded', function() {
    showProjectsContent();
});



// Функция для получения случайного цвета
function getRandomColor() {
    const colors = ['#FFD700', '#FF69B4', '#ADFF2F', '#1E90FF', '#FF4500'];
    return colors[Math.floor(Math.random() * colors.length)];
}



// Вызываем функцию при загрузке страницы для первоначальных карточек
addCardHoverEffects();

















// Функция для создания сцены с частицами
function createParticleEffect(container) {
    // Создаем сцену
    const scene = new THREE.Scene();

    // Создаем камеру
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Создаем геометрию частиц
    const particles = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = [];

    for (let i = 0; i < particleCount; i++) {
        positions.push((Math.random() - 0.5) * 2); // x
        positions.push((Math.random() - 0.5) * 2); // y
        positions.push((Math.random() - 0.5) * 2); // z
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    // Создаем материал для частиц
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
    });

    // Создаем облако частиц
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Анимация
    function animate() {
        requestAnimationFrame(animate);

        // Анимируем частицы
        particleSystem.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();

    // Обработка изменения размера контейнера
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }
}

// Добавляем эффект к карточкам при наведении
function addCardHoverEffects() {
    document.querySelectorAll('.card').forEach(card => {
        const particleContainer = document.createElement('div');
        particleContainer.classList.add('three-container');
        card.appendChild(particleContainer);

        card.addEventListener('mouseenter', function() {
            createParticleEffect(particleContainer);
        });

        card.addEventListener('mouseleave', function() {
            // Удаляем эффект при уходе курсора
            particleContainer.innerHTML = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addCardHoverEffects();
});
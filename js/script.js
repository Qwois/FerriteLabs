var AnimationProgress = false;
var currentActive = '';

function showProjectsContent() {
    if (!AnimationProgress && currentActive !== 'projects') {
        currentActive = 'projects';
        AnimationProgress = true;
        setButtonActive('showProjects'); // Установить кнопку как активную

        var content = document.getElementById('dynamicContent');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';

        setTimeout(function() {
            content.innerHTML = `
                <header>
                    <h1>PROJECTS:</h1>
                </header>
                <div class="card-container">
                    <div class="card">
                        <a href="#" data-toggle="modal" data-target="#project1Modal">
                            <img src="images/GrannyRemakeCapsule.png" alt="Granny Remake">
                            <div class="title">Granny Remake</div>
                        </a>
                    </div>
                    <div class="card">
                        <a href="#" data-toggle="modal" data-target="#project2Modal">
                            <img src="images/FogHorrorCapsule.png" alt="Fog Horror">
                            <div class="title">Fog Horror</div>
                        </a>
                    </div>
                    <div class="card">
                        <a href="#" data-toggle="modal" data-target="#project3Modal">
                            <img src="images/SodiumCapsule.png" alt="Sodium Sandbox">
                            <div class="title">Sodium Sandbox</div>
                        </a>
                    </div>
                </div>
            `;
            content.style.opacity = '1';
            content.style.transform = 'translateY(0px)';
            AnimationProgress = false;
        }, 200);
    }
}

document.getElementById('showProjects').addEventListener('click', showProjectsContent);

document.getElementById('showAbout').addEventListener('click', function() {
    if (!AnimationProgress && currentActive !== 'about') {
        currentActive = 'about';
        AnimationProgress = true;
        setButtonActive('showAbout'); // Установить кнопку как активную

        var content = document.getElementById('dynamicContent');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';

        setTimeout(function() {
            content.innerHTML = `
                <h2 class="text-center mb-4 text-white">About Us</h2>
                <div class="row">
                    <div class="col-md-6">
                        <img src="images/about-image.png" alt="About Us" class="img-fluid rounded" style="border: 2px solid #DD4814;">
                    </div>
                    <div class="col-md-6 text-white">
                        <h3>Who We Are</h3>
                        <p>Ferrite Labs is a passionate team of developers and creators dedicated to crafting innovative gaming experiences. Our mission is to blend technology with creativity, pushing the boundaries of what games can achieve.</p>
                        <h3>Our Journey</h3>
                        <p>Founded in 2020, Ferrite Labs started as a small group of enthusiasts. Over the years, we've grown into a vibrant team that thrives on collaboration and creativity. Each project we undertake reflects our commitment to quality and innovation.</p>
                        <h3>Our Values</h3>
                        <ul>
                            <li>Creativity: We believe in the power of imagination to create extraordinary experiences.</li>
                            <li>Community: Our players are at the heart of everything we do. We value their feedback and support.</li>
                            <li>Integrity: We commit to transparency and honesty in our processes and interactions.</li>
                        </ul>
                    </div>
                </div>
            `;
            content.style.opacity = '1';
            content.style.transform = 'translateY(0px)';
            AnimationProgress = false;
        }, 200);
    }
});

function setButtonActive(id) {
    // Сброс класса active-button у всех кнопок
    document.querySelectorAll('.buttons .custom-button').forEach(button => {
        button.classList.remove('active-button');
    });

    // Установка класса active-button на активную кнопку
    document.getElementById(id).classList.add('active-button');
}

// Инициализация контента "PROJECTS" при загрузке страницы
document.addEventListener('DOMContentLoaded', showProjectsContent);

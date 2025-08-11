// Secțiune Meniu

// Actualizare stare Meniu
            function updateMeniu() {
                const aside = document.querySelector('aside');
                const toggleBtn = document.getElementById('menu-toggle');
                const width = window.innerWidth;

// Verificare vizibilitate Meniu pentru scalare pagină
                if (width >= 1367) {
                    aside.classList.add('show');
                    toggleBtn.style.display = 'none';
                } else {
                    aside.classList.remove('show');
                    toggleBtn.style.display = 'block';
                    }
                updateButton();
            }

// Setare iconiță și vizibilitate buton Meniu
            function updateButton() {
                const aside = document.querySelector('aside');
                const toggleBtn = document.getElementById('menu-toggle');
                if (aside.classList.contains('show')) {
                    toggleBtn.innerHTML = '⨯';
                    toggleBtn.setAttribute('aria-label', 'Închide meniu');
                    toggleBtn.setAttribute('aria-expanded', 'true');
                } else {
                    toggleBtn.innerHTML = '≡';
                    toggleBtn.setAttribute('aria-label', 'Meniu');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    }
            }

// Secțiune Conținut

// Calculare spațiere prin interpolare liniară
            function getGap() {
                const maxGap = 2;
                const minGap = 0.5;
                const maxVW = 2160;
                const minVW = 300;
                const VW = window.innerWidth;
                if (VW >= maxVW) {
                    return maxGap + 'rem';
                }
                if (VW <= minVW) {
                    return minGap + 'rem';
                }
                const ratio = (VW - minVW) / (maxVW - minVW);
                const valueGap = minGap + ratio * (maxGap - minGap);
                return valueGap.toFixed(2) + 'rem';
            }

            function updateGap() {
                const sizeGap = getGap();
                document.documentElement.style.setProperty('--gap', sizeGap);
            }

// Setare înălțime imagine "Program de lucru"
            function updateProgram() {
                const programSecretariat = document.getElementById('program-secretariat');
                const programImagine = document.querySelector('#imagine-lucru img');
                if (programSecretariat && programImagine) {
                    const heightDiv = programSecretariat.offsetHeight;
                    programImagine.style.height = heightDiv + 'px';
                }
            }

// Funcții de inițializare

// Inițializare setări la încărcare pagină
                window.addEventListener('load', () => {
                    updateMeniu();
                    updateGap();
                    updateProgram();
                });

// Inițializare setări la redimensionare pagină
                window.addEventListener('resize', () => {
                    updateMeniu();
                    updateGap();
                    updateProgram();
                });

// Funcții de gestionare evenimente

// Afișare sau ascundere Meniu la click pe buton
                document.getElementById('menu-toggle').addEventListener('click', () => {
                    const aside = document.querySelector('aside');
                    aside.classList.toggle('show');
                    updateButton();
                });

// Gestionare apăsare tastă CTRL
            const width = window.innerWidth;
            let ctrlToggleDone = false;

// Afișare sau ascundere Meniu la apăsarea tastei CTRL
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Control') {

// Verificare lățime ecran
                    if (window.innerWidth < 1367) {

// Blocare comportament implicit pentru apasarea tastei CTRL
                        e.preventDefault();

// Setare comportament particularizat pentru apasarea tastei CTRL
                        if (!ctrlToggleDone) {
                            const aside = document.querySelector('aside');
                            aside.classList.toggle('show');
                            updateButton();

// Blocare apasare multiplă a tastei ESC
                            ctrlToggleDone = true;
                        }
                    }
                }
            });

// Gestionare eliberare tastă CTRL
            document.addEventListener('keyup', (e) => {
                if (e.key === 'Control') {

// Resetetare stare pentru următoarea apăsare a tastei CTRL
                    ctrlToggleDone = false;
                }
            });

// Blocare comportament implicit zoom la apăsarea tastei CTRL împreună cu scroll la maus
            document.addEventListener('wheel', (e) => {
                if (e.ctrlKey) {
                    e.preventDefault();
                }
            }, { passive: false });

// Subsol pagină
            document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('year').textContent = new Date().getFullYear();
                });

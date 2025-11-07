// Definire funcții

// Actualizare stare Meniu
            function updateMeniu() {
                const aside = document.querySelector('aside');
                const toggleBtn = document.getElementById('menu-toggle');
                const width = window.innerWidth;
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

// Calculare spațiere prin interpolare liniară
            function getGap() {
                const maxGap = 1;
                const minGap = 1;
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

// Aranjare text, "Secțiune Legături"
            const parametri = [];

            function initializeParams() {
                const ids = ['mec', 'isjneamt', 'cjraeneamt', 'ccdneamt'];
                ids.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        const text = el.innerText || el.textContent;
                        parametri.push({ id, text });
                    }
                });
            }

            function masoaraString(text) {
                const span = document.createElement('span');
                span.style.visibility = 'hidden';
                span.style.position = 'absolute';
                span.style.whiteSpace = 'pre';
                span.innerText = text;
                document.body.appendChild(span);
                const latime = span.offsetWidth;
                document.body.removeChild(span);
                return latime;
            }

            function potrivesteText(id, text) {
                const container = document.getElementById(id);
                if (!container) return;
                const aElement = container.closest('a');
                if (!aElement) return;

                container.style.visibility = 'hidden';
                container.innerHTML = '';

                const aRect = aElement.getBoundingClientRect();
                const paddingPx = (0.2 + 0.1 + 5 + 0.1 + 0.5 + 0.1 + 0.1 + 0.5) * 16;
                const totalAvailableWidth = aRect.width - paddingPx;
                const maxLineLength = totalAvailableWidth;

                const cuvinte = text.split(' ');
                let randuri = [];
                let currentLine = [];

                for (const cuvant of cuvinte) {
                    const tempLineText = currentLine.concat(cuvant).join(' ');
                    const width = masoaraString(tempLineText);
                    if (width <= maxLineLength) {
                    currentLine.push(cuvant);
                    } else {
                        if (currentLine.length > 0) {
                            randuri.push(currentLine.join(' '));
                        }
                        const cuvantWidth = masoaraString(cuvant);
                        if (cuvantWidth > maxLineLength) {
                            randuri.push(cuvant);
                            currentLine = [];
                        } else {
                            currentLine = [cuvant];
                        }
                    }
                }
                if (currentLine.length > 0) {
                    randuri.push(currentLine.join(' '));
                }

                let lungimeMaxima = 0;
                const randuriDimensiuni = [];
                randuri.forEach(r => {
                    const width = masoaraString(r);
                    randuriDimensiuni.push(width);
                    if (width > lungimeMaxima) lungimeMaxima = width;
                });

                randuri.forEach((r, idx) => {
                    const lineDiv = document.createElement('div');
                    lineDiv.className = 'line';
                    lineDiv.innerText = r;
                    lineDiv.style.marginLeft = ((lungimeMaxima - randuriDimensiuni[idx]) / 2) + 'px';
                    container.appendChild(lineDiv);
                });

                container.style.visibility = 'visible';
            }

            function potrivesteTexte() {
                parametri.forEach(({ id, text }) => {
                    const el = document.getElementById(id);
                    if (!el) return;
                    const img = document.querySelector(`a[aria-labelledby="${id}"] img`);
                    if (!img) {
                        setTimeout(() => {
                            potrivesteText(id, text);
                        }, 300);
                    } else {
                        if (img.complete && img.naturalWidth !== 0) {
                            potrivesteText(id, text);
                        } else {
                            img.addEventListener('load', () => {
                                potrivesteText(id, text);
                            });
                        }
                    }
                });
            }

// Setare înălțime imagini, "Program de lucru", "Contact", "Personal", "Sindicat"
            function updateImagine(divId, imgSelector) {
                const divElement = document.getElementById(divId);
                const container = document.querySelector(imgSelector);

                if (!divElement || !container) return;
                    const img = container.querySelector('img');
                    if (!img) return;
                    if (img.complete && img.naturalWidth !== 0) {
                        img.style.display = 'none';
                        const height = divElement.offsetHeight;
                        img.style.height = height + 'px';
                        img.style.display = 'block';
                    } else {
                        img.onload = () => {
                            img.style.display = 'none';
                            const height = divElement.offsetHeight;
                            img.style.height = height + 'px';
                            img.style.display = 'block';
                        };
                    }
            }

            const imaginiParametri = [
                ['program-secretariat', '#imagine-lucru'],
                ['contact-date', '#imagine-contact'],
                ['personal-text', '#imagine-personal'],
                ['sindicat-contact', '#imagine-sindicat'],
                ['ca-text', '#imagine-ca'],
                ['conducere-text', '#imagine-conducere'],
                ['ceac-descriere', '#imagine-ceac'],
                ['comisii-descriere', '#imagine-comisii'],
                ['regulamente-descriere', '#imagine-regulamente'],
                ['oferta-text', '#imagine-oferta'],
                ['gradinita-text', '#imagine-gradinita'],
                ['pregatitoare-text', '#imagine-pregatitoare'],
                ['evaluari246-text', '#imagine-evaluari246'],
                ['simulare8-text', '#imagine-simulare8'],
                ['evaluare-text', '#imagine-evaluare']
            ];

function updateImagini() {
    imaginiParametri.forEach(([divId, imgSelector]) => {

        const divElement = document.getElementById(divId);
        if (!divElement) return;

        const container = document.querySelector(imgSelector);
        if (!container) return;

        const img = container.querySelector('img');
        if (!img) return;

                        img.style.display = 'none';

        const maxIncercari = 10;
        let incercari = 0;

        const tryUpdate = () => {
            if (img.complete && img.naturalWidth !== 0) {
                updateImagine(divId, imgSelector);
            } else {
                incercari++;
                if (incercari < maxIncercari) {
                    setTimeout(tryUpdate, 300);
                } else {
                    console.warn(`Imaginea din ${divId} nu s-a încărcat după ${maxIncercari} încercări.`);
                }
            }
        };
        if (img.complete && img.naturalWidth !== 0) {
            updateImagine(divId, imgSelector);
        } else {
            tryUpdate();
        }
    });
}

// Zoom și translatare imagine, "Contact"
            function limitPosition(container, img, scale, translateX, translateY) {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const imgWidth = img.offsetWidth * scale;
                const imgHeight = img.offsetHeight * scale;

                let newTranslateX = translateX;
                let newTranslateY = translateY;

                if (imgWidth <= containerWidth) {
                    newTranslateX = (containerWidth - imgWidth) / 2;
                } else {
                    const minX = containerWidth - imgWidth;
                    if (newTranslateX > 0) newTranslateX = 0;
                    if (newTranslateX < minX) newTranslateX = minX;
                }

                if (imgHeight <= containerHeight) {
                    newTranslateY = (containerHeight - imgHeight) / 2;
                } else {
                    const minY = containerHeight - imgHeight;
                    if (newTranslateY > 0) newTranslateY = 0;
                    if (newTranslateY < minY) newTranslateY = minY;
                }

                return { translateX: newTranslateX, translateY: newTranslateY };
            }

            function setupZoomTranslatare() {
                let scale = 1;
                let translateX = 0;
                let translateY = 0;
                const minScale = 1;
                const maxScale = 4;

                const container = document.querySelector('.zoom');
                const img = container ? container.querySelector('img') : null;
                if (!container || !img) return;

                let wheelTimeout = null;
                let isDragging = false;
                let startX = 0;
                let startY = 0;

                img.style.cursor = 'grab';

                function updateTransform() {
                    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                }

                container.addEventListener('wheel', (e) => {
                    e.preventDefault();

                    const containerRect = container.getBoundingClientRect();
                    const cursorX = e.clientX - containerRect.left;
                    const cursorY = e.clientY - containerRect.top;

                    const imgX = (cursorX - translateX) / scale;
                    const imgY = (cursorY - translateY) / scale;

                    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
                    let newScale = Math.max(minScale, Math.min(maxScale, scale * zoomFactor));

                    let newTranslateX = cursorX - imgX * newScale;
                    let newTranslateY = cursorY - imgY * newScale;

                    const limitedPos = limitPosition(container, img, newScale, newTranslateX, newTranslateY);

                    scale = newScale;
                    translateX = limitedPos.translateX;
                    translateY = limitedPos.translateY;

                    if (scale === minScale) {
                        container.classList.remove('zoom-in', 'zoom-out');
                    } else {
                        if (e.deltaY < 0) {
                            container.classList.add('zoom-in');
                            container.classList.remove('zoom-out');
                        } else {
                        container.classList.remove('zoom-in');
                        container.classList.add('zoom-out');
                        }
                    }

                    updateTransform();

                    if (scale === minScale) {
                        img.style.cursor = 'grab';
                    } else {
                        img.style.cursor = e.deltaY < 0 ? 'zoom-in' : 'zoom-out';
                    }

                    if (wheelTimeout) clearTimeout(wheelTimeout);
                    wheelTimeout = setTimeout(() => {
                        container.classList.remove('zoom-in', 'zoom-out');
                        img.style.cursor = 'grab';
                    }, 100);
                });

                img.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    isDragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    img.style.cursor = 'grabbing';
                    container.classList.add('dragging');
                    container.classList.remove('zoom-in', 'zoom-out');
                });

                document.addEventListener('mouseup', () => {
                    if (isDragging) {
                        isDragging = false;
                        img.style.cursor = 'grab';
                        container.classList.remove('dragging');
                    }
                });

                document.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    startX = e.clientX;
                    startY = e.clientY;

                    let newTranslateX = translateX + dx;
                    let newTranslateY = translateY + dy;

                    const limitedPos = limitPosition(container, img, scale, newTranslateX, newTranslateY);

                    translateX = limitedPos.translateX;
                    translateY = limitedPos.translateY;

                    updateTransform();
                });
            }

// Funcții de gestionare evenimente

            document.addEventListener('DOMContentLoaded', () => {

// Setare an curent în Subsol pagină
                const yearEl = document.getElementById('year');
                if (yearEl) {
                    yearEl.textContent = new Date().getFullYear();
                }

// Apeluri de inițializare pentru funcții

// Inițializare setări la încărcare pagină
                updateMeniu();
                updateGap();
                updateImagini();
                initializeParams();
                potrivesteTexte();
                setupZoomTranslatare();

// Inițializare setări la redimensionare pagină
                window.addEventListener('resize', () => {
                    updateMeniu();
                    updateGap();
                    updateImagini();
                    potrivesteTexte();
                });

// Afișare sau ascundere Meniu principal la click pe buton
                const menuToggleBtn = document.getElementById('menu-toggle');
                if (menuToggleBtn) {
                    menuToggleBtn.addEventListener('click', () => {
                        const aside = document.querySelector('aside');
                        aside.classList.toggle('show');
                        updateButton();
                    });
                }

// Gestionare apăsare tastă CTRL
                let ctrlToggleDone = false;
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Control') {
                        if (window.innerWidth < 1367) {
                            e.preventDefault();
                            if (!ctrlToggleDone) {
                                const aside = document.querySelector('aside');
                                aside.classList.toggle('show');
                                updateButton();
                                ctrlToggleDone = true;
                            }
                        }
                    }
                });

// Gestionare eliberare tastă CTRL
                document.addEventListener('keyup', (e) => {
                    if (e.key === 'Control') {
                        ctrlToggleDone = false;
                    }
                });

// Blocare comportament implicit zoom la apăsarea tastei CTRL împreună cu scroll la maus
                document.addEventListener('wheel', (e) => {
                    if (e.ctrlKey) {
                        e.preventDefault();
                    }
                }, { passive: false });

            });

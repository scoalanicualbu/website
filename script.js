// Subsol pagină
            document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('year').textContent = new Date().getFullYear();
            });

// Secțiune Meniu

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

// Funcții de inițializare

// Inițializare setări la încărcare pagină
            window.addEventListener('load', () => {
                updateMeniu();
                updateGap();
                updateImagini();
                initializeParams();
                potrivesteTexte();
                limitPosition();
                updateTransform();
            });

// Inițializare setări la redimensionare pagină
            window.addEventListener('resize', () => {
                updateMeniu();
                updateGap();
                updateImagini();
                potrivesteTexte();
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

// Secțiune Conținut

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
                const aElement = document.querySelector(`a[aria-labelledby="${id}"]`);
                const container = document.getElementById(id);
                if (!aElement || !container) return;
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

// Setare înălțime imagini, "Program de lucru", "Contact", "Personal"
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
                ['sindicat-contact', '#imagine-sindicat']
            ];
            function updateImagini() {
                imaginiParametri.forEach(([divId, imgSelector]) => {
                    updateImagine(divId, imgSelector);
                });
            }

// Zoom și translatare imagine, "Contact"
            const container = document.querySelector('.zoom');
            const img = container.querySelector('img');
            let scale = 1;
            let translateX = 0;
            let translateY = 0;
            const minScale = 1;
            const maxScale = 4;
            function updateTransform() {
                img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            }
            function limitPosition() {
                const containerWidth = container.clientWidth;
                const containerHeight = container.clientHeight;
                const imgWidth = img.offsetWidth * scale;
                const imgHeight = img.offsetHeight * scale;
                if (imgWidth <= containerWidth) {
                    translateX = (containerWidth - imgWidth) / 2;
                } else {
                    const minX = containerWidth - imgWidth;
                    if (translateX > 0) translateX = 0;
                    if (translateX < minX) translateX = minX;
                }
                if (imgHeight <= containerHeight) {
                    translateY = (containerHeight - imgHeight) / 2;
                } else {
                    const minY = containerHeight - imgHeight;
                    if (translateY > 0) translateY = 0;
                    if (translateY < minY) translateY = minY;
                }
            }
            let isDragging = false;
            let startX = 0;
            let startY = 0;
            img.style.cursor = 'grab';
            img.addEventListener('mousedown', (e) => {
                e.preventDefault();
                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                img.style.cursor = 'grabbing';
            });
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    img.style.cursor = 'grab';
                }
            });
            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    translateX += dx;
                    translateY += dy;
                    limitPosition();
                    updateTransform();
                    startX = e.clientX;
                    startY = e.clientY;
                }
            });
            container.addEventListener('wheel', (e) => {
                e.preventDefault();
                const containerRect = container.getBoundingClientRect();
                const cursorX = e.clientX - containerRect.left;
                const cursorY = e.clientY - containerRect.top;
                const imgX = (cursorX - translateX) / scale;
                const imgY = (cursorY - translateY) / scale;
                const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
                const newScale = Math.max(minScale, Math.min(maxScale, scale * zoomFactor));
                translateX = cursorX - imgX * newScale;
                translateY = cursorY - imgY * newScale;
                scale = newScale;
                limitPosition();
                if (scale === minScale) {
                    translateX = (container.clientWidth - img.offsetWidth * scale) / 2;
                    translateY = (container.clientHeight - img.offsetHeight * scale) / 2;
                }
            updateTransform();
            });

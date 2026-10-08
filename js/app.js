"use strict";

// START EA1_INTERAKTIVE_SCHEIBE

// HTML-Elemente der Scheibensteuerung.
const disc = document.getElementById("disc");
const statusText = document.getElementById("status");

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const autoButton = document.getElementById("autoButton");

// Anzahl der Einzelbilder der Scheibe.
const numberOfFrames = 24;

// Aktuell angezeigtes Einzelbild.
let currentFrame = 0;

// Speichert das Intervall der automatischen Animation.
// null bedeutet: Animation ist ausgeschaltet.
let animationInterval = null;


// Zeigt das aktuell ausgewählte Einzelbild an.
function showFrame() {

    const frameNumber = String(currentFrame).padStart(2, "0");

    disc.src = "images/disc_" + frameNumber + ".png";
}


// Scheibe einen Schritt nach links drehen.
function rotateLeft() {

    currentFrame--;

    // Nach Frame 0 wieder zu Frame 23 springen.
    if (currentFrame < 0) {
        currentFrame = numberOfFrames - 1;
    }

    showFrame();
}


// Scheibe einen Schritt nach rechts drehen.
function rotateRight() {

    currentFrame++;

    // Nach Frame 23 wieder bei Frame 0 beginnen.
    if (currentFrame >= numberOfFrames) {
        currentFrame = 0;
    }

    showFrame();
}


// Automatische Drehung starten oder stoppen.
function toggleAnimation() {

    // Wenn noch keine Animation läuft:
    if (animationInterval === null) {

        animationInterval = setInterval(function () {
            rotateRight();
        }, 120);

        statusText.textContent = "Automatische Rotation: an";
        autoButton.textContent = "■ Automatik stoppen";

    } else {

        // Laufende Animation stoppen.
        clearInterval(animationInterval);

        animationInterval = null;

        statusText.textContent = "Automatische Rotation: aus";
        autoButton.textContent = "▶ Automatik";
    }
}


// Bedienung über die drei Buttons.
leftButton.addEventListener("click", rotateLeft);

rightButton.addEventListener("click", rotateRight);

autoButton.addEventListener("click", toggleAnimation);


// Bedienung über die Tastatur.
window.addEventListener("keydown", function (event) {

    // Verhindert, dass Gedrückthalten von L oder R
    // mehrere Einzelbilder hintereinander auslöst.
    if (event.repeat) {
        return;
    }

    const key = event.key.toLowerCase();

    if (key === "l") {
        rotateLeft();
    }

    if (key === "r") {
        rotateRight();
    }

    if (key === "a") {
        toggleAnimation();
    }
});

// END EA1_INTERAKTIVE_SCHEIBE



// START EA1_SPRITESHEET_AUTO

const carSprite = document.getElementById("carSprite");

// Sprite-Sheet:
// 1550 px Gesamtbreite / 5 Frames = 310 px pro Frame.
const carFrameWidth = 310;
const carNumberOfFrames = 5;

let currentCarFrame = 0;


// Zeigt einen bestimmten Ausschnitt des Sprite-Sheets.
function showCarFrame() {

    const xPosition = -(currentCarFrame * carFrameWidth);

    carSprite.style.backgroundPosition =
        xPosition + "px 0px";
}


// Zum nächsten Auto-Frame wechseln.
function animateCar() {

    currentCarFrame++;

    if (currentCarFrame >= carNumberOfFrames) {
        currentCarFrame = 0;
    }

    showCarFrame();
}


// Auto automatisch animieren.
setInterval(animateCar, 150);

// END EA1_SPRITESHEET_AUTO
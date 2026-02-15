const fs = require("fs");
const path = require("path");
const failConfig = require('./fail-config');

const extractedClasses = new Set();
let styleFileContent = '*{padding: 0; margin: 0; box-sizing: border-box}';

extractCSSClasses();
createCSSClasses();
createCSSFile();
addStyleToHTML();

function extractCSSClasses() {
    const html = fs.readFileSync("index.html", "utf8");

    const classRegex = /class="([^"]+)"/g;

    while ((match = classRegex.exec(html)) !== null) {
        match[1].split(" ").forEach(className => {
            extractedClasses.add(className);
        });
    }
}

function createCSSClasses() {
    extractedClasses.forEach(className => {
        const classBlocks = className.split("-");
        console.log(classBlocks);

        switch (classBlocks[0]) {
            case 'color':
                buildColorClass(classBlocks);
                break;

            case 'bg':
                buildBackgroundClass(classBlocks);
                break;

            case 'padding':
                buildPaddingClass(classBlocks);
                break;

            case 'fs': 
                buildFontSizeClass(classBlocks);
                break;

            case 'margin': 
                buildMarginClass(classBlocks);
                break;

            case 'corner':
                buildRadiusClass(classBlocks);
                break;
            
            case 'border':
                buildBorderClass(classBlocks);
                break;

            default:
                break;
        }
    })
}

function addStyleToHTML() {
    const htmlFile = path.join(__dirname, 'index.html');
    let html = fs.readFileSync(htmlFile, "utf8");

    const failCSSLink = `<link rel="stylesheet" href="fail-style.css">`;

    console.log("Linking Build");

    if (!html.includes(failCSSLink)) {
        html = html.replace("</head>", `\t${failCSSLink} \n </head>`);
        fs.writeFileSync(htmlFile, html, "utf8");
        console.log("Build linked to HTML")
    } else {
        console.log("Build already Linked.")
    }
}

function buildColorClass(classBlocks) {
    const colorValue = failConfig.colors[classBlocks[1]] ?? classBlocks[1];
    styleFileContent += `.color-${classBlocks[1]} {color: ${colorValue}} \n`
}

function buildBackgroundClass(classBlocks) {
    const colorValue = failConfig.colors[classBlocks[1]] ?? classBlocks[1];
    styleFileContent += `.bg-${classBlocks[1]} {background-color: ${colorValue}} \n`
}

function buildPaddingClass(classBlocks) {
    const pxValue = failConfig?.baseSize ?? 1;
    styleFileContent += `.padding-${classBlocks[1]} {padding: ${pxValue * classBlocks[1]}px} \n`
}

function buildFontSizeClass(classBlocks) {
    const pxValue = failConfig?.baseSize ?? 1;
    styleFileContent += `.fs-${classBlocks[1]} {font-size: ${pxValue * classBlocks[1]}px; 
    line-height: ${pxValue * classBlocks[1]}px; } \n`
}

function buildMarginClass(classBlocks) {
    const pxValue = failConfig?.baseSize ?? 1;
    styleFileContent += `.margin-${classBlocks[1]} {margin: ${pxValue * classBlocks[1]}px}\n`
}

function buildRadiusClass(classBlocks) {
    const pxValue = failConfig?.baseSize ?? 1;
    styleFileContent += `.corner-${classBlocks[1]} {border-radius: ${pxValue * classBlocks[1]}px}\n`
}

function buildBorderClass(classBlocks) {
    const color = failConfig?.colors[classBlocks[1]] ?? classBlocks[1];
    styleFileContent += `.border-${classBlocks[1]} {border: 1px solid ${color}}\n`
}

function createCSSFile() {
    fs.writeFileSync(path.join(__dirname, 'fail-style.css'), styleFileContent, "utf8");
}
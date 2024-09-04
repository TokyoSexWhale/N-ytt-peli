document.getElementById('pura-btn').addEventListener('click', function() {
    const box = document.getElementById('box');
    box.style.display = 'flex';

    const internalParts = [
        { id: 'Emolevy', label: 'Emolevy', type: 'elektroniikka' },
        { id: 'Prosessori', label: 'Prosessori', type: 'elektroniikka' },
        { id: 'Näytönohjain', label: 'Näytönohjain', type: 'elektroniikka' },
        { id: 'Ram tikut', label: 'Ram tikut', type: 'elektroniikka' },
        { id: 'Kovalevy', label: 'Kovalevy', type: 'elektroniikka' },
        { id: 'Virtalähde', label: 'Virtalähde', type: 'elektroniikka' },
        { id: 'Tuuletin', label: 'Tuuletin', type: 'elektroniikka' },
        { id: 'Nestejäähdytin', label: 'Nestejäähdytin', type: 'metalli' },
        { id: 'SSD', label: 'SSD', type: 'elektroniikka' },
        { id: 'Sähköjohdot', label: 'Sähköjohdot', type: 'muovi' }
    ];

    box.innerHTML = '';

    internalParts.forEach(part => {
        const partElement = document.createElement('div');
        partElement.className = 'item';
        partElement.id = part.id;
        partElement.setAttribute('data-type', part.type);
        partElement.setAttribute('draggable', true);
        partElement.innerHTML = `
            <img src="images/${part.id}.JPG" alt="${part.label}">
            <span>${part.label}</span>
        `;
        box.appendChild(partElement);
    });

    this.style.display = 'none';
    addDragAndDropFunctionality();
});

document.getElementById('pura-puhelin-btn').addEventListener('click', function() {
    const phoneBox = document.getElementById('phone-box');
    phoneBox.style.display = 'flex';

    const phoneParts = [
        { id: 'Kuoret', label: 'Kuoret', type: 'muovi' },
        { id: 'Puhelimen laturi', label: 'Puhelimen laturi', type: 'muovi' },
        { id: 'Sim kortti', label: 'Sim kortti', type: 'elektroniikka' },
        { id: 'Puhelimen akku', label: 'Puhelimen akku', type: 'ongelmajäte' }
    ];

    phoneBox.innerHTML = '';

    phoneParts.forEach(part => {
        const partElement = document.createElement('div');
        partElement.className = 'item';
        partElement.id = part.id;
        partElement.setAttribute('data-type', part.type);
        partElement.setAttribute('draggable', true);
        partElement.innerHTML = `
            <img src="images/${part.id}.jpg" alt="${part.label}">
            <span>${part.label}</span>
        `;
        phoneBox.appendChild(partElement);
    });

    this.style.display = 'none';
    addDragAndDropFunctionality();
});

function addDragAndDropFunctionality() {
    const items = document.querySelectorAll('.item');
    const bins = document.querySelectorAll('.recycling-bin');
    let totalItems = items.length;

    items.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', item.id);
        });
    });

    bins.forEach(bin => {
        bin.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        bin.addEventListener('drop', function(e) {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            const item = document.getElementById(itemId);
            const itemType = item.getAttribute('data-type').toLowerCase();
            const binType = this.getAttribute('data-type').toLowerCase();

            if (itemType === binType) {
                item.remove();
                totalItems--;
                alert(`${item.querySelector('span').innerText} kierrätetty oikein!`);
                checkAllRecycled(totalItems);
            } else {
                alert(`Väärä kierrätys! Yritä uudelleen.`);
            }
        });
    });
}

function checkAllRecycled(remainingItems) {
    if (remainingItems === 0) {
        const externalParts = document.querySelectorAll('#external-parts .item').length;
        const computerParts = document.querySelectorAll('#box .item').length;
        const phoneParts = document.querySelectorAll('#phone-box .item').length;

        if (externalParts === 0 && computerParts === 0 && phoneParts === 0) {
            document.getElementById('container').style.display = 'none';
            document.getElementById('message-container').style.display = 'block';
        }
    }
}

document.getElementById('restart-btn').addEventListener('click', function() {
    window.location.reload();
});

addDragAndDropFunctionality();

document.addEventListener('DOMContentLoaded', function () {
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsContainer = document.getElementById('itemsContainer');
    const totalAmountInput = document.getElementById('totalAmount');

    let totalAmount = 0;

    // Load items from localStorage
    loadItems();

    addItemBtn.addEventListener('click', function () {
        const itemDiv = createItemDiv();
        itemsContainer.appendChild(itemDiv);

        // Save items to localStorage
        saveItems();
    });

    function createItemDiv() {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const itemNameInput = document.createElement('input');
        itemNameInput.type = 'text';
        itemNameInput.placeholder = 'Item Name';

        const amountInput = document.createElement('input');
        amountInput.type = 'number';
        amountInput.placeholder = 'Amount';
        amountInput.addEventListener('input', updateTotal);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function () {
            itemsContainer.removeChild(itemDiv);
            updateTotal();
            // Save items to localStorage after removal
            saveItems();
        });

        itemDiv.appendChild(itemNameInput);
        itemDiv.appendChild(amountInput);
        itemDiv.appendChild(removeBtn);

        return itemDiv;
    }

    function updateTotal() {
        totalAmount = 0;
        const amountInputs = document.querySelectorAll('.item input[type="number"]');
        amountInputs.forEach(function (input) {
            totalAmount += parseFloat(input.value) || 0;
        });

        totalAmountInput.value = totalAmount.toFixed(2);

        // Save items and totalAmount to localStorage
        saveItems();
    }

    function saveItems() {
        const items = [];
        const itemDivs = document.querySelectorAll('.item');
        itemDivs.forEach(function (itemDiv) {
            const itemNameInput = itemDiv.querySelector('input[type="text"]');
            const amountInput = itemDiv.querySelector('input[type="number"]');
            items.push({
                itemName: itemNameInput.value,
                amount: amountInput.value
            });
        });

        localStorage.setItem('items', JSON.stringify(items));
        localStorage.setItem('totalAmount', totalAmount);
    }

    function loadItems() {
        const items = JSON.parse(localStorage.getItem('items')) || [];

        items.forEach(function (item) {
            const itemDiv = createItemDiv();
            const itemNameInput = itemDiv.querySelector('input[type="text"]');
            const amountInput = itemDiv.querySelector('input[type="number"]');
            
            itemNameInput.value = item.itemName;
            amountInput.value = item.amount;

            itemsContainer.appendChild(itemDiv);
        });

        totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
        totalAmountInput.value = totalAmount.toFixed(2);
    }
});

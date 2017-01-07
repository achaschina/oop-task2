var CASINO;

$('[name="create-casino"]').click(function (event) {
    event.preventDefault();
    var number = $('#number').val();
    var money = $('#money').val();
    var isValid = isCorrectValue(number) && isCorrectValue(money);

    if (isValid) {
        CASINO = new Casino(number, money);
        createSlot();
    }
});

$('[name="create-slot"]').click(function (event) {
    event.preventDefault();
    var moneyInSlot = prompt('Put money in slot, please....');
    var slot = new SlotMachine(moneyInSlot);
    var machinArr = CASINO.allMachins;
    var i = machinArr.length;
    machinArr.push(slot);
    initSlot(moneyInSlot, i);
});

$('[name="delete-slot"]').click(function (event) {
    event.preventDefault();
    var index = prompt('Choose a slot what you want delete');
    var isValid = isCorrectValue(index);
    if (isValid) {
        CASINO.removeSlotMachin(index);
        var arr = $('#row').children();
        $(arr[index]).remove();
    }
});

$('#btn-play').click(function (event) {
    event.preventDefault();
    var index = prompt('Choose a slot that will play');
    var sum = +(prompt('Put money in slot, please....'));
    if (!isNaN(sum)) {
        index = +index;
        index -= 1;
        updateSum(sum, index);
        if (index <= CASINO.allMachins.length) {
            CASINO.allMachins[index].play(sum, index);
        }
    }
});

$('#btn-take-money').click(function (event) {
    event.preventDefault();
    var index = +(prompt('Choose a slot that you want take off money'));
    index -= 1;
    var sum = prompt('How much you want take off?');
    var isValid = isCorrectValue(sum);
    if (isValid && index <= CASINO.allMachins.length) {
        CASINO.allMachins[index].takeOffMoney(sum);
        updateSum(-sum, index);
        CASINO.quantityKesh -= sum;
    }
});

$('#btn-take-money-all').click(function (event) {
    event.preventDefault();
    var sum = prompt('How much you want take off from casino? Now in casino: ' + CASINO.quantityKesh);
    var isValid = isCorrectValue(sum);
    if (isValid){
        CASINO.takeOffMoney(sum);
        CASINO.quantityKesh -= sum;
    }
});

function updateSum(sum, index) {
    var arr = $('#row').children();
    var oldSum = +((arr[index].children[1].innerText).slice(1));
    arr[index].children[1].innerText = '$' + (sum + oldSum);
}

function updateUserNumber(index, number) {
    var arr = $('#row').children();
    arr[index].children[0].innerText = number;
}

function initSlot(moneyInSlot, i) {
    var $div = $("<div>", {"class": "col s1 m1 l1 slot", "id": "slot" + i}).appendTo("#row");
    var $span = $("<span>", {"class": "custom-number", "text": "777"}).appendTo("#slot" + i);
    var $spanMoney = $("<span>", {"class": "money-slot", "text": "$" + moneyInSlot}).appendTo("#slot" + i);
    var $spanNumber = $("<span>", {"class": "number-slot", "text": "№" + (i + 1)}).appendTo("#slot" + i);
};

function createSlot() {
    // Casino = JSON.parse(sessionStorage.getItem('Casino'));
    for (var i = 0; i < CASINO.quantitySlotMachine; i++) {
        var moneyInSlot = CASINO.allMachins[i].initialAmount;
        initSlot(moneyInSlot, i);
    }
};

function isCorrectValue(number) {
    var isValid = true;

    if (!/\d/.test(number)) {
        alert('Value should be the number');
        isValid = false;
    } else if (/-/.test(number)) {
        alert('Value should be more then then 0');
        isValid = false;
    } else if (/ /.test(number)) {
        alert('Value should be the number');
        isValid = false;
    } else if (/\D/.test(number)) {
        alert('Value should be the number');
        isValid = false;
    } else if (number.search(/0/) === 0) {
        alert('Value can not begin from 0');
        isValid = false;
    }

    return isValid;
}
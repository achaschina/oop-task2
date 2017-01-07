// -------class Casino START -------- //

//create new obj Casino
function Casino(quantitySlotMachine, quantityCash) {
    this.quantitySlotMachine = quantitySlotMachine;
    this.quantityKesh        = quantityCash;
    this.allMachins          = [];
    var cash = Math.floor(quantityCash/quantitySlotMachine);
    for (var i = 0; i < (quantitySlotMachine -1); i++) {
        this.allMachins.push(new SlotMachine(cash));
    }
    this.allMachins.push(new LuckySlotMachine(cash));

}

LuckySlotMachine.prototype = Object.create(SlotMachine.prototype);


//create public method for getting total sum money
Casino.prototype.getAllCasinosMoney = function() {
    return this.quantityCash;
}

//create public method for getting quantity of machins
Casino.prototype.getQuantityOfMachins = function() {
    return this.allMachins.length;
}

//create public method which creates slot machin
Casino.prototype.createSlotMachin = function() {
    function getRichestMachin(arrMachins) {
        if (arrMachins.length == 0) {
            console.log('There are no one slot machins in casino!');
            return 0;
        }
        else {
            var requiredMachin = arrMachins[0];
            for(var i = 0; i < arrMachins.length; i ++) {
                if (arrMachins[i].quantityKesh > requiredMachin.quantityKesh) {
                    requiredMachin = arrMachins[i];
                }
            }
        }
        return requiredMachin.initialAmount;
    }

    var requiredSumKesh = Math.floor(getRichestMachin(this.allMachins)/2);
    var newMachin = new SlotMachine(requiredSumKesh);
    this.allMachins.push(newMachin);
}

//create public method which take off money every slot
Casino.prototype.takeOffMoney = function (sum) {
    var slotArr = this.allMachins;
    //sorting slot machin by initialAmount
    function sortArr(slotArr) {
        slotArr.sort(function (a, b) {
            if (a.initialAmount > b.initialAmount) {
                return 1;
            }
            if (a.initialAmount < b.initialAmount) {
                return -1;
            }
            // a==b
            return 0;
        });
    }
    var sumForEachMachin = Math.floor(sum/slotArr.length);
    for (var i = 0; i < slotArr.length; i++) {
        slotArr[i].initialAmount -= sumForEachMachin;
        updateSum(-sumForEachMachin, i);
    };
}

//public method for remove slot machins
Casino.prototype.removeSlotMachin = function(index) {
    var slotMachinArr = this.allMachins;
    if (slotMachinArr.length == 0) {
        alert('There is no slot machin in casino!');
        return;
    };
    if (index > slotMachinArr.length) {
        alert('You can not remove a non-existent slot machin! The max number of slot:' + slotMachinArr.length);
        return;
    };
    var moneySum = slotMachinArr[index].initialAmount;
    slotMachinArr.splice(index, 1);
    var sumForEachMachin = Math.floor(moneySum/(slotMachinArr.length-1));
    if (sumForEachMachin !== 0) {
        for (var i = 0; i < slotMachinArr.length; i++) {
            slotMachinArr[i].initialAmount += sumForEachMachin;
            updateSum(sumForEachMachin, i);
        };
    };
}
// --------class Casino END------ //

// --------class SlotMachine START------ //

//create new obj SlotMachine
function SlotMachine(initialAmount) {
    this.initialAmount = initialAmount;
}

function LuckySlotMachine(initialAmount) {
    this.initialAmount = initialAmount;
}


SlotMachine.prototype.takeOffMoney = function (sum) {
    if (this.initialAmount < sum) {
        alert ('There is less money than You want! You can take no more than:' + this.initialAmount);
    } else {
        this.initialAmount -= sum;
    }
}

SlotMachine.prototype.putMoney = function (sum) {
    this.initialAmount += sum;
}

SlotMachine.prototype.play = function (sum, index) {
    this.putMoney(sum); // add players money to slot
    var playersNumber = this.getNumber(index);
    if (playersNumber == '777') {
        //all money
        alert('Congratulations you won JACKPOT: ' + this.initialAmount + '!!!');
        updateSum(-this.initialAmount, index);
        this.takeOffMoney(this.initialAmount);
        return;
    }
    for (var i = 0; i < 10; i++) {
        if (playersNumber.indexOf(i) !== playersNumber.lastIndexOf(i)) {
            //sum*3
            alert('Congratulations you won: ' + sum * 3 + '!!!');
            updateSum(-sum * 3, index);
            this.takeOffMoney(sum * 3);
            return;
        }
    }
    if (playersNumber[0] == playersNumber[1] == playersNumber[2]) {
        //sum*5
        alert('Congratulations you won: ' + sum * 5 + '!!!');
        updateSum(-sum * 5, index);
        this.takeOffMoney(sum * 5);
        return;
    }
}

SlotMachine.prototype.getNumber = function (index) {
    var number = String(Math.round(100 + Math.random() * 899));
    updateUserNumber(index, number);
    return number;
}
LuckySlotMachine.prototype.getNumber = function () {
    return '777';
}

// --------class SlotMachine END ------ //










// function initCasino() {
//     var quantityKesh = Math.floor(Math.random() * (1000)) + 1000;
//     var quantitySlotMachine = Math.floor(Math.random() * 10);
//     var slotsArr = [];
//     for (var i = 0; i < quantitySlotMachine; i++) {
//         var slotMachin = new SlotMachine(Math.floor(quantityKesh/quantitySlotMachine));
//         slotsArr.push(slotMachin);
//     }
//     var newCasino = new Casino(quantitySlotMachine, quantityKesh, slotsArr);
// };
//
// initCasino();


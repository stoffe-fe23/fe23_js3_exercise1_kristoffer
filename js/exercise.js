/*
    4. Extra exercises and repetition
*/

////// FUNCTIONS //////
const sayGoodbye = function (name = "again") {
    showOutput(`Goodbye ${name}...`);
}

const saySomething = () => {
    sayHello();
    sayGoodbye("to you");
    showOutput("These messages were brought to you by the anonumous arrow function.");
};

function sayHello(name = "World") {
    showOutput(`Hello ${name}!`);
}

showOutput("<h3>Functions</h3>");
saySomething();


////// OBJECTS //////

const piggyBankObj = {
    balance: 0,
    withdraw: function (amount) {
        this.balance -= amount;
        if (this.balance < 0) {
            this.balance = 0;
        }
    },
    deposit: function (amount) {
        this.balance += amount;
    },
    getBalance: function () {
        return this.balance;
    }
}

showOutput("<h3>Objects</h3>");
piggyBankObj.deposit(1200);
showOutput(`Deposited 1200:-, current balance: ${piggyBankObj.getBalance()}`);
piggyBankObj.withdraw(400);
showOutput(`"Withdrew 400:-, current balance: ${piggyBankObj.getBalance()}`);

////// CLASSES //////

class PiggyBank {
    owner = "";
    balance = 0;

    constructor(accountOwner = "Unnamed", initialBalance = 0) {
        this.balance = initialBalance;
        this.owner = accountOwner;
    }

    withdraw(amount) {
        const currBalance = this.balance;
        this.balance -= amount;
        if (this.balance < 0) {
            this.balance = 0;
            return currBalance;
        }
        return amount;
    }

    deposit(amount) {
        this.balance += amount;
        return amount;
    }

    getBalance() {
        return this.balance;
    }
}

const piggybankAnders = new PiggyBank("Anders", 1200);
const piggybankLotta = new PiggyBank("Lotta", 1400);
const piggybankLisa = new PiggyBank("Lisa", 100000);

showOutput("<h3>Classes</h3>");
showOutput(`Anders piggybank: ${piggybankAnders.getBalance()}`);
showOutput(`Lotta piggybank: ${piggybankLotta.getBalance()}`);

////// CALLBACKS //////

showOutput("<h3>Callback</h3>");

let thatIsEnoughCheck = 0;
let lottaPayoutTimer = setInterval(() => {
    piggybankLotta.deposit(10);
    showOutput(`Paid Lotta 10-second allowance. Balance: ${piggybankLotta.getBalance()}`);

    if (thatIsEnoughCheck++ > 20) {
        clearInterval(lottaPayoutTimer);
        showOutput("Lotta has exceeded her lifetime quota of allowance.");
    }

}, 10000);

////// I PROMISE //////

lisaPaysAnders().then((lisaWithdrawn) => {
    showOutput("<h3>Promise</h3>");
    showOutput(`Transferred ${lisaWithdrawn}:- from Lisa to Anders. Anders account balance: ${piggybankAnders.getBalance()}, Lisa account balance: ${piggybankLisa.getBalance()}`)
}).catch((error) => {
    showOutput(error);
});


function lisaPaysAnders(amount = 10, delay = 30) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const lisaWithdrawn = piggybankLisa.withdraw(amount);
            if (lisaWithdrawn) {
                piggybankAnders.deposit(lisaWithdrawn);
                resolve(lisaWithdrawn);
            }
            else {
                reject("Lisa does not have enough money to pay Anders!");
            }
        }, delay * 1000);

    });
}



function showOutput(message) {
    const outputBox = document.querySelector("#output");
    const newElement = document.createElement("div");

    console.log(message);
    newElement.innerHTML = "<b>" + timestampToDate(Date.now()) + ":</b> " + message;
    outputBox.append(newElement);
}

function timestampToDate(timestamp, isMilliSeconds = true, locale = "sv-SE") {
    const dateObj = new Date(isMilliSeconds ? timestamp : timestamp * 1000);
    const formatLocale = locale ?? navigator.language;
    const formatOptions = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };

    return new Intl.DateTimeFormat(formatLocale, formatOptions).format(dateObj);
}
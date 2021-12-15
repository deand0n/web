class ElectricityProvider {
    #producedElectricityPerDay;
    #producedElectricityPerNight;

    constructor(producedElectricityPerDay, producedElectricityPerNight) {
        this.#producedElectricityPerDay = producedElectricityPerDay;
        this.#producedElectricityPerNight = producedElectricityPerNight;
    }

    get producedElectricityPerDay() {
        return this.#producedElectricityPerDay;
    }

    get producedElectricityPerNight() {
        return this.#producedElectricityPerNight;
    }
}

class Flat {
    #consumedCapacityPerDay;
    #consumedCapacityPerNight;

    constructor(consumedCapacityPerDay, consumedCapacityPerNight) {
        this.#consumedCapacityPerDay = consumedCapacityPerDay;
        this.#consumedCapacityPerNight = consumedCapacityPerNight;
    }

    get consumedCapacityPerDay() {
        return this.#consumedCapacityPerDay;
    }

    get consumedCapacityPerNight() {
        return this.#consumedCapacityPerNight;
    }
}

class PowerLine {
    #capacity;
    #pricePerWatt;

    constructor(capacity, pricePerWatt) {
        this.#capacity = capacity;
        this.#pricePerWatt = pricePerWatt;
    }

    get capacity() {
        return this.#capacity;
    }

    get pricePerWatt() {
        return this.#pricePerWatt;
    }
}

class PowerPlant extends ElectricityProvider {
    constructor(producedElectricityPerDay, producedElectricityPerNight) {
        super(producedElectricityPerDay, producedElectricityPerNight);
    }
}

class SolarPanel extends ElectricityProvider {
    constructor(producedElectricityPerDay, producedElectricityPerNight) {
        super(producedElectricityPerDay, producedElectricityPerNight);
    }
}

class Building {
    #flats;

    constructor(flats) {
        this.#flats = flats;
    }

    getConsumedElectricityPerDay() {
        return this.#flats.reduce((previousFlat, currentFlat) => previousFlat.consumedCapacityPerDay + currentFlat.consumedCapacityPerDay);
    }

    getConsumedElectricityPerNight() {
        return this.#flats.reduce((previousFlat, currentFlat) => previousFlat.consumedCapacityPerNight + currentFlat.consumedCapacityPerNight);
    }
}

class ElectricSystem {
    #powerPlants;
    #solarPanels;
    #buildings;
    #powerLines;

    constructor(powerPlants, solarPanels, buildings, powerLines) {
        this.#powerPlants = powerPlants;
        this.#solarPanels = solarPanels;
        this.#buildings = buildings;
        this.#powerLines = powerLines;
    }

    getStatistic() {
        const consumedElectricityPerDay = this.#buildings.reduce((p, c) => p.getConsumedElectricityPerDay() + c.getConsumedElectricityPerDay());
        const consumedElectricityPerNight = this.#buildings.reduce((p, c) => p.getConsumedElectricityPerNight() + c.getConsumedElectricityPerNight());;

        const {
            perDay: producedElectricityPerDay,
            perNight: producedElectricityPerNight
        } = this.#countElectricity(this.#solarPanels, this.#powerPlants);

        console.log('\n<------ Вдень ------>');
        this.#getStatisticPer(consumedElectricityPerDay, producedElectricityPerDay);
        console.log('\n<------ Вночі ------>');
        this.#getStatisticPer(consumedElectricityPerNight, producedElectricityPerNight);
    }

    #getStatisticPer = function (consumedElectricity, producedElectricity) {
        if (consumedElectricity < producedElectricity) {
            const extraEnergy = producedElectricity - consumedElectricity;

            const { sum: income, generalAmount: soldEnergyAmount, leftEnergyAmount } = this.#sum((a, b) => b.pricePerWatt - a.pricePerWatt, extraEnergy);

            console.log(`Надлишкова енергія --> ${extraEnergy}`);
            console.log(`Можна заробити на продажі надлишкової енергії --> ${income}`);
            console.log(`Кількість енергії, яку можна продати --> ${soldEnergyAmount}`);
            console.log(`Кількість енергії, яку немає куди продати --> ${leftEnergyAmount}`);
        } else if (consumedElectricity === producedElectricity) {
            console.log(`Спожита електрика = Електрика, яка виробляється`);
        } else {
            const energyNeededToBuy = consumedElectricity - producedElectricity;

            const { sum: cost, generalAmount: energyAmountStillNeedToBuy, leftEnergyAmount } = this.#sum((a, b) => a.pricePerWatt - b.pricePerWatt, energyNeededToBuy);

            console.log(`Недостатня кількість енергії --> ${energyNeededToBuy}`);
            console.log(`Витрати на докуплену енергію --> ${cost}`);
            console.log(`Кількість докупленої енергії --> ${energyAmountStillNeedToBuy}`);
            console.log(`Кількість енергії, яку немає де докупити --> ${leftEnergyAmount}`);
        }
    }

    #countElectricity = function (...electricityProviderList) {
        let sum = { perDay: 0, perNight: 0 };

        electricityProviderList.forEach(electricityProvider => {
            electricityProvider.forEach(e => {
                sum.perDay += e.producedElectricityPerDay;
                sum.perNight += e.producedElectricityPerNight;
            });
        });

        return sum;
    }

    #sum = function (sortFunc, energyAmount) {
        let sum = 0;
        let generalAmount = 0;
        let powerLineIndex = 0;
        const sortedPowerLines = this.#powerLines.sort(sortFunc, energyAmount);

        while (energyAmount > 0 && sortedPowerLines.length > powerLineIndex) {
            const capactiy = sortedPowerLines[powerLineIndex].capacity;
            const pricePerWatt = sortedPowerLines[powerLineIndex].pricePerWatt;

            if (energyAmount >= capactiy) {
                generalAmount += capactiy;
                energyAmount -= capactiy;
                sum += capactiy * pricePerWatt;
                powerLineIndex++;
            } else {
                generalAmount += energyAmount;
                sum += energyAmount * pricePerWatt;
                energyAmount = 0;
                return { sum, generalAmount, leftEnergyAmount: energyAmount };
            }
        }

        return { sum, generalAmount, leftEnergyAmount: energyAmount };
    }
}

const flats = [
    new Flat(15, 10),
    new Flat(30, 25),
];

const buildings = [
    new Building(flats),
    new Building(flats),
];

const powerPlants = [
    new PowerPlant(20, 5),
    new PowerPlant(30, 15),
    new PowerPlant(40, 5),
];

const solarPanels = [
    new SolarPanel(5, 0),
    new SolarPanel(10, 0),
    new SolarPanel(15, 0),
];

const powerLines = [
    new PowerLine(10, 3),
    new PowerLine(15, 5),
    new PowerLine(20, 7),
];

const electricitySystem = new ElectricSystem(powerPlants, solarPanels, buildings, powerLines);
electricitySystem.getStatistic();

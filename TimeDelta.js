class Period {

    _value;
    _conversion;

    toMilli() {
        return this.value * this.conversion
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get conversion() {
        return this._conversion;
    }

    set conversion(value) {
        this._conversion = value;
    }
}

class Millisecond extends Period {

    static get pip() {
        return 1000;
    }

    constructor(value = 1, conversion = 1) {
        super();
        this.value = value;
        this.conversion = conversion;
    }

}

class Second extends Period {

    static get pip() {
        return 60;
    }

    constructor(value = 1, conversion = Millisecond.pip) {
        super();
        this.value = value;
        this.conversion = conversion;
    }

}

class Minute extends Period {

    static get pip() {
        return 60;
    }

    constructor(value = 1, conversion = Second.pip * Millisecond.pip) {
        super();
        this.value = value;
        this.conversion = conversion;
    }

}

class Hour extends Period {

    static get pip() {
        return 24;
    }

    constructor(value = 1, conversion = Minute.pip * Second.pip * Millisecond.pip) {
        super();
        this.value = value;
        this.conversion = conversion;
    }

}

class Day extends Period {


    constructor(value = 1, conversion = Hour.pip * Minute.pip * Second.pip * Millisecond.pip) {
        super();
        this.value = value;
        this.conversion = conversion;
    }

}

class TimeDelta  {

    _millisecond;
    _second;
    _minute;
    _hour;
    _day;

    _periods;

    _timestampSource;
    _timestampTarget;

    constructor() {
        this._periods = [];
    }

    stamp(value) {
        this._timestampSource = value;
        return this;
    }

    isWithin(milliseconds) {
        this._millisecond = new Millisecond(milliseconds);
        this._periods.push(this._millisecond);
        return this;
    }

    of(value) {
        this._timestampTarget = value;
        return this._evaluate();
    }

    ofNow() {
        this._timestampTarget = + new Date();
        return this._evaluate();
    }

    milliseconds(milliseconds) {
        this._millisecond = new Millisecond(milliseconds);
        this._periods.push(this._millisecond);
        return this;
    }

    seconds(seconds) {
        this._second = new Second(seconds);
        this._periods.push(this._second);
        return this;
    }

    minutes(minutes) {
        this._minute = new Minute(minutes);
        this._periods.push(this._minute);
        return this;
    }

    hours(hours) {
        this._hour = new Hour(hours);
        this._periods.push(this._hour);
        return this;
    }

    days(days) {
        this._day = new Day(days);
        this._periods.push(this._day);
        return this;
    }

    _evaluate() {

        const operators = (this._timestampSource < this._timestampTarget) ? [">","+"] : ["<","-"];

        const buffer = (this._periods.length === 1)
            ? this._periods[0].toMilli()
            : this._periods.reduce((total, next) => total.toMilli() + next.toMilli());

        const timeDelta = eval(`${this._timestampSource} ${operators[1]} ${Number(buffer)}`);

        this._periods = [];

        return eval(`${timeDelta} ${operators[0]} ${this._timestampTarget}`);

    }

}

export default TimeDelta;

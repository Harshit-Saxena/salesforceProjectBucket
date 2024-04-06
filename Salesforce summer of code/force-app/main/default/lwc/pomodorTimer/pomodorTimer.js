import { LightningElement, track } from 'lwc';

export default class PomodorTimer extends LightningElement {
    isShowCount = true;
    isShowTime = true;
    isStartTimer = false;
    isStartBreak = false;
    countOptions = [];
    timeOptions = [];
    @track countSelected;
    @track timeSelected = 0;
    @track minutesLeft = 0;
    isFinalMinute = false;
    secondsLeft = 0;
    interval;
    breakInterval;
    connectedCallback() {
        this.getCountRange();
        this.getTimeOptions();
    }
    getCountRange() {
        for (let i = 2; i <= 12; i++) {
            this.countOptions.push({ label: '' + i, value: i });
        }
    }
    handleCountChange(event) {
        this.countSelected = parseInt(event.detail.value);
        // console.log('countSelected',this.countSelected);
    }

    getTimeOptions() {
        //? Here we'll create a only two optins for time
        this.timeOptions.push({ label: '25', value: 1 });
        this.timeOptions.push({ label: '50', value: 50 });
    }
    handleTimeChange(event) {
        this.timeSelected = parseInt(event.detail.value);
        console.log('selected Time', this.timeSelected);
        this.minutesLeft = this.timeSelected;
    }
    handleStartTimer() {
        if (this.timeSelected != null && this.countSelected != null) {
            this.isStartTimer = true;
            this.formatedTime();
        } else {
            //* Here we'll show a toast for error
            window.alert('options not selected properly');
        }
    }
    formatedTime() {
        debugger;
        this.secondsLeft = this.secondsLeft + '0'; //* we can use .padString(2,"0"); to add 0 in fornt of it. 
        if (this.minutesLeft < 10) {
            this.minutesLeft = '0' + this.minutesLeft;
        } // 00
        this.interval = setInterval(() => {
            if (this.minutesLeft >= 0 && this.secondsLeft > 0 && this.minutesLeft != null) {
                this.secondsLeft--;
                if (this.secondsLeft < 10) {
                    this.secondsLeft = '0' + this.secondsLeft;
                } if (this.minutesLeft < 10 && this.minutesLeft != 0) {
                    this.isFinalMinute = true;;
                }
                // console.log('minutesLeft', this.minutesLeft, 'secondLeft', this.secondsLeft);
            } else if (this.secondsLeft <= 0 && this.secondsLeft != null && this.minutesLeft > 0) {
                this.minutesLeft--;
                this.secondsLeft = 59;
                if (this.minutesLeft < 10) {
                    this.isFinalMinute = true;
                }
            } else {
                clearInterval(this.interval);
                this.isStartBreak = true;
                this.formatedTimeForBreak();
                //* Here we'll show a toast message for success
            }
        }, 1000);
        //  console.log('minutesLeft',this.minutesLeft,'secondLeft',this.secondsLeft);
    }
    handleStopTimer() {
        clearInterval(this.interval);
    }
    handleScreenClick() {
        this.handleStopTimer();
        this.isStartTimer = false;
        this.countSelected = null;
        this.timeSelected = null;
        this.isStartBreak = false;
        this.breakTime = null;
        this.isFinalMinute = false;
        location.reload();
        console.log('user clicked on the screen');
    }
    formatedTimeForBreak() {
        debugger;
        this.secondsLeft = 0;
        if (this.timeSelected === 2) {
            this.breakTime = 5;
            this.isFinalMinute = true;
        } else {
            this.breakTime = 10;
            this.isFinalMinute = false;
        }
        this.secondsLeft = this.secondsLeft + '0'; //* we can use .padString(2,"0"); to add 0 in fornt of it. 
        // console.log('breakTime', this.isFinalMinute,'',this.breakTime, 'secondLeft', this.secondsLeft);
        //* Here we'll show a toast message for success
        this.breakInterval = setInterval(() => {
            if (this.breakTime >= 0 && this.secondsLeft > 0 && this.breakTime != null) {
                this.secondsLeft--;
                if (this.secondsLeft < 10) {
                    this.secondsLeft = '0' + this.secondsLeft;
                } if (this.breakTime < 10 && this.breakTime != 0) {
                    this.isFinalMinute = true;;
                }
                // console.log('breakTime', this.breakTime, 'secondLeft', this.secondsLeft);
            } else if (this.secondsLeft <= 0 && this.secondsLeft != null && this.breakTime > 0) {
                this.breakTime--;
                this.secondsLeft = 59;
                if (this.breakTime < 10) {
                    this.isFinalMinute = true;
                }
            } else {
                clearInterval(this.interval);
                window.alert('Time to take a brake');
                //* Here we'll show a toast message for success
            }
        }, 1000);
        // console.log('breakTime', this.breakTime, 'secondLeft', this.secondsLeft);
    }
}
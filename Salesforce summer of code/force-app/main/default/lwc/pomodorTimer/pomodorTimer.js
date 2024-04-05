import { LightningElement,track } from 'lwc';

export default class PomodorTimer extends LightningElement {
    isShowCount = true;
    isShowTime = true;
    isStartTimer = false;
    countOptions = [];
    timeOptions = [];
    @track countSelected;
    @track timeSelected = 0;
    @track minutesLeft = 0;
    secondsLeft = 60;
    interval;

    connectedCallback() {
        this.getCountRange();
        this.getTimeOptions();
    }
    getCountRange() {
        for (let i = 2; i <= 12; i++){
            this.countOptions.push({ label: '' + i, value: i });
        }
    }
    handleCountChange(event) {
        this.countSelected = parseInt(event.detail.value);
        console.log('countSelected',this.countSelected);
    }

    getTimeOptions() {
        //? Here we'll create a only two optins for time
        this.timeOptions.push({ label: '25', value: 25 });
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
        this.interval = setInterval(() => {
            if (this.minutesLeft > 0 && this.secondsLeft > 0 && this.minutesLeft != null) {
                this.secondsLeft--;
                if (this.secondsLeft < 10) {
                    this.secondsLeft= '0'+this.secondsLeft;
                } if (this.minutesLeft < 10) {
                    this.minutesLeft= '0'+this.minutesLeft;
                }
                // console.log('minutesLeft', this.minutesLeft, 'secondLeft', this.secondsLeft);
            } else if(this.secondsLeft <= 0 && this.secondsLeft != null) {
                this.minutesLeft--;
                this.secondsLeft = 60;
            } else {
                window.alert('Time to take a brake');
                //* Here we'll show a toast message for success
            }
        },1000);
        // console.log('minutesLeft',this.minutesLeft,'secondLeft',this.secondsLeft);
    }
    handleStopTimer() {
        clearInterval(this.interval);
    }
    handleScreenClick() {
        this.handleStopTimer();
        this.isStartTimer = false;
        this.countSelected = null;
        this.timeSelected = null;
        console.log('user clicked on the screen');
    }
}
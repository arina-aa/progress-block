class ProgressBlock {
    constructor(container) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        this.progressBar = this.container.querySelector('.progress-bar');
        this.valueInput = this.container.querySelector('.valueInput');
        this.animateSwitch = this.container.querySelector('.animateSwitch');
        this.hideSwitch = this.container.querySelector('.hideSwitch');

        this.progressContainer = this.container.querySelector('.progress-container');

        const radius = 45;
        this.circumference = 2 * Math.PI * radius;

        this.init();
    }

    init() {
        this.updateProgress(this.valueInput.value);
        
        let lastValidValue = this.valueInput.value;

        this.valueInput.addEventListener('focus', () => {
            this.valueInput.value = '';
        });

        this.valueInput.addEventListener('blur', () => {
            let value = this.valueInput.value.trim();

            if (value === '' || isNaN(value)) {
                this.valueInput.value = lastValidValue;
                this.updateProgress(lastValidValue);
                return;
            }

            let numValue = Number(value);

            if (numValue < 0) numValue = 0;
            if (numValue > 100) numValue = 100;

            lastValidValue = numValue;

            this.valueInput.value = numValue;

            this.updateProgress(numValue);
        });       

        this.valueInput.addEventListener('input', () => {
            let value = this.valueInput.value;
            if (value === '') return; 
            const numValue = Number(value);
            if (isNaN(numValue)) return;
            let correctedValue = Math.min(100, Math.max(0, numValue));
            if (numValue !== correctedValue) {
                this.valueInput.value = correctedValue;
            }
            this.updateProgress(correctedValue);
            lastValidValue = correctedValue;
        });

        this.animateSwitch.addEventListener('change', () => {
            this.progressContainer.classList.toggle('animated', this.animateSwitch.checked);
        });

        this.hideSwitch.addEventListener('change', () => {
            this.progressContainer.classList.toggle('hidden', this.hideSwitch.checked);
        });
    }

    updateProgress(value) {
        const val = Math.min(100, Math.max(0, Number(value)));
        const offset = this.circumference * (1 - val / 100);
        this.progressBar.style.strokeDasharray = this.circumference;
        this.progressBar.style.strokeDashoffset = offset;
    }

    setValue(value) {
        this.valueInput.value = value;
        this.updateProgress(value);
    }

    setAnimate(value) {
        this.animateSwitch.checked = !!value;
        this.progressContainer.classList.toggle('animated', value);
    }

    setHidden(value) {
        this.hideSwitch.checked = !!value;
        this.progressContainer.classList.toggle('hidden', value);
    }
}

const progressComponent = new ProgressBlock('#progress-block');
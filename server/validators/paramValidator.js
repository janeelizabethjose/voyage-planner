function paramValidator() {
    this.errorMessage;
    this.checkObject = function (value) {
        this.errorMessage = null;
        for (var property in value) {
            if (!value[property]) {
                this.errorMessage = 'Value of ' + property + ' can not be null.';
                break;
            }
        }
        return this.errorMessage ? false : true;
    };

}
module.exports = new paramValidator();
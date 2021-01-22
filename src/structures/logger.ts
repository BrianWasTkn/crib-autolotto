export default {
    info: (klass: string, message: any): void => {
        return console.log(`[${klass}]`, message);
    }
}
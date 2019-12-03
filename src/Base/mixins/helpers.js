import moment from "moment"
export default {
    methods: {
        toCurrency(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        convertDate(date) {
            console.log(date)
            return moment(date).format("MMM DD YYYY")
        }
    }
}
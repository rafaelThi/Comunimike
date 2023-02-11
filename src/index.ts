import { AppDataSource } from "./data-source"

export default function connect () {
    AppDataSource.initialize().then(async () => {
        console.log('Server On');
}).catch(error => console.log(error))

}
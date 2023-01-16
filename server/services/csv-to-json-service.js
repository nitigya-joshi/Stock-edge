
const fs = require('fs');
const csv = require('csv-parser');

class csvToJsonService {

    convertCsvToJson(csvData) {

        const results = []

        let json;

        fs.createReadStream('CIPLA.NS.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                json = results;
            });

        return json;
    }

}

module.exports= new csvToJsonService();